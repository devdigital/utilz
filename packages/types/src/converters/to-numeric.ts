import { isNil } from '../checks/is-nil'
import { isNumeric } from '../checks/is-numeric'

export type InvalidNumeric = {
  isValid: false
  value: undefined
}

export type ValidNumeric = {
  isValid: true
  value: number
}

export type NumericResult = InvalidNumeric | ValidNumeric

export const toNumeric = (value?: unknown): NumericResult => {
  const invalid: InvalidNumeric = {
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
