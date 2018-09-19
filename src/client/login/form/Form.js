import React, { Fragment } from 'react'
import Link from 'redux-first-router-link'
import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'
import axios from 'axios'

import EmailInput from 'login/form/inputs/EmailInput'
import PasswordInput from 'login/form/inputs/PasswordInput'
import PasswordConfirmationInput from 'login/form/inputs/PasswordConfirmationInput'

import { LoginContext } from 'login/LoginContainer'

import { validate } from 'login/form/validate'
import * as forms from './forms'

const onSubmit = (values, actions, page) => {
	console.log('values', values)
	console.log('actions', actions)
	const { email, password } = values

	axios
		.post(`/api/${page}`, { email, password })
		.then(function(response) {
			console.log('response', response)
		})
		.catch(function({ response: { data, status } }) {
			console.log('status', status)
			console.log('data', data)
		})
}

export default () => (
	<LoginContext.Consumer>
		{({ page, email, onEmailChange }) => {
			const { initialValues, schema, title } = forms[page]
			const showEmail = initialValues.email !== undefined
			const showPassword = initialValues.password !== undefined
			const showPasswordConfirmation =
				initialValues.passwordConfirmation !== undefined
			return (
				<Fragment>
					<Title>{title}</Title>
					<Formik
						initialValues={Object.assign({}, initialValues, { email })}
						validate={validate(schema)}
						onSubmit={(values, actions) =>
							onSubmit(values, actions, page)
						}
						render={({
							touched,
							errors,
							values,
							handleChange,
							handleBlur,
							handleSubmit,
							...bag
						}) => {
							console.log('bag', bag)
							console.log('email', email)
							console.log('page', page)
							console.log('onEmailChange', onEmailChange)
							console.log('values.email', values.email)
							onEmailChange(values.email)
							return (
								<Form onSubmit={handleSubmit}>
									{showEmail && (
										<Field name="email" component={EmailInput} />
									)}
									{showPassword && (
										<Field
											name="password"
											component={PasswordInput}
										/>
									)}
									{showPasswordConfirmation && (
										<Field
											name="passwordConfirmation"
											component={PasswordConfirmationInput}
										/>
									)}
									<Button type="submit">Submit</Button>
								</Form>
							)
						}}
					/>
				</Fragment>
			)
		}}
	</LoginContext.Consumer>
)
