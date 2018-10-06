import styled from 'styled-components'
import { RouterLink } from 'router/RouterLink'

export const Link = styled(RouterLink).attrs({
	activeClassName: 'active',
})`
	height: 30px;
	background-color: #444;
	color: yellow;
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	text-decoration: none;

	&.active {
		background-color: #222;
	}
`

// > (
// 	<Flex w={1}>
// 		<Box w={1 / 2}>
// 			<NavLink
// 				to={{ type: routes.SIGN_UP, payload: { alert: 'form' } }}
// 				style={{
// 					height: '30px',
// 					backgroundColor: '#444',
// 					color: 'yellow',
// 					display: 'flex',
// 					textAlign: 'center',
// 					justifyContent: 'center',
// 					alignItems: 'center',
// 					textDecoration: 'none',
// 				}}
// 				activeStyle={{
// 					backgroundColor: '#222',
// 				}}>
// 				sign up
// 			</NavLink>
// 		</Box>
// 		<Box w={1 / 2}>
// 			<NavLink
// 				to={{ type: routes.SIGN_IN, payload: { alert: 'form' } }}
// 				style={{
// 					height: '30px',
// 					backgroundColor: '#444',
// 					color: 'yellow',
// 					display: 'flex',
// 					textAlign: 'center',
// 					justifyContent: 'center',
// 					alignItems: 'center',
// 					textDecoration: 'none',
// 				}}
// 				activeStyle={{
// 					backgroundColor: '#222',
// 				}}>
// 				sign in
// 			</NavLink>
// 		</Box>
// 	</Flex>
// )
