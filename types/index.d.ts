// TypeScript Version: 3.7

import {VFile, VFileCompatible} from 'vfile'
import {LoadOptions} from 'js-yaml'

export = matter

/**
 * Parse the YAML front matter in a [`vfile`](https://github.com/vfile/vfile), and add it as `file.data.matter`.
 *
 * If no matter is found in the file, nothing happens, except that `file.data.matter` is set to an empty object (`{}`).
 * @param file Virtual file
 * @param options Options
 * @returns The given `file`
 */
declare function matter(file: VFileCompatible, options?: matter.Options): VFile

declare namespace matter {
  /**
   * VFile matter options
   */
  interface Options {
    /**
     * Remove the YAML front matter from the file
     */
    strip?: boolean
    /**
     * Options for the YAML parser.
     */
    yaml?: Omit<LoadOptions, 'filename'>
  }
}
