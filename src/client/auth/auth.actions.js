import * as c from './auth.constants'

export const setEmail = email => ({
	type: c.SET_EMAIL,
	payload: { data: email },
})

export const setToken = token => ({
	type: c.SET_TOKEN,
	payload: { data: token },
})

export const login = token => ({
	type: c.LOGIN,
	payload: { data: token },
})

export const logout = token => { 
    console.log('logout')
    return ({
	type: c.LOGOUT,
	payload: {},
})}
