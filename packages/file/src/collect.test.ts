import path from 'path'
import { collect } from './collect'
import { ext } from './ext'

// TODO: mock file system
describe('collect', () => {
  it('should return expected files and folders', async () => {
    const items = await collect(path.resolve(__dirname, './test'))
    expect(items.map(({ name }) => name)).toEqual([
      '1.js',
      '2.js',
      '1.js',
      '2.js',
      '1.js',
      '2.js',
      '4',
      '3',
    ])
  })

  it('should return files only', async () => {
    const items = await collect(path.resolve(__dirname, './test'), {
      filter: ext('.js'),
    })

    expect(items.map(({ name }) => name)).toEqual([
      '1.js',
      '2.js',
      '1.js',
      '2.js',
      '1.js',
      '2.js',
    ])
  })

  it('should return files only as array', async () => {
    const items = await collect(path.resolve(__dirname, './test'), {
      filter: ext(['.js']),
    })

    expect(items.map(({ name }) => name)).toEqual([
      '1.js',
      '2.js',
      '1.js',
      '2.js',
      '1.js',
      '2.js',
    ])
  })

  it('should return files based on custom filter', async () => {
    const items = await collect(path.resolve(__dirname, './test'), {
      filter: async ({ name }) => name === '2.js',
    })

    expect(items.map(({ name }) => name)).toEqual(['2.js', '2.js', '2.js'])
  })
})
