export const isFunction = (value?: unknown): boolean =>
  Object.prototype.toString.call(value) === '[object Function]'
