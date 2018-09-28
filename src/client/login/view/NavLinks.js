import { Flex, Box } from 'reflexbox'

import * as forms from 'login/login.constants/forms'
import { gotoForm } from 'login/login.actions'

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
