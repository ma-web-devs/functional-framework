import { dispatch } from '../../index'
import dom from '../../utils/dom'


/**
 * Validation (higher-order component)
 *
 * Wrap an input to get new input component with built-in
 * validation
 *
 * @param FormFieldComponent
 * @param validationFn
 * @returns {Function}
 * @constructor
 */
const Validation = (FormFieldComponent, validationFn) => {

  let validationClassName = ''

  return function(props, children) {

    const isValid = validationFn(props.value)

    return (
      <div className={validationClassName}>

        {/* The input field wrapped by Validator */}
        <FormFieldComponent {...props}>
          {children}
        </FormFieldComponent>

      </div>
    )
  }
}

export default Validation
