import { configureWalk } from './walk'

export const configureCollect = (baseOptions) => async (startPath, options) => {
  const items = []

  await configureWalk(baseOptions)(
    startPath,
    async (itemDetails) => {
      items.push(itemDetails)
    },
    options
  )

  return items
}

export const collect = configureCollect()
