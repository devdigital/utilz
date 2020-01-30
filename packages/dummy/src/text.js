import { deepmerge } from '@utilz/deepmerge'
import { LoremIpsum } from 'lorem-ipsum'
import { isNumeric, isObject } from '@utilz/types'

const arrayRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, i) => start + i)

const randomInRange = (start, end) =>
  Math.round(Math.random() * (end - start) + start)

export const range = (start, end) => {
  if (!start) {
    throw new Error('Range requires a start number.')
  }

  if (!isNumeric(start)) {
    throw new Error('Range requires a valid start number.')
  }

  if (!end) {
    throw new Error('Range requires an end number.')
  }

  if (!isNumeric(end)) {
    throw new Error('Range requires a valid end number.')
  }

  if (start < 1) {
    throw new Error('Range start must be one or greater.')
  }

  if (end < start) {
    throw new Error('Range end must be equal or greater than start.')
  }

  return {
    number: randomInRange(start, end),
  }
}

const supportFixedOrRange = options => (start, end) => {
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

export const words = supportFixedOrRange({ type: 'word' })

const supportOptionalOptions = (type, defaultOptions) => (
  startOrOptions,
  end
) => {
  if (isObject(startOrOptions)) {
    return supportFixedOrRange({
      type,
      data: deepmerge(defaultOptions, startOrOptions),
    })
  }

  return supportFixedOrRange({ type, data: defaultOptions })(
    startOrOptions,
    end
  )
}

export const sentences = supportOptionalOptions('sentence', {
  wordsMin: 4,
  wordsMax: 16,
})

export const paragraphs = supportOptionalOptions('paragraph', {
  wordsMin: 4,
  wordsMax: 16,
  sentencesMin: 4,
  sentencesMax: 8,
})

export const lorem = () => {
  return {
    word: () => new LoremIpsum().generateWords(1),
    sentence: ({ data }) =>
      new LoremIpsum({
        wordsPerSentence: {
          min: data.wordsMin,
          max: data.wordsMax,
        },
      }).generateSentences(1),
    paragraph: ({ data }) =>
      new LoremIpsum({
        wordsPerSentence: {
          min: data.wordsMin,
          max: data.wordsMax,
        },
        sentencesPerParagraph: {
          min: data.sentencesMin,
          max: data.sentencesMax,
        },
      }).generateParagraphs(1),
    combine: items => items,
  }
}

export const asString = (separator = ' ') => config => {
  return deepmerge(config, { combine: items => items.join(separator) })
}

export const config = conf => request => {
  if (!conf) {
    throw new Error('Configuration expected.')
  }

  if (!request) {
    throw new Error('Request expected.')
  }

  const { type, number, data } = request
  const { word, sentence, paragraph, combine } = conf

  const funcs = {
    word,
    sentence,
    paragraph,
  }

  if (!funcs.hasOwnProperty(type)) {
    throw new Error(`Unknown request type '${type}'.`)
  }

  const items = arrayRange(1, number).map(i => funcs[type]({ index: i, data }))
  return combine(items)
}

export const text = config(lorem())
