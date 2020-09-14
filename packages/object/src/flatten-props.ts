import { isNil, isObject, IndexableObject, Nullable } from '@utilz/types'

export interface PathValue {
  path: string
  value: any
}

// takes nested object and flattens to paths
// { foo: { bar: 'value' }} => [ path: 'foo.bar', value: 'value' ]
export const flattenProps = (
  obj: IndexableObject<any>,
  path?: Nullable<string>,
  result: PathValue[] = []
) => {
  if (isNil(obj)) {
    throw new Error('No object specified.')
  }

  if (!isObject(obj)) {
    throw new Error('Value is not a valid object.')
  }

  Object.keys(obj).forEach((p) => {
    if (isObject(obj[p])) {
      flattenProps(obj[p], path ? `${path}.${p}` : p, result)
      return
    }

    result.push({
      path: path ? `${path}.${p}` : p,
      value: obj[p],
    })
  })

  return result
}
