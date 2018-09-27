import { redirect as redirectRouter } from 'redux-first-router'

import * as routes from './router.constants/routes'
import * as domains from './router.constants/domains'

export const go = (to, payload) => ({
	type: to,
	payload: payload || {},
})

export const redirect = (to, payload) =>
	redirectRouter({
		type: to,
		payload: payload || {},
	})

export const goToHome = () => go(routes.HOME)

export const goToSignUpForm = () => go(routes.SIGN_UP, { alert: 'form' })
export const goToSignInForm = () => go(routes.SIGN_IN, { alert: 'form' })
export const goToForgotPasswordForm = () => go(routes.FORGOT_PASSWORD, { alert: 'form' })

export const redirectToSignInForm = () => redirect(routes.SIGN_IN, { alert: 'form' })
