import { routerReducer, pageReducer } from './router'
import loginReducer from 'login/model'

export default { location: routerReducer, page: pageReducer, login: loginReducer }
