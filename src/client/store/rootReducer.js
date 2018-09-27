import { routerReducer } from 'Model/router'

import { authReducer } from 'Model/auth/reducer'
import { loginReducer } from 'login.Model/reducer'

export default {
	location: routerReducer,
	auth: authReducer,
	login: loginReducer,
}
