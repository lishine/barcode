import React, { Fragment } from 'react'
import Link from 'redux-first-router-link'
import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'

import EmailInput from 'login/form/inputs/EmailInput'
import PasswordInput from 'login/form/inputs/PasswordInput'
import PasswordConfirmationInput from 'login/form/inputs/PasswordConfirmationInput'

import { LoginContext } from 'login/LoginContainer'

import { validate } from 'login/form/validate'
import * as forms from './forms'

const onSubmit = (values, actions) => {
	console.log('values', values)
	console.log('actions', actions)
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
						onSubmit={onSubmit}
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
