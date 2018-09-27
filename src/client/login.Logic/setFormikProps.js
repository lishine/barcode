import { take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as a from '../login.actions'
import * as c from '../login.constants'

export function* watchSetFormikProps() {
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
