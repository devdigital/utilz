import { isNil, isArray } from '@utilz/types'
import { ItemDetails } from './walk'

function isStringArray(extension: string[] | string): extension is string[] {
  return isArray(extension)
}

export const ext =
  (extension: string[] | string) =>
  ({ name }: ItemDetails): boolean => {
    if (isNil(extension)) {
      throw new Error(`No extensions specified.`)
    }

    const exts = isStringArray(extension) ? extension : [extension]
    return !!name && exts.some((e) => name.endsWith(e))
  }
