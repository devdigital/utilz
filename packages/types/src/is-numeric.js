import { isNil } from './is-nil'

export const isNumeric = value => {
  if (isNil(value)) {
    return false
  }

  return !isNaN(parseFloat(value)) && isFinite(value)
}
