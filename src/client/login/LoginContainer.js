import { createContext } from 'react'
import { page } from 'store/router'
import { withContext } from 'utils/with-context'

export const LoginContext = createContext({})

export default (component) =>
	withContext({
		selectors: { page },
		actions: {},
		ContextProvider: LoginContext,
	})(component)
