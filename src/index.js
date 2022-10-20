import { bold, green } from 'colorette';
import { zip as zipCb } from 'fflate';
import { filesize } from 'filesize';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, relative, sep } from 'node:path';
import { promisify } from 'node:util';

/**
 * filetree-to-object method I adapted from https://stackoverflow.com/a/64092495/8396479
 * @returns {Promise<object>}
 */
async function walkDir(dir) {
	async function* tokenize(path) {
		yield { dir: path };
		for (const dirent of await readdir(path, { withFileTypes: true }))
			if (dirent.isDirectory()) yield* tokenize(join(path, dirent.name));
			else yield { file: join(path, dirent.name) };
		yield { endDir: path };
	}

	const r = [{}];
	for await (const e of tokenize(dir))
		if (e.dir) r.unshift({});
		else if (e.file) r[0][basename(e.file)] = await readFile(e.file);
		else if (e.endDir) r[1][basename(e.endDir)] = r.shift();

	return r[0][basename(dir)];
}

const parseFileName = function ({ name }) {
	if (!!name) return name.endsWith('.zip') ? name : `${name}.zip`;
	const { npm_package_name = 'bundle', npm_package_version } = process.env;
	return !!npm_package_version ? `${npm_package_name}-${npm_package_version}.zip` : `${npm_package_name}.zip`;
};

export default function zipDir(options) {
	return {
		name: 'zipDir',
		writeBundle: {
			sequential: true,
			order: 'post',
			handler: async function (_options) {
				const [output_dir, input_dir, name] = [
					options?.outputDir ?? _options?.dir ?? process.cwd(),
					_options?.dir ?? process.cwd(),
					parseFileName(options),
				];
				const data = await promisify(zipCb)(await walkDir(input_dir));

				//create dir if it does not exist
				await mkdir(`.${sep}${relative(process.cwd(), output_dir)}`, { recursive: true });
				await writeFile(`.${sep}${relative(process.cwd(), output_dir)}${sep}${name}`, data);
				console.log(green(`zipped to ${bold(`${output_dir}${sep}${name}`)} (${filesize(data.byteLength)})`));
			},
		},
	};
}
