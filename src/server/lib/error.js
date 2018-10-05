export const throwIf = (fn, ...args) => result => {
	if (typeof fn === 'function') {
		if (fn(result)) {
			return throwError(status, ...args)()
		}
		return result
	} else if (fn) {
		throwError(status, ...args)()
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
	console.log('ERROR', code || err.code, message || err.message)
	res.status(status || err.status).json({
		type: 'error',
		code: code || err.code,
		message: message || err.message,
		error: err.mes,
		err,
	})
}
