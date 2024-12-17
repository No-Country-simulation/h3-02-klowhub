/* eslint-disable @typescript-eslint/no-explicit-any */

export const equalsObj = (first: any, second: any): boolean => {
  const bothAreNull = !first || !second;
  if (bothAreNull) {
    return false;
  }

  const noneIsAnObject = typeof first !== 'object' || typeof second !== 'object';
  if (noneIsAnObject) {
    return false;
  }

  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);

  const propertyAreNotSame = firstKeys.length !== secondKeys.length;
  if (propertyAreNotSame) return false;

  for (const key of firstKeys) {
    if (!equalsValues(first[key], second[key])) {
      return false;
    }
  }

  return true;
};

export const equalsValues = (first: any, second: any) => {
  return first === second;
};

export const isShallowEqual = <T extends Record<string, any>, K extends readonly unknown[]>(
  objA: T,
  objB: T,
  comparators?:
    | { [key in keyof T]?: (a: T[key], b: T[key]) => boolean }
    | (keyof T extends K[number]
        ? K extends readonly (keyof T)[]
          ? K
          : {
              _error: 'keys are either missing or include keys not in compared obj';
            }
        : {
            _error: 'keys are either missing or include keys not in compared obj';
          }),
  debug = false
) => {
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  if (aKeys.length !== bKeys.length) {
    if (debug) {
      console.warn(
        `%cisShallowEqual: objects don't have same properties ->`,
        'color: #8B4000',
        objA,
        objB
      );
    }
    return false;
  }

  if (comparators && Array.isArray(comparators)) {
    for (const key of comparators) {
      const ret =
        objA[key as keyof typeof objA] === objB[key as keyof typeof objB] ||
        defaultIsShallowComparatorFallback(
          objA[key as keyof typeof objA],
          objB[key as keyof typeof objB]
        );
      if (!ret) {
        if (debug) {
          console.warn(
            `%cisShallowEqual: ${key} not equal ->`,
            'color: #8B4000',
            objA[key as keyof typeof objA],
            objB[key as keyof typeof objB]
          );
        }
        return false;
      }
    }
    return true;
  }

  return aKeys.every(key => {
    const comparator = (comparators as { [key in keyof T]?: (a: T[key], b: T[key]) => boolean })?.[
      key as keyof T
    ];
    const ret = comparator
      ? comparator(objA[key], objB[key])
      : objA[key] === objB[key] || defaultIsShallowComparatorFallback(objA[key], objB[key]);

    if (!ret && debug) {
      console.warn(`%cisShallowEqual: ${key} not equal ->`, 'color: #8B4000', objA[key], objB[key]);
    }
    return ret;
  });
};

export const defaultIsShallowComparatorFallback = (a: any, b: any): boolean => {
  // consider two empty arrays equal
  if (Array.isArray(a) && Array.isArray(b) && a.length === 0 && b.length === 0) {
    return true;
  }
  return a === b;
};
