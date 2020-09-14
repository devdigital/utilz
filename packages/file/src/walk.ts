import path from 'path'
import fs from 'fs-extra'
import { isNil } from '@utilz/types'
import { deepmerge } from '@utilz/deepmerge'
import { all } from './all'

const { readdir, stat } = fs

export interface ItemDetails {
  path: string
  name: string
  stats: fs.Stats
}

export interface WalkOptions {
  includeDescendants: true
  filter: (itemDetails: ItemDetails) => Promise<boolean>
}

export const configureWalk = (baseOptions?: Partial<WalkOptions>) => async (
  startPath: string,
  callback: (itemDetails: ItemDetails) => Promise<void>,
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

  const { includeDescendants, filter } = deepmerge(
    defaultOptions,
    baseOptions,
    options
  )

  const items = await readdir(startPath)
  for await (const item of items) {
    const itemPath = path.resolve(startPath, item)
    const itemStats = await stat(itemPath)

    if (itemStats.isDirectory() && includeDescendants) {
      await configureWalk(options)(itemPath, callback, options)
    }

    const itemDetails = {
      path: itemPath,
      name: item,
      stats: itemStats,
    }

    if (await filter(itemDetails)) {
      await callback(itemDetails)
    }
  }
}

export const walk = configureWalk()
