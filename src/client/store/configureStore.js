import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { reducer as routerReducer, saga as routerSaga } from 'redux-saga-first-router'

import rootReducer from 'Store/rootReducer'
import { runSagas } from 'Store/logic'
import { routesMap, history } from 'Model/router/routesMap'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	combineReducers(rootReducer),
	composeWithDevTools(applyMiddleware(sagaMiddleware, ReduxThunk))
)

sagaMiddleware.run(routerSaga, routesMap, history)
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
