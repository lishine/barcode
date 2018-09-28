import { Flex, Box } from 'reflexbox'

import { alerts } from 'login/view/form/data'
import { getForm, getAlert } from 'login/login.selectors'
import { gotoHome } from 'router/router.actions'

export default connect({
	form: getForm,
	alert: getAlert,
})(props => {
	const { form, alert } = props
	console.log('alert', alert)
	console.log('form', form)
	const { btnContinueToSite, message } = alerts[form][alert]
	return (
		<Flex column>
			<Box>
				message: {message}
				{when(!!alert).is(true, () => (
					<button onClick={() => dispatch(gotoHome())}>HOME</button>
				))}
			</Box>
		</Flex>
	)
})
