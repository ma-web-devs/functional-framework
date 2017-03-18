import curry from 'ramda/src/curry';
import set from 'ramda/src/set';
import lens from 'ramda/src/lens';
import lensPath from 'ramda/src/lensPath';
import view from 'ramda/src/view';
import map from 'ramda/src/map';
import when from 'ramda/src/when';
import is from 'ramda/src/is';


/**
 * Deep Freeze an Object
 *
 * @param obj
 * @returns {Object}
 */
export function freezer(obj) {
  map(when(is(Object), freezer))(obj)
  return Object.freeze(obj);
}

/**
 *  A replacement for Object.assign
 *  updateAt('path', 'to', 'update')(value, state);
 *  (works on nested objects and arrays)
 */
export function updateAt(...pathParts) {
  return function(value, obj) {
    return set(lensPath(pathParts), value, obj);
  }
}

