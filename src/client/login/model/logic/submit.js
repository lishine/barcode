import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as a from '../actions'
import * as r from 'store/constants/routes'

export default function*() {
	yield takeLatest(a.submit(), function*() {
		try {
			const response = yield call(axios.post(`/auth/${apiRoute}`, apiValues))
		} catch (err) {
			throw err
		}
	})
}
