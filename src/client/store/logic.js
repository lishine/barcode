import loginLogic from 'login/model/logic'
import authLogic from 'store/auth/logic'

const logic = {
	...loginLogic,
	...authLogic,
}
export function runSagas(middleware) {
	for (let name in logic) {
		middleware.run(logic[name])
	}
}
