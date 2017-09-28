'use strict';
require('pick-precompiled').babelPolyfill()

/**
 *
 * @param {object} rootObject root level object or parent containing hierarchy
 * @param {string} fieldName property to be used when walking the hierarchy
 * @param {string} key key name to be used when creating a keyvalue pair object
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function normalizeHierarchy(rootObject, fieldName, key) {
  var result = key ? {} : [];
  var count = -1;

  if ((typeof rootObject === 'undefined' ? 'undefined' : _typeof(rootObject)) !== 'object') {
    throw new TypeError('rootObject must be an object containing ' + fieldName);
  }
  if (typeof fieldName !== 'string') throw new TypeError('fieldName must be a string value');
  if (key && typeof key !== 'string') throw new TypeError('key must be a string when specified');

  var recursive = function recursive(obj) {
    if (key) {
      result[obj[key]] = obj;
    } else {
      result[count += 1] = obj;
    }

    if (obj[fieldName] && Array.isArray(obj[fieldName])) obj[fieldName].forEach(function (o) {
      return recursive(o);
    });
  };

  if (rootObject[fieldName]) {
    rootObject[fieldName].forEach(function (o) {
      return recursive(o);
    });
  } else {
    throw new TypeError('rootObject does not contain a property ' + fieldName);
  }

  return result;
}

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

  var result = {};
  arr.forEach(function (item, index) {
    if (!item[key]) {
      throw new ReferenceError('Item at index ' + index + ' does not contain a key ' + key);
    }

    result[item[key]] = item;
  });
  return result;
}

var index = {
  normalizeArray: normalizeArray,
  normalizeHierarchy: normalizeHierarchy
};

module.exports = index;
