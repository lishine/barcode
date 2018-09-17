import React, { Fragment } from 'react'
import { NavLink } from 'redux-first-router-link'
import { Grid, Cell } from 'styled-css-grid'

export default () => (
	<Grid columns={2}>
		<Cell>
			<NavLink
				to="/sign-up"
				style={{
					height: '30px',
					backgroundColor: '#444',
					color: 'yellow',
					display: 'flex',
					textAlign: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					textDecoration: 'none',
				}}
				activeStyle={{
					backgroundColor: '#222',
				}}>
				sign up
			</NavLink>
		</Cell>
		<Cell>
			<NavLink
				to="/sign-in"
				style={{
					height: '30px',
					backgroundColor: '#444',
					color: 'yellow',
					display: 'flex',
					textAlign: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					textDecoration: 'none',
				}}
				activeStyle={{
					backgroundColor: '#222',
				}}>
				sign in
			</NavLink>
		</Cell>
	</Grid>
)
