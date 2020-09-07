import { isObject, Object, Nullable } from '@utilz/types'
import deepmergelib from 'deepmerge'

export const config = (conf?: Object) => (...params: Nullable<Object>[]) => {
  const isValid = (val: unknown) =>
    val === undefined || val === null || isObject(val)

  if (params.some((p) => !isValid(p))) {
    throw new Error(
      'All merge parameters are expected to be objects, null, or undefined.'
    )
  }

  return deepmergelib.all(
    params.map((p) => p || {}),
    conf
  )
}
