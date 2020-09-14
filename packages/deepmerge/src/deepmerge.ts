import { config } from './config'
import { Nullable } from '@utilz/types'

export const deepmerge = <T extends Object>(...params: Nullable<Object>[]): T =>
  config()(...params)
