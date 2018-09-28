import * as c from 'login/login.constants'

export const submit = (page, values, formikBag) => {
	return {
		type: c.SUBMIT,
		payload: { data: { page, values, formikBag } },
	}
}

export const setFormikProps = formikProps => {
	return {
		type: c.SET_FORMIK_PROPS,
		payload: { data: formikProps },
	}
}

export const gotoForm = form => ({
	type: c.GOTO_FORM,
	payload: form,
})

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
