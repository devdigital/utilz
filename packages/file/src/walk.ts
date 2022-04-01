import path from 'path'
import fs, { statSync } from 'fs-extra'
import { isNil } from '@utilz/types'
import { deepmerge } from '@utilz/deepmerge'
import klaw from 'klaw'
import through2 from 'through2'
import { all } from './all'

export type ItemDetails = {
  path: string
  name: string
  stats: fs.Stats
}

export type WalkOptions = {
  includeDescendants: boolean
  includeFolders: boolean
  includeSelf: boolean
  filter: (itemDetails: ItemDetails) => boolean
}

const excludeSelf = (itemPath: string) =>
  through2.obj(function (item, _, next) {
    if (itemPath !== item.path) {
      this.push(item)
    }

    next()
  })

const excludeFolders = through2.obj(function (item, _, next) {
  if (!item.stats.isDirectory()) {
    this.push(item)
  }

  next()
})

export const configureWalk =
  (baseOptions?: Partial<WalkOptions>) =>
  async (
    startPath: string,
    callback: (itemDetails: ItemDetails) => void,
    options?: Partial<WalkOptions>
  ) => {
    if (isNil(startPath)) {
      throw new Error(`No path specified.`)
    }

    if (isNil(callback)) {
      throw new Error(`No callback specified`)
    }

    const defaultOptions: WalkOptions = {
      includeDescendants: true,
      includeFolders: true,
      includeSelf: false,
      filter: all,
    }

    const {
      includeDescendants,
      includeFolders,
      includeSelf,
      filter = (_: ItemDetails) => true,
    } = deepmerge(defaultOptions, baseOptions, options)

    console.log({ includeDescendants, includeFolders, includeSelf })

    const getName = (itemPath: string) => path.basename(itemPath)

    const mainFilter = (itemPath: string) => {
      const stats = statSync(itemPath)

      if (!includeDescendants) {
        if (stats.isDirectory()) {
          return false
        }
      }

      return filter({
        path: itemPath,
        name: getName(itemPath),
        stats,
      })
    }

    return new Promise<void>((resolve, reject) => {
      let pipeline = klaw(startPath, { filter: mainFilter })

      if (!includeSelf) {
        pipeline = pipeline.pipe(excludeSelf(startPath))
      }

      if (!includeFolders) {
        pipeline = pipeline.pipe(excludeFolders)
      }

      pipeline
        .on('data', (item) => {
          console.log(item.path)
          callback({
            path: item.path,
            name: getName(item.path),
            stats: item.stats,
          })
        })
        .on('end', () => {
          resolve()
        })
        .on('error', (err: Error) => {
          reject(err)
        })
    })
  }

export const walk = configureWalk()
