export const isNumeric = value => {
  if (value === null || value === undefined) {
    return false
  }

  return !isNaN(parseFloat(value)) && isFinite(value)
}
