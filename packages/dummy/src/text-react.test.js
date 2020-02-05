import { textReact, paragraphs } from './index'

describe('text', () => {
  it('should return id and children by default', () => {
    const paras = textReact(paragraphs(1))
    expect(paras.length).toBe(1)

    const paragraph = paras[0]
    expect(paragraph).toHaveProperty('key')
    expect(paragraph).toHaveProperty('id')
    expect(paragraph).toHaveProperty('children')
  })
})
