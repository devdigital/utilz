import { isNil, isObject, isFunction } from '@utilz/types'

export const setProps = (valueOrFunc) => (obj) => {
  const func = isFunction(valueOrFunc) ? valueOrFunc : () => valueOrFunc

  if (isNil(obj)) {
    throw new Error('No object specified.')
  }

  if (!isObject(obj)) {
    throw new Error('Value is not a valid object.')
  }

  return Object.keys(obj).reduce((result, key) => {
    if (isObject(obj[key])) {
      result[key] = setProps(valueOrFunc)(obj[key], result[key])
      return result
    }

    result[key] = func(key)
    return result
  }, {})
}
