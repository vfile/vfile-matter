'use strict'

var test = require('tape')
var buffer = require('is-buffer')
var vfile = require('to-vfile')
var frontmatter = require('.')

var matter = '---\nkey: value\nlist:\n  - 1\n  - 2\n---'
var doc = 'Here is a document\nMore of the document\nOther lines\n'
var both = matter + '\n' + doc

test('vfile-frontmatter', function(t) {
  var file = vfile({contents: both})

  t.equal(frontmatter(file), file, 'should return the given file')

  t.deepEqual(
    file.data,
    {frontmatter: {key: 'value', list: [1, 2]}},
    'should add data'
  )

  file = frontmatter(vfile({contents: doc}))
  t.deepEqual(file.data, {frontmatter: {}}, 'should support no frontmatter')

  file = frontmatter(vfile({contents: both}), {strip: true})
  t.deepEqual(String(file), doc, 'should strip frontmatter')

  file = frontmatter(vfile({contents: matter}), {strip: true})
  t.deepEqual(String(file), '', 'should strip frontmatter completely')

  file = frontmatter(vfile({contents: doc}), {strip: true})
  t.deepEqual(String(file), doc, 'should support no frontmatter w/ strip')

  file = frontmatter(vfile({contents: Buffer.from(both)}), {strip: true})
  t.ok(buffer(file.contents), 'should supporting buffers')

  file = frontmatter(vfile(), {strip: true})
  t.ok(file.contents === undefined, 'should supporting empties')

  t.end()
})
