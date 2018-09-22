import map from 'lodash/fp/map'
import { default as lodashSome } from 'lodash/fp/some'
import React from 'react'

export const some = (value, array) => lodashSome(v => v === value)(array)

export const Map = ({ collection, children }) => <>{map(children)(collection)}</>
