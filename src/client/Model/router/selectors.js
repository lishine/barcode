import routesMap from './routesMap'

export const getAlert = state => state.location.payload.alert

export const getPage = state => state.location.type

export const getPayload = state => state.location.payload
export const getTokenFromUrl = state => state.location.payload.token

export const getDomain = state => routesMap[state.location.type].domain
