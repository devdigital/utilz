import { deepmerge } from '@utilz/deepmerge'
import { Configuration } from './index'
import { lorem } from './lorem'
import { config } from './config'
import shortid from 'shortid'

export const react = (conf: Configuration): Configuration => {
  const foo: Configuration = deepmerge<Configuration>(
    {
      map: (value: unknown) => {
        const id = shortid()
        return { key: id, id, children: value }
      },
    },
    conf
  )

  return foo
}

export const textReact = config(react(lorem()))
