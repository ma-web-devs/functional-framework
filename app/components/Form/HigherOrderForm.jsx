import { dispatch } from '../../index'
import dom from '../../utils/dom'
import R from 'ramda'
const {is} = R


const HigherOrderForm = (onsubmitHandler) => {
  const onsubmissionEvent = (evt) => {
    if (is(Function, onsubmitHandler)) {
      onsubmitHandler();
    }
    return false;
  }

  return (props, children) => {

    return (
      <form onsubmit={onsubmissionEvent}>
        {children}
      </form>
    )
  }
}


export default HigherOrderForm
