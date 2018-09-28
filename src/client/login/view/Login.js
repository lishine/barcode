import { Flex, Box } from 'reflexbox'

import Form from './form/Form'
import Modal from './Modal'
import NavLinks from './NavLinks'

import Alert from './Alert'

import { getAlert } from 'login/login.selectors'

export default connect({
	alert: getAlert,
})(props => {
	const { alert } = props
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
