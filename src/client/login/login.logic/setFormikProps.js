import { takeLatest } from 'redux-saga/effects'

import * as t from 'login/login.constants/actionTypes'

export function* setFormikProps() {
	yield takeLatest(t.SET_FORMIK_PROPS, function*({ payload }) {
		const formikProps = payload
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
