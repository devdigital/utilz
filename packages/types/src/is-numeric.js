export const isNumeric = value => {
  if (!value) {
    return false
  }

  return !isNaN(parseFloat(value)) && isFinite(value)
}
