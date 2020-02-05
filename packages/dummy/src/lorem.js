import { LoremIpsum } from 'lorem-ipsum'

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
