import assert from 'node:assert/strict'
import {Buffer} from 'node:buffer'
import test from 'node:test'
import buffer from 'is-buffer'
import {VFile} from 'vfile'
import {matter} from './index.js'
import * as mod from './index.js'

const someYaml = '---\nkey: value\nlist:\n  - 1\n  - 2\n---'
const doc = 'Here is a document\nMore of the document\nOther lines\n'
const both = someYaml + '\n' + doc

test('matter', function () {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['matter'],
    'should expose the public api'
  )

  let file = new VFile(both)

  assert.equal(matter(file), file, 'should return the given file')

  assert.deepEqual(
    file.data,
    {matter: {key: 'value', list: [1, 2]}},
    'should add data'
  )

  file = matter(new VFile(doc))
  assert.deepEqual(file.data, {matter: {}}, 'should support no matter')

  file = matter(new VFile(both), {strip: true})
  assert.deepEqual(String(file), doc, 'should strip matter')

  file = matter(new VFile(someYaml), {strip: true})
  assert.deepEqual(String(file), '', 'should strip matter completely')

  file = matter(new VFile(doc), {strip: true})
  assert.deepEqual(String(file), doc, 'should support no matter w/ strip')

  file = matter(new VFile(Buffer.from(both)), {strip: true})
  assert.ok(buffer(file.value), 'should supporting buffers')

  const extra = 'Here is a thematic break\n---\nEnd'
  file = matter(new VFile(both + extra), {strip: true})
  assert.deepEqual(String(file), doc + extra, 'should handle thematic breaks')

  file = matter(new VFile(), {strip: true})
  assert.ok(file.value === undefined, 'should supporting empties')

  file = matter(new VFile('---\nyes: no\n---\n'), {
    yaml: {version: '1.2'}
  })
  assert.deepEqual(
    file.data,
    {matter: {yes: 'no'}},
    'should pass yaml options (1)'
  )
  file = matter(new VFile('---\nyes: no\n---\n'), {
    yaml: {version: '1.1'}
  })
  assert.deepEqual(
    file.data,
    {matter: {true: false}},
    'should pass yaml options (2)'
  )
})
