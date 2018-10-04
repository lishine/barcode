export const throwError = (status, message, code, errorType) => error => {
	if (!error) {
		error = new Error(message || 'Unknown Error')
	}
	error.mes = message
	error.status = status
	error.code = code
	error.errorType = errorType
	throw error
}

export const throwIf = (fn, status, message, code, errorType) => result => {
	if (typeof fn === 'function') {
		if (fn(result)) {
			return throwError(status, message, code, errorType)()
		}
		return result
	} else if (fn) {
		throwError(status, message, code, errorType)()
	}
}

export const sendError = (res, status, message, code) => err => {
	res.status(status || err.status).json({
		type: 'error',
		code: code || err.code,
		message: message || err.message,
		err,
	})
}
