import Login from 'login/view/Login'
import Profile from 'profile/view/Profile'
import { routes } from 'router/routes'
import { gotoProfile, gotoHome, gotoOrders } from 'router/actions'
import { getPage } from 'router/selectors'
import { logout } from 'auth/actions'
import Orders from 'orders/view/Orders'

export default connect({ page: getPage })(props => {
	const { page } = props
	console.log('page', page)

	return (
		// <div>
		// 	<a style={{ display: 'inline-block' }}>saaa1</a>
		// 	<a style={{ display: 'inline-block', margin: 0, padding: 0 }}>saaa1</a>
		// 	<article style={{ display: 'inline-block', margin: 0, padding: 0 }}>saaa1</article>
		// 	<article style={{ display: 'inline-block', margin: 0, padding: 0 }}>saaa1</article>
		// 	<div style={{ width: '800px', margin: 0, padding: 0 }}>saaa1</div>
		// 	<div style={{ display: 'inline-block', width: '800px', margin: 0, padding: 0 }}>saaa1</div>
		// 	<div
		// 		style={{
		// 			whiteSpace: 'pre-wrap',
		// 			display: 'inline-block',
		// 			width: '1500px',
		// 			margin: 0,
		// 			padding: 0,
		// 		}}>
		// 		{`
		//         ss2sdf
		//         dsfsd
		//         ss2efs
		//         `}
		// 		sssssssswwwwwwwwwwwwwwwwwwqqqqqqqdddddddddwwwwwwwwssaassssssss ssaaa2sdssssssss
		// 	</div>
		// 	<div style={{ display: 'block', width: '300px', margin: 0, padding: 0 }}>saaa3</div>
		// </div>
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
			<button type="button" onClick={() => dispatch(gotoOrders())}>
				orders
			</button>

			{when(page)
				.is(routes.HOME, () => <div>I am home</div>)
				.is(routes.PROFILE, () => <Profile />)
				.is(routes.LOGIN, () => <Login />)
				.is(routes.ORDERS, () => <Orders />)
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
