export const isBoolean = (value?: unknown): boolean =>
  Object.prototype.toString.call(value) === '[object Boolean]'
