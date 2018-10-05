import get from 'lodash/fp/get'
import bcrypt from 'bcrypt'

import { throwError, throwIf } from '../error'
import { sendRegistrationEmail } from '../email'

const saltRounds = 12

export async function signUp(data, db, host) {
	const { name, email, password } = data

	throwIf(!email || !password || !name, 400, 'No password or email or name')()

	const hash = await bcrypt.hash(password, saltRounds).catch(throwError(500))

	const user = await db.users.insert({ email, password: hash, confirmed: false }).catch(err => {
		const code = get('code')(err)
		if (code === '23505') {
			throwError(400, 'User already exists')(err)
		} else {
			throwError(500, 'error saving user')(err)
		}
	})

	await db.profile.insert({ user_id: user.id, name }).catch(throwError(500, 'error saving profile'))

	const info = await sendRegistrationEmail({ host, userId: user.id, name, email }).catch(
		throwError(400, 'Email not sent')
	)

	return { info }
}
