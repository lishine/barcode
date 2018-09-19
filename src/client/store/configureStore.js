import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'
import { routerMiddleware, routerEnhancer } from './router'

const store = createStore(
	combineReducers(rootReducer),
	composeWithDevTools(routerEnhancer, applyMiddleware(routerMiddleware))
)

// if (module.hot) {
// 	// Enable Webpack hot module replacement for reducers
// 	module.hot.accept('../reducers', () => {
// 		const nextRootReducer = require('../reducers/index')
// 		store.replaceReducer(nextRootReducer)
// 	})
// }

export default store
