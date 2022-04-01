import path from 'path'
import fs, { statSync } from 'fs-extra'
import { isNil } from '@utilz/types'
import { deepmerge } from '@utilz/deepmerge'
import klaw from 'klaw'
import through2 from 'through2'
import { all } from './all'

export interface ItemDetails {
  path: string
  name: string
  stats: fs.Stats
}

export interface WalkOptions {
  includeDescendants: true
  filter: (itemDetails: ItemDetails) => Promise<boolean>
}

const excludeSelf = (itemPath: string) =>
  through2.obj(function (item, _, next) {
    if (!itemPath === item.path) {
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

    const defaultOptions = {
      includeDescendants: true,
      filter: all,
    }

    const { includeDescendants, filter = (_: ItemDetails) => true } = deepmerge(
      defaultOptions,
      baseOptions,
      options
    )

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
      klaw(startPath, { filter: mainFilter })
        .pipe(excludeSelf(startPath))
        .on('data', (item) =>
          callback({
            path: item.path,
            name: getName(item.path),
            stats: item.stats,
          })
        )
        .on('end', () => {
          resolve()
        })
        .on('error', (err: Error) => {
          reject(err)
        })
    })
  }

export const walk = configureWalk()
