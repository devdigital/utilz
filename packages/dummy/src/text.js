import { deepmerge } from '@utilz/deepmerge'
import { LoremIpsum } from 'lorem-ipsum'
import { isNumeric } from '@utilz/types'

const arrayRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, i) => start + i)

const randomInRange = (start, end) =>
  Math.round(Math.random() * (end - start) + start)

export const fixed = number => {
  if (!number) {
    throw new Error('Fixed requires a number.')
  }

  if (!isNumeric(number)) {
    throw new Error('Fixed requires a valid number.')
  }

  return {
    number,
  }
}

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

export const words = options => deepmerge(options, { type: 'word' })

export const sentences = options =>
  deepmerge({ data: { wordsMin: 4, wordsMax: 16 } }, options, {
    type: 'sentence',
  })

export const paragraphs = options =>
  deepmerge(
    {
      data: {
        wordsMin: 4,
        wordsMax: 16,
        sentencesMin: 4,
        sentencesMax: 8,
      },
    },
    options,
    { type: 'paragraph' }
  )

export const lorem = combine => {
  const config = {
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

  return combine ? deepmerge(config, { combine }) : config
}

export const asString = (separator = ' ') => items => items.join(separator)

export const config = conf => request => {
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

const text = config(lorem())

export default text
