import dom from '../../utils/dom'
import { dispatch } from '../../index';
import R from 'ramda';


export const NumberInput = setupInputField('number',  ['step', 'min', 'max']);
export const TextInput = setupInputField('text');


/**
 * Create a Component for a form <input/>
 * "text", "number", "email", "password"
 */
export default function setupInputField (type='text', fieldAttrs=[]) {

  // Properties that all inputs have
  const commonAttrs = ['value', 'disabled', 'readonly', 'className'];
  // A Util to pull attrs off the props (that will be passed in by form)
  const pickAttrsFromProps = R.pickAll([...commonAttrs, ...fieldAttrs]);

  /*- INPUT COMPONENT -*/
  return function (props, children) {

    const {
            onChange, isValid=true, noDispatch=false, eventName='INPUT_ONCHANGE'
          } = props

    const attrs = pickAttrsFromProps(props);

    // An event proxy to send onchange out
    const proxyEvent = (evt)=> {
      return R.is(Function, onChange) ?
        onChange(evt) : dispatch({type: eventName, value: evt.target.value});
    }

    return (
      <span>
      <input type={type} {...attrs} onchange={proxyEvent}/>
        {(isValid === false ? {children} : [])}
    </span>
    )
  }
}





const SelectOption = ({value, text=''}) => {
  return (
    <option value={value}>
      {text}
    </option>
  )
}

export const Select = ({dispatch, options=[], value='', name=''}) => {
  return (
    <select name={name}>
      {R.map(SelectOption, options)}
    </select>
  )
}

