"use strict"
import dom from '../utils/dom'
import {dispatch} from '../index'
import Validator from './Form/Validator';
import {NumberInput, TextInput, Select} from './Form/form-inputs';



/**
 * Pass each component that is imported from another file the {state} object
 * We can update the component jsx using the current state and
 * dispatch actions up to "redux-ish" to make changes.
 *
 * @param {object} state - contains the state of app passed in from index.js
 */
const ExampleComponent = ({state}) => {

  const {example: {balance, form}} = state;

  // Create a Field (this can be done in or out of the
  // ExampleComponent), it's stateless.
  const isEven = (value) => +value % 2 === 0;
  const AmountField = Validator(NumberInput, isEven);

  return (
    <div>
      <form className="form">
        <legend>Deposit or Withdraw from the Bank.</legend>
        <h4 className="label"> balance: {balance}</h4>

        <div className="form-group">

          {/* Input to select amount to add or subtract */}
          <label htmlFor="money-input">Monopoly Moneys:

            <AmountField min="0" max="1000" step="1"
                         onChange={(e) => dispatch({type: 'EXAMPLE_FORM_CHANGE', value: e.target})}
                         value={form.amount.value}>

              {/* The child is the validation message */}
              <span class="help-inline error">
                Sorry, only even numbers allowed for this field.
              </span>
            </AmountField>

          </label>

        </div>

        <div className="form-group">
          {/* Buttons to dispatch the action */}
          <span className="btn btn-success fa fa-arrow-circle-o-up"
                onclick={bankTransaction('DEPOSIT', NumberInput)}> &nbsp; DEPOSIT</span>
          <span className="btn btn-danger fa fa-arrow-circle-down"
                onclick={() => NumberInput.condDispatch('WITHDRAW', 'WITHDRAW_INVALID')}> &nbsp; WITHDRAW</span>
        </div>

      </form>

    </div>
  )
}


function bankTransaction(transType, inputField) {
  return () => {
    // Dispatch the action (handled in app/data-store/reducers/example-reducer.js)
    if (inputField.isValid) {
      dispatch({type: transType, value: +(inputField.value)})
    }
    else {
      // HANDLE SOME ERROR IN VALIDATION?
      dispatch({type: 'NOT_HANDLED_BUT_NEEDED', value: ''})
    }
  }
}

export default ExampleComponent
