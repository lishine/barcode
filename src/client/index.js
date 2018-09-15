import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './configureStore'
import App from './app/App'
import './styledGlobal'

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
