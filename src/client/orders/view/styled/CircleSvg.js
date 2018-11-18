import styled from 'styled-components'
import { Circle } from 'common/svg/Circle'

export const CircleSvg = styled(Circle).attrs({
	width: '0.5em',
})`
	fill: ${props => props.fill};
`
