import { fork, select, put } from 'redux-saga/effects'

import * as links from 'login/login.constants/links'
import * as forms from 'login/login.constants/forms'
import { gotoForm, reset } from 'login/login.actions'
import { gotoHome } from 'router/router.actions'
import { isAuth } from 'auth/auth.selectors'
import { submit } from './submit'
import { setFormikProps } from './setFormikProps'
import { registerConfirm } from './registerConfirm'

export function* loginNavigate({ query }) {
	if (yield select(isAuth)) {
		yield put(gotoHome())
	}

	const { link, token } = query || {}
	console.log('token', token)
	console.log('link', token)

	const exit = yield when(link)
		.is(links.NEW_PASSWORD, function*() {
			console.log('NEW_PASSWORD')
			// yield put(setLinkToken(token))
			yield put(gotoForm(forms.NEW_PASSWORD))
			return false
		})
		.is(links.REGISTER_CONFIRMATION, function*() {
			console.log('REGISTER_CONFIRMATION')
			yield fork(registerConfirm, token)
			return true
		})
		.else(() => false)()

	if (exit) {
		console.log('canceling')
		return
	}
	console.log('continuing')
	yield fork(setFormikProps)
	yield fork(submit, token)

	try {
		while (true) {
			yield sleep(100)
		}
	} finally {
		console.log('canceled')
		yield put(reset())
	}
	// yield takeLatest(t.GOTO_FORM, function*({ payload: form }) {
	// 	when(form)
	// 		.is(forms.SIGN_UP, () => {})
	// 		.is(forms.SIGN_IN, () => {})
	// 		.is(forms.NEW_PASSWORD, () => {})
	// 		.is(forms.FORGOT_PASSWORD, () => {})
	// 		.else(() => {})()
	// })
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
