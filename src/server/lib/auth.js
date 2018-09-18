import { encode, decode } from 'jwt-simple'
import bcrypt from 'bcrypt'

function tokenForUser(user) {
	const timestamp = new Date().getTime()
	encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET)
}

function signUp