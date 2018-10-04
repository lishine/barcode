import { throwError, throwIf } from '../../server/lib/error'

export function profileLoad(data, db) {
	console.log('should load data')
	throwIf(true, 400, 'testing profileLoad')
}
export function profileUpdate(data, db) {
	console.log('should update data')
	throwIf(true, 400, 'testing profileLoad')
}
