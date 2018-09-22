import { Flex, Box } from 'reflexbox'

import Form from './form/Form'
import LoginContainer, { LoginContext } from './LoginContainer'
import Modal from './Modal'
import NavLinks from './NavLinks'

export default LoginContainer(
	<Modal isOpen>
		<Flex column>
			<Box>
				<NavLinks />
			</Box>
			<Box>
				<Form />
			</Box>
		</Flex>
	</Modal>
)
