import { select, take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as c from 'login/login.constants'
import * as a from 'login/login.actions'
import * as r from 'router/routes'
import { getTokenFromUrl, getPage } from 'router/router.selectors'
import { getFormikProps } from 'login/login.selectors'
import { redirect } from 'router/router.actions'
import { login } from 'auth/auth.actions'

export function* submit() {
	while (true) {
		const { payload } = yield take(c.SUBMIT)
		const token = yield select(getTokenFromUrl)
		const formikProps = yield select(getFormikProps)
		const page = yield select(getPage)
		const { values, status: formStatus, setStatus, setSubmitting } = formikProps

		console.log('token', token)
		console.log('page', page)
		console.log('values', values)
		console.log('submit formikProps', formikProps)

		let apiRoute = page
		let apiValues = values
		if (status === 'sendLinkSubmit') {
			setStatus({})
			apiRoute = r.SIGN_IN
			apiValues = Object.assign({}, apiValues, { sendRegLink: true })
		}
		apiValues = Object.assign({}, apiValues, { token })
		console.log('apiValues', apiValues)

		yield call(sleep, 100)
		try {
			const response = yield call(axios.post, `/auth/${apiRoute}`, apiValues)
			console.log('response', response)
			let token
			switch (page) {
				case 'sendRegLink':
					yield put(redirect(r.SIGN_IN, { alert: 'confirmLinkSent' }))
					break
				case r.SIGN_UP:
					yield put(redirect(r.SIGN_UP, { alert: 'success' }))
					break
				case r.SIGN_IN:
					token = get('data.token')(response)
					yield put(login(token))
					yield put(redirect(r.SIGN_IN, { alert: 'success' }))
					break
				case r.FORGOT_PASSWORD:
					yield put(redirect(r.FORGOT_PASSWORD, { alert: 'success' }))
					break
				case r.NEW_PASSWORD:
					token = get('data.token')(response)
					yield put(login(token))
					yield put(redirect(r.NEW_PASSWORD, { alert: 'success' }))
					break
			}
		} catch (err) {
			console.dir(err)
			const message = get('response.data.error')(err)
			const status = get('response.status')(err)
			const code = get('response.data.code')(err)
			const setError = ({ sendLink }) => {
				setStatus({
					values,
					sendLink,
					error: (status === 400 && message) || 'Something went wrong',
				})
			}
			switch (page) {
				case r.SIGN_UP:
					setError({})
					break
				case 'sendRegLink':
				case r.SIGN_IN:
					if (code === c.errors.USER_NOT_CONFIRMED) {
						setError({ sendLink: true })
					} else {
						setError({})
					}
					break
				case r.FORGOT_PASSWORD:
					setError({})
					break
				case r.NEW_PASSWORD:
					setError({})
					break
			}
		} finally {
			setSubmitting(false)
		}
	}
}
