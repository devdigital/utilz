import { isObject } from '@utilz/types'

export const merge = (obj1, obj2, defaultObj = {}) => {
  if (!obj1 && !obj2) {
    return defaultObj
  }

  if (isObject(obj1) && !obj2) {
    return obj1
  }

  if (!obj1 && isObject(obj2)) {
    return obj2
  }

  if (!isObject(obj1) || !isObject(obj2)) {
    throw new Error('Must define at least one merge object.')
  }

  return Object.assign({}, obj1, obj2)
}
