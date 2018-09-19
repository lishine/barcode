import {
	NOT_FOUND,
	connectRoutes,
	redirect as redirectRouter,
} from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'
import { isAuth } from 'store/auth'

const ROLE_OPEN = 'open'
const ROLE_ONLY_OPEN = 'only-open'

const routesMap = {
	HOME: { path: '/', role: '' },
	SIGN_UP: { path: '/sign-up', role: ROLE_ONLY_OPEN },
	SIGN_IN: { path: '/sign-in', role: ROLE_ONLY_OPEN },
}

const options = {
	onBeforeChange: (dispatch, getState, action) => {
		const state = getState()
		const actionType = action.action.type

		const role = routesMap[actionType] && routesMap[actionType].role
		const loggedIn = isAuth(state)
		console.log('actionType', actionType)
		console.log('role', role)
		console.log('loggedIn', loggedIn)
		console.log('dispatch', dispatch)
		if (role === ROLE_ONLY_OPEN && loggedIn) {
			const action = redirectRouter({ type: 'HOME' })
			dispatch(action)
		} else if (role !== ROLE_ONLY_OPEN && !loggedIn) {
			const action = redirectRouter({ type: 'SIGN_IN' })
			dispatch(action)
		}
	},
}

const history = createHistory()
export const {
	reducer: routerReducer,
	middleware: routerMiddleware,
	enhancer: routerEnhancer,
} = connectRoutes(history, routesMap, options)

const pages = {
	HOME: 'Home',
	SIGN_UP: 'SignUp',
	SIGN_IN: 'SignIn',
	[NOT_FOUND]: 'Home',
}

export const pageReducer = (state = 'HOME', action = {}) =>
	pages[action.type] || state

export const go = to => ({
	type: to,
})

export const redirect = to =>
	redirectRouter({
		type: to,
	})

export const getPage = state => state.page
