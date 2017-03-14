import { dispatch } from '../../index';
import BaseField from './BaseField-class';
import dom from '../../utils/dom'
import R from 'ramda';



export const Input =({state, dispatch}, children) => {

}



export default function Validation (validationFn, InputComponent) {

  let validationClassName = '';

  return function({state, dispatch, value}, ...children) {

    const isValid = Boolean(validationFn(value));

    return (
      <div className={validationClassName}>
        {InputComponent({state, dispatch}, ...children)}
      </div>
    )
  }
}
