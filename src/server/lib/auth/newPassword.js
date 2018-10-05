import bcrypt from 'bcrypt'

import { throwError, throwIf } from '../error'
import { createToken, decodeToken } from '../token'

const saltRounds = 12

export async function newPassword(data, db) {
	const { password, passwordConfirmation, token } = data
	throwIf(!password || !passwordConfirmation || !token, 400, 'No password or email')()
	console.log('password passwordConfirmation token', password, passwordConfirmation, token)

	const { userId, isNewPassword } = decodeToken(token)

	throwIf(!isNewPassword, 400, 'Not a new password link')()

	const user = await db.users
		.findOne({ id: userId })
		.then(throwIf(user => !user, 400, 'No user'))
		.catch(throwError(400, 'No user'))
	console.log('user', user)

	const hash = await bcrypt.hash(password, saltRounds).catch(throwError(500))

	await db.users
		.update({ id: userId }, { password: hash })
		.catch(throwError(500, 'error updating user'))

	return {}
}
