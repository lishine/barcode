import map from 'lodash/fp/map'
import React, { Fragment } from 'react'
import Link from 'redux-first-router-link'
import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'
import axios from 'axios'
import { When } from 'react-if'

import EmailInput from 'login/form/inputs/Email'
import PasswordInput from 'login/form/inputs/PasswordConfirmation'
import PasswordConfirmationInput from 'login/form/inputs/Password'

import { LoginContext } from 'login/LoginContainer'

import { validate } from 'login/form/validate'
import * as forms from './forms'

const onSubmit = (values, actions, page, setToken, redirect, setEmail) => {
	console.log('values', values)
	console.log('actions', actions)
	const { email, password } = values

	axios
		.post(`/api/${page}`, { email, password })
		.then(function(response) {
			setToken(response.data.token)
			setEmail(email)
			redirect('HOME')
		})
		.catch(function(err) {
			console.log('err', JSON.stringify(err))
		})
}

export default () => (
	<LoginContext.Consumer>
		{({ page, setToken, redirect, setEmail }) => {
			const { initialValues, show, schema, title } = forms[page]

			return (
				<>
					<Link to="/">home</Link>
					<Title>{title}</Title>
					<Formik
						initialValues={initialValues}
						validate={validate(schema)}
						onSubmit={(values, actions) =>
							onSubmit(
								values,
								actions,
								page,
								setToken,
								redirect,
								setEmail
							)
						}
						render={({ handleSubmit }) => {
							return (
								<Form onSubmit={handleSubmit}>
									{map(
										(component, name) => (
											<When name={name}>
												<Field {...{ name, component }} />
											</When>
										),
										show
									)}
									<Button type="submit">Submit</Button>
								</Form>
							)
						}}
					/>
				</>
			)
		}}
	</LoginContext.Consumer>
)
