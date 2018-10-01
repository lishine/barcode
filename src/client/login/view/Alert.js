import { Flex, Box } from 'reflexbox'

import { alerts } from 'login/view/form/data'
import { gotoHome } from 'router/actions'
import { loginStore } from 'login/store'

export default view(() => {
	const { form, alert } = loginStore
	console.log('alert', alert)
	console.log('form', form)
	const { btnContinueToSite, message } = alerts[form][alert]
	return (
		<Flex column>
			<Box>
				message: {message}
				{btnContinueToSite && (
					<button type="button" onClick={() => dispatch(gotoHome())}>
						HOME
					</button>
				)}
			</Box>
		</Flex>
	)
})
