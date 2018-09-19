import { createContext } from 'react'
import { getPage, redirect } from 'store/router'
import { getToken, getEmail, isAuth, setToken, setEmail } from 'store/auth'
import { withContext } from 'utils/with-context'

export const AppContext = createContext({})

export default component =>
	withContext({
		selectors: {
			email: getEmail,
			isAuth,
			token: getToken,
			page: getPage,
		},
		actions: { setToken, setEmail },
		ContextProvider: AppContext,
	})(component)
