import nodemailer from 'nodemailer'
import Email from 'email-templates'
import { createToken, decodeToken } from './token'

export function sendRegistrationEmail({ req, userId, name, email }) {
	const token = createToken({ userId })

	const host = req.headers.host
	const path = 'register-confirm'
	const link = `http://${host}/${path}?token=${token}`

	createEmailTransport().send({
		template: 'register-confirmation',
		message: {
			to: 'vim55k@gmail.com',
		},
		locals: {
			name,
			link,
		},
	})
}

export function sendNewPasswordEmail({ req, userId, name, email }) {
	const token = createToken({ userId, isNewPassword: true })

	const host = req.headers.host
	const path = 'new-password'
	const link = `http://${host}/${path}?token=${token}`

	createEmailTransport().send({
		template: 'new-password',
		message: {
			to: 'vim55k@gmail.com',
		},
		locals: {
			name,
			link,
		},
	})
}

const createTransport = () =>
	nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.EMAIL_PASSWORD,
		},
	})

const createEmailTransport = () =>
	new Email({
		message: {
			from: 'qflyit@gmail.com',
		},
		send: false,
		preview: true,
		transport: createTransport(),
	})
