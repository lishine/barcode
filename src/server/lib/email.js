import React, { Fragment } from 'react'
import nodemailer from 'nodemailer'
import Email from 'email-templates'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD,
	},
})

const emailTransport = new Email({
	message: {
		from: 'qflyit@gmail.com',
	},
	send: true,
	preview: false,
	transport: transporter,
})

export const sendRegistrationEmail = ({ email, name, link }) =>
	emailTransport.send({
		template: 'register-confirmation',
		message: {
			to: email,
		},
		locals: {
			name,
			link,
		},
	})
