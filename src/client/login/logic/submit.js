import { select, take, call, put } from 'redux-saga/effects'

import * as errors from 'login/constants/errors'
import * as f from 'login/constants/forms'
import { login } from 'auth/logic/login'
import { post } from 'logic/post'
import { loginStore } from 'login/store'
import { SUBMIT } from './actions'

export function* submit(linkToken) {
	while (true) {
		const { payload } = yield take(SUBMIT)
		console.log('payload', payload)
		const { values, actions } = payload
		const { setSubmitting } = actions

		let { form } = loginStore

		const endpoint = form
		let apiValues = values
		const sendLink = loginStore.submitSource === 'link'
		if (sendLink) {
			form = 'sendLink'
			apiValues = Object.assign({}, apiValues, { sendRegLink: true })
		}
		apiValues = Object.assign({}, apiValues, { token: linkToken })
		console.log('apiValues', apiValues)

		yield call(sleep, 100)

		const { response, err } = yield call(post, `/auth/all`, endpoint, apiValues)

		if (response) {
			const { data } = response
			const { token } = data
			yield when(form)
				.is(f.SIGN_UP, function*() {
					loginStore.setAlert('confirmLinkSent')
				})
				.is(f.SIGN_IN, function*() {
					yield call(login, token)
					loginStore.setAlert('signedIn')
				})
				.is('sendLink', function*() {
					loginStore.setAlert('confirmLinkSent')
				})
				.is(f.FORGOT_PASSWORD, function*() {
					loginStore.setAlert('passwordLinkSent')
				})
				.is(f.NEW_PASSWORD, function*() {
					yield call(login, token)
					loginStore.setAlert('signedIn')
				})
				.else(() => {})()
		} else {
			console.dir(err)
			const { data = {}, status } = err.response
			const { error, code } = data

			const setError = () =>
				loginStore.setError(
					when(status)
						.is(504, 'Timeout')
						.is(400, error)
						.else('Something went wrong')
				)

			when(form)
				.is(f.SIGN_UP, () => {
					setError()
				})
				.is(f.SIGN_IN, () => {
					if (code === errors.USER_NOT_CONFIRMED) {
						loginStore.setSendLink(true)
					}
					setError()
				})
				.is('sendLink', () => setError())
				.is(f.FORGOT_PASSWORD, () => setError())
				.is(f.NEW_PASSWORD, () => setError())
				.else(() => {})()
		}

		setSubmitting(false)
	}
}
