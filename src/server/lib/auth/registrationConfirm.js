import { createToken, decodeToken } from '../token'
import { throwError, throwIf } from '../error'

export async function registrationConfirm(data, db) {
	const { token } = data
	throwIf(!token, 400, 'No token')()
	console.log('token', token)

	const { userId, isRegister } = decodeToken(token)
	throwIf(!isRegister, 400, 'Not a registration link')()
	console.log('userId', userId)

	const user = await db.users
		.findOne({ id: userId })
		.then(throwIf(user => !user, 400, 'No user')())
		.catch(throwError(400, 'No user'))
	console.log('user', user)
	throwIf(user.confirmed, 400, 'Account already confirmed')()

	await db.users
		.update({ id: userId }, { confirmed: true })
		.catch(throwError(500, 'error updating user'))
	return { token: createToken({ userId }) }
}
