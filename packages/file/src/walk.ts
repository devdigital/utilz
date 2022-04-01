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

export type WalkFilter = (itemDetails: ItemDetails) => boolean

export type WalkOptions = {
  includeDescendants: boolean
  filter: WalkFilter
}

const getName = (itemPath: string) => path.basename(itemPath)

const excludePath = (itemPath: string) =>
  through2.obj(function (item, _, next) {
    if (itemPath !== item.path) {
      this.push(item)
    }

    next()
  })

const excludeFolders = (itemPath: string) =>
  through2.obj(function (item, _, next) {
    if (item.path === itemPath || !item.stats.isDirectory()) {
      this.push(item)
    }

    next()
  })

const filterStream = (filter: WalkFilter) =>
  through2.obj(function (item, _, next) {
    if (
      filter({
        path: item.path,
        name: getName(item.path),
        stats: item.stats,
      })
    ) {
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

    const startItem = statSync(startPath)
    if (!startItem.isDirectory()) {
      throw new Error(`Start path '${startPath}' must be a folder.`)
    }

    const defaultOptions: WalkOptions = {
      includeDescendants: true,
      filter: all,
    }

    const { includeDescendants, filter = (_: ItemDetails) => true } =
      deepmerge<WalkOptions>(defaultOptions, baseOptions, options)

    return new Promise<void>((resolve, reject) => {
      klaw(startPath, {
        depthLimit: includeDescendants ? undefined : 0,
      })
        .pipe(excludePath(startPath))
        .pipe(filterStream(filter))
        .on('data', (item) => {
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
