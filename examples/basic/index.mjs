/**
 * Demonstrates the ESM `import` syntax.
 * This file imports the default export (`foo`) from `./foo.mjs`
 * and the named exports `bar`, `x`, `y`, and `z`.
 * It also imports the entire module object using the `import *` syntax.
 * @since 8/16/18
 */

import foo from './foo.mjs';
import * as everything from './foo.mjs';

import {
  x,
  y,
  z,
  bar,
} from './foo.mjs';

const { log } = console;

log('Default export (foo):');
log(foo());
log('---');

log('bar:');
log(bar);
log('---');

log('x:');
log(x);
log('---');

log('y:');
log(y);
log('---');

log('z:');
log(z);
log('---');

log('everything:');
log(everything);
log('---');

log('\nfoo === everything.default: %s', foo === everything.default);
