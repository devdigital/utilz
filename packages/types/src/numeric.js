import { isNil } from './is-nil'
import { isNumeric } from './is-numeric'

export const numeric = (value) => {
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

  if (isNaN(result)) {
    return invalid
  }

  return {
    isValid: true,
    value: result,
  }
}
