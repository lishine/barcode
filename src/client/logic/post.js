import { select, take, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { toto } from 'utils/utils'
import { getToken } from 'auth/selectors'

export function* post(url, endpoint, data) {
	const token = yield select(getToken)
	console.log('token', token)
	const { data: response, err } = yield toto(
		axios({
			method: 'post',
			url,
			data: Object.assign({}, data, { endpoint, token }),
			headers: { token },
			timeout: 10000,
		})
	)
	console.log('response', response)
	console.log('err', err)

	return { response, err }
}
