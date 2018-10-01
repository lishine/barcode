export const SUBMIT = '[login] submit'

export const submit = (values, actions) => {
	console.log('values', values)
	return { type: SUBMIT, payload: { values, actions } }
}
