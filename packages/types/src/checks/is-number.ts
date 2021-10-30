export function isNumber(value?: unknown): value is number {
  return (
    typeof value === 'number' &&
    value === value &&
    value !== Infinity &&
    value !== -Infinity
  )
}
