import { throwError, throwIf } from '../error'
import { decodeToken } from './utils/token'
import { changePassword } from './utils/changePassword'

export async function newPassword(data, db) {
	const { password, passwordConfirmation, token } = data
	throwIf(!password || !passwordConfirmation || !token, 400, 'No password or email')()
	console.log('password passwordConfirmation token', password, passwordConfirmation, token)

	const { userId, isNewPassword } = decodeToken(token)

	throwIf(!isNewPassword, 400, 'Not a new password link')()

	// const user = await db.users
	// 	.findOne({ id: userId })
	// 	.then(throwIf(user => !user, 400, 'No user'))
	// 	.catch(throwError(400, 'No user'))
	// console.log('user', user)

	await changePassword({ userId, password, passwordConfirmation, db }).catch(
		throwError(400, 'error updating user')
	)

	return {}
}
