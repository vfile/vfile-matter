/**
 * @import {VFile} from 'vfile'
 * @import {
 *   DocumentOptions,
 *   ParseOptions,
 *   SchemaOptions,
 *   ToJSOptions as ToJsOptions
 * } from 'yaml'
 */

/**
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean | null | undefined} [strip=false]
 *   Remove the YAML front matter from the file (default: `false`).
 * @property {Readonly<YamlOptions> | null | undefined} [yaml={}]
 *   Configuration for the YAML parser, passed to `yaml` as `x` in
 *   `yaml.parse('', x)` (default: `{}`).
 */

/**
 * @template Type
 *   Type.
 * @typedef {{[Key in keyof Type]: Type[Key]} & {}} Prettify
 *   Flatten a TypeScript record.
 */

/**
 * @typedef {Prettify<DocumentOptions & ParseOptions & SchemaOptions & ToJsOptions>} YamlOptions
 *   Options for the YAML parser.
 *
 *   Equivalent to `DocumentOptions`, `ParseOptions`, `SchemaOptions`, and `ToJsOptions`.
 */

import yaml from 'yaml'

const regex = /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/

/** @type {Readonly<Options>} */
const emptyOptions = {}
/** @type {Readonly<YamlOptions>} */
const emptyYamlOptions = {}

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
 * @param {Readonly<Options> | null | undefined} [options={}]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export function matter(file, options) {
  const options_ = options || emptyOptions
  const strip = options_.strip
  const yamlOptions = options_.yaml || emptyYamlOptions
  let document = String(file)
  const match = regex.exec(document)

  if (match) {
    file.data.matter = yaml.parse(match[1] || '', yamlOptions) || {}

    if (strip) {
      document = document.slice(match[0].length)

      file.value =
        file.value && typeof file.value === 'object'
          ? new TextEncoder().encode(document)
          : document
    }
  } else {
    file.data.matter = {}
  }
}
