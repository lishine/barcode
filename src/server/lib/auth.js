import { encode, decode } from 'jwt-simple'
import bcrypt from 'bcrypt'

import * as emailUtils from './email'

function tokenForUser(user) {
	const timestamp = new Date().getTime()
	return encode({ userId: user.id, iat: timestamp }, process.env.JWT_SECRET)
}

function userIdForToken(token) {
	const decoded = decode(token, process.env.JWT_SECRET)
	console.log('decoded', decoded)
	const userId = decoded && decoded.userId
	return userId
}

export function signUp(req, res, next) {
	const { app, body } = req
	const { name, email, password } = body
	const db = app.get('db')
	const saltRounds = 12

	if (!email || !password || !name) {
		res.status(500).json({ error: 'Provide password or email or name' })
	}

	bcrypt
		.hash(password, saltRounds)
		.then(hash => {
			return db.users
				.insert({ name, email, password: hash, confirmed: false })
				.then(user => {
					let token
					try {
						token = tokenForUser(user)
					} catch (err) {
						return res.status(500).json({ error: 'token generation failure', err })
					}

					const host = req.headers.host
					const path = 'register-confirm'
					// const replacedToken = token.replace(/\./g, '/')
					console.log('token', token)
					// console.log('replacedToken', replacedToken)
					const link = `http://${host}/${path}?token=${token}`

					emailUtils
						.sendRegistrationEmail({
							name,
							email: 'vim55k@gmail.com',
							link,
						})
						.then(info => res.status(200).json({ info, token }))
						.catch(err => res.status(500).json({ error: 'email not sent', err }))
				})
				.catch(err =>
					res.status(500).json({ sucess: false, err, error: 'error saving user' })
				)
		})
		.catch(err => {
			next(err)
		})
}

export function signIn(req, res, next) {
	console.log('aaaaa')
	const { app, body } = req
	const { email, password } = body
	const db = app.get('db')

	if (!email || !password) {
		res.status(500).json({ sucess: false, error: 'Provide password or email' })
	}

	return db.users
		.findOne({ email })
		.then(validUser => {
			const confirmed = validUser && validUser.confirmed
			if (!confirmed) {
				res.status(402).json({ error: 'user not confirmed' })
			}

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
					res.status(401).json({ sucess: false, err, error: 'Unauthorized Access' })
				)
		})
		.catch(err => res.status(500).json({ sucess: false, err, error: 'user not found' }))
}

export function registrationConfirm(req, res, next) {
	const { app, body } = req
	const { token } = body
	const db = app.get('db')

	if (!token) {
		return res.status(500).json({ error: 'no token, not authorized' })
	}

	let userId
	try {
		userId = userIdForToken(token)
	} catch (err) {
		return res.status(500).json({ error: 'token decode failure', err })
	}
	console.log('confirmToken', token)
	console.log('userId', userId)
	return db.users
		.findOne({ id: userId })
		.then(validUser => {
			console.log('validUser', validUser)
			if (!validUser) {
				return res.status(500).json({ error: 'no user' })
			}
			const { confirmed } = validUser
			if (confirmed) {
				return res.status(500).json({ error: 'account already confirmed' })
			} else {
				db.users
					.update({ id: userId }, { confirmed: true })
					.then(user => {
						console.log('user', user)
						return res.status(200).json({ token })
					})
					.catch(err => {
						return res
							.status(500)
							.json({ error: 'error updating confirmed in db', err })
					})
			}
		})
		.catch(err => {
			return res.status(500).json({ err, error: 'no user, not authorized' })
		})
}

export function validateTokenMid(req, res, next) {
	const { app, body, headers, path, baseUrl } = req
	const { token } = headers
	const db = app.get('db')

	if (!token) {
		res.status(500).json({ error: 'no token, not authorized' })
		return
	}

	const userId = userIdForToken(token)

	return db.users
		.findOne({ id: userId })
		.then(validUser => {
			console.log('validUser', validUser)
			const confirmed = validUser && validUser.confirmed
			if (confirmed) {
				req.user = validUser
				next()
			} else {
				res.status(401).json({ error: 'no user, not authorized' })
			}
		})
		.catch(err => res.status(401).json({ err, error: 'no user, not authorized' }))
}

// const fullPath = `${baseUrl}${path}`
// console.log('fullPath', fullPath)
// if (fullPath === '/api/signin/' || fullPath === '/api/signup/') {
// 	return
// }
// console.log('validating')
