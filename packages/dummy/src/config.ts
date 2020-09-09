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

const supportFixedOrRange = (options: Partial<Request>) => (
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

  return deepmerge(options, { number })
}

export const words: (
  start: number,
  end?: number
) => Request = supportFixedOrRange({ type: 'word' })

const isStart = (val: number | Object): val is number => {
  return isNumber(val)
}

type StartOrOptions = number | RequestOptions

// type Foo = ((start: number, end?: number) => Request) | Request

function supportOptionalOptions(
  type: LoremType,
  defaultOptions: RequestOptions
): (start: number, end?: number) => Request
function supportOptionalOptions(
  type: LoremType,
  defaultOptions: RequestOptions
): (requestOptions: RequestOptions) => (start: number, end?: number) => Request
function supportOptionalOptions(
  type: LoremType,
  defaultOptions: RequestOptions
) {
  return function (startOrOptions: StartOrOptions, end?: number) {
    if (isStart(startOrOptions)) {
      return supportFixedOrRange({ type, options: defaultOptions })(
        startOrOptions,
        end
      )
    }

    return supportFixedOrRange({
      type,
      options: deepmerge<RequestOptions>(defaultOptions, startOrOptions),
    })
  }
}

// return {
//   type: 'word',
//   number: 1,
//   options: { wordsMin: 4, wordsMax: 10 },
// }

export function sentences(startOrOptions: StartOrOptions, end?: number): (start: number, end?: number) => Request 
export function sentences(requestOptions: RequestOptions): (start: number, end?: number) => Request
export function sentences(startOrOptions: StartOrOptions, end?: number) {
  return supportOptionalOptions('sentence', {
    wordsMin: 4,
    wordsMax: 16
  })
}

export const paragraphs = supportOptionalOptions('paragraph', {
  wordsMin: 4,
  wordsMax: 16,
  sentencesMin: 4,
  sentencesMax: 8,
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
