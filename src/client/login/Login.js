import React, { Fragment } from 'react'
import { NavLink } from 'redux-first-router-link'
import { Grid, Cell } from 'styled-css-grid'

import Form from './form/Form'
import LoginContainer, { LoginContext } from './LoginContainer'
import Modal from 'login/form/Modal'
import NavLinks from './NavLinks'

export default LoginContainer(
	<LoginContext.Consumer>
		{({ page }) => {
			const isOpen = ['SignUp', 'SignIn'].some((val) => val === page)
			return (
				<div>
					<Modal isOpen={isOpen}>
						<Grid columns={1}>
							<Cell>
								{' '}
								<NavLinks />
							</Cell>
							<Cell>
								<Form />
							</Cell>
						</Grid>
					</Modal>
				</div>
			)
		}}
	</LoginContext.Consumer>
)
