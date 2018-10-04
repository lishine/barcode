import { sendNewPasswordEmail } from '../email'

export function forgotPassword(req, res, next) {
	const { app, body } = req
	const { data } = body
	const { email } = data
	const db = app.get('db')

	if (!email) {
		res.status(400).json({ error: 'No email provided' })
	}

	return db.users
		.findOne({ email })
		.then(user => {
			const { name } = user
			sendNewPasswordEmail({ req, userId: user.id, name, email })
				.then(info => res.status(200).json({ info }))
				.catch(err => res.status(400).json({ error: 'Email not sent', err }))
		})
		.catch(err => res.status(400).json({ err, error: 'User not found' }))
}
