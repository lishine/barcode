import FormikPass from 'common/form/formik/FormikPass'
import StyledSelect from 'common/form/formik/StyledSelect'

export default ({ children, ...props }) => (
	<FormikPass {...props}>{fProps => <StyledSelect {...fProps}>{children}</StyledSelect>}</FormikPass>
)
