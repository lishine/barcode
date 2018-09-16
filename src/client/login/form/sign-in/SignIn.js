import React, { Fragment } from 'react'
import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'

import Modal from 'login/form/Modal'
import EmailInput from 'login/form/inputs/EmailInput'
import PasswordInput from 'login/form/inputs/PasswordInput'

import { validate } from 'login/form/validate'
import { schema } from './schema'

export default () => (
	<Modal isOpen>
		<Title>Sign In</Title>
		<Formik
			initialValues={{
				email: '',
				password: '',
				passwordConfirmation: '',
			}}
			validate={validate(schema)}
			onSubmit={(values, { setSubmitting, setErrors }) =>
				setTimeout(() => {
					console.log('User has been sucessfully saved!', values)
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
					<Button type="submit">Submit</Button>
				</Form>
			)}
		/>
	</Modal>
)
