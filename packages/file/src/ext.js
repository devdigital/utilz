import { isNil, isArray } from '@utilz/types'

export const ext = (extension) => ({ name }) => {
  if (isNil(extension)) {
    throw new Error(`No extensions specified.`)
  }

  const exts = isArray(extension) ? extension : [extension]
  return name && exts.some((e) => name.endsWith(e))
}
