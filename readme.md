# vfile-frontmatter

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Parse the YAML frontmatter in a [`vfile`][vfile].

## Install

[npm][]:

```sh
npm install vfile-frontmatter
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
var frontmatter = require('vfile-frontmatter')

var file = vfile.readSync('example.html')

frontmatter(file, {strip: true})

console.log(file.data)
console.log(String(file))
```

Now, running our script (`node example`) yields:

```js
{ frontmatter: { title: 'Hello, world!' } }
```

```html
<p>Some more text</p>
```

## API

### `frontmatter(file[, options])`

Parse the YAML frontmatter in a [`vfile`][vfile], and add it as
`file.data.frontmatter`.

If no frontmatter is found in the file, nothing happens, except that
`file.data.frontmatter` is set to an empty object (`{}`).

###### Parameters

*   `file` ([`VFile`][vfile])
    — Virtual file
*   `options.strip` (`boolean`, default: `false`)
    — Remove the YAML frontmatter from the file

###### Returns

The given `file`.

## Contribute

See [`contributing.md`][contributing] in [`vfile/.github`][health] for ways to
get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/vfile/vfile-frontmatter.svg

[build]: https://travis-ci.org/vfile/vfile-frontmatter

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-frontmatter.svg

[coverage]: https://codecov.io/github/vfile/vfile-frontmatter

[downloads-badge]: https://img.shields.io/npm/dm/vfile-frontmatter.svg

[downloads]: https://www.npmjs.com/package/vfile-frontmatter

[size-badge]: https://img.shields.io/bundlephobia/minzip/vfile-frontmatter.svg

[size]: https://bundlephobia.com/result?p=vfile-frontmatter

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
