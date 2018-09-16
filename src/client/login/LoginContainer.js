import { createContext } from 'react'
import { page, location, goto } from 'store/router'
import { withContext } from 'utils/with-context'

export const LoginContext = createContext({})

export default (component) =>
	withContext({
		selectors: { location, page },
		actions: { goto },
		ContextProvider: LoginContext,
	})(component)
