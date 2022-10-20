import { Plugin } from 'rollup';

interface ZipDirConfigOptions {
	/**
	 * Name of output zip file
	 *
	 * Default: `${npm_package_name}-${npm_package_version}.zip` || `bundle-${npm_package_version}.zip` || 'bundle.zip'
	 */
	readonly name?: string;

	/**
	 * Output directory of zip file; defaults to Rollup `output.dir`
	 */
	readonly outputDir?: string;
}

/**
 * Rollup plugin to zip the entire output directory
 */
export default function zipDir(options?: ZipDirConfigOptions): Plugin;
