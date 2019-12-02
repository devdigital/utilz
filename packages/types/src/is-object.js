const isObject = v => Object.prototype.toString.call(v) === '[object Object]'

module.exports = isObject
