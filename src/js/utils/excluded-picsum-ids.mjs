/**
 * Generates a random integer within a specified range, excluding a set of specified ID's that have shown not to exist or give errors.
 *
 * @param {number[]} excludedIds - An array of integers that should be excluded from the generated result.
 * @returns {number} A random integer between 200 and 500 (inclusive) that is not included in the `excludedIds` array.
 */
export function getRandomId(excludedIds) {
  let randomId;
  do {
    randomId = Math.floor(Math.random() * (500 - 200 + 1) + 200);
  } while (excludedIds.includes(randomId));
  return randomId;
}
