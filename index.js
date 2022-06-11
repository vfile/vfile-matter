/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('yaml').ParseOptions} ParseOptions
 * @typedef {import('yaml').DocumentOptions} DocumentOptions
 * @typedef {import('yaml').SchemaOptions} SchemaOptions
 * @typedef {import('yaml').ToJSOptions} ToJsOptions
 * @typedef {ParseOptions & DocumentOptions & SchemaOptions & ToJsOptions} YamlOptions
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean} [strip=false]
 *   Remove the YAML front matter from the file.
 * @property {YamlOptions} [yaml]
 *   Options for the YAML parser.
 *   These are passed as `x` in `yaml.parse('', x)`, which is equivalent to
 *   `ParseOptions & DocumentOptions & SchemaOptions & ToJsOptions`.
 */

import buffer from 'is-buffer'
import yaml from 'yaml'

/**
 * Parse the YAML front matter in a `vfile`, and add it as `file.data.matter`.
 *
 * If no matter is found in the file, nothing happens, except that
 * `file.data.matter` is set to an empty object (`{}`).
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
    file.data.matter = yaml.parse(match[1], yamlOptions)

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
