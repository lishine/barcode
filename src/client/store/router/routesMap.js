import { NOT_FOUND, connectRoutes, redirect as redirectRouter } from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'
import axios from 'axios'
import { isAuth, setToken } from 'store/auth'
import queryString from 'query-string'

import * as routes from './constants/routes'
import * as domains from './constants/domains'
import * as roles from './constants/roles'

export default {
	[routes.HOME]: { path: '/', role: '' },
	[routes.SIGN_UP]: {
		path: '/sign-up/:alert',
		domain: domains.LOGIN,
		role: roles.ONLY_OPEN,
	},
	[routes.SIGN_IN]: {
		path: '/sign-in/:alert',
		domain: domains.LOGIN,
		role: roles.ONLY_OPEN,
	},
	[routes.FORGOT_PASSWORD]: {
		path: '/forgot-password/:alert',
		domain: domains.LOGIN,
		role: roles.ONLY_OPEN,
	},
	[routes.NEW_PASSWORD]: {
		path: '/new-password/:alert',
		domain: domains.LOGIN,
		role: roles.ONLY_OPEN,
	},
	[routes.NEW_PASSWORD_LINK]: {
		path: '/new-password',
		role: roles.ONLY_OPEN,
		thunk: (dispatch, getState) => {
			console.log('getState().location', getState().location)
			const { token } = getState().location.query
			console.log('token', token)
			dispatch(
				redirectRouter({
					type: routes.NEW_PASSWORD,
					payload: { alert: 'form', token },
				})
			)
		},
	},
	[routes.REGISTER_CONFIRM]: {
		path: '/register-confirm',
		role: roles.ONLY_OPEN,
		thunk: (dispatch, getState) => {
			console.log('getState().location', getState().location)
			const { token: confirmToken } = getState().location.query
			console.log('confirmToken', confirmToken)
			axios
				.post(`/auth/registerconfirm`, { token: confirmToken })
				.then(function(response) {
					console.log('response', response)
					const { token: newToken } = response.data
					console.log('newToken', newToken)
					if (newToken) {
						dispatch(setToken(newToken))
						dispatch(
							redirectRouter({
								type: routes.SIGN_IN,
								payload: { alert: 'emailConfirmed' },
							})
						)
					} else {
						dispatch(
							redirectRouter({
								type: routes.SIGN_IN,
								payload: { alert: 'form' },
							})
						)
					}
				})
				.catch(function(err) {
					console.log('err', JSON.stringify(err))
				})
		},
	},
}
