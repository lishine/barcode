import { routerReducer, pageReducer } from './router'
import authReducer from './auth'

export default { location: routerReducer, page: pageReducer, auth: authReducer }
