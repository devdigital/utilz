import {
  text,
  words,
  sentences,
  paragraphs,
  lorem,
  asString,
  config,
} from './text'
import { isString } from '@utilz/types'

describe('text', () => {
  it('should generate expected fixed number of words', () => {
    const number = 5
    expect(text(words(number)).length).toBe(number)
  })

  it('should generate expected number of words between a range', () => {
    const numWords = text(words(1, 5)).length
    expect(numWords >= 1 && numWords <= 5).toBeTruthy()
  })

  it('should generate expected number of fixed sentences', () => {
    const number = 5
    expect(text(sentences(number)).length).toBe(number)
  })

  it('should generate expected number of sentences between a range', () => {
    const numSentences = text(sentences(1, 5)).length
    expect(numSentences >= 1 && numSentences <= 5).toBeTruthy()
  })

  it('should support sentence options', () => {
    const number = 5
    expect(text(sentences({ wordsMin: 1 })(number)).length).toBe(number)
  })

  it('should generate expected number of fixed paragraphs', () => {
    const number = 5
    expect(text(paragraphs(number)).length).toBe(number)
  })

  it('should generate expected number of paragraphs between a range', () => {
    const numParagraphs = text(paragraphs(1, 5)).length
    expect(numParagraphs >= 1 && numParagraphs <= 5).toBeTruthy()
  })

  it('should support paragraph options', () => {
    const number = 5
    expect(
      text(paragraphs({ wordsMin: 1, sentencesMax: 100 })(number)).length
    ).toBe(number)
  })

  it('should join generated content as a string', () => {
    const t = config(asString()(lorem()))
    const result = t(words(3))
    expect(isString(result)).toBeTruthy()
  })
})
