import styled from 'styled-components'
import { RouterLink } from 'router/RouterLink'

export const Link = styled(RouterLink).attrs({
	activeClassName: 'active',
})`
	height: 35px;
	background-color: #d4d6d8;
	color: #115555;
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	font-size: 1.1em;
	font-weight: 600;

	&.active {
		background-color: #f4f6f8;
	}
`

export const ButtonRow = styled.div`
	font-size: 1.2em;
	font-weight: 600;
	margin-top: 20px;
	display: flex;
	justify-content: center;
	flex-direction: column;
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
