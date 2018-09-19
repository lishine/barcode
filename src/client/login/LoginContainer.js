import { createContext } from 'react'
import { getPage } from 'store/router'
import { getEmail, onEmailChange } from 'login/model'
import { withContext } from 'utils/with-context'

export const LoginContext = createContext({})

export default (component) =>
	withContext({
		selectors: {
			page: getPage,
			email: getEmail,
		},
		actions: { onEmailChange },
		ContextProvider: LoginContext,
	})(component)
