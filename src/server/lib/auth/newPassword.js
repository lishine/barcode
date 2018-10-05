import bcrypt from 'bcrypt'

import { throwError, throwIf } from '../error'
import { createToken, decodeToken } from '../token'

const saltRounds = 12

export async function newPassword(data, db) {
	const { password, passwordConfirmation, token } = data
	throwIf(!email || !password, 400, 'No password or email')
	console.log('password passwordConfirmation token', password, passwordConfirmation, token)

	if (!password || !passwordConfirmation || !token) {
		return res.status(400).json({ error: 'No password or token' })
	}

	const { userId, isNewPassword } = decodeToken(token)

	if (!isNewPassword) {
		return res.status(400).json({ error: 'Not a new password link' })
	}

	return db.users
		.findOne({ id: userId })
		.then(user => {
			console.log('validUser', user)

			bcrypt
				.hash(password, saltRounds)
				.then(hash => {
					return db.users
						.update({ id: userId }, { password: hash })
						.then(user => {
							const newToken = createToken({ userId })
							res.status(200).json({ token: newToken })
						})
						.catch(err => {
							// const code = get('code')(err)
							// if (code === '23505') {
							// res.status(400).json({ err, error: 'User already exists' })
							// } else {
							res.status(500).json({ err, error: 'error updating user' })
							// }
						})
				})
				.catch(err => {
					next(err)
				})
		})
		.catch(err => res.status(400).json({ err, error: 'No user' }))
}
