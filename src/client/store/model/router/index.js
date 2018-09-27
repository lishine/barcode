import { connectRoutes } from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'

import routesMap from './routesMap'
import options from './options'

const history = createHistory()

export const {
	reducer: routerReducer,
	middleware: routerMiddleware,
	enhancer: routerEnhancer,
} = connectRoutes(history, routesMap, options)
