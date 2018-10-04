import FormikPass from 'common/form/formik/FormikPass'
import StyledInput from 'common/form/formik/StyledInput'

export default props => <FormikPass {...props}>{fProps => <StyledInput {...fProps} />}</FormikPass>
