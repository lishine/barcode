import React, { Fragment } from 'react'
import { NavLink } from 'redux-first-router-link'
import { Grid, Cell } from 'styled-css-grid'
import { When } from 'react-if'

import Form from './form/Form'
import LoginContainer, { LoginContext } from './LoginContainer'
import Modal from 'login/form/Modal'
import NavLinks from './NavLinks'

import { some } from 'utils'

export default LoginContainer(
	<LoginContext.Consumer>
		{({ page }) => {
			console.log('page', page)

			return (
				<When condition={some(page, ['SignUp', 'SignIn'])}>
					<Modal isOpen>
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
				</When>
			)
		}}
	</LoginContext.Consumer>
)
