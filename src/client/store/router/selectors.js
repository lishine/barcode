import routesMap from './routesMap'

export const page = state => state.location.type

export const payload = state => state.location.payload

export const domain = state => routesMap[state.location.type].domain
