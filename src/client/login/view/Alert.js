import { Flex, Box } from 'reflexbox'

import { alerts } from 'login/view/form/data'
import { gotoHome, gotoLogin } from 'router/actions'
import { loginStore } from 'login/store'

export default view(() => {
	const { form, alert } = loginStore
	console.log('alert', alert)
	console.log('form', form)
	const { btnContinueToSite, message, btnSignIn } = alerts[form][alert]
	return (
		<Flex column>
			<Box>
				message: {message}
				{btnContinueToSite && (
					<button type="button" onClick={() => dispatch(gotoHome())}>
						HOME
					</button>
				)}
				{btnSignIn && (
					<button type="button" onClick={() => dispatch(gotoLogin())}>
						Sign In
					</button>
				)}
			</Box>
		</Flex>
	)
})
