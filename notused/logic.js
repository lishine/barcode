const logic = {}
export function runSagas(middleware) {
	for (let name in logic) {
		middleware.run(logic[name])
	}
}
