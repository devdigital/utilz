import { deepmerge } from '@utilz/deepmerge'
import { Nullable, IndexableObject } from '@utilz/types'
import { defaultLog } from './default-log'
import { LogLevel, LoggerOptions } from './types'

const logLevels: IndexableObject<number> = {
  [LogLevel.TRACE]: 10,
  [LogLevel.DEBUG]: 20,
  [LogLevel.INFO]: 30,
  [LogLevel.WARN]: 40,
  [LogLevel.ERROR]: 50,
}

const ensureValidLogLevel = (levelName: LogLevel) => {
  if (!logLevels[levelName]) {
    throw new Error(
      `Invalid log level '${levelName}', expected one of ${Object.keys(
        logLevels
      ).join(', ')}`
    )
  }
}

export const createLogger = (opts: LoggerOptions) => {
  const defaultLevel = LogLevel.INFO

  const defaultOptions: LoggerOptions = {
    level: defaultLevel,
    context: {},
    log: defaultLog,
  }

  const options = deepmerge<LoggerOptions>(defaultOptions, opts)
  let currentLevelName = options.level

  ensureValidLogLevel(currentLevelName!)

  const enabled = (levelName: string) => {
    const level = logLevels[levelName]
    if (!level) {
      return false
    }

    return level >= (logLevels[currentLevelName!] || defaultLevel)
  }

  const log = (
    levelName: LogLevel,
    message: string,
    params: Nullable<Error | Object>,
    error?: Nullable<Error>
  ) => {
    ensureValidLogLevel(levelName)

    if (!enabled(levelName)) {
      return
    }

    const paramsIsError = !error && params instanceof Error

    options.log({
      level: levelName,
      message,
      params: paramsIsError ? undefined : params,
      error: paramsIsError ? (params as Error) : error,
      context: options.context,
    })
  }

  return {
    log,
    trace: (message: string, params?: Object) =>
      log(LogLevel.TRACE, message, params),
    debug: (message: string, params?: Object) =>
      log(LogLevel.DEBUG, message, params),
    info: (message: string, params?: Object) =>
      log(LogLevel.INFO, message, params),
    warn: (message: string, params?: Error | Object, error?: Error) =>
      log(LogLevel.WARN, message, params, error),
    error: (message: string, params?: Error | Object, error?: Error) =>
      log(LogLevel.ERROR, message, params, error),
    setLevel: (levelName: LogLevel) => {
      ensureValidLogLevel(levelName)
      currentLevelName = levelName
    },
    getLevel: (): LogLevel => currentLevelName!,
  }
}
