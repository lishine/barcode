import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import { runSagas } from './logic'
import { routerMiddleware, routerEnhancer } from './router'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	combineReducers(rootReducer),
	composeWithDevTools(
		routerEnhancer,
		applyMiddleware(sagaMiddleware, ReduxThunk, routerMiddleware)
	)
)

runSagas(sagaMiddleware)

export const dispatch = store.dispatch

export default store

// if (module.hot) {
// 	// Enable Webpack hot module replacement for reducers
// 	module.hot.accept('../reducers', () => {
// 		const nextRootReducer = require('../reducers/index')
// 		store.replaceReducer(nextRootReducer)
// 	})
// }
