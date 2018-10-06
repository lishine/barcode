import { select, take, call, put } from 'redux-saga/effects'

import { profileStore } from 'profile/profileStore'
import { mapToObject } from 'utils/utils'
import { groups } from 'profile/view/form/groups'
import { SUBMIT } from './actions'
import { post } from 'logic/post'

export function* submit() {
	while (true) {
		yield take(SUBMIT)
		const { formikProps, editGroup, edit, setError, saveValues, clearForm } = profileStore
		const { setSubmitting, values } = formikProps
		const { fields } = groups[editGroup]
		const names = map('name')(fields)
		console.log('values', values)
		console.log('names', names)
		const apiValues = mapToObject(name => ({ [name]: values[name] }))(names)
		console.log('apiValues', apiValues)
		const { body, err } = yield call(post, '/api/all', 'updateProfile', apiValues)

		if (body) {
			console.log('body.data', body.data)
			saveValues(body.data)
			clearForm()
		} else {
			console.dir(err)
			const { data = {}, status } = err.response
			const { error } = data

			profileStore.setError(
				when(status)
					.is(504, 'Timeout')
					.is(400, error)
					.else('Something went wrong')
			)
		}

		setSubmitting(false)
	}
}
