import { cancelled, call, fork, select, put } from 'redux-saga/effects'
import { HALT } from 'utils/utils'
import * as links from 'login/constants/links'
import * as forms from 'login/constants/forms'
import { gotoHome } from 'router/actions'
import { isAuth } from 'auth/selectors'
import { submit } from './submit'
import { registerConfirm } from './registerConfirm'
import { loginStore } from 'login/store'
import { dispatch } from 'store/configureStore'

export function* profileNavigate(_, query) {
	try {
		yield call(HALT)
	} finally {
		if (yield cancelled()) {
			console.log('navigate away')
		}
	}
}
