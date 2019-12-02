const isFunction = v =>
  Object.prototype.toString.call(v) === '[object Function]'

module.exports = isFunction
