import { createContext } from 'react'
import selectors from 'store/router'
import { isAuth, alert } from 'store/auth'
import { withContext } from 'utils/with-context'

export const LoginContext = createContext({})

export default withContext({
	selectors: {
		page,
		payload,
		alert,
		isAuth,
	},
	actions: { goToSignUpForm },
	ContextProvider: LoginContext,
})
