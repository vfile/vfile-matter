'use strict'

var buffer = require('is-buffer')
var yamlParse = require('js-yaml').safeLoad
var parse = require('remark-frontmatter/lib/parse')
var matters = require('remark-frontmatter/lib/matters')

module.exports = matter

var matterParse = parse(matters('yaml')[0])[1]

function matter(file, options) {
  var strip = (options || {}).strip
  var data = file.data
  var doc = String(file)
  var result = matterParse(mockEat, doc)
  var offset

  data.matter = {}

  if (result) {
    data.matter = yamlParse(result.value, {filename: file.path})

    if (strip) {
      offset = result.length

      // \n
      if (doc.charCodeAt(offset) === 10) {
        offset++
      }

      doc = doc.slice(offset)
      file.contents = buffer(file.contents) ? Buffer.from(doc) : doc
    }
  }

  return file
}

function mockEat(doc) {
  return add
  function add(node) {
    return {length: doc.length, value: node.value}
  }
}
