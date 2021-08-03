import { isNumber } from './is-number'

describe('isNumber', () => {
  it('returns false for undefined', () => {
    expect(isNumber()).toBe(false)
  })

  it('returns false for null', () => {
    expect(isNumber(null)).toBe(false)
  })

  it('returns true for zero', () => {
    expect(isNumber(0)).toBe(true)
  })

  it('returns false for non numeric string', () => {
    expect(isNumber('foo')).toBe(false)
  })

  it('returns false for object', () => {
    expect(isNumber({})).toBe(false)
  })

  it('returns false for false boolean', () => {
    expect(isNumber(false)).toBe(false)
  })

  it('returns false for true boolean', () => {
    expect(isNumber(true)).toBe(false)
  })

  it('returns false for numeric string', () => {
    expect(isNumber('4')).toBe(false)
  })

  it('returns true for numeric', () => {
    expect(isNumber(4)).toBe(true)
  })

  it('returns true for positive numeric', () => {
    expect(isNumber(+4)).toBe(true)
  })

  it('returns true for negative numeric', () => {
    expect(isNumber(+4)).toBe(true)
  })

  it('returns true for float numeric', () => {
    expect(isNumber(4.5)).toBe(true)
  })

  it('returns true for positive float numeric', () => {
    expect(isNumber(+4.5)).toBe(true)
  })

  it('returns true for negative float numeric', () => {
    expect(isNumber(-4.5)).toBe(true)
  })

  it('returns false for negative infinity', () => {
    expect(isNumber(-Infinity)).toBe(false)
  })

  it('returns false for infinity', () => {
    expect(isNumber(Infinity)).toBe(false)
  })
})
