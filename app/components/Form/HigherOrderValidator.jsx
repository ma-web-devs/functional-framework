import { dispatch } from '../../index'
import dom from '../../utils/dom'


/**
 * HigherOrderValidator (higher-order component)
 *
 * Wrap an input to get new input component with built-in
 * validation
 *
 * @param InputField
 * @param validationFn
 * @returns {Function}
 * @constructor
 */
const HigherOrderValidator = (InputField, validationFn, propName='value') => {

  let validationClassName = ''

  return function(props, children) {

    const valid = validationFn(props[propName])

    return (
      <div className={validationClassName}>

        {/* The input field wrapped by Validator */}
        <InputField {...Object.assign({}, props, {valid})}>
          {children}
        </InputField>

      </div>
    )
  }
}


export default HigherOrderValidator
