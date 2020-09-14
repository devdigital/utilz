import { deepmerge } from '@utilz/deepmerge'
import { defaultLog } from './default-log'
import { LogLevel } from './log-level'
import { IndexableObject } from '@utilz/types'

const logLevels: IndexableObject<number> = {
  [LogLevel.TRACE]: 10,
  [LogLevel.DEBUG]: 20,
  [LogLevel.INFO]: 30,
  [LogLevel.WARN]: 40,
  [LogLevel.ERROR]: 50,
}

const ensureValidLogLevel = (levelName: string) => {
  if (!logLevels[levelName]) {
    throw new Error(
      `Invalid log level '${levelName}', expected one of ${Object.keys(
        logLevels
      ).join(', ')}`
    )
  }
}

export interface LogParameters {
  level: string
  message: string
  params: Object
  error: Error
}

export interface LoggerOptions {
  level?: LogLevel
  context?: Object
  log?: (parameters: LogParameters) => void
}

export const createLogger = (opts: LoggerOptions) => {
  const defaultLevel = LogLevel.INFO

  const defaultOptions = {
    level: defaultLevel,
    context: {},
    log: defaultLog,
  }

  const options = deepmerge(defaultOptions, opts)
  let currentLevelName = options.level

  ensureValidLogLevel(currentLevelName)

  const enabled = (levelName: string) => {
    const level = logLevels[levelName]
    if (!level) {
      return false
    }

    return level >= (logLevels[currentLevelName] || defaultLevel)
  }

  const log = (
    levelName: string,
    message: string,
    params: unknown,
    error?: unknown
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
      error: paramsIsError ? params : error,
      context: options.context,
    })
  }

  return {
    log,
    trace: (message: string, params?: unknown) =>
      log(LogLevel.TRACE, message, params),
    debug: (message: string, params?: unknown) =>
      log(LogLevel.DEBUG, message, params),
    info: (message: string, params?: unknown) =>
      log(LogLevel.INFO, message, params),
    warn: (message: string, params?: unknown, error?: unknown) =>
      log(LogLevel.WARN, message, params, error),
    error: (message: string, params?: unknown, error?: unknown) =>
      log(LogLevel.ERROR, message, params, error),
    setLevel: (levelName: string) => {
      ensureValidLogLevel(levelName)
      currentLevelName = levelName
    },
    getLevel: (): string => currentLevelName,
  }
}
