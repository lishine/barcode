import { take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as a from '../actions'

export default function*() {
	yield takeLatest(a.login(), function*({ data }) {
		let token = data
		if (!token) {
			token = localStorage.getItem('token')
		}
		if (!token) {
			return
		}

		put(a.setToken(token))
		localStorage.setItem('token', token)
		take(a.logout())
		localStorage.setItem('token', '')
		put(a.setToken())
	})
}
