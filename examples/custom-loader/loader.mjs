import { readFile } from 'fs';
import { extname } from 'path';
import { promisify } from 'util';

import YAML from 'js-yaml';
import TOML from 'toml';

const freadAsync = promisify(readFile);

/**
 * Reads and parses the file at sourcepath as YAML.
 * @param sourcepath The sourcepath to read as YAML.
 * @returns {Object} The parsed YAML.
 */
async function YAMLLoader(sourcepath) {
  const contents = await freadAsync(sourcepath);
  return YAML.load(contents);
}

/**
 * Reads and parses the file at sourcepath as TOML.
 * @param sourcepath The sourcepath to read as TOML.
 * @returns {Object} The parsed TOML.
 */
async function TOMLLoader(sourcepath) {
  const contents = await freadAsync(sourcepath);
  return TOML.parse(contents);
}

const LOADERS = {
  '.yml': YAMLLoader,
  '.yaml': YAMLLoader,
  '.toml': TOMLLoader,
};

/**
 * If this is the `main` module, parentModuleURL will be
 * undefined, so set the URL basepath to the current module.
 */
const baseURL = new URL('file://');
baseURL.pathname = process.cwd().concat('/');

/**
 * Resolves the current module's url and determine it's "import format".
 * In this case, it's "dynamic", so the `dynamicInstantiate` method
 * will be called during the loading (fetching) phase.
 * @param specifier The URL "specifier" of the current module.
 * @param parentModuleURL The parent module's URL href.
 * @param builtinResolver The built-in node resolver.
 * @returns {Object} An object with the module's url path and it's loader format.
 * @export
 */
export function resolve(specifier, parentModuleURL = baseURL, builtinResolver) {
  const extension = extname(specifier);

  if (!LOADERS[extension]) {
    return builtinResolver(specifier, parentModuleURL.toString());
  }

  return {
    url: new URL(specifier, parentModuleURL).href,
    format: 'dynamic',
  };
}

/**
 * If a module is resolved and it's `format` property is `dynamic`,
 * this method will be called to load the module and define its exports.
 * @param {string} url The url of the module to instantiate.
 * @returns {Object} And object that defined this modules exports and sets them
 * when the `execute` hook is called for the module.
 * @export
 */
export async function dynamicInstantiate(url) {
  const filepath = new URL(url).pathname;

  const extension = extname(filepath);
  const contents = await LOADERS[extension](filepath);

  return {
    exports: ['default'],
    execute: (exports) => {
      exports.default.set(contents);
    },
  };
}
