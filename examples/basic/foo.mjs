import bar from './bar.mjs';

// Export the default export
export default function () {
  return 'Default function evaluated!';
}

// Exports can be any value.
const x = { value: 'value' };
const y = 'hello world!';
const z = undefined;

export {
  x,
  y,
  z,
  bar,
};
