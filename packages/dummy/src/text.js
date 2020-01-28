import deepmerge from '@utilz/deepmerge'
import { LoremIpsum } from 'lorem-ipsum'
import { isNumeric } from '@utilz/types'

const range = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, i) => start + i)

// TODO: these helpers should take a param that can either be a number or object
// if number, then thats the exact amount, if object then get start and end etc.
export const words = numberOrOptions => {
  if (isNumeric(numberOrOptions)) {
    return {
      type: 'word',
      number: numberOrOptions,
    }
  }

  // TODO: if end specified, validate, then generate random value between range (inclusive)
  // TODO: add @utilz/random package with e.g. number, range etc. functions
  throw new Error('options not yet supported')
}

export const sentences = numberOrOptions => {
  if (isNumeric(numberOrOptions)) {
    return {
      type: 'sentence',
      number: numberOrOptions,
      data: {
        wordsMin: 4,
        wordsMax: 16,
      },
    }
  }

  throw new Error('options not yet supported')
}

export const paragraphs = numberOrOptions => {
  if (isNumeric(numberOrOptions)) {
    return {
      type: 'paragraph',
      number: numberOrOptions,
      data: {
        wordsMin: 4,
        wordsMax: 16,
        sentencesMin: 4,
        sentencesMax: 8,
      },
    }
  }
}

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

  console.log(combine)
  return combine ? deepmerge(config, { combine }) : config
}

export const asString = (separator = ' ') => items => items.join(separator)

const text = config => request => {
  const { type, number, data } = request
  const { word, sentence, paragraph, combine } = config

  const funcs = {
    word,
    sentence,
    paragraph,
  }

  if (!funcs.hasOwnProperty(type)) {
    throw new Error(`Unknown request type '${type}'.`)
  }

  const items = range(1, number).map(i => funcs[type]({ index: i, data }))
  return combine(items)
}

export default text
