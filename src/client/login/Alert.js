import Link from 'redux-first-router-link'
import { Flex, Box } from 'reflexbox'
import { When, If, Then, Else } from 'react-if'

import { alerts } from './form/data'
import { getPage, getAlert } from '../store/model/router/router.selectors'
import { goToHome } from '../store/model/router/router.actions'

export default connect({
	page: getPage,
	alert: getAlert,
})(props => {
	const { page, alert } = props
	console.log('alert', alert)
	console.log('page', page)
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
