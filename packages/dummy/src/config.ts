import { deepmerge } from '@utilz/deepmerge'
import { isNumber, isNumeric } from '@utilz/types'

export interface RequestOptions {
  wordsMin: number
  wordsMax?: number
  sentencesMin?: number
  sentencesMax?: number
}

export interface LoremFuncParameters {
  index: number
  options: RequestOptions
}

export interface Configuration {
  word: (params: LoremFuncParameters) => string
  sentence: (params: LoremFuncParameters) => string
  paragraph: (params: LoremFuncParameters) => string
  combine: (items: string[]) => string[]
  map?: (item: string) => string
}

export type LoremType = 'word' | 'sentence' | 'paragraph'

export interface Request {
  type: LoremType
  number: number
  options: RequestOptions
}

const arrayRange = (start: number, end: number): number[] =>
  Array(end - start + 1)
    .fill(undefined)
    .map((_, i) => start + i)

const randomInRange = (start: number, end: number): number =>
  Math.round(Math.random() * (end - start) + start)

const supportFixedOrRange = (baseRequest: Partial<Request>) => (
  start: number,
  end?: number
): Request => {
  let number = start

  if (!isNumeric(start)) {
    throw new Error('Invalid number.')
  }

  if (end) {
    if (!isNumeric(end)) {
      throw new Error('Invalid number.')
    }

    if (end < start) {
      throw new Error('End range must be equal or greater to start range.')
    }

    number = randomInRange(start, end)
  }

  return deepmerge(baseRequest, { number })
}

export const configureBase = (
  type: LoremType,
  baseOptions: Partial<RequestOptions>
) => (options: Partial<RequestOptions>) =>
  supportFixedOrRange({
    type,
    options: deepmerge<RequestOptions>(baseOptions, options),
  })

export const configureSentences = configureBase('sentence', {
  wordsMin: 4,
  wordsMax: 16,
})

export const configureParagraphs = configureBase('paragraph', {
  wordsMin: 4,
  wordsMax: 16,
  sentencesMin: 4,
  sentencesMax: 8,
})

export const words = supportFixedOrRange({ type: 'word' })

export const sentences = supportFixedOrRange({
  type: 'sentence',
  options: {
    wordsMin: 4,
    wordsMax: 16,
  },
})

export const paragraphs = supportFixedOrRange({
  type: 'paragraph',
  options: {
    wordsMin: 4,
    wordsMax: 16,
    sentencesMin: 4,
    sentencesMax: 8,
  },
})

export const asString = (separator = ' ') => (
  config: Configuration
): Configuration => {
  return deepmerge(config, {
    combine: (items: Object[]) => items.join(separator),
  })
}

export const config = (conf: Configuration) => (request: Request) => {
  if (!conf) {
    throw new Error('Configuration expected.')
  }

  if (!request) {
    throw new Error('Request expected.')
  }

  const { type, number, options } = request
  const { word, sentence, paragraph, combine, map } = conf

  const funcs = {
    word,
    sentence,
    paragraph,
  }

  if (!funcs.hasOwnProperty(type)) {
    throw new Error(`Unknown request type '${type}'.`)
  }

  const items = arrayRange(1, number).map((i) =>
    funcs[type]({ index: i, options })
  )

  const values = combine ? combine(items) : items
  return map ? values.map(map) : values
}
