import { createContext } from 'react'
import { getPage, redirect, getPayload } from 'store/router'
import { setEmail, isAuth, setToken, getAlert } from 'store/auth'
import { withContext } from 'utils/with-context'

export const LoginContext = createContext({})

export default withContext({
	selectors: {
		page: getPage,
		payload: getPayload,
		alert: getAlert,
		isAuth,
	},
	actions: { setEmail, setToken, redirect },
	ContextProvider: LoginContext,
})
