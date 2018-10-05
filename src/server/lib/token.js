import get from 'lodash/fp/get'
import { encode, decode } from 'jwt-simple'

export function createToken(data) {
	const timestamp = new Date().getTime()
	return encode(Object.assign({}, data, { iat: timestamp }), process.env.JWT_SECRET)
}

export function decodeToken(token) {
	const decoded = decode(token, process.env.JWT_SECRET)
	console.log('decoded', decoded)
	return decoded || {}
}
