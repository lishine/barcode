import { Flex, Box } from 'reflexbox'

import Form from './form/Form'

import { profileStore } from 'profile/store'

export default view(() => {
	return (
		<Flex column>
			<Box>
				<Form />
			</Box>
		</Flex>
	)
})
