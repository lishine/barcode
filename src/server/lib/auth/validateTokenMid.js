import { decodeToken } from '../token'
import { throwError, throwIf } from '../error'

export async function validateTokenMid(token) {
	throwIf(!token, 400, 'No token')

	const { userId, confirmed } = decodeToken(token)
	throwIf(!userId, 400, 'No AUTHORIZATION, No user')
	throwIf(!confirmed, 400, 'No AUTHORIZATION, Not confirmed')
}
