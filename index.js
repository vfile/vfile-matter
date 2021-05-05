import buffer from 'is-buffer'
import {load} from 'js-yaml'

export function matter(file, options) {
  var settings = options || {}
  var strip = settings.strip
  var yamlOptions = settings.yaml || {}
  var doc = String(file)
  var match = /^---(?:\r?\n|\r)(?:([\s\S]*)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/.exec(
    doc
  )

  if (match) {
    file.data.matter = load(
      match[1],
      Object.assign({}, yamlOptions, {filename: file.path})
    )

    if (strip) {
      doc = doc.slice(match[0].length)
      file.value = buffer(file.value) ? Buffer.from(doc) : doc
    }
  } else {
    file.data.matter = {}
  }

  return file
}
