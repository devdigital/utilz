import { diffProps } from './diff-props'

describe('diffProps', () => {
  it('returns empty object for equivalent objects', () => {
    expect(diffProps({ foo: 'bar' })({ foo: 'bar' })).toEqual({})
  })

  it('returns empty object for second object subset of first object', () => {
    expect(diffProps({ foo: 'bar', baz: 'foo' })({ baz: 'foo' })).toEqual({})
  })

  it('returns empty object for different values of prop', () => {
    expect(diffProps({ foo: 'bar' })({ foo: 'baz' })).toEqual({})
  })

  it('returns additional props when first object is a subset of second object', () => {
    expect(diffProps({ foo: 'bar' })({ foo: 'baz', baz: 'foo' })).toEqual({
      baz: 'foo',
    })
  })

  it('returns additional nested object props when first object is a subset of second object', () => {
    expect(
      diffProps({ foo: 'bar' })({ foo: 'baz', baz: { bar: { foo: 'bar' } } })
    ).toEqual({
      baz: {
        bar: {
          foo: 'bar',
        },
      },
    })
  })

  it('returns additional nested array props when first object is a subset of second object', () => {
    expect(
      diffProps({ foo: 'bar' })({ foo: 'baz', baz: [{ bar: { foo: 'bar' } }] })
    ).toEqual({
      baz: [
        {
          bar: {
            foo: 'bar',
          },
        },
      ],
    })
  })

  it('returns no additional props when prop types differ', () => {
    expect(
      diffProps({
        name: 'foo',
        address: { street: [{ foo: 'bar' }] },
      })({ name: 'bar', address: { street: 'bar' } })
    ).toEqual({})
  })

  it('returns additional props for nested props', () => {
    expect(
      diffProps({
        name: 'foo',
        address: { street: 'bar' },
      })({ name: 'foo', address: { street: 'bar', city: 'baz' } })
    ).toEqual({
      address: { city: 'baz' },
    })
  })

  it('does not modify first object', () => {
    const value = {
      foo: 'bar',
    }

    diffProps(value)({ foo: 'bar' })
    expect(value).toEqual({ foo: 'bar' })
  })

  it('does not modify second object', () => {
    const value = {
      foo: 'bar',
    }

    diffProps({ foo: 'bar' })(value)
    expect(value).toEqual({ foo: 'bar' })
  })
})
