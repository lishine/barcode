import { cancelled, call, fork, select, put } from 'redux-saga/effects'
import { HALT } from 'utils/utils'
import { submit } from 'profile/logic/submit'

export function* profileNavigate(_, query) {
	console.log('profile navigate')
	yield fork(submit)
	try {
		yield call(HALT)
	} finally {
		if (yield cancelled()) {
			console.log('navigate away')
		}
	}
}
