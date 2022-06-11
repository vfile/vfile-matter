# vfile-matter

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[vfile][] utility parse YAML front matter.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`matter(file[, options])`](#matterfile-options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package parses YAML frontmatter, when found in a file, and exposes it as
`file.data.matter`.
It can optionally strip the frontmatter, which is useful for languages that do
not understand frontmatter, but stripping can make it harder to deal with
languages that *do* understand it, such as markdown, because it messes up
positional info of warnings and errors.

## When should I use this?

Frontmatter is a metadata format in front of content.
It’s typically written in YAML and is often used with markdown.
This mechanism works well when you want authors, that have some markup
experience, to configure where or how the content is displayed or supply
metadata about content.

When using vfiles with markdown, you are likely also using [remark][], in which
case you should use [`remark-frontmatter`][remark-frontmatter], instead of
stripping frontmatter.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, 16.0+, or 18.0+), install with [npm][]:

```sh
npm install vfile-matter
```

In Deno with [`esm.sh`][esmsh]:

```js
import {matter} from 'https://esm.sh/vfile-matter@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {matter} from 'https://esm.sh/vfile-matter@4?bundle'
</script>
```

## Use

Say our document `example.html` contains:

```html
---
title: Hello, world!
---
<p>Some more text</p>
```

…and our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {matter} from 'vfile-matter'

const file = await read('example.html')

matter(file, {strip: true})

console.log(file.data)
console.log(String(file))
```

…now running `node example.js` yields:

```js
{matter: {title: 'Hello, world!'}}
```

```html
<p>Some more text</p>
```

## API

This package exports the identifier `matter`.
There is no default export.

### `matter(file[, options])`

Parse the YAML front matter in a [`vfile`][vfile], and add it as
`file.data.matter`.

If no matter is found in the file, nothing happens, except that
`file.data.matter` is set to an empty object (`{}`).

##### `options`

Configuration (optional).

###### `options.strip`

Remove the YAML front matter from the file (`boolean`, default: `false`).

###### `options.yaml`

Options for the YAML parser (default: `{}`).
These are passed to [`yaml`][yaml] as `x` in `yaml.parse('', x)`, which is
equivalent to the combination of
[`ParseOptions`](https://eemeli.org/yaml/#parse-options),
[`DocumentOptions`](https://eemeli.org/yaml/#document-options),
[`SchemaOptions`](https://eemeli.org/yaml/#schema-options), and
[`ToJsOptions`](https://eemeli.org/yaml/#tojs-options).

###### Returns

The given `file` ([`VFile`][vfile]).

## Types

This package is fully typed with [TypeScript][].
It exports the additional types `YamlOptions` and `Options`.

To type `file.data.matter`, you can augment `DataMap` from `vfile` as follows:

```ts
declare module 'vfile' {
  interface DataMap {
    matter: {
      // `file.data.matter.string` is typed as `string?`.
      title?: string
    }
  }
}
```

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

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

[build-badge]: https://github.com/vfile/vfile-matter/workflows/main/badge.svg

[build]: https://github.com/vfile/vfile-matter/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-matter.svg

[coverage]: https://codecov.io/github/vfile/vfile-matter

[downloads-badge]: https://img.shields.io/npm/dm/vfile-matter.svg

[downloads]: https://www.npmjs.com/package/vfile-matter

[size-badge]: https://img.shields.io/bundlephobia/minzip/vfile-matter.svg

[size]: https://bundlephobia.com/result?p=vfile-matter

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/vfile/vfile/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contributing]: https://github.com/vfile/.github/blob/main/contributing.md

[support]: https://github.com/vfile/.github/blob/main/support.md

[health]: https://github.com/vfile/.github

[coc]: https://github.com/vfile/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[vfile]: https://github.com/vfile/vfile

[remark]: https://github.com/remarkjs/remark

[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter

[yaml]: https://github.com/eemeli/yaml
