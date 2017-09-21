/**
 *
 * @param {[]} arr array to map into keyvalue pair
 * @param {string} key property name to use as key
 */
function normalizeArray(arr, key) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Parameter must be an array');
  }
  if (typeof key !== 'string') {
    throw new TypeError('key parameter must be a string');
  }

  const result = {};
  arr.forEach((item, index) => {
    if (!item[key]) {
      throw new ReferenceError(`Item at index ${index} does not contain a key ${key}`);
    }

    result[item[key]] = item;
  });
  return result;
}

module.exports = normalizeArray;
