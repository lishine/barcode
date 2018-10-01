import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { saga as routerSaga } from 'redux-saga-first-router'

import rootReducer from 'store/rootReducer'
// import { runSagas } from 'store/logic'
import { routesMap, history } from 'router/routes'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	combineReducers(rootReducer),
	composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(routerSaga, routesMap, history)
// runSagas(sagaMiddleware)

export const dispatch = store.dispatch

export default store
