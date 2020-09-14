import chalk from 'chalk'
import util from 'util'
import { deepmerge } from '@utilz/deepmerge'
import { isNil, isFunction, isObject } from '@utilz/types'
import { LogLevel } from '../logger'
import { LogParameters } from '../logger/default-log'

const isEmptyObject = (obj: Object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object

const isPopulatedObject = (obj: Object) => isObject(obj) && !isEmptyObject(obj)

export const defaultColorMap = {
  [LogLevel.TRACE]: '#4d4d4d',
  [LogLevel.DEBUG]: '#636363',
  [LogLevel.WARN]: '#fff200',
  [LogLevel.ERROR]: '#ff2414',
}

export interface ConsoleFormatOptions {
  applicationName: string
  timestamp: (date: Date) => string
}

export const consoleFormat = (options: Partial<ConsoleFormatOptions> = {}) => ({
  level,
  message,
  params,
  error,
}: LogParameters) => {
  const { applicationName, timestamp } = options

  const parts = [
    timestamp ? `${timestamp(new Date())}:` : undefined,
    applicationName ? `${applicationName}:` : undefined,
    level ? `${level}:` : undefined,
    message,
    isPopulatedObject(params) ? util.format('%j', params) : undefined,
    error && error.toString(),
  ].filter((v) => v)

  return parts.join(' ')
}

export const consoleLog = (options = {}) => ({
  level,
  message,
  params,
  error,
}: LogParameters) => {
  const defaultOptions = {
    write: (message: string) => console.log(message),
    format: consoleFormat(),
    colors: defaultColorMap,
  }

  const { write, format, colors } = deepmerge(defaultOptions, options)

  if (isNil(write) || !isFunction(write)) {
    throw new Error('No write function provided.')
  }

  if (isNil(format) || !isFunction(format)) {
    throw new Error('No format function provided.')
  }

  if (isNil(colors) || !isObject(colors)) {
    throw new Error('No colors map provided.')
  }

  const msg = format({ level, message, params, error })

  if (Object.prototype.hasOwnProperty.call(colors, level)) {
    write(chalk.hex(colors[level])(msg))
    return
  }

  write(msg)
}

export const shortTime = (date: Date) =>
  date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
