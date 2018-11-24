import Login from 'login/view/Login'
import Profile from 'profile/view/Profile'
import { routes } from 'router/routes'
import { gotoProfile, gotoHome, gotoOrders } from 'router/actions'
import { getPage } from 'router/selectors'
import { logout } from 'auth/actions'
import Orders from 'orders/view/Orders'
import { history } from 'router/routes'

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
			<button type="button" onClick={() => dispatch(gotoOrders())}>
				orders
			</button>
			{/* <button type="button" onClick={() => history.goForward()}>
				go forward
			</button>
			<button type="button" onClick={() => history.goBack()}>
				go back
			</button> */}

			{when(page)
				.is(routes.HOME, () => <div>I am home</div>)
				.is(routes.PROFILE, () => <Profile />)
				.is(routes.LOGIN, () => <Login />)
				.is(routes.ORDERS, () => <Orders />)
				.else(() => {})()}
		</>
	)
})
