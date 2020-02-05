import { deepmerge } from '@utilz/deepmerge'
import { lorem } from './lorem'
import { config } from './config'
import shortid from 'shortid'

export const react = conf =>
  deepmerge(
    {
      map: value => {
        const id = shortid()
        return { key: id, id, children: value }
      },
    },
    conf
  )

export const textReact = config(react(lorem()))
