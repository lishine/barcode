import { actionTypes as t } from 'login/login.constants'

export const submit = () => ({ type: t.SUBMIT })

export const setFormikProps = formikProps => ({
	type: t.SET_FORMIK_PROPS,
	payload: formikProps,
})

export const gotoForm = form => ({
	type: t.GOTO_FORM,
	payload: form,
})

export const setLinkToken = token => ({
	type: t.SET_LINK_TOKEN,
	payload: token,
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
