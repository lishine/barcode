import humps from 'humps'
import { throwError, throwIf } from '../../server/lib/error'
import { changePassword } from '../lib/auth/utils/changePassword'

function camelizeColumns(data) {
	var template = data[0] || data
	for (var prop in template) {
		var camel = humps.camelize(prop)
		if (!(camel in template)) {
			for (var i = 0; i < data.length; i++) {
				var d = data[i]
				d[camel] = d[prop]
				delete d[prop]
			}
		}
	}
}

function decamelizeColumns(data) {
	var template = data[0] || data
	for (var prop in template) {
		var camel = humps.decamelize(prop)
		if (!(camel in template)) {
			for (var i = 0; i < data.length; i++) {
				var d = data[i]
				d[camel] = d[prop]
				delete d[prop]
			}
		}
	}
}

export async function loadProfile({ data, db, user: { id: user_id } }) {
	console.log('should load data')

	// console.log('db', db)
	const profile = await db.profile
		.findOne({ user_id })
		.then(throwIf(profile => !profile, 400, 'Profile not found'))
		.catch(throwError(400, 'Profile not found'))
	console.log('profile', profile)
	camelizeColumns([profile])
	console.log('profile', profile)

	const user = await db.users
		.findOne({ id: user_id })
		.then(throwIf(user => !user, 400, 'User not found'))
		.catch(throwError(400, 'User not found'))

	profile.email = user.email
	return profile
}

export async function updateProfile({ data: values, db, user }) {
	console.log('should update data')
	const { id } = user
	console.log('values', values)
	if (values.password) {
		const { password, passwordConfirmation } = values
		return changePassword({ userId: id, password, passwordConfirmation, db }).catch(
			throwError(400, 'error updating user')
		)
	} else {
		delete values.email
		console.log('values', values)
		decamelizeColumns([values])
		console.log('values', values)
		const profile = await db.profile
			.update({ user_id: id }, values)
			.then(throwIf(profile => !profile, 400, 'Profile update error'))
			.catch(throwError(400, 'Profile update error'))
		console.log('profile', profile)
		camelizeColumns(profile)
		console.log('updated profile', profile)
		return profile[0]
	}
}
