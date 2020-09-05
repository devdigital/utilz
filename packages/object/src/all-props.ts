import { filter, isEmpty } from 'ramda'
import { isObject, Predicate, IndexableObject } from '@utilz/types'

export const allProps = (predicate: Predicate<IndexableObject>) => (
  obj: IndexableObject
): boolean => {
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
