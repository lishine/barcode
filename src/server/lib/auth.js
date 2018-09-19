import { encode, decode } from 'jwt-simple'
import bcrypt from 'bcrypt'

function tokenForUser(user) {
	const timestamp = new Date().getTime()
	return encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET)
}

function userIdForToken(token) {
	decode(token, process.env.JWT_SECRET)
}

export function signUp(req, res, next) {
	const { app, body } = req
	const { name, email, password } = body
	const db = app.get('db')
	const saltRounds = 12

	if (!email || !password) {
		res.status(500).json({ error: 'Provide password or email' })
	}
	bcrypt
		.hash(password, saltRounds)
		.then(hash => {
			return db.users
				.insert({ name, email, password: hash })
				.then(user => {
					res.status(200).json({ sucess: true, token: tokenForUser(user) })
				})
				.catch(err =>
					res
						.status(500)
						.json({ sucess: false, err, error: 'error saving user' })
				)
		})
		.catch(err => {
			next(err)
		})
}

export function signIn(req, res, next) {
	const { app, body } = req
	const { email, password } = body
	const db = app.get('db')

	if (!email || !password) {
		res.status(500).json({ sucess: false, error: 'Provide password or email' })
	}

	return db.users
		.findOne({ email })
		.then(validUser => {
			bcrypt
				.compare(password, validUser.password)
				.then(validPassword => {
					if (validPassword) {
						res.status(200).json({
							sucess: true,
							token: tokenForUser(validUser),
						})
					}
				})
				.catch(err =>
					res
						.status(401)
						.json({ sucess: false, err, error: 'Unauthorized Access' })
				)
		})
		.catch(err =>
			res.status(500).json({ sucess: false, err, error: 'user not found' })
		)
}

export function validateTokenMid(req, res, next) {
	const { app, body, headers, path, baseUrl } = req
	const fullPath = `${baseUrl}${path}`
	console.log('fullPath', fullPath)
	if (fullPath === '/api/signin/' || fullPath === '/api/signup/') {
		return
	}
	console.log('validating')

	const { token } = headers
	const db = app.get('db')

	if (!token) {
		res.status(500).json({ sucess: false, err: 'no token, not authorized' })
		return
	}

	const userId = userIdForToken(token)

	return db.users
		.findOne({ id: userId })
		.then(validUser => {
			req.user = validUser
			console.log('validUser', validUser)
			next()
		})
		.catch(err =>
			res
				.status(500)
				.json({ sucess: false, err, error: 'no user, not authorized' })
		)
}
