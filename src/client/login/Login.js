import Link from 'redux-first-router-link'
import { Flex, Box } from 'reflexbox'
import { When, If, Then, Else } from 'react-if'

import Form from './form/Form'
import LoginContainer, { LoginContext } from './LoginContainer'
import Modal from './Modal'
import NavLinks from './NavLinks'

import { alerts } from './form/data'
import Alert from './Alert'

import * as routes from 'store/constants/routes'

export default LoginContainer(() => (
	<LoginContext.Consumer>
		{({ alert }) => {
			return (
				<Modal isOpen>
					<Flex column>
						<Box>
							<NavLinks />
						</Box>
						<Box>
							<If condition={alert === 'form'}>
								<Then>
									<Form />
								</Then>
								<Else>
									<Alert />
								</Else>
							</If>
						</Box>
					</Flex>
				</Modal>
			)
		}}
	</LoginContext.Consumer>
))
