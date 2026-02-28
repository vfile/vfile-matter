/**
 * @import {VFile} from 'vfile'
 */

/**
 * @typedef VFileMatterOptions
 *   Configuration (optional).
 * @property {boolean | null | undefined} [strip=false]
 *   Remove the YAML front matter from the file (default: `false`).
 */

/**
 * @template Type
 *   Type.
 * @typedef {{[Key in keyof Type]: Type[Key]} & {}} Prettify
 *   Flatten a TypeScript record.
 */

/**
 * @typedef {Prettify<simplematter.Parsers & VFileMatterOptions>} Options
 *   Configuration (optional).
 */

import {simplematter} from 'simplematter'

/** @type {Readonly<Options>} */
const emptyOptions = {}

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
  const {strip, ...options_} = options || emptyOptions
  if (file.value === undefined) {
    file.data.matter = undefined
    return
  }

  const [matter, document] = simplematter(String(file), options_)
  file.data.matter = matter

  if (strip) {
    file.value =
      typeof file.value === 'object'
        ? new TextEncoder().encode(document)
        : document
  }
}
