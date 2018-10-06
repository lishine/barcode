export const getPage = state => state.location.id
export const getLocation = state => state.location
export const getParams = state => state.location.params
export const getTokenFromUrl = state => state.location.query.token
