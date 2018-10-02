import { spawn, select, put } from 'redux-saga/effects'

import { setToken } from '../actions'
import { isAuth } from '../selectors'
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

	yield put(setToken(token))
	localStorage.setItem('token', token)
	yield spawn(logout)
	return true
}
