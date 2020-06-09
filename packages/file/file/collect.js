import { configureWalk } from './walk'

export const configureCollect = (options) => (predicate) => async (
  startPath
) => {
  const items = []

  await configureWalk(options)(predicate)(startPath, async (itemDetails) => {
    items.push(itemDetails)
  })

  return items
}

export const collect = configureCollect()
