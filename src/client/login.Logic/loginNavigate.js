import { fork, select, take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { navigate } from 'redux-saga-first-router'

import * as c from 'login.Model/constants'
import * as a from 'login.Model/actions'
import * as routes from 'router/routes'
import { isAuth } from 'auth.Model/selectors'
import { watchSubmit } from 'watchSubmit'
import { watchSetFromikProps } from 'watchSetFromikProps'

export function* loginNavigate() {
	if (yield select(isAuth)) {
		yield put(navigate(routes.HOME, {}, { replace: true }))
	}
	// email confirm
	// new password

	yield fork(watchSetFromikProps)
	yield fork(watchSubmit)

	yield takeLatest(c.GOTO_FORM, function*({ payload: form }) {
		when(form)
			.is(c.forms.SIGN_UP, () => {})
			.is(c.forms.SIGN_IN, () => {})
			.is(c.forms.NEW_PASSWORD, () => {})
			.is(c.forms.FORGOT_PASSWORD, () => {})
			.else(() => {})()
	})
}

// when(form)
// .is(c.forms.SIGN_UP, () => {})
// .is(c.forms.SIGN_IN, () => {})
// .is(c.forms.NEW_PASSWORD, () => {})
// .is(c.forms.FORGOT_PASSWORD, () => {})
// .else(() => {
//     navigate(r.HOME, {}, { replace: true })
// })()
