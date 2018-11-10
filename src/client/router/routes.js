import createHistory from 'history/createBrowserHistory'
import { fork, call, put } from 'redux-saga/effects'

import { buildRoutesMap, route } from 'redux-saga-first-router'
import { loginNavigate } from 'login/logic/onNavigate'
import { profileNavigate } from 'profile/logic/onNavigate'
import { ordersNavigate } from 'orders/logic/onNavigate'
import { login } from 'auth/logic/login'
import { gotoLogin } from 'router/actions'

export const routes = {
	HOME: 'Home',
	LOGIN: 'Login',
	PROFILE: 'Profile',
	ORDERS: 'Orders',
}

export const routesMap = buildRoutesMap(
	route(routes.HOME, '/', protectedRoute()),
	route(routes.LOGIN, '/login', loginNavigate),
	route(routes.PROFILE, '/profile', protectedRoute(profileNavigate)),
	route(routes.ORDERS, '/orders', protectedRoute(ordersNavigate))
)

export const history = createHistory()

function protectedRoute(navigateSaga) {
	return function*(...args) {
		const isLoggedIn = yield call(login)
		console.log('isLoggedIn', isLoggedIn)

		if (isLoggedIn) {
			if (navigateSaga) {
				yield fork(navigateSaga, ...args)
			}
		} else {
			yield put(gotoLogin())
		}
	}
}
