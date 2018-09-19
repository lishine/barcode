import React, { Fragment } from 'react'
import Link from 'redux-first-router-link'
import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'
import axios from 'axios'
import { createMask } from 'recondition'

import EmailInput from 'login/form/inputs/EmailInput'
import PasswordInput from 'login/form/inputs/PasswordInput'
import PasswordConfirmationInput from 'login/form/inputs/PasswordConfirmationInput'

import { LoginContext } from 'login/LoginContainer'

import { validate } from 'login/form/validate'
import * as forms from './forms'

const onSubmit = (values, actions, page, setToken, go, setEmail) => {
	console.log('values', values)
	console.log('actions', actions)
	const { email, password } = values

	axios
		.post(`/api/${page}`, { email, password })
		.then(function(response) {
			setToken(response.data.token)
			setEmail(email)
			go('HOME')
		})
		.catch(function(err) {
			console.log('err', JSON.stringify(err))
		})
}

export default () => (
	<LoginContext.Consumer>
		{({ page, setToken, go, setEmail }) => {
			const { initialValues, show, schema, title } = forms[page]
			const Show = createMask(show)
			// go('HOME')
			return (
				<Fragment>
					<Link to="/">home</Link>
					<Title>{title}</Title>
					<Formik
						initialValues={initialValues}
						validate={validate(schema)}
						onSubmit={(values, actions) =>
							onSubmit(values, actions, page, setToken, go, setEmail)
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
							return (
								<Form onSubmit={handleSubmit}>
									<Show.Case email>
										<Field name="email" component={EmailInput} />
									</Show.Case>
									<Show.Case password>
										<Field
											name="password"
											component={PasswordInput}
										/>
									</Show.Case>
									<Show.Case passwordConfirmation>
										<Field
											name="passwordConfirmation"
											component={PasswordConfirmationInput}
										/>
									</Show.Case>
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
