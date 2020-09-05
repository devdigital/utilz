import { isNil, isObject, isFunction, IndexableObject } from '@utilz/types'

export const setProps = (valueOrFunc?: any) => (obj: IndexableObject) => {
  const func = isFunction(valueOrFunc) ? valueOrFunc : () => valueOrFunc

  if (isNil(obj)) {
    throw new Error('No object specified.')
  }

  if (!isObject(obj)) {
    throw new Error('Value is not a valid object.')
  }

  return Object.keys(obj).reduce((result: IndexableObject, key) => {
    if (isObject(obj[key])) {
      result[key] = setProps(valueOrFunc)(obj[key])
      return result
    }

    result[key] = func({ key, value: obj[key] })
    return result
  }, {})
}
