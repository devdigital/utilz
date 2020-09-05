import {
  isNil,
  isObject,
  isArray,
  isString,
  IndexableObject,
} from '@utilz/types'
import { setProps } from '@utilz/object'

export interface TokenizerOptions {
  startMarker: string
  endMarker: string
}

export const tokenizer = (
  tokens: IndexableObject,
  options: Partial<TokenizerOptions> = {}
) => (obj: IndexableObject) => {
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

  const tokensWithMarkers = Object.keys(tokens).reduce(
    (tks: IndexableObject, key) => {
      tks[`${startMarker}${key}${endMarker}`] = tokens[key]
      return tks
    },
    {}
  )

  const replaceStringTokens = (value: any) => {
    const regex = new RegExp(`${startMarker}\\w+${endMarker}`, 'g')
    return value.replace(regex, (v: any) => {
      return tokensWithMarkers[v] || v
    })
  }

  const replaceTokens = (value: any) => {
    if (isNil(value)) {
      return value
    }

    if (isArray(value)) {
      return value.map((v: any) => replaceTokens(v))
    }

    if (isObject(value)) {
      return setProps(({ value }: { value: any }) => replaceTokens(value))(
        value
      )
    }

    if (isString(value)) {
      return replaceStringTokens(value)
    }

    return value
  }

  return setProps(({ value }: { value: any }) => replaceTokens(value))(obj)
}
