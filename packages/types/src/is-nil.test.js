import { isNil } from './is-nil'

describe('isNil', () => {
  it('returns true for undefined', () => {
    expect(isNil()).toBe(true)
  })

  it('returns true for null', () => {
    expect(isNil(null)).toBe(true)
  })

  it('returns false for zero', () => {
    expect(isNil(0)).toBe(false)
  })

  it('returns false for false', () => {
    expect(isNil(false)).toBe(false)
  })

  it('returns false for true', () => {
    expect(isNil(true)).toBe(false)
  })

  it('returns false for empty object', () => {
    expect(isNil({})).toBe(false)
  })

  it('returns false for object', () => {
    expect(isNil({ foo: 'bar' })).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(isNil('')).toBe(false)
  })

  it('returns false for string', () => {
    expect(isNil('foo')).toBe(false)
  })

  it('returns false for empty array', () => {
    expect(isNil([])).toBe(false)
  })

  it('returns false for array', () => {
    expect(isNil([2])).toBe(false)
  })
})
