export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined';
};

export const isEmpty = (value: unknown): value is undefined => {
  return !value;
};

export const isNull = (value: unknown): value is null => value === null;

export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value);
};
