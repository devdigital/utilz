import text, {
  words,
  sentences,
  paragraphs,
  lorem,
  asString,
  fixed,
} from './text'
import { isString } from '@utilz/types'

describe('text', () => {
  it('should generate expected number of words', () => {
    const number = 5
    const generator = text(lorem())
    expect(generator(words(fixed(number))).length).toBe(number)
  })

  it('should generate expected number of sentences', () => {
    const number = 5
    const generator = text(lorem())
    expect(generator(sentences(fixed(number))).length).toBe(number)
  })

  it('should generate expected number of paragraphs', () => {
    const number = 5
    const generator = text(lorem())
    expect(generator(paragraphs(fixed(number))).length).toBe(number)
  })

  it('should join generated content as a string', () => {
    const number = 3
    const generator = text(lorem(asString()))
    const result = generator(words(fixed(number)))
    expect(isString(result)).toBeTruthy()
  })
})
