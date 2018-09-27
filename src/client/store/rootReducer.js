import { routerReducer } from './model/router'

import authReducer from './model/auth/auth.reducers'
import loginReducer from '../login/model/login.reducers'
import { DOMAIN as AUTH_DOMAIN } from './model/auth/auth.constants'
import { DOMAIN as LOGIN_DOMAIN } from '../login/model/login.constants'

export default {
	location: routerReducer,
	[AUTH_DOMAIN]: authReducer,
	[LOGIN_DOMAIN]: loginReducer,
}
