import React, { Fragment } from 'react'
import nodemailer from 'nodemailer'
import Email from 'email-templates'

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

export const sendRegistrationEmail = ({ email, name, link }) =>
	createEmailTransport().send({
		template: 'register-confirmation',
		message: {
			to: email,
		},
		locals: {
			name,
			link,
		},
	})
