import { NavLink } from 'redux-first-router-link'
import { Flex, Box } from 'reflexbox'

export default () => (
	<Flex w={1}>
		<Box w={1 / 2}>
			<NavLink
				to="/sign-up"
				style={{
					height: '30px',
					backgroundColor: '#444',
					color: 'yellow',
					display: 'flex',
					textAlign: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					textDecoration: 'none',
				}}
				activeStyle={{
					backgroundColor: '#222',
				}}>
				sign up
			</NavLink>
		</Box>
		<Box w={1 / 2}>
			<NavLink
				to="/sign-in"
				style={{
					height: '30px',
					backgroundColor: '#444',
					color: 'yellow',
					display: 'flex',
					textAlign: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					textDecoration: 'none',
				}}
				activeStyle={{
					backgroundColor: '#222',
				}}>
				sign in
			</NavLink>
		</Box>
	</Flex>
)
