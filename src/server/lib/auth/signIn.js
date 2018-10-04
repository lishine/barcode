import bcrypt from 'bcrypt'

import { createToken } from '../token'
import { sendRegistrationEmail } from '../email'

export function signIn(req, res, next) {
	const { app, body } = req
	const { data } = body
	const { email, password, sendRegLink } = data
	const db = app.get('db')

	if (!email || !password) {
		res.status(400).json({ error: 'No password or email' })
	}
	console.log('email', email)
	console.log('sendRegLink', sendRegLink)
	return db.users
		.findOne({ email })
		.then(user => {
			if (!user) {
				return res.status(400).json({ error: 'User not found' })
			}
			console.log('user', user)
			const confirmed = user && user.confirmed
			if (!confirmed) {
				if (sendRegLink) {
					console.log(1)
					return sendRegistrationEmail({
						req,
						userId: user.id,
						name: user.name,
						email,
					})
						.then(info => res.status(200).json({ info }))
						.catch(err => res.status(400).json({ error: 'Email not sent', err }))
				} else {
					return res.status(400).json({ code: 100, error: 'User not confirmed' })
				}
			}

			bcrypt
				.compare(password, user.password)
				.then(validPassword => {
					console.log(11)
					if (validPassword) {
						console.log(12)
						const token = createToken({ userId: user.id })

						return res.status(200).json({
							token,
						})
					} else {
						throw new Error('wrong password')
					}
				})
				.catch(err => res.status(400).json({ err, error: 'Unauthorized Access' }))
		})
		.catch(err => res.status(400).json({ err, error: 'User not found' }))
}
