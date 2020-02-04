import { isNumeric } from './is-numeric'

describe('isNumeric', () => {
  it('returns false for undefined', () => {
    expect(isNumeric()).toBe(false)
  })

  it('returns false for null', () => {
    expect(isNumeric(null)).toBe(false)
  })

  it('returns true for zero', () => {
    expect(isNumeric(0)).toBe(true)
  })

  it('returns false for non numeric string', () => {
    expect(isNumeric('foo')).toBe(false)
  })

  it('returns false for object', () => {
    expect(isNumeric({})).toBe(false)
  })

  it('returns false for false boolean', () => {
    expect(isNumeric(false)).toBe(false)
  })

  it('returns false for true boolean', () => {
    expect(isNumeric(true)).toBe(false)
  })

  it('returns true for numeric string', () => {
    expect(isNumeric('4')).toBe(true)
  })

  it('returns true for positive numeric string', () => {
    expect(isNumeric('+4')).toBe(true)
  })

  it('returns true for negative numeric string', () => {
    expect(isNumeric('-4')).toBe(true)
  })

  it('returns true for float numeric string', () => {
    expect(isNumeric('4.5')).toBe(true)
  })

  it('returns true for positive float numeric string', () => {
    expect(isNumeric('+4.5')).toBe(true)
  })

  it('returns true for negative float numeric string', () => {
    expect(isNumeric('-4.5')).toBe(true)
  })

  it('returns true for numeric', () => {
    expect(isNumeric(4)).toBe(true)
  })

  it('returns true for positive numeric', () => {
    expect(isNumeric(+4)).toBe(true)
  })

  it('returns true for negative numeric', () => {
    expect(isNumeric(+4)).toBe(true)
  })

  it('returns true for float numeric', () => {
    expect(isNumeric(4.5)).toBe(true)
  })

  it('returns true for positive float numeric', () => {
    expect(isNumeric(+4.5)).toBe(true)
  })

  it('returns true for negative float numeric', () => {
    expect(isNumeric(-4.5)).toBe(true)
  })

  it('returns true for numeric string with whitespace', () => {
    expect(isNumeric('  4  ')).toBe(true)
  })
})
