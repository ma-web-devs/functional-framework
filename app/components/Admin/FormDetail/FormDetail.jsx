"use strict"
import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'
import { auth } from '../../../utils/firebase-app'
import Field from '../../Form/Field-class';

//TODO this should be available to all forms
// Validation
const isNonEmptyString = (value) => is(String, value) && !isEmpty(value)

// Fields
const FieldLabel = new Field({
  name: 'label',
  type: 'text',
  errorMsg: 'Please enter a value for Label!',
  willDispatch: false,
  validation: isNonEmptyString,
  debug: true
});

const FieldType = new Field({
  name: 'type',
  type: 'text',
  errorMsg: 'Please select a value for Type!',
  willDispatch: false,
  validation: isNonEmptyString,
  debug: true
});


export default ({ state, dispatch }) => {
  return (
    <div>
      <h3>Form Detail</h3>
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="key" className="control-label col-sm-2">Label</label>
            <div className="col-sm-10">
              {FieldLabel.jsx()}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="number" className="control-label col-sm-2">Type</label>

          </div>
          <div className="form-group">
            <label htmlFor="name" className="control-label col-sm-2">Default Value</label>

          </div>
          <div className="form-group">
            <label htmlFor="description" className="control-label col-sm-2">Validation</label>

          </div>
          <div className="form-group">
            <label htmlFor="min-capacity" className="control-label col-sm-2">Combo Values</label>

          </div>
          <div>
            <select name="cars">
              <option value="volvo">Volvo XC90</option>
              <option value="saab">Saab 95</option>
              <option value="mercedes">Mercedes SLK</option>
              <option value="audi">Audi TT</option>
            </select>
          </div>

        </form>
      </div>
    </div>
  );
}
