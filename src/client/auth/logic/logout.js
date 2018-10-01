import { spawn, fork, select, take, call, put } from 'redux-saga/effects'

import { setToken } from '../actions'
import { LOGOUT } from '../constants'
import { gotoLogin } from 'router/actions'
import { dispatch } from 'store/configureStore'

export function* logout(token) {
	yield take(LOGOUT)
	localStorage.setItem('token', '')
	dispatch(setToken())
	dispatch(gotoLogin())
	// TODO Total reset
}
