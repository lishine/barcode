import get from 'lodash/fp/get'
import { encode, decode } from 'jwt-simple'
import bcrypt from 'bcrypt'

import { createToken, decodeToken } from './token'
import { sendRegistrationEmail, sendNewPasswordEmail } from './email'

const saltRounds = 12

export function forgotPassword(req, res, next) {
	const { app, body } = req
	const { email } = body
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
					return sendRegistrationEmail({ req, userId: user.id, name, email })
						.then(info => res.status(200).json({ info }))
						.catch(err => res.status(400).json({ error: 'Email not sent', err }))
				})
				.catch(err => {
					const code = get('code')(err)
					if (code === '23505') {
						res.status(400).json({ err, error: 'User already exists' })
					} else {
						res.status(500).json({ err, error: 'error saving user' })
					}
				})
		})
		.catch(err => {
			next(err)
		})
}

export function signIn(req, res, next) {
	const { app, body } = req
	const { email, password, sendRegLink } = body
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
					if (validPassword) {
						const token = createToken({ userId: user.id })

						return res.status(200).json({
							token,
						})
					}
				})
				.catch(err => res.status(400).json({ err, error: 'Unauthorized Access' }))
		})
		.catch(err => res.status(400).json({ err, error: 'User not found' }))
}

export function registrationConfirm(req, res, next) {
	const { app, body } = req
	const { token } = body
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

export function newPassword(req, res, next) {
	const { app, body } = req
	const { password, passwordConfirmation, token } = body
	const db = app.get('db')

	console.log('password', password)
	console.log('passwordConfirmation', passwordConfirmation)
	console.log('token', token)

	if (!password || !passwordConfirmation || !token) {
		return res.status(400).json({ error: 'No password or token' })
	}

	const { userId, isNewPassword } = decodeToken(token)

	if (!isNewPassword) {
		return res.status(400).json({ error: 'Not a new password link' })
	}

	return db.users
		.findOne({ id: userId })
		.then(user => {
			console.log('validUser', user)

			bcrypt
				.hash(password, saltRounds)
				.then(hash => {
					return db.users
						.update({ id: userId }, { password: hash })
						.then(user => {
							const newToken = createToken({ userId })
							res.status(200).json({ token: newToken })
						})
						.catch(err => {
							// const code = get('code')(err)
							// if (code === '23505') {
							// res.status(400).json({ err, error: 'User already exists' })
							// } else {
							res.status(500).json({ err, error: 'error updating user' })
							// }
						})
				})
				.catch(err => {
					next(err)
				})
		})
		.catch(err => res.status(400).json({ err, error: 'No user' }))
}

export function validateTokenMid(req, res, next) {
	const { app, body, headers } = req
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

// const fullPath = `${baseUrl}${path}`
// console.log('fullPath', fullPath)
// if (fullPath === '/api/signin/' || fullPath === '/api/signup/') {
// 	return
// }
// console.log('validating')

// const replacedToken = token.replace(/\./g, '/')
// console.log('replacedToken', replacedToken)
