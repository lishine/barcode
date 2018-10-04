import { call, put, fork } from 'redux-saga/effects'

import * as forms from 'login/constants/forms'
import { gotoHome } from 'router/actions'
import { login } from 'auth/logic/login'
import { post } from 'logic/post'
import { loginStore } from 'login/store'
import { dispatch } from 'store/configureStore'

export function* registerConfirm(token) {
	const { response, err } = yield call(post, '/auth/all', 'registerconfirm', { token })
	if (response) {
		const { token: newToken } = response.data
		console.log('newToken', newToken)
		if (newToken) {
			yield fork(login, newToken)
			loginStore.setAlert('emailConfirmed')
			loginStore.gotoForm(forms.SIGN_IN)
			return
		}
	}
	dispatch(gotoHome())
}

// when(form)
// .is(c.forms.SIGN_UP, () => {})
// .is(c.forms.SIGN_IN, () => {})
// .is(c.forms.NEW_PASSWORD, () => {})
// .is(c.forms.FORGOT_PASSWORD, () => {})
// .else(() => {
//     navigate(r.HOME, {}, { replace: true })
// })()

// import queryString from 'query-string'

// import { isAuth } from '../auth/auth.selectors'
// import routesMap from './routesMap'
// import * as r from './router.constants/routes'
// import * as roles from './router.constants/roles'
// import { redirect } from './router.actions'

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
// 			dispatch(redirect(r.HOME, { alert: 'form' }))
// 		} else if (role !== roles.ONLY_OPEN && !loggedIn) {
// 			dispatch(redirect(r.SIGN_IN, { alert: 'form' }))
// 		}
// 	},
// }
