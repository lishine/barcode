import { cancelled, call, fork, select, put } from 'redux-saga/effects'
import { HALT } from 'utils/utils'

export function* profileNavigate(_, query) {
	try {
		yield call(HALT)
	} finally {
		if (yield cancelled()) {
			console.log('navigate away')
		}
	}
}
