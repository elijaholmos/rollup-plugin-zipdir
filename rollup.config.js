export default {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/index.cjs',
			format: 'commonjs',
			exports: 'auto',
		},
		{
			file: 'dist/index.mjs',
			format: 'module',
			exports: 'auto',
		},
	],
	external: ['colorette', 'fflate', 'filesize', 'node:fs/promises', 'node:path', 'node:util'],
};
