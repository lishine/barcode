import React, { Fragment } from 'react'
import Login from '../login/Login'

export default () => (
	<Fragment>
		<Login />
	</Fragment>
)

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
