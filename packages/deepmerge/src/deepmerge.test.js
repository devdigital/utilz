import deepmerge from './deepmerge'

describe('deepmerge', () => {
  it('returns default empty object if inputs are undefined', () => {
    expect(deepmerge()).toEqual({})
  })

  it('returns empty object if inputs are null', () => {
    expect(deepmerge(null, null)).toEqual({})
  })

  it('returns default object if inputs are undefined', () => {
    expect(deepmerge(undefined, undefined, { foo: 'bar' })).toEqual({
      foo: 'bar',
    })
  })

  it('returns default object if inputs are null', () => {
    expect(deepmerge(null, null, { foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('throws exception if input one is a string', () => {
    expect(() => deepmerge('foo', null)).toThrow(
      'Must define at least one merge object.'
    )
  })

  it('throws exception if input two is a string', () => {
    expect(() => deepmerge({}, 'foo')).toThrow(
      'Must define at least one merge object.'
    )
  })

  it('returns object one if input two is undefined', () => {
    expect(deepmerge({ foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('returns object one if input two is null', () => {
    expect(deepmerge({ foo: 'bar' }, null)).toEqual({ foo: 'bar' })
  })

  it('returns object two if input one is undefined', () => {
    expect(deepmerge(undefined, { foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('returns object two if input one is null', () => {
    expect(deepmerge(null, { foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('does perform deep merge', () => {
    expect(deepmerge({ foo: { bar: 'baz' } }, { foo: { baz: 'bar' } })).toEqual(
      {
        foo: { bar: 'baz', baz: 'bar' },
      }
    )
  })
})
