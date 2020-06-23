import filter from 'ramda/src/filter'
import isEmpty from 'ramda/src/isEmpty'
import { isObject } from '@utilz/types'

export const allProps = (predicate) => (obj) => {
  if (!predicate) {
    throw new Error('No predicate specified.')
  }

  if (!obj) {
    throw new Error('No object specified.')
  }

  const propertiesNotMatchingPredicate = filter(
    (p) => (isObject(p) ? !allProps(predicate)(p) : !predicate(p)),
    obj
  )

  return isEmpty(propertiesNotMatchingPredicate)
}
