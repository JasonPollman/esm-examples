import fetch from 'node-fetch';

import {
  join,
  extname,
  basename,
} from 'path';

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
  const url = new URL(specifier, parentModuleURL);
  const loadFromAPI = Boolean(url.searchParams.get('remote'));

  if (!loadFromAPI) {
    return builtinResolver(specifier, parentModuleURL.toString());
  }

  return {
    url: url.href,
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
  const basepath = basename(filepath, extname(filepath));

  const dest = new URL(join('api', basepath), 'https://swapi.co');
  const results = await fetch(dest).then(response => response.json());

  return {
    exports: ['default'],
    execute: (exports) => {
      exports.default.set(results);
    },
  };
}
