/**
 * Capitalize a string.
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export function isUndefined (value) {
  return typeof value === 'undefined' || value === undefined;
}