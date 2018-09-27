import loginLogic from 'login/model/login.logic'
import authLogic from 'store/model/auth/logic'

const logic = {
	...loginLogic,
	...authLogic,
}
export function runSagas(middleware) {
	for (let name in logic) {
		middleware.run(logic[name])
	}
}
