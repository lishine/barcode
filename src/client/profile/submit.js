// import { profileStore } from './profileStore'
// import { mapToObject, post } from 'utils/utils'

// import { groups } from './view/form/groups'

// export async function submit() {
// 	const { formikProps, editGroup, edit, setError, saveValues, clearForm } = profileStore
// 	const { setSubmitting, values } = formikProps
// 	const { fields } = groups[editGroup]
// 	const names = map('name')(fields)
// 	const apiValues = mapToObject(name => ({ name: values[name] }))(names)

// 	const { response, err } = await post(`/api/all`, 'loadProfile', apiValues)

// 	if (response) {
// 		saveValues(apiValues)
// 		clearForm()
// 	} else {
// 		console.dir(err)
// 		const { data = {}, status } = err.response
// 		const { error, code } = data

// 		profileStore.setError(
// 			when(status)
// 				.is(504, 'Timeout')
// 				.is(400, error)
// 				.else('Something went wrong')
// 		)
// 	}

// 	setSubmitting(false)
// }
