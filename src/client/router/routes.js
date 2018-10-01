import createHistory from 'history/createBrowserHistory'
import { fork, call, put } from 'redux-saga/effects'

import { buildRoutesMap, route } from 'redux-saga-first-router'
import { loginNavigate } from 'login/logic/loginNavigate'
import { login } from 'auth/logic/login'

export const routes = {
	HOME: 'Home',
	LOGIN: 'Login',
}

export const routesMap = buildRoutesMap(
	route(routes.HOME, '/', protectedRoute()),
	route(routes.LOGIN, '/login', loginNavigate)
)

export const history = createHistory()

function protectedRoute(navigateSaga) {
	return function*(...args) {
		console.log('1')
		const isLoggedIn = yield call(login)

		console.log('isLoggedIn', isLoggedIn)
		if (isLoggedIn) {
			if (navigateSaga) {
				yield fork(navigateSaga, ...args)
			}
		} else {
			dispatch(navigate(routes.LOGIN))
		}
	}
}

// export default {
// 	querySerializer: queryString,
// 	onBeforeChange: (dispatch, getState, action) => {
// 		const state = getState()
// 		console.log('getState().location', getState().location)
// 		const actionType = action.action.type
// 		const payload = action.action.payload

// 		const role = routesMap[actionType] && routesMap[actionType].role

// 		let loggedIn = isAuth(state)
// 		// if (!loggedIn) {
// 		// 	const token = localStorage.getItem('token')
// 		// 	console.log('got token', token)
// 		// 	if (token) {
// 		// 		dispatch(setToken(token))
// 		// 		loggedIn = true
// 		// 	}
// 		// }

// 		console.log('action.action', action.action)
// 		console.log('actionType', actionType)
// 		console.log('role', role)
// 		console.log('loggedIn', loggedIn)
// 		console.log('dispatch', dispatch)

// 		if (role === roles.ONLY_OPEN && loggedIn && payload.alert === 'form') {
// 			const action = redirect({ type: r.HOME })
// 			dispatch(action)
// 		} else if (role !== roles.ONLY_OPEN && !loggedIn) {
// 			const action = redirect({
// 				type: r.SIGN_IN,
// 				payload: { alert: 'form' },
// 			})
// 			dispatch(action)
// 		}
// 	},
// }

// export default {
// 	[r.HOME]: { path: '/', role: '' },
// 	[r.SIGN_UP]: {
// 		path: '/sign-up/:alert',
// 		domain: d.LOGIN,
// 		role: roles.ONLY_OPEN,
// 	},
// 	[r.SIGN_IN]: {
// 		path: '/sign-in/:alert',
// 		domain: d.LOGIN,
// 		role: roles.ONLY_OPEN,
// 	},
// 	[r.FORGOT_PASSWORD]: {
// 		path: '/forgot-password/:alert',
// 		domain: d.LOGIN,
// 		role: roles.ONLY_OPEN,
// 	},
// 	[r.NEW_PASSWORD]: {
// 		path: '/new-password/:alert',
// 		domain: d.LOGIN,
// 		role: roles.ONLY_OPEN,
// 	},
// 	[r.NEW_PASSWORD_LINK]: {
// 		path: '/new-password',
// 		role: roles.ONLY_OPEN,
// 		thunk: (dispatch, getState) => {
// 			console.log('getState().location', getState().location)
// 			const { token } = getState().location.query
// 			console.log('token', token)
// 			dispatch(a.redirect(r.NEW_PASSWORD, { token, alert: 'form' }))
// 		},
// 	},
// 	[r.REGISTER_CONFIRM]: {
// 		path: '/register-confirm',
// 		role: roles.ONLY_OPEN,
// 		thunk: (dispatch, getState) => {
// 			console.log('getState().location', getState().location)
// 			const { token: confirmToken } = getState().location.query
// 			console.log('confirmToken', confirmToken)
// 			axios
// 				.post(`/auth/registerconfirm`, { token: confirmToken })
// 				.then(function(response) {
// 					console.log('response', response)
// 					const { token: newToken } = response.data
// 					console.log('newToken', newToken)
// 					if (newToken) {
// 						dispatch(login(newToken))
// 						dispatch(a.redirect(r.SIGN_IN, { alert: 'emailConfirmed' }))
// 					} else {
// 						dispatch(a.redirect(r.SIGN_IN, { alert: 'form' }))
// 					}
// 				})
// 				.catch(function(err) {
// 					console.log('err', JSON.stringify(err))
// 				})
// 		},
// 	},
// }
