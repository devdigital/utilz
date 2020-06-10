import path from 'path'
import fs from 'fs-extra'
import { isNil } from '@utilz/types'
import { deepmerge } from '@utilz/deepmerge'
import { all } from './all'

const { readdir, stat } = fs

export const configureWalk = (baseOptions) => async (
  startPath,
  callback,
  options
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
