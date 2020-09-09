import { configureWalk, WalkOptions, ItemDetails } from './walk'

export const configureCollect = (baseOptions?: Partial<WalkOptions>) => async (
  startPath: string,
  options?: Partial<WalkOptions>
) => {
  const items: ItemDetails[] = []

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
