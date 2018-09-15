import styled from 'styled-components'

export default styled.input`
	width: 300px;
	height: 35px;
	border: ${(props) => props.border || '1px solid #ccc'};
	background-color: #fff;
`
