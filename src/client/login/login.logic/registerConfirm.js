import { fork, select, take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { actionTypes as t, forms } from 'login/login.constants'
import { gotoForm, setAlert } from 'login/login.actions'
import { routes } from 'router/routes'
import { gotoHome } from 'router/router.actions'
import { isAuth } from 'auth/auth.selectors'
import { login } from 'auth/auth.logic/login'
import { submit } from './submit'
import { setFormikProps } from './setFormikProps'
import { post } from 'utils/utils'

export function* registerConfirm(token) {
	const { response, err } = yield call(post, `/auth/registerconfirm`, { token })
	if (response) {
		const { token: newToken } = response.data
		console.log('newToken', newToken)
		if (newToken) {
			yield put(login(newToken))
			yield put(setAlert('emailConfirmed'))
			yield put(gotoForm(forms.SIGN_IN))
			return
		}
	}
	yield put(gotoHome())
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
