import { take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as a from 'login/login.actions'
import * as c from 'login/login.constants'

export function* setFormikProps() {
	yield takeLatest(c.SET_FORMIK_PROPS, function*({ payload }) {
		const formikProps = payload.data
		const { submitForm, setStatus, values, status = {} } = formikProps

		console.log('formikProps', formikProps)
		if (status.error && status.values !== values) {
			setStatus({})
		}
		if (status === 'sendLinkSubmit') {
			submitForm()
		}
	})
}
