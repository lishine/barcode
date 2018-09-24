import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from './actions'
import * as routes from 'store/constants/routes'

export default function*() {
	yield takeLatest(actions.submit(), function*() {
		try {
			const response = yield call(axios.post(`/auth/${apiRoute}`, apiValues))
		} catch (err) {
			throw err
		}
	})
}
