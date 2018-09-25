import { routerReducer } from './router'
import authReducer from 'store/auth/reducer'
import { DOMAIN as LOGIN_DOMAIN } from 'store/auth/constants'

import loginReducer from 'login/model/reducer'
import { DOMAIN as AUTH_DOMAIN } from 'login/model/constants'

export default {
	location: routerReducer,
	[AUTH_DOMAIN]: authReducer,
	[LOGIN_DOMAIN]: loginReducer,
}
