import { fork, select, take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { errors, actionTypes as t } from 'login/login.constants'
import { setAlert } from 'login/login.actions'
import { routes as r } from 'router/routes'
import { getLinkToken } from 'login/login.selectors'
import { getFormikProps, getForm } from 'login/login.selectors'
import { login } from 'auth/auth.logic/login'
import { post } from 'utils/utils'

export function* submit() {
	while (true) {
		const { payload } = yield take(t.SUBMIT)

		const token = yield select(getLinkToken)
		const formikProps = yield select(getFormikProps)
		let form = yield select(getForm)
		const { values, setStatus, setSubmitting } = formikProps

		console.log('token', token)
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
		apiValues = Object.assign({}, apiValues, { token })
		console.log('apiValues', apiValues)

		yield call(sleep, 100)

		const { response, err } = yield call(post, `/auth/${apiRoute}`, apiValues)

		if (response) {
			when(form)
				.is(r.SIGN_UP, function*() {
					yield put(setAlert, 'confirmLinkSent')
				})
				.is(r.SIGN_IN, function*() {
					yield call(login, token)
					yield put(setAlert, 'signedIn')
				})
				.is('sendLinkSubmit', function*() {
					yield put(setAlert, 'confirmLinkSent')
				})
				.is(r.FORGOT_PASSWORD, function*() {
					yield put(setAlert, 'passwordLinkSent')
				})
				.is(r.NEW_PASSWORD, function*() {
					yield call(login, token)
					yield put(setAlert, 'signedIn')
				})
				.else(() => {})()
		} else {
			console.dir(err)
			const { response = {} } = err
			const { data = {}, status } = response
			const { error, code } = data

			const setError = ({ sendLink }) => {
				setStatus({
					values,
					sendLink,
					error: (status === 400 && error) || 'Something went wrong',
				})
			}

			when(form)
				.is(r.SIGN_UP, () => setError({}))
				.is(r.SIGN_IN, function*() {
					if (code === errors.USER_NOT_CONFIRMED) {
						setError({ sendLink: true })
					} else {
						setError({})
					}
				})
				.is('sendLinkSubmit', () => setError({}))
				.is(r.FORGOT_PASSWORD, () => setError({}))
				.is(r.NEW_PASSWORD, () => setError({}))
				.else(() => {})()
		}

		setSubmitting(false)
	}
}
