import { isNil } from '../checks/is-nil'
import { isNumeric } from '../checks/is-numeric'
import { Nullish } from '../types'

export interface NumericResult {
  isValid: boolean
  value: Nullish<number>
}

export const toNumeric = (value?: unknown): NumericResult => {
  const invalid = {
    isValid: false,
    value: undefined,
  }

  if (isNil(value)) {
    return invalid
  }

  if (!isNumeric(value)) {
    return invalid
  }

  const result = Number(value)

  if (Number.isNaN(result)) {
    return invalid
  }

  return {
    isValid: true,
    value: result,
  }
}
