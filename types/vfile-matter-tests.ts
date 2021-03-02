import vfile = require('vfile')
import matter = require('vfile-matter')

const file = vfile()

matter(file) // $ExpectType VFile
matter(file, {strip: true}) // $ExpectType VFile
matter(file, {}) // $ExpectType VFile
matter(1) // $ExpectError
matter(file, {strip: 'string'}) // $ExpectError
