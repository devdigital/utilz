import { nullifyProps } from './nullify-props'

describe('nullifyProps', () => {
  it('returns {} for empty object', () => {
    expect(nullifyProps({})).toEqual({})
  })

  it('returns null properties for object', () => {
    const value = {
      foo: 'bar',
      baz: {
        bar: 'foo',
      },
    }

    expect(nullifyProps(value)).toEqual({
      foo: null,
      baz: {
        bar: null,
      },
    })
  })

  it('does not modify the object', () => {
    const value = {
      foo: 'bar',
    }

    nullifyProps(value)
    expect(value).toEqual({
      foo: 'bar',
    })
  })
})
