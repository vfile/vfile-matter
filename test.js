'use strict'

var test = require('tape')
var buffer = require('is-buffer')
var vfile = require('to-vfile')
var matter = require('.')

var yaml = '---\nkey: value\nlist:\n  - 1\n  - 2\n---'
var doc = 'Here is a document\nMore of the document\nOther lines\n'
var both = yaml + '\n' + doc

test('vfile-matter', function (t) {
  var file = vfile({contents: both})

  t.equal(matter(file), file, 'should return the given file')

  t.deepEqual(
    file.data,
    {matter: {key: 'value', list: [1, 2]}},
    'should add data'
  )

  file = matter(vfile({contents: doc}))
  t.deepEqual(file.data, {matter: {}}, 'should support no matter')

  file = matter(vfile({contents: both}), {strip: true})
  t.deepEqual(String(file), doc, 'should strip matter')

  file = matter(vfile({contents: yaml}), {strip: true})
  t.deepEqual(String(file), '', 'should strip matter completely')

  file = matter(vfile({contents: doc}), {strip: true})
  t.deepEqual(String(file), doc, 'should support no matter w/ strip')

  file = matter(vfile({contents: Buffer.from(both)}), {strip: true})
  t.ok(buffer(file.contents), 'should supporting buffers')

  file = matter(vfile(), {strip: true})
  t.ok(file.contents === undefined, 'should supporting empties')

  t.end()
})
