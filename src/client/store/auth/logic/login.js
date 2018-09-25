import { take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as a from '../actions'

export default function*() {
	yield takeLatest(a.setToken(), function*({ token }) {
		localStorage.setItem('token', token)
		take(a.logout())
		localStorage.setItem('token', '')
		put(a.setToken())
	})
}
