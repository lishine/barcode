import bcrypt from 'bcrypt'

import { throwError, throwIf } from '../../error'

const saltRounds = 12

export async function changePassword({ userId, password, passwordConfirmation, db }) {
	throwIf(!password || !passwordConfirmation, 400, 'No password or email')()
	throwIf(password !== passwordConfirmation, 400, 'No password or email')()
	console.log('changePassword password passwordConfirmation', password, passwordConfirmation)

	const hash = await bcrypt.hash(password, saltRounds).catch(throwError(500))

	await db.users
		.update({ id: userId }, { password: hash })
		.catch(throwError(400, 'error updating user'))

	return {}
}
