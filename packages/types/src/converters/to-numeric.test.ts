import { toNumeric } from './to-numeric'

describe('numeric', () => {
  it('returns invalid for undefined', () => {
    expect(toNumeric()).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for null', () => {
    expect(toNumeric(null)).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for boolean', () => {
    expect(toNumeric(false)).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for object', () => {
    expect(toNumeric({})).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for array', () => {
    expect(toNumeric([])).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for empty string', () => {
    expect(toNumeric('')).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for non numeric string', () => {
    expect(toNumeric('foo')).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for whitespace string', () => {
    expect(toNumeric('   ')).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns expected value for zero integer string', () => {
    expect(toNumeric('0')).toEqual({
      isValid: true,
      value: 0,
    })
  })

  it('returns expected value for integer string', () => {
    expect(toNumeric('100')).toEqual({
      isValid: true,
      value: 100,
    })
  })

  it('returns expected value for float string', () => {
    expect(toNumeric('10.5')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })

  it('returns expected value for prefixed space', () => {
    expect(toNumeric(' 10.5')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })

  it('returns expected value for postfixed space', () => {
    expect(toNumeric('10.5  ')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })

  it('returns expected value for space', () => {
    expect(toNumeric('  10.5  ')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })

  it('returns expected value for space', () => {
    expect(toNumeric('  10.5  ')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })
})
