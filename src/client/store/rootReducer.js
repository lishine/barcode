import { reducer as routerReducer } from 'redux-saga-first-router'

import { authReducer } from 'auth/reducer'
// import { loginReducer } from 'login/reducer'

export default {
	location: routerReducer,
	auth: authReducer,
	// login: loginReducer,
}
