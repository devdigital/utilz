import path from 'path'
import fs from 'fs-extra'
import { isNil } from '@utilz/types'
import { deepmerge } from '@utilz/deepmerge'

const { readdir, stat } = fs

export const all = () => true

export const configureWalk = (options) => (predicate = all) => async (
  startPath,
  callback
) => {
  if (isNil(startPath)) {
    throw new Error(`No path specified.`)
  }

  if (isNil(callback)) {
    throw new Error(`No callback specified`)
  }

  const defaultOptions = {
    descendants: true,
  }

  const { descendants } = deepmerge(defaultOptions, options)

  const items = await readdir(startPath)
  for await (const item of items) {
    const itemPath = path.resolve(startPath, item)
    const itemStats = await stat(itemPath)

    if (itemStats.isDirectory() && descendants) {
      await configureWalk(options)(predicate)(itemPath, callback)
    }

    const itemDetails = {
      path: itemPath,
      name: item,
      stats: itemStats,
    }

    if (await predicate(itemDetails)) {
      await callback(itemDetails)
    }
  }
}

export const walk = configureWalk()
