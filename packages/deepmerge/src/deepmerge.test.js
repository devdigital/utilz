import deepmerge from './deepmerge'

describe('deepmerge', () => {
  it('returns default empty object if inputs are undefined', () => {
    expect(deepmerge()).toEqual({})
  })
})
