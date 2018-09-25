import { Flex, Box } from 'reflexbox'
import { If, Then, Else } from 'react-if'

import Form from './form/Form'
import Modal from './Modal'
import NavLinks from './NavLinks'

import Alert from './Alert'

import { alert } from 'store/auth/selectors'

export default connect({
	alert,
})(props => {
	const { alert } = props
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
})
