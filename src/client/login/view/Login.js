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
			<Flex column>
				<Box>
					<NavLinks />
				</Box>
				<Box>
					{when(!!alert)
						.is(true, () => <Form />)
						.else(() => <Alert />)()}
				</Box>
			</Flex>
		</Modal>
	)
})
