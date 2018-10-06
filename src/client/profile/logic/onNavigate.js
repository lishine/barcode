import { cancelled, call, fork, select, put } from 'redux-saga/effects'
import { HALT } from 'utils/utils'
import { submit } from 'profile/logic/submit'
import { profileStore } from 'profile/profileStore'
import { post } from 'logic/post'

export function* profileNavigate(_, query) {
	console.log('profile navigate')

	const { values, saveValues, setLoading } = profileStore
	if (true) {
		const { body, err } = yield call(post, '/api/all', 'loadProfile')

		if (body) {
			const { data: values = {} } = body
			saveValues(values)
		} else {
			console.dir(err)
			saveValues({})
		}
	}
	setLoading(false)

	yield fork(submit)
	try {
		yield call(HALT)
	} finally {
		if (yield cancelled()) {
			console.log('navigate away')
		}
	}
}
