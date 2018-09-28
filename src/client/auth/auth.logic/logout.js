import { spawn, fork, select, take, call, put } from 'redux-saga/effects'

import { setToken } from 'auth/auth.actions'
import { isAuth } from 'auth/auth.selectors'
import { LOGOUT } from 'auth/auth.constants'
import { gotoLogin } from 'router/router.actions'

export function* logout(token) {
	yield take(LOGOUT)
	console.log('3')
	localStorage.setItem('token', '')
	yield put(setToken())
	console.log('4')
	yield put(gotoLogin())
	// TODO Total reset
}
