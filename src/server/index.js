import massive from 'massive'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import * as users from './data/users'
import { validateTokenMid, signIn, signUp } from './lib/auth'

require('dotenv').config()

const app = express()
app.use(express.static('dist'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/sign-in', signIn)
app.post('/api/sign-up', signUp)
app.use('/api/*', validateTokenMid)

app.get('/api/check', (req, res) =>
	res.json({ sucess: true, check: true, secret: process.env.JWT_SECRET })
)

app.use(function(err, req, res, next) {
	res.status(500).json({ sucess: false, err })
})

app.use((req, res) => res.sendFile(path.resolve(__dirname, '../../dist/index.html')))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening on port', PORT))

app.get('/api/create', (req, res) => {
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
})

app.get('/api/insert', (req, res) => {
	const db = req.app.get('db')
	db.users
		.insert({ name: 1, email: 2 * Math.random() * 10, password: 3 })
		.then((user) => res.json({ user, success: true }))
		.catch((err) => res.json({ error: err }))
})

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
