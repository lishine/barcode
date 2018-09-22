import Login from '../login/Login'
import Link from 'redux-first-router-link'
import { When } from 'react-if'

import AppContainer, { AppContext } from 'app/AppContainer'
import * as domains from 'store/constants/domains'

export default AppContainer(
	<>
		<AppContext.Consumer>
			{({ domain, page, token, email, setToken, setEmail }) => {
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
						<div>domain: {domain}</div>
						<div>page: {page}</div>
						<div>token: {token}</div>
						<div>email: {email}</div>
						<When condition={domain === domains.LOGIN}>
							<Login />
						</When>
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
