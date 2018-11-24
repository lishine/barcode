import { Flex, Box } from 'reflexbox'

import { alerts } from 'login/view/form/data'
import { gotoHome, gotoLogin } from 'router/actions'
import { loginStore } from 'login/store'
import { Container } from './form/styled'
import { ButtonRow } from './styled'

export default view(() => {
	const { alert } = loginStore
	const { btnContinueToSite, message, btnSignIn, errorMessage } = alert
	console.log('alert', alert)

	return (
		<Container>
			<div style={{ color: 'black', paddingTop: '20px', textAlign: 'center' }}>{message}</div>
			{errorMessage && (
				<div style={{ color: 'black', paddingTop: '20px', textAlign: 'center' }}>
					{errorMessage}
				</div>
			)}
			{btnContinueToSite && (
				<ButtonRow>
					<button className="alert-btn" type="button" onClick={() => dispatch(gotoHome())}>
						HOME
					</button>
				</ButtonRow>
			)}
			{btnSignIn && (
				<button
					type="button"
					onClick={() => {
						const c = gotoLogin()
						console.log('***c', c)
						console.log('dispatch', dispatch)
						dispatch(gotoHome())
					}}>
					Sign In
				</button>
			)}
		</Container>
	)
})
