import { filterProps } from './filter-props'

describe('filterProps', () => {
  it('returns all props given a inclusive predicate', () => {
    expect(filterProps(() => true)({ foo: 'bar' })).toEqual({ foo: 'bar' })
  })

  it('returns filtered props given filtering predicate', () => {
    expect(
      filterProps((prop: any) => prop === 'bar')({ foo: 'bar', baz: 'foo' })
    ).toEqual({ foo: 'bar' })
  })

  it('returns filtered nested props given filtering predicate', () => {
    expect(
      filterProps((prop: any) => prop === 'bar')({
        foo: 'bar',
        baz: { bar: { foo: 'bar', baz: 'foo' } },
      })
    ).toEqual({
      foo: 'bar',
      baz: { bar: { foo: 'bar' } },
    })
  })

  it('does not modify object', () => {
    const value = {
      foo: 'bar',
      baz: 'foo',
    }

    filterProps((prop: any) => prop === 'bar')(value)
    expect(value).toEqual({ foo: 'bar', baz: 'foo' })
  })
})
