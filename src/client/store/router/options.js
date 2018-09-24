import { isAuth, setToken } from 'store/auth'
import queryString from 'query-string'

import routesMap from './routesMap'
import * as routes from './constants/routes'
import * as domains from './constants/domains'
import * as roles from './constants/roles'
import { redirect } from './actions'

export default {
	querySerializer: queryString,
	onBeforeChange: (dispatch, getState, action) => {
		const state = getState()
		console.log('getState().location', getState().location)
		const actionType = action.action.type
		const payload = action.action.payload

		const role = routesMap[actionType] && routesMap[actionType].role

		let loggedIn = isAuth(state)
		if (!loggedIn) {
			const token = localStorage.getItem('token')
			console.log('got token', token)
			if (token) {
				dispatch(setToken(token))
				loggedIn = true
			}
		}

		console.log('action.action', action.action)
		console.log('actionType', actionType)
		console.log('role', role)
		console.log('loggedIn', loggedIn)
		console.log('dispatch', dispatch)

		if (role === roles.ONLY_OPEN && loggedIn && payload.alert === 'form') {
			const action = redirect({ type: routes.HOME })
			dispatch(action)
		} else if (role !== roles.ONLY_OPEN && !loggedIn) {
			const action = redirect({
				type: routes.SIGN_IN,
				payload: { alert: 'form' },
			})
			dispatch(action)
		}
	},
}
