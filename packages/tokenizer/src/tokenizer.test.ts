import { tokenizer } from './tokenizer'

describe('tokenizer', () => {
  it('should return expected string', () => {
    const obj = {
      foo: '<token>-bar',
      bar: 'foo-<token>',
    }

    const tokens = {
      token: 'baz',
    }

    expect(tokenizer(tokens)(obj)).toEqual({
      foo: 'baz-bar',
      bar: 'foo-baz',
    })
  })

  it('should return expected strings array values', () => {
    const obj = {
      foo: [4, '<token>foo'],
    }

    const tokens = {
      token: 'baz',
    }

    expect(tokenizer(tokens)(obj)).toEqual({
      foo: [4, 'bazfoo'],
    })
  })

  it('should return expected strings for nested objects', () => {
    const obj = {
      foo: {
        bar: '<token>-foo',
      },
    }

    const tokens = {
      token: 'baz',
    }

    expect(tokenizer(tokens)(obj)).toEqual({
      foo: {
        bar: 'baz-foo',
      },
    })
  })

  it('should return expected strings for array of objects', () => {
    const obj = {
      foo: {
        bar: [{ baz: '<token>' }],
      },
    }

    const tokens = {
      token: 'baz',
    }

    expect(tokenizer(tokens)(obj)).toEqual({
      foo: {
        bar: [{ baz: 'baz' }],
      },
    })
  })
})
