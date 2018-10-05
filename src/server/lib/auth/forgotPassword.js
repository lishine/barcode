import { sendNewPasswordEmail } from '../email'
import { throwError, throwIf } from '../error'

export async function forgotPassword(data, db, host) {
	const { email } = data
	console.log('email', email)
	throwIf(!email, 400, 'no email provided')()

	const user = await db.users
		.findOne({ email })
		.then(throwIf(user => !user, 400, 'User not found')())
		.catch(throwError(400, 'User not found'))
	console.log('user', user)

	const profile = await db.profiles
		.findOne({ user_id: user.id })
		.then(throwIf(profile => !profile, 400, 'Profile not found')())
		.catch(throwError(400, 'Prfile not found'))
	console.log('profile', profile)

	const info = await sendNewPasswordEmail({
		host,
		userId: user.id,
		name: profile.name,
		email,
	}).catch(throwError(400, 'Email not sent'))
	return { info }
}
