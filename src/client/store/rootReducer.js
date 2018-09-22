import { routerReducer } from './router'
import authReducer from './auth'

export default {
	location: routerReducer,
	auth: authReducer,
}
