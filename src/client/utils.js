import { default as lodashSome } from 'lodash/fp/some'

export const some = (value, array) => lodashSome(v => v === value)(array)
