import { isNumber } from './is-number'
import { isNil } from './is-nil'
import { isString } from './is-string'

export function isNumeric(value?: unknown): value is number | string {
  if (isNil(value)) {
    return false
  }

  if (!isNumber(value) && !isString(value)) {
    return false
  }

  if (isNumber(value)) {
    return true
  }

  const stringValue = value as string
  const converted = parseFloat(stringValue) // Note that Number(stringValue) returns 0 for empty string

  if (Number.isNaN(converted)) {
    return false
  }

  if (!Number.isFinite(converted)) {
    return false
  }

  return true
}
