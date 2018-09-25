import { take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as errors from '../errors'
import * as a from '../actions'
import * as s from '../selectors'
import * as r from 'store/router/constants/routes'
import { tokenFromUrl, page } from 'store/router/selectors'
import { redirect } from 'store/router/actions'
import { login } from 'store/auth/actions'

export default function*() {
	while (true) {
		const {
			payload: { values, formikBag },
		} = take(a.submit())

		console.log('values', values)
		console.log('formikBag', formikBag)
		const { setStatus, setSubmitting } = formikBag

		let apiRoute = page
		let apiValues = values
		if (s.resendLinkWillSubmit()) {
			apiRoute = r.SIGN_IN
			apiValues = Object.assign({}, apiValues, { sendRegLink: true })
		}

		const token = tokenFromUrl()
		console.log('token', token)
		apiValues = Object.assign({}, apiValues, { token })
		console.log('apiValues', apiValues)

		yield sleep(100)
		try {
			const response = yield axios.post(`/auth/${apiRoute}`, apiValues)
			let token
			switch (page) {
				case 'sendRegLink':
					put(redirect(r.SIGN_IN, { alert: 'confirmLinkSent' }))
					break
				case r.SIGN_UP:
					put(redirect(r.SIGN_UP, { alert: 'success' }))
					break
				case r.SIGN_IN:
					token = get('data.token')(response)
					put(login(token))
					put(redirect(r.SIGN_IN, { alert: 'success' }))
					break
				case r.FORGOT_PASSWORD:
					put(redirect(r.FORGOT_PASSWORD, { alert: 'success' }))
					break
				case r.NEW_PASSWORD:
					token = get('data.token')(response)
					put(login(token))
					put(redirect(r.NEW_PASSWORD, { alert: 'success' }))
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
					data: {
						sendLink,
						error: (status === 400 && message) || 'Something went wrong',
					},
				})
			}
			switch (page) {
				case r.SIGN_UP:
					setError({})
					break
				case 'sendRegLink':
				case r.SIGN_IN:
					if (code === errors.USER_NOT_CONFIRMED) {
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
