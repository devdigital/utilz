import path from 'path'
import { walk } from '../src/walk'
import { ext } from '../src/ext'

// TODO: mock file system
describe('walk', () => {
  it('should throw on non folder', async () => {
    expect(walk(path.resolve(__dirname, './files/1.js'), () => {})).toThrow(
      'foo'
    )
  })

  it('should return expected files and folders', async () => {
    const names: string[] = []

    await walk(path.resolve(__dirname, './files'), ({ name }) => {
      names.push(name)
    })

    expect(names).toEqual([
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
    const names: string[] = []

    await walk(
      path.resolve(__dirname, './files'),
      ({ name }) => {
        names.push(name)
      },
      {
        filter: ext('.js'),
      }
    )

    expect(names).toEqual(['1.js', '2.js', '1.js', '2.js', '1.js', '2.js'])
  })

  it('should return files only as array', async () => {
    const names: string[] = []

    await walk(
      path.resolve(__dirname, './files'),
      ({ name }) => {
        names.push(name)
      },
      { filter: ext(['.js']) }
    )

    expect(names).toEqual(['1.js', '2.js', '1.js', '2.js', '1.js', '2.js'])
  })

  it('should return files based on custom filter', async () => {
    const names: string[] = []

    await walk(
      path.resolve(__dirname, './files'),
      ({ name }) => {
        names.push(name)
      },
      { filter: async ({ name }) => name === '2.js' }
    )

    expect(names).toEqual(['2.js', '2.js', '2.js'])
  })
})
