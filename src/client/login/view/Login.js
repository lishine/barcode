import { Flex, Box } from 'reflexbox'

import Form from './form/Form'
import Modal from './Modal'
import NavLinks from './NavLinks'

import Alert from './Alert'

import { loginStore } from 'login/store'

export default view(() => {
	const { alert } = loginStore
	return (
		<Modal isOpen>
			{alert ? (
				<Alert />
			) : (
				<Flex column>
					<Box>
						<NavLinks />
					</Box>
					<Box>
						<Form />
					</Box>
				</Flex>
			)}
		</Modal>
	)
})
