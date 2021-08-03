import { isObject, Nullish } from '@utilz/types'
import deepmergelib from 'deepmerge'

export const configure =
  (conf?: object) =>
  <T extends object>(...params: Nullish<object>[]): T => {
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
    ) as T
  }
