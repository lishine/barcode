import { reducer as routerReducer } from 'redux-saga-first-router'

import { authReducer } from 'auth/auth.reducer'
import { loginReducer } from 'login/login.reducer'

export default {
	location: routerReducer,
	auth: authReducer,
	login: loginReducer,
}
