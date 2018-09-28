import { take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { setToken } from 'auth/auth.actions'
import * as c from 'auth/auth.constants'
import { gotoSignIn } from 'router/router.actions'

export function* login(token) {
	if (!token) {
		token = localStorage.getItem('token')
	}
	if (!token) {
		return
	}

	console.log('1')
	yield put(setToken(token))
	localStorage.setItem('token', token)
	console.log('2')

	yield take(c.LOGOUT)
	console.log('3')
	localStorage.setItem('token', '')
	yield put(setToken())
	console.log('4')
	yield put(goToSignIn())
}
