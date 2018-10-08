import Login from 'login/view/Login'
import Profile from 'profile/view/Profile'
import { routes } from 'router/routes'
import { gotoProfile, gotoHome } from 'router/actions'
import { getPage } from 'router/selectors'
import { logout } from 'auth/actions'

export default connect({ page: getPage })(props => {
	const { page } = props
	console.log('page', page)

	return (
		<>
			<button type="button" onClick={() => dispatch(logout())}>
				logout
			</button>
			<button type="button" onClick={() => dispatch(gotoHome())}>
				home
			</button>
			<button type="button" onClick={() => dispatch(gotoProfile())}>
				profile
			</button>

			{when(page)
				.is(routes.HOME, () => <div>I am home</div>)
				.is(routes.PROFILE, () => <Profile />)
				.is(routes.LOGIN, () => <Login />)
				.else(() => {})()}
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
