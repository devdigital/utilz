import { loremIpsum } from 'lorem-ipsum'

export const lorem = () => {
  return {
    word: () => loremIpsum({ unit: 'word', count: 1 }),
    sentence: ({ data }) =>
      loremIpsum({
        unit: 'sentence',
        count: 1,
        sentenceLowerBound: data.wordsMin,
        sentenceUpperBound: data.wordsMax,
      }),
    paragraph: ({ data }) =>
      loremIpsum({
        unit: 'paragraph',
        count: 1,
        sentenceLowerBound: data.wordsMin,
        sentenceUpperBound: data.wordsMax,
        paragraphLowerBound: data.sentencesMin,
        paragraphUpperBound: data.sentencesMax,
      }),
    combine: (items) => items,
  }
}
