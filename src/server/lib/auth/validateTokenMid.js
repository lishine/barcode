import { decodeToken } from '../token'

export function validateTokenMid(req, res, next) {
	const { app, headers } = req
	const { token } = headers
	const db = app.get('db')

	if (!token) {
		res.status(400).json({ error: 'No token' })
		return
	}

	const { userId } = decodeToken(token)

	return db.users
		.findOne({ id: userId })
		.then(user => {
			console.log('validUser', user)
			const confirmed = user && user.confirmed
			if (confirmed) {
				req.user = user
				next()
			} else {
				res.status(400).json({ error: 'User not confirmed' })
			}
		})
		.catch(err => res.status(400).json({ err, error: 'No user' }))
}
