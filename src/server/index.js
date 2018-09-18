import massive from 'massive'
import express from 'express'
import path from 'path'

import * as users from './data/users'
require('dotenv').config()

const app = express()
app.use(express.static('dist'))

app.get('/api/create', (req, res) => {
	console.log('creating')
	users
		.create()
		.then(() => res.json({ success: true }))
		.catch((err) => res.json({ error: err }))
})

app.get('/api/drop', (req, res) => {
	users
		.drop()
		.then(() => res.json({ success: true }))
		.catch((err) => res.json({ error: err }))
	console.log('droping')
})

app.get('/api/insert', (req, res) => {
	console.log('req', req.headers)
	console.log('req', req.rawHeaders)
	console.log('inserting')
	app.get('db')
		.users.insert({ name: 1, email: 2 * Math.random() * 10, password: 3 })
		.then((user) => res.json({ user, success: true }))
		.catch((err) => res.json({ error: err }))
})

app.use('*', (req, resp) =>
	resp.sendFile(path.resolve(__dirname, '../../dist/index.html'))
)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening on port', PORT))

massive({
	host: 'localhost',
	port: 5432,
	database: 'barcode',
	user: 'admin',
	password: '',
	ssl: false,
	poolSize: 10,
})
	.then((instance) => {
		app.set('db', instance)
		const c = app.get('db').listTables()
	})
	.catch((err) => console.log('err', err))
