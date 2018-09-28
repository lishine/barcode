// import { redirect as redirectRouter } from 'redux-first-router'

import { routes } from 'router/routes'
// import * as domains from './router.constants/domains'

export const goto = (to, payload) => navigate(to)
export const redirect = (to, payload) => navigate(to, {}, { replace: true })

// export const redirect = (to, payload) =>
// 	redirectRouter({
// 		type: to,
// 		payload: payload || {},
// 	})

export const gotoHome = () => goto(routes.HOME)
export const gotoLogin = () => goto(routes.LOGIN)

// export const goToSignUpForm = () => go(routes.SIGN_UP, { alert: 'form' })
// export const goToSignInForm = () => go(routes.SIGN_IN, { alert: 'form' })
// export const goToForgotPasswordForm = () => go(routes.FORGOT_PASSWORD, { alert: 'form' })

// export const redirectToSignInForm = () => redirect(routes.SIGN_IN, { alert: 'form' })
