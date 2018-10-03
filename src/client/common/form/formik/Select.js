import FormikPass from 'common/form/formik/FormikPass'
import StyledSelect from 'common/form/formik/StyledSelect'

export default ({ children, ...props }) => (
	<FormikPass {...props}>
		{fProps => (
			<div style={{ width: '200px', overflow: 'hidden' }}>
				<StyledSelect {...fProps}>{children}</StyledSelect>
			</div>
		)}
	</FormikPass>
)
