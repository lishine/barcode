import { cancelled, call, fork, select, put } from 'redux-saga/effects'
import { HALT } from 'utils/utils'
import * as links from 'login/constants/links'
import * as forms from 'login/constants/forms'
import { gotoHome } from 'router/actions'
import { isAuth } from 'auth/selectors'
import { submit } from 'login/logic/submit'
import { registerConfirm } from 'login/logic/registerConfirm'
import { loginStore } from 'login/store'
import { dispatch } from 'store/configureStore'

export function* loginNavigate(_, query) {
	loginStore.reset()

	if (yield select(isAuth)) {
		dispatch(gotoHome())
	}
	const { link, token } = query || {}
	console.log('token', token)
	console.log('link', token)

	yield when(link)
		.is(links.NEW_PASSWORD, function*() {
			console.log('NEW_PASSWORD')
			loginStore.gotoForm(forms.NEW_PASSWORD)
		})
		.is(links.REGISTER_CONFIRMATION, function*() {
			console.log('REGISTER_CONFIRMATION')
			yield fork(registerConfirm, token)
		})
		.else(() => {})()

	yield fork(submit, token)

	try {
		yield call(HALT)
	} finally {
		if (yield cancelled()) {
			loginStore.reset()
		}
	}
}

// yield takeLatest(t.GOTO_FORM, function*({ payload: form }) {
// 	when(form)
// 		.is(forms.SIGN_UP, () => {})
// 		.is(forms.SIGN_IN, () => {})
// 		.is(forms.NEW_PASSWORD, () => {})
// 		.is(forms.FORGOT_PASSWORD, () => {})
// 		.else(() => {})()
// })

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
