import { Flex, Box } from 'reflexbox'

import { forms } from 'login.Model/constants'
import { gotoForm } from 'login.Model/actions'

export default props => {
	return (
		<Flex w={1}>
			<Box w={1 / 2}>
				<button onClick={() => dispatch(gotoForm(forms.SIGN_UP))}>sign up</button>
			</Box>
			<Box w={1 / 2}>
				<button onClick={() => dispatch(gotoForm(forms.SIGN_IN))}>sign in</button>
			</Box>
		</Flex>
	)
}
