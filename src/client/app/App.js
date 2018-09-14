import React, { Component } from 'react'
import Link from 'redux-first-router-link'
import { connect } from 'react-redux'

import './app.css'

const mapStateToProps = ({ userId }) => ({ userId })
const mapDispatchToProps = (dispatch) => ({
	onClick: () => dispatch({ type: 'USER', payload: { id: 5 } }),
})

const App = ({ userId, onClick }) => (
	<div>
		{!userId ? (
			<div>
				<h1>HOME</h1>

				<Link to="/user/123">User 123</Link>
				<Link to={{ type: 'USER', payload: { id: 456 } }}>User 456</Link>
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
