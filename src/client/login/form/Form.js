import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'
import axios from 'axios'
import Link from 'redux-first-router-link'

import { When } from 'react-if'
import { Map } from 'utils'

import { LoginContext } from 'login/LoginContainer'

import { validate } from './validate'
import { formData } from './data'
import * as routes from 'store/constants/routes'

const onSubmit = (values, actions, page, setToken, redirect, setEmail) => {
	console.log('values', values)
	console.log('actions', actions)

	axios
		.post(`/auth/${page}`, values)
		.then(function(response) {
			switch (page) {
				case routes.SIGN_UP:
					redirect(routes.SIGN_UP, { alert: 'success' })
					break
				case routes.SIGN_IN:
					const token = get('data.token')(response)
					setToken(token)
					redirect(routes.HOME)
					break
				case routes.FORGOT_PASSWORD:
					redirect(routes.FORGOT_PASSWORD, { alert: 'success' })
					break
			}
		})
		.catch(function(err) {
			console.log('err', JSON.stringify(err))
		})
}

export default () => (
	<LoginContext.Consumer>
		{({ page, setToken, redirect, setEmail }) => {
			console.log('init(page)', formData(page))
			console.log('page', page)
			console.log('routes.SIGN_IN', routes.SIGN_IN)
			const { initialValues, show, schema, title } = formData(page)

			return (
				<>
					<div onClick={() => redirect(routes.SIGN_UP, { alert: 'success' })}>
						signup-success
					</div>
					<div onClick={() => redirect(routes.SIGN_UP, { alert: 'failure' })}>
						signup-failure
					</div>
					<div
						onClick={() => redirect(routes.FORGOT_PASSWORD, { alert: 'success' })}>
						fp-success
					</div>
					<Title>{title}</Title>
					<Formik
						initialValues={initialValues}
						validate={validate(schema)}
						onSubmit={(values, actions) =>
							onSubmit(values, actions, page, setToken, redirect, setEmail)
						}
						render={({ handleSubmit }) => {
							return (
								<Form onSubmit={handleSubmit}>
									<Map collection={show}>
										{({ name, component }) => (
											<Field {...{ key: name, name, component }} />
										)}
									</Map>
									<When condition={page === routes.SIGN_IN}>
										<Link to="/forgot-password">forgot password</Link>
									</When>
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
