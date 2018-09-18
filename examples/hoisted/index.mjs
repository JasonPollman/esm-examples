/**
 * Demonstrates how `import` statements have a "hoisting"
 * like behavior. Since they are linked prior to code
 * execution, we know that importing will occur
 * before any other code execution. Therefore, while bad form,
 * the following code below will run successfully, but perhaps
 * not in the manner the developer expected.
 * @since 8/16/18
 */

console.log('This is the first thing my program will print!');

console.log(foo());

console.log('I just executed foo!');

import foo from './foo.mjs';
