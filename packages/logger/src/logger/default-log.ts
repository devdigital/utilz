import { LogParameters } from './types.js'

const errorToParams = (error: Error) => ({
  errorName: error.name,
  errorMessage: error.message,
  stackTrace: error.stack,
})

export const defaultLog = ({
  level,
  message,
  params,
  error,
  context,
}: LogParameters) => {
  const parameters = error
    ? {
        ...(params || {}),
        ...errorToParams(error),
      }
    : params || {}

  const data = {
    level,
    timestamp: new Date().toISOString(),
    message,
    ...parameters,
    ...(context || {}),
  }

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(data))
}
