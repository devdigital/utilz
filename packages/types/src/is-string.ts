export const isString = (value?: unknown): boolean =>
  Object.prototype.toString.call(value) === '[object String]'
