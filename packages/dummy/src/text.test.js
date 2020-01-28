import text, { words, sentences, paragraphs, lorem, asString } from './text'
import { isString } from '@utilz/types'

describe('text', () => {
  it('should generate expected number of words', () => {
    const generator = text(lorem())
    expect(generator(words(5)).length).toBe(5)
  })

  it('should generate expected number of sentences', () => {
    const generator = text(lorem())
    expect(generator(sentences(5)).length).toBe(5)
  })

  it('should generate expected number of paragraphs', () => {
    const generator = text(lorem())
    expect(generator(paragraphs(5)).length).toBe(5)
  })

  it('should join generated content as a string', () => {
    const generator = text(lorem(asString()))
    const result = generator(words(3))
    expect(isString(result)).toBeTruthy()
  })
})
