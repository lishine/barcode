export const SUBMIT = '[login] submit'

export const submit = (values, actions) => {
	console.log('values', values)
	return { type: SUBMIT, payload: { values, actions } }
}

// export const setFormikProps = formikProps => ({
// 	type: t.SET_FORMIK_PROPS,
// 	payload: formikProps,
// })

// export const gotoForm = form => ({
// 	type: t.GOTO_FORM,
// 	payload: form,
// })

// export const setSubmitSource = submitSource => ({
// 	type: t.SET_SUBMIT_SOURCE,
// 	payload: submitSource,
// })

// export const setAlert = alert => ({
// 	type: t.SET_ALERT,
// 	payload: alert,
// })

// export const reset = () => ({ type: t.RESET })

// export const gotoSignIn = form => ({
// 	type: c.GOTO_FORM,
// 	payload: c.forms.SIGN_IN,
// })

// export const gotoSignUp = form => ({
// 	type: c.GOTO_FORM,
// 	payload: c.forms.SIGN_UP,
// })

// export const gotoForgotPassword = form => ({
// 	type: c.GOTO_FORM,
// 	payload: c.forms.FORGOT_PASSWORD,
// })

// export const gotoNewPassword = form => ({
// 	type: c.GOTO_FORM,
// 	payload: c.forms.NEW_PASSWORD,
// })
