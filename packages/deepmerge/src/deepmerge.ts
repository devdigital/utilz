import { configure } from './configure'
import { Nullish } from '@utilz/types'

export const deepmerge = <T extends Object>(...params: Nullish<Object>[]): T =>
  configure()(...params)
