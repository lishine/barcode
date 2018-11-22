import { select, take, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { toto } from 'utils/utils'
import { getToken } from 'auth/selectors'

export function* post(url, endpoint, data, options) {
	const { download } = options || {}
	const token = yield select(getToken)
	console.log('token', token)
	const { data: response, err } = yield toto(
		axios({
			method: 'post',
			url,
			data: { data, endpoint, token, download },
			headers: { token },
			timeout: 10000,
			responseType: download ? 'blob' : 'json',
		})
	)
	console.log('response', response)
	console.log('err', err)

	return { body: response && response.data, err }
}
