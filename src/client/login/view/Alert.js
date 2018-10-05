import { Flex, Box } from 'reflexbox'

import { alerts } from 'login/view/form/data'
import { gotoHome, gotoLogin } from 'router/actions'
import { loginStore } from 'login/store'

export default view(() => {
	const { alert } = loginStore
	const { btnContinueToSite, message, btnSignIn, errorMessage } = alert
	console.log('alert', alert)

	return (
		<Flex column>
			<Box>
				<div>message: {message}</div>
				{errorMessage && <div>errorMessage: {errorMessage}</div>}
				{btnContinueToSite && (
					<button type="button" onClick={() => dispatch(gotoHome())}>
						HOME
					</button>
				)}
				{btnSignIn && (
					<button
						type="button"
						onClick={() => {
							const c = gotoLogin()
							console.log('***c', c)
							console.log('dispatch', dispatch)
							dispatch(gotoHome())
						}}>
						Sign In
					</button>
				)}
			</Box>
		</Flex>
	)
})
