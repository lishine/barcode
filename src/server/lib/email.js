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

const email = new Email({
	message: {
		from: 'qflyit@gmail.com',
	},
	// uncomment below to send emails in development/test env:
	// send: true
	transport: transporter,
})
export function sendEmail(res) {
	email
		.send({
			template: 'register-confirmation',
			message: {
				to: 'vim55k@gmail.com',
			},
			locals: {
				name: 'PVRV',
			},
		})
		.then(console.log)
		.catch(console.error)

	// const mailOptions = {
	// 	from: 'qflyit@gmail.com', // sender address
	// 	to: 'vim55k@gmail.com', // list of receivers
	// 	subject: 'Subject of your email', // Subject line
	// 	html: '<p>Your html here</p>', // plain text body
	// }
	// transporter.sendMail(mailOptions, function(err, info) {
	// 	if (err) {
	// 		res.status(500).json({ err })
	// 		console.log(err)
	// 	} else {
	// 		res.status(200).json({ info })
	// 		console.log(info)
	// 	}
	// })
}
