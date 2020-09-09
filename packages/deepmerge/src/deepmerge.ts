import { config } from './config'
import { Nullable, Object } from '@utilz/types'

export const deepmerge = <T extends Object>(...params: Nullable<Object>[]): T =>
  config()(...params)
