# vfile-matter

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Parse the YAML front matter in a [`vfile`][vfile].

## Install

[npm][]:

```sh
npm install vfile-matter
```

## Use

Say we have a file, `example.html`:

```html
---
title: Hello, world!
---
<p>Some more text</p>
```

And our script, `example.js`, looks like so:

```js
var vfile = require('to-vfile')
var matter = require('vfile-matter')

var file = vfile.readSync('example.html')

matter(file, {strip: true})

console.log(file.data)
console.log(String(file))
```

Now, running our script (`node example`) yields:

```js
{matter: {title: 'Hello, world!'}}
```

```html
<p>Some more text</p>
```

## API

### `matter(file[, options])`

Parse the YAML front matter in a [`vfile`][vfile], and add it as
`file.data.matter`.

If no matter is found in the file, nothing happens, except that
`file.data.matter` is set to an empty object (`{}`).

###### Parameters

*   `file` ([`VFile`][vfile])
    — Virtual file
*   `options.strip` (`boolean`, default: `false`)
    — Remove the YAML front matter from the file

###### Returns

The given `file`.

## Contribute

See [`contributing.md`][contributing] in [`vfile/.github`][health] for ways to
get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/vfile/vfile-matter.svg

[build]: https://travis-ci.org/vfile/vfile-matter

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-matter.svg

[coverage]: https://codecov.io/github/vfile/vfile-matter

[downloads-badge]: https://img.shields.io/npm/dm/vfile-matter.svg

[downloads]: https://www.npmjs.com/package/vfile-matter

[size-badge]: https://img.shields.io/bundlephobia/minzip/vfile-matter.svg

[size]: https://bundlephobia.com/result?p=vfile-matter

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/vfile

[npm]: https://docs.npmjs.com/cli/install

[contributing]: https://github.com/vfile/.github/blob/master/contributing.md

[support]: https://github.com/vfile/.github/blob/master/support.md

[health]: https://github.com/vfile/.github

[coc]: https://github.com/vfile/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[vfile]: https://github.com/vfile/vfile
