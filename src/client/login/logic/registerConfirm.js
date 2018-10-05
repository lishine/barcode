import { call, put, fork } from 'redux-saga/effects'

import * as forms from 'login/constants/forms'
import { gotoHome } from 'router/actions'
import { login } from 'auth/logic/login'
import { post } from 'logic/post'
import { loginStore } from 'login/store'
import { dispatch } from 'store/configureStore'
import { alerts } from 'login/view/form/data'

export function* registerConfirm(confirmToken) {
	const { response, err } = yield call(post, '/auth/all', 'RegisterConfirm', {
		token: confirmToken,
	})
	if (response) {
		const { data } = response
		const { token } = data

		yield fork(login, token)
		loginStore.setAlert(alerts.RegisterConfirm.emailConfirmed)
	} else {
		console.dir(err)
		const { data = {}, status } = err.response
		const { error, code } = data

		const errorMessage = when(status)
			.is(504, 'Timeout')
			.is(400, error)
			.else('Something went wrong')
		loginStore.setAlert(alerts.RegisterConfirm.errorConfirming, { errorMessage })
	}
}
