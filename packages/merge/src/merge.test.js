const merge = require('./merge')

describe('merge', () => {
  it('returns default empty object if inputs are undefined', () => {
    expect(merge()).toEqual({})
  })

  it('returns empty object if inputs are null', () => {
    expect(merge(null, null)).toEqual({})
  })

  it('returns default object if inputs are undefined', () => {
    expect(merge(undefined, undefined, { foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('returns default object if inputs are null', () => {
    expect(merge(null, null, { foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('throws exception if input one is a string', () => {
    expect(() => merge('foo', null)).toThrow(
      'Must define at least one merge object.'
    )
  })

  it('throws exception if input two is a string', () => {
    expect(() => merge({}, 'foo')).toThrow(
      'Must define at least one merge object.'
    )
  })

  it('returns object one if input two is undefined', () => {
    expect(merge({ foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('returns object one if input two is null', () => {
    expect(merge({ foo: 'bar' }, null)).toEqual({ foo: 'bar' })
  })

  it('returns object two if input one is undefined', () => {
    expect(merge(undefined, { foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('returns object two if input one is null', () => {
    expect(merge(null, { foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('does not perform deep merge', () => {
    expect(merge({ foo: { bar: 'baz' } }, { foo: { baz: 'bar' } })).toEqual({
      foo: { baz: 'bar' },
    })
  })
})
