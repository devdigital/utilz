import { config } from './config'
import { Nullable, Object } from '@utilz/types'

export const deepmerge = (...params: Nullable<Object>[]) => config()(...params)
