import curry from 'ramda/src/curry';



export const assign = curry((obj1, obj2) => Object.assign({}, obj1, obj2));

export const isObject = (obj) => obj && typeof obj === "object";

