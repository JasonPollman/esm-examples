/**
 * Demonstrates the use of `import()` for dynamically
 * loading an import. Dynamic imports function more like
 * traditional CJS imports, except that they are imported
 * asynchronously and `import()` returns a Promise.
 * @since 8/16/18
 */

const { log } = console;

function importGroup(group) {
  log(`Loading ${group}...`);
  return import(`./${group}.mjs`);
}

// Select a "random" group.
const group = ['fruits', 'veggies'][Date.now() % 2];

importGroup(group).then(log).catch(log);
