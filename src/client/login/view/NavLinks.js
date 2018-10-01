import { Flex, Box } from 'reflexbox'

import * as forms from 'login/constants/forms'
import { loginStore } from 'login/store'

export default props => {
	return (
		<Flex w={1}>
			<Box w={1 / 2}>
				<button type="button" onClick={() => loginStore.gotoForm(forms.SIGN_UP)}>
					sign up
				</button>
			</Box>
			<Box w={1 / 2}>
				<button type="button" onClick={() => loginStore.gotoForm(forms.SIGN_IN)}>
					sign in
				</button>
			</Box>
		</Flex>
	)
}
