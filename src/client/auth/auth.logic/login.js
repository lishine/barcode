import { spawn, select, put } from 'redux-saga/effects'

import { setToken } from 'auth/auth.actions'
import { isAuth } from 'auth/auth.selectors'
import { logout } from './logout'

export function* login(token) {
	if (yield select(isAuth)) {
		return true
	} else {
		if (!token) {
			token = localStorage.getItem('token')
		}
	}

	if (!token) {
		return false
	}

	console.log('1')
	yield put(setToken(token))
	localStorage.setItem('token', token)
	console.log('2')
	// send logged in
	yield spawn(logout)
	return true
}
