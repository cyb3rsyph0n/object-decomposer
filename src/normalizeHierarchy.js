/**
 *
 * @param {object} rootObject root level object or parent containing hierarchy
 * @param {string} fieldName property to be used when walking the hierarchy
 * @param {string} key key name to be used when creating a keyvalue pair object
 */
function normalizeHierarchy(rootObject, fieldName, key) {
  const result = key ? {} : [];
  let count = -1;

  if (typeof rootObject !== 'object') { throw new TypeError(`rootObject must be an object containing ${fieldName}`); }
  if (typeof fieldName !== 'string') throw new TypeError('fieldName must be a string value');
  if (key && typeof key !== 'string') throw new TypeError('key must be a string when specified');

  const recursive = (obj) => {
    if (key) {
      result[obj[key]] = obj;
    } else {
      result[(count += 1)] = obj;
    }

    if (obj[fieldName]) obj[fieldName].forEach(o => recursive(o));
  };

  if (rootObject[fieldName]) {
    rootObject[fieldName].forEach(o => recursive(o));
  } else {
    throw new TypeError(`rootObject does not contain a property ${fieldName}`);
  }

  return result;
}

module.exports = normalizeHierarchy;
