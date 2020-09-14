import { deepmerge } from '@utilz/deepmerge'
import { Configuration } from './index'
import { lorem } from './lorem'
import { configure } from './configure'
import shortid from 'shortid'

export const react = (conf: Configuration): Configuration =>
  deepmerge<Configuration>(
    {
      map: (value: unknown) => {
        const id = shortid()
        return { key: id, id, children: value }
      },
    },
    conf
  )

export const textReact = configure(react(lorem()))
