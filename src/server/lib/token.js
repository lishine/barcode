import get from 'lodash/fp/get'
import { encode, decode } from 'jwt-simple'

export function createToken({ userId, expire, isNewPassword }) {
	const timestamp = new Date().getTime()
	return encode({ userId, iat: timestamp, expire, isNewPassword }, process.env.JWT_SECRET)
}

export function decodeToken(token) {
	const decoded = decode(token, process.env.JWT_SECRET)
	console.log('decoded', decoded)
	return decoded || {}
}
