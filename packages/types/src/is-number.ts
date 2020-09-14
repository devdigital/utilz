export const isNumber = (value?: unknown) =>
  typeof value === 'number' &&
  value === value &&
  value !== Infinity &&
  value !== -Infinity
