/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('js-yaml').LoadOptions} LoadOptions
 *
 * @typedef Options VFile matter options
 * @property {boolean} [strip=false] Remove the YAML front matter from the file
 * @property {Omit<LoadOptions, 'filename'>} [yaml] Options for the YAML parser
 */

import buffer from 'is-buffer'
import {load} from 'js-yaml'

/**
 * Parse the YAML front matter in a [`vfile`](https://github.com/vfile/vfile), and add it as `file.data.matter`.
 *
 * If no matter is found in the file, nothing happens, except that `file.data.matter` is set to an empty object (`{}`).
 *
 * @template {VFile} File
 * @param {File} file
 *   Virtual file
 * @param {Options} [options]
 *   Options
 * @returns {File}
 *   The given `file`
 */
export function matter(file, options = {}) {
  const strip = options.strip
  const yamlOptions = options.yaml || {}
  let doc = String(file)
  const match =
    /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/.exec(doc)

  if (match) {
    file.data.matter = load(
      match[1],
      Object.assign({}, yamlOptions, {filename: file.path})
    )

    if (strip) {
      doc = doc.slice(match[0].length)
      /* eslint-disable-next-line n/prefer-global/buffer */
      file.value = buffer(file.value) ? Buffer.from(doc) : doc
    }
  } else {
    file.data.matter = {}
  }

  return file
}
