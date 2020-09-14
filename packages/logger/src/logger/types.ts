import { Nullable } from '@utilz/types'

export enum LogLevel {
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface LogParameters {
  level: LogLevel
  message: string
  params: Nullable<Object>
  error: Nullable<Error>
  context: Nullable<Object>
}

export interface LoggerOptions {
  level?: LogLevel
  context?: Object
  log: (parameters: LogParameters) => void
}
