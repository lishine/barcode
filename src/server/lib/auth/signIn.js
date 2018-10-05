import bcrypt from 'bcrypt'
import { throwError, throwIf } from '../error'

import { createToken } from '../token'
import { sendRegistrationEmail } from '../email'

export async function signIn(data, db, host) {
	const { email, password, sendRegLink } = data
	throwIf(!email || !password, 400, 'No password or email')
	console.log('email sendRegLink', email, sendRegLink)

	const user = await db.users
		.findOne({ email })
		.then(throwIf(user => !user, 400, 'User not found'))
		.catch(throwError(400, 'User not found'))
	console.log('user', user)

	if (!user.confirmed) {
		throwIf(!sendRegLink, 400, 'User not confirmed', 100)
		const info = await sendRegistrationEmail({
			host,
			userId: user.id,
			name: user.name,
			email,
		}).catch(throwError(400, 'Email not sent'))
		return { info }
	}

	const validPassword = await bcrypt.compare(password, user.password)
	throwIf(!validPassword, 400, 'Unauthorized Access')
	const token = createToken({ userId: user.id })

	return { token }
}
