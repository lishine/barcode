import { redirect as redirectRouter } from 'redux-first-router'

import * as routes from './constants/routes'
import * as domains from './constants/domains'

export const goToHome = to => ({
	type: routes.HOME,
})

export const goToSignUpForm = to => ({
	type: routes.SIGN_UP,
	payload: { alert: 'form' },
})

export const goToSignInForm = to => ({
	type: routes.SIGN_IN,
	payload: { alert: 'form' },
})

export const goToForgotPasswordForm = to => ({
	type: routes.FORGOT_PASSWORD,
	payload: { alert: 'form' },
})

export const go = to => ({
	type: to,
})

export const redirect = (to, payload) =>
	redirectRouter({
		type: to,
		payload: payload || {},
	})
