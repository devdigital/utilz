import { configure } from './configure'
import { Nullable } from '@utilz/types'

export const deepmerge = <T extends Object>(...params: Nullable<Object>[]): T =>
  configure()(...params)
