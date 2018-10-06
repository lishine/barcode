export const throwIf = (fn, ...args) => result => {
	// console.log('result', result)
	if (typeof fn === 'function') {
		if (fn(result)) {
			console.log('throwing because of result')
			return throwError(...args)()
		}
		return result
	} else if (fn) {
		console.log('throwing because of condition')
		throwError(...args)()
	}
}

export const throwError = (status, message, code, errorType) => error => {
	console.log('*throwing')
	if (!error) {
		error = new Error(message || 'Unknown Error')
	}
	error.mes = message
	error.status = status
	error.code = error.code || code
	error.errorType = error.errorType || errorType
	throw error
}

export const sendError = (res, status, message, code) => err => {
	console.log('ERROR', message || err.message, 'code', code || err.code)
	res.status(status || err.status || 500).json({
		type: 'error',
		code: code || err.code,
		message: message || err.message,
		error: err.mes,
		err,
	})
}
