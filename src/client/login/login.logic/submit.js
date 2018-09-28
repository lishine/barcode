import { select, take, call, put } from 'redux-saga/effects'

import * as errors from 'login/login.constants/errors'
import * as f from 'login/login.constants/forms'
import * as t from 'login/login.constants/actionTypes'
import { setAlert } from 'login/login.actions'
// import { getLinkToken } from 'login/login.selectors'
import { getFormikProps, getForm } from 'login/login.selectors'
import { login } from 'auth/auth.logic/login'
import { post } from 'utils/utils'

export function* submit(linkToken) {
	while (true) {
		yield take(t.SUBMIT)

		// const token = yield select(getLinkToken)
		const formikProps = yield select(getFormikProps)
		let form = yield select(getForm)
		const { values, setStatus, setSubmitting } = formikProps

		console.log('token', linkToken)
		console.log('form', form)
		console.log('values', values)
		console.log('submit formikProps', formikProps)

		const apiRoute = form
		let apiValues = values
		if (formikProps.status === 'sendLinkSubmit') {
			setStatus({})
			form = 'sendLinkSubmit'
			apiValues = Object.assign({}, apiValues, { sendRegLink: true })
		}
		apiValues = Object.assign({}, apiValues, { token: linkToken })
		console.log('apiValues', apiValues)

		yield call(sleep, 100)

		const { response, err } = yield call(post, `/auth/${apiRoute}`, apiValues)

		if (response) {
			const { data } = response
			const { token } = data
			yield when(form)
				.is(f.SIGN_UP, function*() {
					yield put(setAlert('confirmLinkSent'))
				})
				.is(f.SIGN_IN, function*() {
					yield call(login, token)
					yield put(setAlert('signedIn'))
				})
				.is('sendLinkSubmit', function*() {
					yield put(setAlert('confirmLinkSent'))
				})
				.is(f.FORGOT_PASSWORD, function*() {
					yield put(setAlert('passwordLinkSent'))
				})
				.is(f.NEW_PASSWORD, function*() {
					yield call(login, token)
					yield put(setAlert('signedIn'))
				})
				.else(() => {})()
		} else {
			console.dir(err)
			const { data = {}, status } = err.response
			const { error, code } = data

			const setError = ({ sendLink }) => {
				console.log('in setError')
				setStatus({
					values,
					sendLink,
					error: when(status)
						.is(504, 'Timeout')
						.is(400, error)
						.else('Something went wrong'),
				})
			}

			when(form)
				.is(f.SIGN_UP, () => setError({}))
				.is(f.SIGN_IN, () => {
					if (code === errors.USER_NOT_CONFIRMED) {
						setError({ sendLink: true })
					} else {
						setError({})
					}
				})
				.is('sendLinkSubmit', () => setError({}))
				.is(f.FORGOT_PASSWORD, () => setError({}))
				.is(f.NEW_PASSWORD, () => setError({}))
				.else(() => {})()
		}

		setSubmitting(false)
	}
}
