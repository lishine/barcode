import { connectRoutes } from 'redux-first-router'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routesMap } from '../../router/routes'

import { userIdReducer } from '../app/model/reducer'

const history = createHistory()

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap) // yes, 3 redux aspects
const rootReducer = combineReducers({ location: reducer, userId: userIdReducer })
const middlewares = applyMiddleware(middleware)

export default createStore(rootReducer, composeWithDevTools(enhancer, middlewares))
