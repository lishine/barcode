import React, { Component } from 'react'
import Link from 'redux-first-router-link'
import { connect } from 'react-redux'
import styled, { injectGlobal } from 'styled-components'

import { LinkButton, Button } from '../styled'

injectGlobal`
  h1 {
    color: green;
  }
  
  body {
    text-align: center;
    margin: auto;
  }
`

const mapStateToProps = ({ userId }) => ({ userId })
const mapDispatchToProps = (dispatch) => ({
	onClick: () => dispatch({ type: 'USER', payload: { id: 5 } }),
})

const App = ({ userId, onClick }) => (
	<div>
		{!userId ? (
			<div>
				<h1>HOME</h1>

				<LinkButton to="/user/123">123</LinkButton>

				<Link to={{ type: 'USER', payload: { id: 456 } }}>
					<Button>456</Button>
				</Link>
				<span onClick={onClick}>User 5</span>
			</div>
		) : (
			<h1>USER: {userId}</h1>
		)}
	</div>
)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

// fetch('/api/getUsername')
// .then((res) => res.json())
// .then((user) => this.setState({ username: user.username }))
