import nodemailer from 'nodemailer'
import Email from 'email-templates'
import { createToken, decodeToken } from './token'
import { app } from '../../server'

export async function sendRegistrationEmail({ host, userId, name, email }) {
	console.log('sendRegistrationEmail', '{ host, userId, name, email }', { host, userId, name, email })
	const token = createToken({ userId })

	const link = `http://${host}/login?link=register-confirmation&token=${token}`
	console.log('token host link', token, host, link)

	return createEmailTransport().send({
		template: 'register-confirmation',
		message: {
			to: process.env.NODE_ENV === 'production' ? email : 'vim55k@gmail.com',
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
	const link = `http://${host}/login?link=new-password&token=${token}`

	console.log('process.env.NODE_ENV', process.env.NODE_ENV)
	return createEmailTransport().send({
		template: 'new-password',
		message: {
			to: process.env.NODE_ENV === 'production' ? email : 'vim55k@gmail.com',
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
		send: process.env.NODE_ENV === 'production',
		preview: process.env.NODE_ENV === 'development',
		transport: createTransport(),
	})
