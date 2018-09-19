import { NOT_FOUND, connectRoutes } from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'

const routesMap = {
	HOME: '/',
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
}

const history = createHistory()
export const {
	reducer: routerReducer,
	middleware: routerMiddleware,
	enhancer: routerEnhancer,
} = connectRoutes(history, routesMap)

const pages = {
	HOME: 'Home',
	SIGN_UP: 'SignUp',
	SIGN_IN: 'SignIn',
	[NOT_FOUND]: '',
}

export const pageReducer = (state = 'HOME', action = {}) =>
	pages[action.type] || state

export const go = (to) => ({
	type: to,
})

export const getPage = (state) => state.page
