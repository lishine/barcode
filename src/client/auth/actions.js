import * as c from './constants'

export const setEmail = email => ({
	type: c.SET_EMAIL,
	payload: email,
})

export const setToken = token => ({
	type: c.SET_TOKEN,
	payload: token,
})

export const logout = token => ({ type: c.LOGOUT })
