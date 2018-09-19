import { createContext } from 'react'
import { getPage, go } from 'store/router'
import { setEmail, isAuth, setToken } from 'store/auth'
import { withContext } from 'utils/with-context'

export const LoginContext = createContext({})

export default component =>
	withContext({
		selectors: {
			page: getPage,
			isAuth,
		},
		actions: { setEmail, setToken, go },
		ContextProvider: LoginContext,
	})(component)
