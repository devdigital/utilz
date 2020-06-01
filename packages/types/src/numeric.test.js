import { numeric } from './numeric'

describe('numeric', () => {
  it('returns invalid for undefined', () => {
    expect(numeric()).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for null', () => {
    expect(numeric(null)).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for boolean', () => {
    expect(numeric(false)).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for object', () => {
    expect(numeric({})).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for array', () => {
    expect(numeric([])).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for empty string', () => {
    expect(numeric('')).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for non numeric string', () => {
    expect(numeric('foo')).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns invalid for whitespace string', () => {
    expect(numeric('   ')).toEqual({
      isValid: false,
      value: undefined,
    })
  })

  it('returns expected value for integer string', () => {
    expect(numeric('100')).toEqual({
      isValid: true,
      value: 100,
    })
  })

  it('returns expected value for float string', () => {
    expect(numeric('10.5')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })

  it('returns expected value for prefixed space', () => {
    expect(numeric(' 10.5')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })

  it('returns expected value for postfixed space', () => {
    expect(numeric('10.5  ')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })

  it('returns expected value for space', () => {
    expect(numeric('  10.5  ')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })

  it('returns expected value for space', () => {
    expect(numeric('  10.5  ')).toEqual({
      isValid: true,
      value: 10.5,
    })
  })
})
