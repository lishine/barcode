import Link from 'redux-first-router-link'
import { Flex, Box } from 'reflexbox'
import { When, If, Then, Else } from 'react-if'


import { alerts } from './form/data'


import { page, alert } from 'store/router/selectors'
import { goToHome } from 'store/router/actions'

export default connect({
	page,
	alert,
})(props => {
	const { page, alert } = props
	console.log('alert', alert)
	const { btnContinueToSite, message } = alerts[page][alert]
	return (
		<Flex column>
			<Box>
				message: {message}
				<When condition={!!btnContinueToSite}>
					<Link to={goToHome()}>HOME</Link>
				</When>
			</Box>
		</Flex>
	)
})
