import { createToken, decodeToken } from '../token'

export function registrationConfirm(req, res, next) {
	const { app, body } = req
	const { data } = body
	const { token } = data
	const db = app.get('db')

	if (!token) {
		return res.status(400).json({ error: 'No token' })
	}

	const { userId } = decodeToken(token)

	console.log('confirmToken', token)
	console.log('userId', userId)
	return db.users
		.findOne({ id: userId })
		.then(user => {
			console.log('user', user)
			if (!user) {
				return res.status(400).json({ error: 'No user' })
			}
			const { confirmed } = user
			if (confirmed) {
				return res.status(400).json({ error: 'Account already confirmed' })
			} else {
				db.users
					.update({ id: userId }, { confirmed: true })
					.then(user => {
						console.log('user', user)
						const newToken = createToken({ userId })
						return res.status(200).json({ token: newToken })
					})
					.catch(err => {
						return res.status(500).json({ error: 'error updating confirmed in db', err })
					})
			}
		})
		.catch(err => {
			return res.status(400).json({ err, error: 'No user' })
		})
}
