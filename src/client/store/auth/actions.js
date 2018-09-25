import * as c from './constants'

export const setEmail = email => ({
	type: c.SET_EMAIL,
	payload: { data: email },
})

export const setToken = token => ({
	type: c.SET_TOKEN,
	payload: { data: token },
})
