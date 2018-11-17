import { throwError, throwIf } from '../lib/error'

export async function download({ data, db, user: { id: user_id } }) {
	const { what } = data
	console.log('downloading', what)
	return what
}
