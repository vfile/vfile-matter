import vfile = require('vfile')
import matter = require('vfile-matter')
import {CORE_SCHEMA} from 'js-yaml'

const file = vfile()

matter(file) // $ExpectType VFile
matter(file, {strip: true}) // $ExpectType VFile
matter(file, {yaml: {schema: CORE_SCHEMA}}) // $ExpectType VFile
matter(file, {}) // $ExpectType VFile
matter(1) // $ExpectError
matter(file, {strip: 'string'}) // $ExpectError
matter(file, {yaml: 'string'}) // $ExpectError
