import Login from '../login/Login'
import Link from 'redux-first-router-link'

import AppContainer, { AppContext } from 'app/AppContainer'

export default AppContainer(
	<>
		<AppContext.Consumer>
			{({ page, token, email, setToken, setEmail }) => {
				return (
					<>
						<Link
							to="/sign-in"
							onClick={() => {
								setToken('')
								setEmail('')
							}}>
							logout
						</Link>
						<div>page: {page}</div>
						<div>token: {token}</div>
						<div>email: {email}</div>
						<Login />
					</>
				)
			}}
		</AppContext.Consumer>
	</>
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
