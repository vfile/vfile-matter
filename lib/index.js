/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('yaml').DocumentOptions} DocumentOptions
 * @typedef {import('yaml').ParseOptions} ParseOptions
 * @typedef {import('yaml').SchemaOptions} SchemaOptions
 * @typedef {import('yaml').ToJSOptions} ToJsOptions
 */

/**
 * @template Type
 *   Type.
 * @typedef {{[Key in keyof Type]: Type[Key]} & {}} Prettify
 *   Flatten a TypeScript record.
 */

/**
 * @typedef {Prettify<ParseOptions & DocumentOptions & SchemaOptions & ToJsOptions>} YamlOptions
 *   Options for the YAML parser.
 *
 *   Equivalent to `ParseOptions`, `DocumentOptions`, `SchemaOptions`, and `ToJsOptions`.
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean | null | undefined} [strip=false]
 *   Remove the YAML front matter from the file (default: `false`).
 * @property {YamlOptions | null | undefined} [yaml={}]
 *   Configuration for the YAML parser, passed to `yaml` as `x` in
 *   `yaml.parse('', x)` (default: `{}`).
 */

import yaml from 'yaml'

const regex = /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/

/**
 * Parse the YAML front matter in a file and expose it as `file.data.matter`.
 *
 * If no matter is found in the file, nothing happens, except that
 * `file.data.matter` is set to an empty object (`{}`).
 *
 * If the file value is an `Uint8Array`, assumes it is encoded in UTF-8.
 *
 * @param {VFile} file
 *   Virtual file.
 * @param {Options | null | undefined} [options={}]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export function matter(file, options) {
  const options_ = options || {}
  const strip = options_.strip
  const yamlOptions = options_.yaml || {}
  let doc = String(file)
  const match = regex.exec(doc)

  if (match) {
    file.data.matter = yaml.parse(match[1], yamlOptions)

    if (strip) {
      doc = doc.slice(match[0].length)

      file.value =
        file.value && typeof file.value === 'object'
          ? new TextEncoder().encode(doc)
          : doc
    }
  } else {
    file.data.matter = {}
  }
}
