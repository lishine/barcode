import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { saga as routerSaga } from 'redux-saga-first-router'

import rootReducer from 'store/rootReducer'
import { runSagas } from 'store/logic'
import { routesMap, history } from 'router/routes'

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
