import { Flex, Box } from 'reflexbox'

import * as forms from 'login/constants/forms'
import { loginStore } from 'login/store'
import { Link } from './styled'

export default view(props => {
	const { gotoForm, form } = loginStore
	return (
		<Flex w={1}>
			<Box w={1 / 2}>
				<Link isActive={() => form === forms.SIGN_UP} onClick={() => gotoForm(forms.SIGN_UP)}>
					sign up
				</Link>
			</Box>
			<Box w={1 / 2}>
				<Link isActive={() => form === forms.SIGN_IN} onClick={() => gotoForm(forms.SIGN_IN)}>
					sign in
				</Link>
			</Box>
		</Flex>
	)
})
