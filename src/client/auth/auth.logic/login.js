import { take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as a from 'auth/auth.actions'
import * as c from 'auth/auth.constants'
import * as routerActions from 'router/router.actions'

export function* login() {
	yield takeLatest(c.LOGIN, function*({ payload }) {
		console.log('0here')
		let token = payload.data
		if (!token) {
			token = localStorage.getItem('token')
		}
		if (!token) {
			return
		}
		console.log('1')
		yield put(a.setToken(token))
		localStorage.setItem('token', token)
		console.log('2')
		yield take(c.LOGOUT)
		console.log('3')
		localStorage.setItem('token', '')
		yield put(a.setToken())
		console.log('4')
		yield put(routerActions.redirectToSignInForm())
	})
}
