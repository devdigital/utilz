import { configure } from './configure'
import { Nullish } from '@utilz/types'

export const deepmerge = <T extends object>(...params: Nullish<object>[]): T =>
  configure()(...params)
