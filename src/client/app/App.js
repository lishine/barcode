import Login from '../login/Login'
import Link from 'redux-first-router-link'
import { When } from 'react-if'

import AppContainer, { AppContext } from 'app/AppContainer'

import * as domains from 'store/constants/domains'
import { token, email } from 'store/auth/selectors'
import { domain, page } from 'store/router/selectors'
import { logout } from 'store/auth/actions'

export default connect({ domain, page, token, email })(props => {
	const { domain, page, token, email } = props
	return (
		<>
			<Link to={logout()}>logout</Link>
			<div>domain: {domain}</div>
			<div>page: {page}</div>
			<div>token: {token}</div>
			<div>email: {email}</div>
			<When condition={domain === domains.LOGIN}>
				<Login />
			</When>
		</>
	)
})

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
