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
	const { setStatus, setSubmiting } = actions
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
					redirect(routes.SIGN_IN, { alert: 'success' })
					break
				case routes.FORGOT_PASSWORD:
					redirect(routes.FORGOT_PASSWORD, { alert: 'success' })
					break
				case routes.NEW_PASSWORD:
					redirect(routes.NEW_PASSWORD, { alert: 'success' })
					break
			}
		})
		.catch(function(err) {
			console.dir(err)
			const message = get('response.data.error')(err)
			const status = get('response.status')(err)
			// console.log('err:', JSON.Stringify(err))
			switch (page) {
				case routes.SIGN_UP:
					redirect(routes.SIGN_UP, { alert: 'failure' })
					break
				case routes.SIGN_IN:
					redirect(routes.SIGN_IN, { alert: 'failure' })
					break
				case routes.FORGOT_PASSWORD:
					// actions.setTouched(false)
					// actions.setStatus(true)
					actions.setStatus({
						values,
						error: (status === 400 && message) || 'ERROR',
					})
					// actions.handleChange = () => console.log('CHANGE')
					// redirect(routes.FORGOT_PASSWORD, { alert: 'failure' })
					break
				case routes.NEW_PASSWORD:
					redirect(routes.NEW_PASSWORD, { alert: 'failure' })
					break
			}
		})
}

export default () => (
	<LoginContext.Consumer>
		{({ page, setToken, redirect, setEmail }) => {
			console.log('init(page)', formData(page))
			console.log('page', page)
			console.log('routes.SIGN_IN', routes.SIGN_IN)
			const { initialValues, show, schema, title } = formData(page)
			console.log('show', show)
			return (
				<>
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
						render={({ isSubimting, status, setStatus, values, ...bag }) => {
							console.log('bag', bag)
							console.log('status', status)
							const error = get('error')(status)
							if (error && values !== status.values) {
								setStatus(Object.assign({}, status, { error: undefined }))
							}

							return (
								<Form onSubmit={bag.handleSubmit}>
									<div onClick={() => bag.setError({ aaa: 'aaaaaa' })}>
										signup-success
									</div>
									<Map collection={show}>
										{({ name, component }) => (
											<Field {...{ key: name, name, component }} />
										)}
									</Map>
									<When condition={page === routes.SIGN_IN}>
										<Link
											to={{
												type: routes.FORGOT_PASSWORD,
												payload: { alert: 'form' },
											}}>
											forgot password
										</Link>
									</When>
									<When condition={!!error}>{error}</When>

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
