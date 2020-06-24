import isEmpty from 'ramda/src/isEmpty'
import { isObject, isFunction } from '@utilz/types'

export const filterProps = (predicate) => (obj) => {
  if (!predicate) {
    throw new Error('No predicate specified.')
  }

  if (!isFunction(predicate)) {
    throw new Error('Predicate is not a function.')
  }

  if (!obj) {
    throw new Error('No object specified.')
  }

  return Object.keys(obj).reduce((result, p) => {
    if (isObject(obj[p])) {
      const filter = filterProps(predicate)(obj[p], result[p])
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