# rollup-plugin-zipdir

[Rollup](https://rollupjs.org/) plugin to zip the entire output directory using [`fflate`](https://github.com/101arrowz/fflate/).

Designed as an alternative to [`rollup-plugin-zip`](https://github.com/mentaljam/rollup-plugin-zip). More info [here](#inspiration)

## Installation

```cmd
# pnpm
pnpm add rollup-plugin-zipdir -D

# yarn
yarn add rollup-plugin-zipdir -D

# npm
npm i rollup-plugin-zipdir -D
```

## Usage

```js
// rollup.config.js
import zipDir from 'rollup-plugin-zipdir';

export default {
	input: 'src/index.js',
	output: {
		dir: 'build',
		format: 'esm',
	},
	plugins: [
		// zipDir should be the last plugin
		zipDir({
			outputDir: 'dist',
		}),
	],
};
```

## Inspiration

Designed as an alternative to [`rollup-plugin-zip`](https://github.com/mentaljam/rollup-plugin-zip). Main differences:

-   Uses [`fflate`](https://github.com/101arrowz/fflate/) instead of [`yazl`](https://github.com/thejoshwolfe/yazl)
-   Reads files from the output directory itself (on disk), rather than the [Rollup-provided assets](https://rollupjs.org/guide/en/#generatebundle)
-   Operates as late as possible in the Rollup [output generation phase](https://rollupjs.org/guide/en/#output-generation-hooks)
