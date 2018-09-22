import Link from 'redux-first-router-link'
import { Flex, Box } from 'reflexbox'
import { When, If, Then, Else } from 'react-if'

import { LoginContext } from './LoginContainer'

import { alerts } from './form/data'

import * as routes from 'store/constants/routes'

export default () => (
	<LoginContext.Consumer>
		{({ page, alert }) => {
			console.log('alert', alert)
			const { btnContinueToSite, message } = alerts[alert][page]
			return (
				<Flex column>
					<Box>
						message: {message}
						<When condition={!!btnContinueToSite}>
							<Link to={{ type: routes.HOME }}>HOME</Link>
						</When>
					</Box>
				</Flex>
			)
		}}
	</LoginContext.Consumer>
)
