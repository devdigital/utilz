import { loremIpsum } from 'lorem-ipsum'
import { Configuration, RequestOptions } from './config'

export const lorem = (): Configuration => {
  return {
    word: () => loremIpsum({ units: 'word', count: 1 }),
    sentence: ({ options }: { options: RequestOptions }) =>
      loremIpsum({
        units: 'sentence',
        count: 1,
        sentenceLowerBound: options.wordsMin,
        sentenceUpperBound: options.wordsMax,
      }),
    paragraph: ({ options }: { options: RequestOptions }) =>
      loremIpsum({
        units: 'paragraph',
        count: 1,
        sentenceLowerBound: options.wordsMin,
        sentenceUpperBound: options.wordsMax,
        paragraphLowerBound: options.sentencesMin,
        paragraphUpperBound: options.sentencesMax,
      }),
    combine: (items: string[]) => items,
  }
}
