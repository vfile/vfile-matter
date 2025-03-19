# vfile-matter

[![Build][badge-build-image]][badge-build-url]
[![Coverage][badge-coverage-image]][badge-coverage-url]
[![Downloads][badge-downloads-image]][badge-downloads-url]
[![Size][badge-size-image]][badge-size-url]

[vfile][github-vfile] utility parse YAML front matter.

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`matter(file[, options])`](#matterfile-options)
  * [`Options`](#options)
  * [`YamlOptions`](#yamloptions)
* [Types](#types)
* [Compatibility](#compatibility)
* [Contribute](#contribute)
* [License](#license)

## What is this?

This package parses YAML frontmatter,
when found in a file,
and exposes it as `file.data.matter`.
It can optionally strip the frontmatter,
which is useful for languages that do not understand frontmatter,
but stripping can make it harder to deal with languages that *do* understand it,
such as markdown,
because it messes up positional info of warnings and errors.

## When should I use this?

Frontmatter is a metadata format in front of content.
It’s typically written in YAML and is often used with markdown.
This mechanism works well when you want authors,
that have some markup experience,
to configure where or how the content is displayed or supply metadata about
content.

When using vfiles with markdown,
you are likely also using [remark][github-remark],
in which case you should use [`remark-frontmatter`][github-remark-frontmatter],
instead of
stripping frontmatter.

## Install

This package is [ESM only][github-gist-esm].
In Node.js (version 16+),
install with [npm][npmjs-install]:

```sh
npm install vfile-matter
```

In Deno with [`esm.sh`][esmsh]:

```js
import {matter} from 'https://esm.sh/vfile-matter@5'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {matter} from 'https://esm.sh/vfile-matter@5?bundle'
</script>
```

## Use

Say our document `example.html` contains:

```html
---
layout: solar-system
---
<h1>Jupiter</h1>
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
{ matter: { layout: 'solar-system' } }
```

```html
<h1>Jupiter</h1>
```

## API

This package exports the identifier [`matter`][api-matter].
It exports the [TypeScript][] types
[`Options`][api-options] and
[`YamlOptions`][api-yaml-options].
There is no default export.

### `matter(file[, options])`

Parse the YAML front matter in a file and expose it as `file.data.matter`.

If no matter is found in the file,
nothing happens,
except that `file.data.matter` is set to an empty object (`{}`).

If the file value is an `Uint8Array`,
assumes it is encoded in UTF-8.

###### Parameters

* `file`
  ([`VFile`][github-vfile])
  — virtual file
* `options`
  ([`Options`][api-options], default: `{}`)
  — configuration

###### Returns

Nothing (`undefined`).

### `Options`

Configuration (TypeScript type).

###### Fields

* `strip`
  (`boolean`, default: `false`)
  — remove the YAML front matter from the file
* `yaml`
  ([`YamlOptions`][api-yaml-options], default: `{}`)
  — configuration for the YAML parser,
  passed to [`yaml`][github-yaml] as `x` in `yaml.parse('', x)`

### `YamlOptions`

Options for the YAML parser (TypeScript type).

Equivalent to the combination of
[`DocumentOptions`](https://eemeli.org/yaml/#document-options),
[`ParseOptions`](https://eemeli.org/yaml/#parse-options),
[`SchemaOptions`](https://eemeli.org/yaml/#schema-options),
and
[`ToJsOptions`](https://eemeli.org/yaml/#tojs-options).

###### Type

```ts
type YamlOptions = DocumentOptions &
  ParseOptions &
  SchemaOptions &
  ToJsOptions
```

## Types

To type `file.data.matter` with [TypeScript][],
you can augment `DataMap` from `vfile` as follows:

```ts
declare module 'vfile' {
  interface DataMap {
    matter: {
      // `file.data.matter.string` is typed as `string | undefined`.
      title?: string | undefined
    }
  }
}

// You may not need this,
// but it makes sure the file is a module.
export {}
```

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release,
we drop support for unmaintained versions of Node.
This means we try to keep the current release line,
`vfile-matter@5`,
compatible with Node.js 16.

## Contribute

See [`contributing.md`][health-contributing] in [`vfile/.github`][health]
for ways to get started.
See [`support.md`][health-support] for ways to get help.

This project has a [code of conduct][health-coc].
By interacting with this repository,
organization,
or community you agree to abide by its terms.

## License

[MIT][file-license] © [Titus Wormer][wooorm]

<!-- Definitions -->

[api-matter]: #matterfile-options

[api-options]: #options

[api-yaml-options]: #yamloptions

[badge-build-image]: https://github.com/vfile/vfile-matter/workflows/main/badge.svg

[badge-build-url]: https://github.com/vfile/vfile-matter/actions

[badge-coverage-image]: https://img.shields.io/codecov/c/github/vfile/vfile-matter.svg

[badge-coverage-url]: https://codecov.io/github/vfile/vfile-matter

[badge-downloads-image]: https://img.shields.io/npm/dm/vfile-matter.svg

[badge-downloads-url]: https://www.npmjs.com/package/vfile-matter

[badge-size-image]: https://img.shields.io/bundlejs/size/vfile-matter

[badge-size-url]: https://bundlejs.com/?q=vfile-matter

[esmsh]: https://esm.sh

[file-license]: license

[github-gist-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[github-remark]: https://github.com/remarkjs/remark

[github-remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter

[github-vfile]: https://github.com/vfile/vfile

[github-yaml]: https://github.com/eemeli/yaml

[health]: https://github.com/vfile/.github

[health-coc]: https://github.com/vfile/.github/blob/main/code-of-conduct.md

[health-contributing]: https://github.com/vfile/.github/blob/main/contributing.md

[health-support]: https://github.com/vfile/.github/blob/main/support.md

[npmjs-install]: https://docs.npmjs.com/cli/install

[typescript]: https://www.typescriptlang.org

[wooorm]: https://wooorm.com
