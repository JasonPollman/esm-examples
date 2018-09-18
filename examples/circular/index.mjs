/**
 * Demonstrates the ability to make circular references
 * using ESMs. Since imports reference a symbol in a ModuleRecord
 * and linking/parsing is done prior to loading, circular imports
 * are possible.
 * @since 8/16/18
 */

import foo from './foo.mjs';

const header = `
 ______     __     ______     ______     __  __     __         ______     ______    
/\\  ___\\   /\\ \\   /\\  == \\   /\\  ___\\   /\\ \\/\\ \\   /\\ \\       /\\  __ \\   /\\  == \\   
\\ \\ \\____  \\ \\ \\  \\ \\  __<   \\ \\ \\____  \\ \\ \\_\\ \\  \\ \\ \\____  \\ \\  __ \\  \\ \\  __<   
 \\ \\_____\\  \\ \\_\\  \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_____\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\ \\_\\ 
  \\/_____/   \\/_/   \\/_/ /_/   \\/_____/   \\/_____/   \\/_____/   \\/_/\\/_/   \\/_/ /_/ 
                                                                                   
`;

export default function main() {
  return header;
}

console.log(foo());
