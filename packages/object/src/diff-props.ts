import { isEmpty } from 'ramda'
import { isNil, isObject, IndexableObject } from '@utilz/types'

// return all properties in obj2, not in obj1
export const diffProps = (obj1: IndexableObject) => (obj2: IndexableObject) => {
  if (isNil(obj1)) {
    throw new Error('No first object specified.')
  }

  if (!isObject(obj1)) {
    throw new Error('First value is not a valid object.')
  }

  if (isNil(obj2)) {
    throw new Error('No second object specified.')
  }

  if (!isObject(obj2)) {
    throw new Error('Second value is not a valid object.')
  }

  return Object.keys(obj2).reduce((properties: IndexableObject, p) => {
    // Object 1 does not have property
    if (!obj1.hasOwnProperty(p)) {
      properties[p] = obj2[p]
      return properties
    }

    // Object 1 does have property,
    // if both properties are objects then recurse
    if (isObject(obj1[p]) && isObject(obj2[p])) {
      const diff = diffProps(obj1[p])(obj2[p])
      if (!isEmpty(diff)) {
        properties[p] = diff
      }
    }

    return properties
  }, {})
}
