import styled from 'styled-components'
import { RouterLink } from 'router/Link'

export const Link = styled(RouterLink).attrs({
	activeClassName: 'active',
})`
	font-size: 1em;
	font-weight: 100;

	&.active {
		font-size: 7em;
		font-weight: 500;
	}
`
