import axios from 'axios'

import * as r from './constants/routes'
import * as d from './constants/domains'
import * as roles from './constants/roles'
import * as a from './actions'
import { login } from 'store/auth/actions'

export default {
	[r.HOME]: { path: '/', role: '' },
	[r.SIGN_UP]: {
		path: '/sign-up/:alert',
		domain: d.LOGIN,
		role: roles.ONLY_OPEN,
	},
	[r.SIGN_IN]: {
		path: '/sign-in/:alert',
		domain: d.LOGIN,
		role: roles.ONLY_OPEN,
	},
	[r.FORGOT_PASSWORD]: {
		path: '/forgot-password/:alert',
		domain: d.LOGIN,
		role: roles.ONLY_OPEN,
	},
	[r.NEW_PASSWORD]: {
		path: '/new-password/:alert',
		domain: d.LOGIN,
		role: roles.ONLY_OPEN,
	},
	[r.NEW_PASSWORD_LINK]: {
		path: '/new-password',
		role: roles.ONLY_OPEN,
		thunk: (dispatch, getState) => {
			console.log('getState().location', getState().location)
			const { token } = getState().location.query
			console.log('token', token)
			dispatch(
				a.redirect({
					type: r.NEW_PASSWORD,
					payload: { alert: 'form', token },
				})
			)
		},
	},
	[r.REGISTER_CONFIRM]: {
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
						dispatch(login(newToken))
						dispatch(
							a.redirect({
								type: r.SIGN_IN,
								payload: { alert: 'emailConfirmed' },
							})
						)
					} else {
						dispatch(
							a.redirect({
								type: r.SIGN_IN,
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
