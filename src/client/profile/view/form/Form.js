import reject from 'lodash/fp/reject'
import { Formik, Field } from 'formik'
import ProgressButton from 'react-progress-button'

import { Button, Container, GroupLabelRow, FieldRow, SubmitRow, Col, Form, Title, Link } from './styled'
import { Map } from 'utils/utils'
import { profileStore } from 'profile/profileStore'
import { validate } from 'common/form/validate'
import { groups } from './groups'

export default view(props => {
	const { editGroup, values, submit, error, cancel, edit } = profileStore

	return (
		<Container>
			<Title>Profile</Title>
			{values ? (
				<Formik
					initialValues={values}
					validate={editGroup && validate(groups[editGroup].schema)}
					onSubmit={submit}
					render={formikProps => {
						const { handleSubmit, isSubmitting } = formikProps

						return (
							<Form onSubmit={handleSubmit}>
								<Map collection={groups}>
									{({ label, link, fields, showWhenReadOnly }, group) => {
										const editingThisGroup = editGroup === group
										const editing = editGroup

										return (
											<div key={group}>
												<GroupLabelRow>
													<Col>
														<label>{label}</label>
													</Col>
													<Col>
														{!editing && (
															<Link onClick={() => edit(group)}>
																{link}
															</Link>
														)}
														{editingThisGroup && (
															<SubmitRow>
																<Col>
																	<Button
																		type="button"
																		onClick={cancel}>
																		Cancel
																	</Button>
																</Col>
																<Col>
																	<ProgressButton
																		type="submit"
																		state={
																			isSubmitting ? 'loading' : ''
																		}>
																		Submit
																	</ProgressButton>
																</Col>
															</SubmitRow>
														)}
													</Col>
												</GroupLabelRow>
												<Map
													collection={reject(
														field =>
															!editingThisGroup && field.hiddenInViewMode
													)(fields)}>
													{({ name, label, component, viewOnly }, field) => (
														<div key={field}>
															<FieldRow>
																<Col>
																	<label htmlFor={name}>{label}</label>
																</Col>
																<Col>
																	<Field
																		{...{
																			readOnly:
																				viewOnly ||
																				!editingThisGroup,
																			name,
																			component,
																			label,
																			labelPosition: 'side',
																		}}
																	/>
																</Col>
															</FieldRow>
														</div>
													)}
												</Map>

												{error && <div>{error}</div>}
											</div>
										)
									}}
								</Map>
							</Form>
						)
					}}
				/>
			) : (
				'Loading'
			)}
		</Container>
	)
})
