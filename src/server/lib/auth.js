import { encode, decode } from 'jwt-simple'
import bcrypt from 'bcrypt'

import * as emailUtils from './email'

const saltRounds = 12

function tokenForUser(userId, expire, newPassword) {
	const timestamp = new Date().getTime()
	return encode({ userId, iat: timestamp, expire, newPassword }, process.env.JWT_SECRET)
}

function userIdForToken(token) {
	const decoded = decode(token, process.env.JWT_SECRET)
	console.log('decoded', decoded)
	const userId = decoded && decoded.userId
	return userId
}

export function forgotPassword(req, res, next) {
	const { app, body } = req
	const { email } = body
	const db = app.get('db')

	if (!email) {
		res.status(400).json({ error: 'No email provided' })
	}

	return db.users
		.findOne({ email })
		.then(validUser => {
			const confirmed = validUser && validUser.confirmed
			if (!confirmed) {
				return res.status(400).json({ error: 'User not confirmed' })
			}

			let token
			try {
				token = tokenForUser(validUser.id)
			} catch (err) {
				return res.status(500).json({ error: 'token generation failure', err })
			}

			const host = req.headers.host
			const path = 'new-password'
			console.log('token', token)
			const link = `http://${host}/${path}?token=${token}`

			const { name } = validUser
			emailUtils
				.sendRegistrationEmail({
					name,
					email: 'vim55k@gmail.com',
					link,
				})
				.then(info => res.status(200).json({ info }))
				.catch(err => res.status(400).json({ error: 'Email not sent', err }))
		})
		.catch(err => res.status(400).json({ err, error: 'User not found' }))
}

export function signUp(req, res, next) {
	const { app, body } = req
	const { name, email, password } = body
	const db = app.get('db')

	if (!email || !password || !name) {
		res.status(400).json({ error: 'No password or email or name' })
	}

	bcrypt
		.hash(password, saltRounds)
		.then(hash => {
			return db.users
				.insert({ name, email, password: hash, confirmed: false })
				.then(user => {
					let token
					try {
						token = tokenForUser(user.id)
					} catch (err) {
						return res.status(500).json({ error: 'token generation failure', err })
					}

					const host = req.headers.host
					const path = 'register-confirm'
					console.log('token', token)
					const link = `http://${host}/${path}?token=${token}`

					emailUtils
						.sendRegistrationEmail({
							name,
							email: 'vim55k@gmail.com',
							link,
						})
						.then(info => res.status(200).json({ info, token }))
						.catch(err => res.status(400).json({ error: 'Email not sent', err }))
				})
				.catch(err => res.status(500).json({ err, error: 'error saving user' }))
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
		res.status(400).json({ error: 'No password or email' })
	}

	return db.users
		.findOne({ email })
		.then(validUser => {
			const confirmed = validUser && validUser.confirmed
			if (!confirmed) {
				return res.status(400).json({ error: 'User not confirmed' })
			}

			bcrypt
				.compare(password, validUser.password)
				.then(validPassword => {
					if (validPassword) {
						let token
						try {
							token = tokenForUser(validUser.id)
						} catch (err) {
							return res
								.status(500)
								.json({ error: 'token generation failure', err })
						}

						return res.status(200).json({
							token,
						})
					}
				})
				.catch(err => res.status(400).json({ err, error: 'Unauthorized Access' }))
		})
		.catch(err => res.status(400).json({ err, error: 'user not found' }))
}

export function registrationConfirm(req, res, next) {
	const { app, body } = req
	const { token } = body
	const db = app.get('db')

	if (!token) {
		return res.status(400).json({ error: 'No token' })
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
				return res.status(400).json({ error: 'No user' })
			}
			const { confirmed } = validUser
			if (confirmed) {
				return res.status(400).json({ error: 'Account already confirmed' })
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
			return res.status(400).json({ err, error: 'No user' })
		})
}

export function validateTokenMid(req, res, next) {
	const { app, body, headers, path, baseUrl } = req
	const { token } = headers
	const db = app.get('db')

	if (!token) {
		res.status(400).json({ error: 'No token' })
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
				res.status(400).json({ error: 'User not confirmed' })
			}
		})
		.catch(err => res.status(400).json({ err, error: 'No user' }))
}

// const fullPath = `${baseUrl}${path}`
// console.log('fullPath', fullPath)
// if (fullPath === '/api/signin/' || fullPath === '/api/signup/') {
// 	return
// }
// console.log('validating')

// const replacedToken = token.replace(/\./g, '/')
// console.log('replacedToken', replacedToken)
