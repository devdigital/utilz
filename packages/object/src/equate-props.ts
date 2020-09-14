import { allProps } from './all-props'

export const equateProps = (value?: unknown) =>
  allProps((p: any) => p === value)
