import { isEmpty } from 'ramda'
import { isObject, isFunction, Predicate, IndexableObject } from '@utilz/types'

export const filterProps = (predicate: Predicate<IndexableObject>) => (
  obj: IndexableObject
) => {
  if (!predicate) {
    throw new Error('No predicate specified.')
  }

  if (!isFunction(predicate)) {
    throw new Error('Predicate is not a function.')
  }

  if (!obj) {
    throw new Error('No object specified.')
  }

  return Object.keys(obj).reduce((result: IndexableObject, p) => {
    if (isObject(obj[p])) {
      // const filter = filterProps(predicate)(obj[p], result[p])
      const filter = filterProps(predicate)(obj[p])
      if (!isEmpty(filter)) {
        result[p] = filter
      }
      return result
    }

    if (predicate(obj[p])) {
      result[p] = obj[p]
    }

    return result
  }, {})
}
