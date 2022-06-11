import {Buffer} from 'node:buffer'
import test from 'tape'
import buffer from 'is-buffer'
import {CORE_SCHEMA} from 'js-yaml'
import {toVFile as vfile} from 'to-vfile'
import {matter} from './index.js'

const someYaml = '---\nkey: value\nlist:\n  - 1\n  - 2\n---'
const doc = 'Here is a document\nMore of the document\nOther lines\n'
const both = someYaml + '\n' + doc

test('vfile-matter', function (t) {
  let file = vfile({value: both})

  t.equal(matter(file), file, 'should return the given file')

  t.deepEqual(
    file.data,
    {matter: {key: 'value', list: [1, 2]}},
    'should add data'
  )

  file = matter(vfile({value: doc}))
  t.deepEqual(file.data, {matter: {}}, 'should support no matter')

  file = matter(vfile({value: both}), {strip: true})
  t.deepEqual(String(file), doc, 'should strip matter')

  file = matter(vfile({value: someYaml}), {strip: true})
  t.deepEqual(String(file), '', 'should strip matter completely')

  file = matter(vfile({value: doc}), {strip: true})
  t.deepEqual(String(file), doc, 'should support no matter w/ strip')

  file = matter(vfile({value: Buffer.from(both)}), {strip: true})
  t.ok(buffer(file.value), 'should supporting buffers')

  const extra = 'Here is a thematic break\n---\nEnd'
  file = matter(vfile({value: both + extra}), {strip: true})
  t.deepEqual(String(file), doc + extra, 'should handle thematic breaks')

  file = matter(vfile(), {strip: true})
  t.ok(file.value === undefined, 'should supporting empties')

  file = matter(vfile({value: '---\ndate: 2021-01-01\n---\n'}), {
    yaml: {schema: CORE_SCHEMA}
  })
  t.deepEqual(
    file.data,
    {matter: {date: '2021-01-01'}},
    'should pass yaml options'
  )

  t.end()
})
