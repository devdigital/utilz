import { flattenProps } from './flatten-props'
import { IndexableObject } from '@utilz/types'

describe('flattenProps', () => {
  it('throws an exception given undefinied', () => {
    expect(flattenProps).toThrow('No object specified.')
  })

  it('returns empty array given empty object', () => {
    expect(flattenProps({})).toEqual([])
  })

  it('returns flattened props given prop', () => {
    expect(flattenProps({ foo: 'bar', baz: 'foo' })).toEqual([
      { path: 'foo', value: 'bar' },
      { path: 'baz', value: 'foo' },
    ])
  })

  it('returns flattened nested props', () => {
    expect(
      flattenProps({ foo: 'bar', baz: { bar: { foo: 'baz' }, foo: 'bar' } })
    ).toEqual([
      { path: 'foo', value: 'bar' },
      { path: 'baz.bar.foo', value: 'baz' },
      { path: 'baz.foo', value: 'bar' },
    ])
  })

  it('does not modify object', () => {
    const value = {
      foo: 'bar',
    }

    flattenProps(value)
    expect(value).toEqual({
      foo: 'bar',
    })
  })
})
