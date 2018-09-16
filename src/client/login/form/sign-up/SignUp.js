import React, { Fragment } from 'react'
import Link from 'redux-first-router-link'
import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'

import Modal from 'login/form/Modal'
import EmailInput from '../inputs/EmailInput'
import PasswordInput from '../inputs/PasswordInput'
import PasswordConfirmationInput from '../inputs/PasswordConfirmationInput'
import { LoginContext } from 'login/LoginContainer'

import { validate } from 'login/form/validate'
import { schema } from './schema'

export default () => (
	<LoginContext.Consumer>
		{({ location, page, goto }) => {
			console.log('page', page)
			console.log('location', location)

			return (
				<Modal isOpen>
					<span onClick={() => goto('/1/click')}>click</span>
					<Link to="/1"> push 1</Link>
					<Link to="/2"> push 2</Link>
					<Title>Sign Up</Title>
					<Formik
						initialValues={{
							email: '',
							password: '',
							passwordConfirmation: '',
						}}
						validate={validate(schema)}
						onSubmit={(values, { setSubmitting, setErrors }) =>
							setTimeout(() => {
								console.log(
									'User has been sucessfully saved!',
									values
								)
								setSubmitting(false)
							}, 2000)
						}
						render={({
							touched,
							errors,
							values,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
							<Form onSubmit={handleSubmit}>
								<Field name="email" component={EmailInput} />
								<Field name="password" component={PasswordInput} />
								<Field
									name="passwordConfirmation"
									component={PasswordConfirmationInput}
								/>
								<Button type="submit">Submit</Button>
							</Form>
						)}
					/>
				</Modal>
			)
		}}
	</LoginContext.Consumer>
)
