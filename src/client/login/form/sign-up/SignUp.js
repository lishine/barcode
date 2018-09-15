import React, { Component, Fragment } from 'react'
import { Formik, Field } from 'formik'

import { StyledField, Button, Form, Title, Text, Label } from './styled'
import EmailInput from '../components/EmailInput'

import { validate } from './validate'
import { schema } from './schema'

const initialValues = {
	email: '',
	password: '',
	passwordConfirmation: '',
}

export default () => (
	<Fragment>
		<Title>Sign Up</Title>
		<Formik
			initialValues={initialValues}
			validate={validate(schema)}
			onSubmit={onSubmit}
			render={SignUp}
		/>
	</Fragment>
)

function onSubmit(values, { setSubmitting, setErrors }) {
	setTimeout(() => {
		console.log('User has been sucessfully saved!', values)
		setSubmitting(false)
	}, 2000)
}

const SignUp = ({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => {
	console.log('values', values)
	return (
		<Form onSubmit={handleSubmit}>
			<Field name="email" component={EmailInput} />
			<div>
				<StyledField
					autoComplete="new-password"
					border={touched.password && errors.password && '1px solid red'}
					type="password"
					name="password"
					placeholder="Password"
				/>
				{touched.password && errors.password && <Text color="red">{errors.password}</Text>}
			</div>
			<div>
				<StyledField
					autoComplete="new-password"
					border={
						touched.passwordConfirmation && errors.passwordConfirmation && '1px solid red'
					}
					type="password"
					name="passwordConfirmation"
					placeholder="Password confirmation"
				/>
				{touched.passwordConfirmation &&
					errors.passwordConfirmation && (
						<Text color="red">{errors.passwordConfirmation}</Text>
					)}
			</div>
			<Button type="submit">Submit</Button>
		</Form>
	)
}
