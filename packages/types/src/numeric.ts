import { isNil } from './is-nil'
import { isNumeric } from './is-numeric'
import { Nullable } from './index'

export interface NumericResult {
  isValid: boolean
  value: Nullable<number>
}

export const numeric = (value?: unknown): NumericResult => {
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
