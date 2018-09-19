import { createContext } from 'react'
import { getPage, redirect } from 'store/router'
import { setEmail, isAuth, setToken } from 'store/auth'
import { withContext } from 'utils/with-context'

export const LoginContext = createContext({})

export default component =>
	withContext({
		selectors: {
			page: getPage,
			isAuth,
		},
		actions: { setEmail, setToken, redirect },
		ContextProvider: LoginContext,
	})(component)
