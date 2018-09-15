import React, { Component, Fragment } from 'react'
import Link from 'redux-first-router-link'
import { connect } from 'react-redux'

import Login from '../login/Login'

const mapStateToProps = ({ userId }) => ({ userId })
const mapDispatchToProps = (dispatch) => ({
	onClick: () => dispatch({ type: 'USER', payload: { id: 5 } }),
})

const App = ({ userId, onClick }) => <Login />

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

// {!userId ? (
//     <div>
//         <h1>HOME</h1>

//         <LinkButton to="/user/123">123</LinkButton>

//         <Link to={{ type: 'USER', payload: { id: 456 } }}>
//             <Button>456</Button>
//         </Link>
//         <span onClick={onClick}>User 5</span>
//     </div>
// ) : (
//     <h1>USER: {userId}</h1>
// )}

// fetch('/api/getUsername')
// .then((res) => res.json())
// .then((user) => this.setState({ username: user.username }))
