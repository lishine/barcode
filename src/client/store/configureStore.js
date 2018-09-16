import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'
import { routerMiddleware, routerEnhancer } from './router'

export default createStore(
	combineReducers(rootReducer),
	composeWithDevTools(routerEnhancer, applyMiddleware(routerMiddleware))
)
