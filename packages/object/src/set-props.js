import { isNil, isObject, isFunction } from '@utilz/types'

export const setProps = (valueOrFunc) => (obj, result = {}) => {
  const func = isFunction(valueOrFunc) ? valueOrFunc : () => valueOrFunc

  if (isNil(obj)) {
    throw new Error('No object specified.')
  }

  if (!isObject(obj)) {
    throw new Error('Value is not a valid object.')
  }

  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      result[key] = setProps(valueOrFunc)(obj[key], result[key])
      return
    }

    result[key] = func(key)
  })

  return result
}
