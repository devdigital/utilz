import { isNil, isObject, isArray, isString } from '@utilz/types'
import { setProps } from '@utilz/object'

export const tokenizer = (tokens, options = {}) => (obj) => {
  if (isNil(tokens)) {
    throw new Error('No tokens specified.')
  }

  if (!isObject(tokens)) {
    throw new Error('Tokens expected to be an object.')
  }

  if (isNil(obj)) {
    throw new Error('No object specified.')
  }

  if (!isObject(obj)) {
    throw new Error('Object expected to be an object.')
  }

  const startMarker = options.startMarker || '<'
  const endMarker = options.endMarker || '>'

  const tokensWithMarkers = Object.keys(tokens).reduce((tks, key) => {
    tks[`${startMarker}${key}${endMarker}`] = tokens[key]
    return tks
  }, {})

  const replaceStringTokens = (value) => {
    const regex = new RegExp(`${startMarker}\\w+${endMarker}`, 'g')
    return value.replace(regex, (v) => {
      return tokensWithMarkers[v] || v
    })
  }

  const replaceTokens = (value) => {
    if (isNil(value)) {
      return value
    }

    if (isArray(value)) {
      return value.map((v) => replaceTokens(v))
    }

    if (isObject(value)) {
      return setProps(({ value }) => replaceTokens(value))(value)
    }

    if (isString(value)) {
      return replaceStringTokens(value)
    }

    return value
  }

  return setProps(({ value }) => replaceTokens(value))(obj)
}
