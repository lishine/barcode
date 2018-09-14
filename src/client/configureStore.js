import { connectRoutes } from 'redux-first-router'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension'

import userIdReducer from './app/userIdReducer'

const history = createHistory()

// THE WORK:
const routesMap = {
	HOME: '/home', // action <-> url path
	USER: '/user/:id', // :id is a dynamic segment
}

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap) // yes, 3 redux aspects

// and you already know how the story ends:
const rootReducer = combineReducers({ location: reducer, userId: userIdReducer })
const middlewares = applyMiddleware(middleware)
// note the order: enhancer, then middlewares
export default createStore(rootReducer, composeWithDevTools(enhancer, middlewares))
