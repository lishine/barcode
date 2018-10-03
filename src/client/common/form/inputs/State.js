import Select from 'common/form/formik/Select'

export default props => (
	<Select {...props}>
		<option key={1} value={1}>
			n1
		</option>
		<option key={2} value={2}>
			n2
		</option>
		<option key={3} value={3}>
			n3
		</option>
	</Select>
)
