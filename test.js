import assert from 'node:assert/strict'
import test from 'node:test'
import {VFile} from 'vfile'
import {matter} from 'vfile-matter'

const someYaml = '---\nkey: value\nlist:\n  - 1\n  - 2\n---'
const document = 'Here is a document\nMore of the document\nOther lines\n'
const both = someYaml + '\n' + document

test('matter', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('vfile-matter')).sort(), [
      'matter'
    ])
  })

  await t.test('should add data', async function () {
    const file = new VFile(both)
    matter(file)

    assert.deepEqual(file.data, {matter: {key: 'value', list: [1, 2]}})
  })

  await t.test('should support no matter', async function () {
    const file = new VFile(document)
    matter(file)
    assert.deepEqual(file.data, {matter: {}})
  })

  await t.test('should strip matter', async function () {
    const file = new VFile(both)
    matter(file, {strip: true})
    assert.deepEqual(String(file), document)
  })

  await t.test('should strip matter completely', async function () {
    const file = new VFile(someYaml)
    matter(file, {strip: true})
    assert.deepEqual(String(file), '')
  })

  await t.test('should support no matter w/ strip', async function () {
    const file = new VFile(document)
    matter(file, {strip: true})
    assert.deepEqual(String(file), document)
  })

  await t.test('should supporting `Uint8Array`s (parse)', async function () {
    const file = new VFile(
      new TextEncoder().encode('---\na: "hi"\n---\n\n# hi')
    )
    matter(file)
    assert.deepEqual(file.data.matter, {a: 'hi'})
    assert.ok(
      file.value && typeof file.value === 'object',
      'should supporting `Uint8Array`s'
    )
  })

  await t.test('should supporting `Uint8Array`s (strip)', async function () {
    const file = new VFile(
      new TextEncoder().encode('---\na: "hi"\n---\n\n# hi')
    )
    matter(file, {strip: true})
    assert.deepEqual(file.data.matter, {a: 'hi'})
    assert.ok(file.value && typeof file.value === 'object')
  })

  await t.test('should handle thematic breaks', async function () {
    const extra = 'Here is a thematic break\n---\nEnd'
    const file = new VFile(both + extra)
    matter(file, {strip: true})
    assert.deepEqual(String(file), document + extra)
  })

  await t.test('should support files w/o value', async function () {
    const file = new VFile()
    matter(file, {strip: true})
    assert.ok(file.value === undefined)
  })

  await t.test('should support empty frontmatter', async function () {
    const file = new VFile('---\n---\n')
    matter(file)
    assert.deepEqual(file.data, {matter: null})
  })

  await t.test('should support blank line in frontmatter', async function () {
    const file = new VFile('---\n\n---\n')
    matter(file)
    assert.deepEqual(file.data, {matter: null})
  })

  await t.test(
    'should support whitespace-only blank line in frontmatter',
    async function () {
      const file = new VFile('---\n \t\n---\n')
      matter(file)
      assert.deepEqual(file.data, {matter: null})
    }
  )

  await t.test('should pass yaml options (1)', async function () {
    const file = new VFile('---\nyes: no\n---\n')
    matter(file, {yaml: {version: '1.2'}})
    assert.deepEqual(file.data, {matter: {yes: 'no'}})
  })

  await t.test('should pass yaml options (2)', async function () {
    const file = new VFile('---\nyes: no\n---\n')
    matter(file, {yaml: {version: '1.1'}})
    assert.deepEqual(file.data, {matter: {true: false}})
  })
})
