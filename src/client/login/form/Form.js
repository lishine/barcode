import React, { Fragment } from 'react'
import Link from 'redux-first-router-link'
import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'

import EmailInput from '../inputs/EmailInput'
import PasswordInput from '../inputs/PasswordInput'
import PasswordConfirmationInput from '../inputs/PasswordConfirmationInput'

import { LoginContext } from 'login/LoginContainer'

import { validate } from 'login/form/validate'
import forms from './forms'

export default () => (
	<LoginContext.Consumer>
		{({ page, email, onEmailChange, onSubmit }) => {
			const { initialValues, schema, title } = forms[page]
			let showEmail = false
			const showPassword = initialValues.password !== undefined
			const showPasswordConfirmation =
				initialValues.passwordConfirmation !== undefined
			if (initialValues.email) {
				initialValues.email = email
				showEmail = true
			}
			return (
				<Fragment>
					<Title>{title}</Title>
					<Formik
						initialValues={initialValues}
						validate={validate(schema)}
						onSubmit={onSubmit}
						render={({
							touched,
							errors,
							values,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
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
						)}
					/>
				</Fragment>
			)
		}}
	</LoginContext.Consumer>
)
