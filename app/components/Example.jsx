"use strict"
import dom from '../utils/dom'
import {dispatch} from '../index'
import Validator from './Form/HigherOrderValidator';
import HigherOrderForm from './Form/HigherOrderForm';
import {NumberInput, TextInput, Select} from './Form/form-inputs';


/**
 * Pass each component that is imported from another file the {state} object
 * We can update the component jsx using the current state and
 * dispatch actions up to "redux-ish" to make changes.
 *
 * @param {object} state - contains the state of app passed in from index.js
 */
const ExampleComponent = ({state, dispatch}) => {

  const {example: {balance, form}} = state;

  // Create a Field (this can be done in or out of the
  // ExampleComponent), it's stateless.
  const isEven = (value) => +value % 2 === 0;
  const AmountField = Validator(NumberInput, isEven);

  const Form = HigherOrderForm((evt) => {
    // Form submission event
    console.log('Form submission! (doesn\'t do anything)')
  });

  return (
    <div>
      <Form className="form">
        <legend>Deposit or Withdraw from the Bank.</legend>
        <h4 className="label"> balance: {balance}</h4>

        <div className="form-group">

          {/* Input to select amount to add or subtract */}
          <label htmlFor="money-input">Monopoly Moneys from -100 to 1000:

            <AmountField min="-100" max="1000" step="1"
                         name="amount"
                         onChange={({value}) => dispatch({type: 'EX_CHANGE_AMOUNT', value: value})}
                         value={form.amount.value}>

              {/* The child is the validation message */}
              <span class="help-inline error">
                <i className="fa fa-exclamation-triangle"/> &nbsp; Sorry, only even numbers allowed for this field.
              </span>
            </AmountField>

          </label>

        </div>

        <div className="form-group">
          {/* Buttons to dispatch the action */}
          <button type="submit" className="btn btn-success fa fa-paperclip"> &nbsp; TRANSACTION GO!</button>
        </div>

      </Form>

    </div>
  )
}



export default ExampleComponent
