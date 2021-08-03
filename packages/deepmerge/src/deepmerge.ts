import { configure } from './configure'
import { Nullish } from '@utilz/types'

export const deepmerge = <T extends Record<string, unknown>>(
  ...params: Nullish<Record<string, unknown>>[]
): T => configure()(...params)
