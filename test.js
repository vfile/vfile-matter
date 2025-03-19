import assert from 'node:assert/strict'
import test from 'node:test'
import {VFile} from 'vfile'
import {matter} from 'vfile-matter'

const someYaml = '---\nkey: value\nlist:\n  - 1\n  - 2\n---'
const document = 'Here is a document\nMore of the document\nOther lines\n'
const both = someYaml + '\n' + document

test('matter', async function () {
  assert.deepEqual(
    Object.keys(await import('vfile-matter')).sort(),
    ['matter'],
    'should expose the public api'
  )

  let file = new VFile(both)
  matter(file)

  assert.deepEqual(
    file.data,
    {matter: {key: 'value', list: [1, 2]}},
    'should add data'
  )

  file = new VFile(document)
  matter(file)
  assert.deepEqual(file.data, {matter: {}}, 'should support no matter')

  file = new VFile(both)
  matter(file, {strip: true})
  assert.deepEqual(String(file), document, 'should strip matter')

  file = new VFile(someYaml)
  matter(file, {strip: true})
  assert.deepEqual(String(file), '', 'should strip matter completely')

  file = new VFile(document)
  matter(file, {strip: true})
  assert.deepEqual(String(file), document, 'should support no matter w/ strip')

  file = new VFile(new TextEncoder().encode('---\na: "hi"\n---\n\n# hi'))
  matter(file, {strip: true})
  assert.deepEqual(
    file.data.matter,
    {a: 'hi'},
    'should supporting `Uint8Array`s (parse)'
  )
  assert.ok(
    file.value && typeof file.value === 'object',
    'should supporting `Uint8Array`s (strip)'
  )

  const extra = 'Here is a thematic break\n---\nEnd'
  file = new VFile(both + extra)
  matter(file, {strip: true})
  assert.deepEqual(
    String(file),
    document + extra,
    'should handle thematic breaks'
  )

  file = new VFile()
  matter(file, {strip: true})
  assert.ok(file.value === undefined, 'should supporting empties')

  file = new VFile('---\nyes: no\n---\n')
  matter(file, {yaml: {version: '1.2'}})
  assert.deepEqual(
    file.data,
    {matter: {yes: 'no'}},
    'should pass yaml options (1)'
  )
  file = new VFile('---\nyes: no\n---\n')
  matter(file, {yaml: {version: '1.1'}})
  assert.deepEqual(
    file.data,
    {matter: {true: false}},
    'should pass yaml options (2)'
  )
  file = new VFile('---\n\n---\n')
  matter(file, {yaml: {version: '1.1'}})
  assert.deepEqual(
    file.data,
    {matter: null},
    'should not crash on empty frontmatter'
  )
  file = new VFile('---\n---\n')
  matter(file, {yaml: {version: '1.1'}})
  assert.deepEqual(
    file.data,
    {matter: null},
    'should not crash on empty frontmatter'
  )
})
