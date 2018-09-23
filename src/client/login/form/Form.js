import { Formik, Field } from 'formik'
import { Button, Form, Title } from 'styled'
import axios from 'axios'
import Link from 'redux-first-router-link'
import ProgressButton from 'react-progress-button'
import 'react-progress-button/react-progress-button.css'

import { When } from 'react-if'
import { Map } from 'utils'

import { LoginContext } from 'login/LoginContainer'

import { validate } from './validate'
import { errors, formData } from './data'
import * as routes from 'store/constants/routes'

const onSubmit = async (values, actions, page, setToken, redirect, setEmail) => {
	console.log('values', values)
	console.log('actions', actions)
	const { setStatus, setSubmitting } = actions
	let apiRoute = page
	if (page === 'sendRegLink') {
		apiRoute = routes.SIGN_IN
		values = Object.assign({}, values, { sendRegLink: true })
	}

	setSubmitting(true)
	await sleep(1000)

	axios
		.post(`/auth/${apiRoute}`, values)
		.then(function(response) {
			setSubmitting(false)
			let token
			switch (page) {
				case 'sendRegLink':
					redirect(routes.SIGN_UP, { alert: 'success' })
					break
				case routes.SIGN_UP:
					redirect(routes.SIGN_UP, { alert: 'success' })
					break
				case routes.SIGN_IN:
					token = get('data.token')(response)
					setToken(token)
					redirect(routes.SIGN_IN, { alert: 'success' })
					break
				case routes.FORGOT_PASSWORD:
					redirect(routes.FORGOT_PASSWORD, { alert: 'success' })
					break
				case routes.NEW_PASSWORD:
					token = get('data.token')(response)
					setToken(token)
					redirect(routes.NEW_PASSWORD, { alert: 'success' })
					break
			}
		})
		.catch(function(err) {
			setSubmitting(false)
			console.dir(err)
			const message = get('response.data.error')(err)
			const status = get('response.status')(err)
			const code = get('response.data.code')(err)
			const setError = ({ sendLink }) => {
				actions.setStatus({
					values,
					data: {
						sendLink,
						error: (status === 400 && message) || 'Something went wrong',
					},
				})
			}
			switch (page) {
				case routes.SIGN_UP:
					setError({})
					break
				case 'sendRegLink':
				case routes.SIGN_IN:
					if (code === errors.USER_NOT_CONFIRMED) {
						console.log('111')
						setError({ sendLink: true })
					} else {
						console.log('222')

						setError({})
					}
					break
				case routes.FORGOT_PASSWORD:
					// actions.setTouched(false)
					// actions.setStatus(true)
					// actions.handleChange = () => console.log('CHANGE')
					// redirect(routes.FORGOT_PASSWORD, { alert: 'failure' })
					setError({})
					break
				case routes.NEW_PASSWORD:
					setError({})
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
						render={({
							setSubmitting,
							handleSubmit,
							isSubmitting,
							status,
							setStatus,
							values,
							...bag
						}) => {
							console.log('bag', bag)
							console.log('status', status)
							console.log('isSubmitting', isSubmitting)
							const error = get('data.error')(status)
							const sendLink = get('data.sendLink')(status)
							if (error && values !== status.values) {
								setStatus(Object.assign({}, status, { data: undefined }))
							}

							return (
								<Form onSubmit={handleSubmit}>
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
									<When condition={!!sendLink}>
										<div>
											<Link
												onClick={() =>
													onSubmit(
														values,
														{ setStatus, setSubmitting },
														'sendRegLink',
														setToken,
														redirect,
														setEmail
													)
												}>
												Resend email
											</Link>
										</div>
									</When>
									<ProgressButton
										type="submit"
										state={isSubmitting ? 'loading' : ''}>
										Submit
									</ProgressButton>
								</Form>
							)
						}}
					/>
				</>
			)
		}}
	</LoginContext.Consumer>
)
