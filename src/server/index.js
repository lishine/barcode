import humps from 'humps'
import lowerFirst from 'lodash/fp/lowerFirst'
import massive from 'massive'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
// import ip from 'ip'
// import os from 'os'
import './config'

// import { dropQuery, createQuery } from './data/users'
import * as auth from '../server/lib/auth'
import * as api from '../server/api'
import { sendError } from '../server/lib/error'
import * as users from './data/users'
import * as profile from './data/profile'

export const app = express()
// const host = app.get('ip')
// console.log('host', host)
// console.log('ip', ip.address())
// console.log('os.hostname()', os.hostname())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.post('/auth/signin', auth.signIn)
// app.post('/auth/signup', auth.signUp)
// app.post('/auth/registerconfirm', auth.registrationConfirm)
// app.post('/auth/forgotpassword', auth.forgotPassword)
// app.post('/auth/newpassword', auth.newPassword)
app.post('/auth/all', async (req, res, next) => {
	const { app, body, headers } = req
	const { host } = headers
	const { endpoint, data } = body
	console.log('endpoint', endpoint)
	console.log('data', data)

	const db = app.get('db')
	try {
		const sendData = await auth[lowerFirst(endpoint)](data, db, host)
		res.json({ type: 'success', endpoint, data: sendData })
	} catch (err) {
		sendError(res)(err)
	}
})

app.use('/api/*', async (req, res, next) => {
	const { headers } = req
	const { token } = headers

	try {
		Object.assign(req, await auth.validateTokenMid(token))
		next()
	} catch (err) {
		sendError(res)(err)
	}
})

app.post('/api/all', async (req, res, next) => {
	const { app, body } = req
	const { endpoint, data, download } = body
	console.log('endpoint', endpoint)
	const db = app.get('db')
	const { user } = req
	try {
		const sendData = await api[lowerFirst(endpoint)]({ data, db, user })
		if (download) {
			console.log('sendData', sendData)
			res.sendFile(sendData)
		} else {
			res.json({ type: 'success', endpoint, data: sendData })
		}
	} catch (err) {
		sendError(res)(err)
	}
})

// app.get('/api1/check', (req, res) =>
// 	res.json({ sucess: true, check: true, secret: process.env.JWT_SECRET })
// )

app.get('/api1/drop-profile', (req, res) => {
	console.log('here profile')
	let db = req.app.get('db')
	db.query(profile.drop)
		.then(() => db.reload(instance => (db = instance)))
		.then(() => db.reload(instance => req.app.set('db', instance)))
		.then(() => res.json({ message: 'db dropped and reloaded', success: true }))
		.catch(err => res.status(500).json({ error: err }))
})

app.get('/api1/create-profile', (req, res) => {
	console.log('here profile')
	let db = req.app.get('db')
	db.query(profile.create)
		.then(() => db.reload(instance => (db = instance)))
		.then(() => db.reload(instance => req.app.set('db', instance)))
		.then(() => res.json({ message: 'db created and reloaded', success: true }))
		.catch(err => res.status(500).json({ error: err }))
})

app.get('/api1/drop-users', (req, res) => {
	console.log('here users')
	let db = req.app.get('db')
	db.query(users.drop)
		.then(() => db.reload(instance => (db = instance)))
		.then(() => db.reload(instance => req.app.set('db', instance)))
		.then(() => res.json({ message: 'db dropped and reloaded', success: true }))
		.catch(err => res.status(500).json({ error: err }))
})

app.get('/api1/create-users', (req, res) => {
	console.log('here users')
	let db = req.app.get('db')
	db.query(users.create)
		.then(() => db.reload(instance => (db = instance)))
		.then(() => db.reload(instance => req.app.set('db', instance)))
		.then(() => res.json({ message: 'db created and reloaded', success: true }))
		.catch(err => res.status(500).json({ error: err }))
})

// app.get('/api1/drop', (req, res) => {
// 	const db = req.app.get('db')
// 	db.query(dropQuery)
// 		.then(() => db.reload(instance => req.app.set('db', instance)))
// 		.then(() => res.json({ message: 'db dropped and reloaded', success: true }))
// 		.catch(err => res.status(500).json({ error: err }))
// })

// app.get('/api1/insert', (req, res) => {
// 	const db = req.app.get('db')
// 	db.users
// 		.insert({ name: 1, email: 2 * Math.random() * 10, password: 3 })
// 		.then(user => res.json({ user, success: true }))
// 		.catch(err => res.status(500).json({ error: err }))
// })

// app.get('/api1/send-email', (req, res) => {
// 	email
// 		.sendRegistrationEmail(res)
// 		.then(info => res.status(200).json({ info }))
// 		.catch(err => res.status(500).json({ error: 'email not sent', err }))
// })

app.use(express.static('dist'))

app.use((req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, '../../dist/index.html'))
})

app.use(function(err, req, res, next) {
	res.status(500).json({ sucess: false, err })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening on port', PORT))

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL)

const config = process.env.DATABASE_URL || {
	host: 'localhost',
	port: 5432,
	database: 'barcode',
	user: 'admin',
	password: '',
	ssl: false,
	poolSize: 10,
}

// const camelizeColumns = data => {
// 	const template = data[0]
// 	for (let prop in template) {
// 		const camel = pgPromise.utils.camelize(prop)
// 		if (!(camel in template)) {
// 			for (let i = 0; i < data.length; i++) {
// 				let d = data[i]
// 				d[camel] = d[prop]
// 				delete d[prop]
// 			}
// 		}
// 	}
// }

// function camelizeColumns(data) {
// 	var template = data[0]
// 	for (var prop in template) {
// 		var camel = humps.camelize(prop)
// 		if (!(camel in template)) {
// 			for (var i = 0; i < data.length; i++) {
// 				var d = data[i]
// 				d[camel] = d[prop]
// 				delete d[prop]
// 			}
// 		}
// 	}
// }

const pgConfig = {
	receive: (data, result, e) => {
		// console.log('*data', data)
		// console.log('result', result)
		// console.log('e', e)
		// camelizeColumns(data)
		// console.log('**data', data)
	},
}

massive(config, {}, pgConfig)
	.then(instance => {
		app.set('db', instance)
		// const c = app.get('db').listTables()
	})
	.catch(err => console.log('err', err))

console.log({
	send: process.env.NODE_ENV === 'production',
	preview: process.env.NODE_ENV === 'development',
})
