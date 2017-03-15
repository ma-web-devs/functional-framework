import curry from 'ramda/src/curry';
import set from 'ramda/src/set';
import lens from 'ramda/src/lens';
import lensPath from 'ramda/src/lensPath';
import view from 'ramda/src/view';

export const assign = curry((obj1, obj2) => Object.assign({}, obj1, obj2));

export const isObject = (obj) => obj && typeof obj === "object";
