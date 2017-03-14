"use strict"
import R from 'ramda';
import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'
import { auth } from '../../../utils/firebase-app'
import Field from '../../Form/Field-class';
import BaseField from '../../Form/BaseField-class';

import Options from './Options'

const { is, isEmpty, propEq, prop, all, filter, map, join, compose } = R;

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
  type: 'select',
  errorMsg: 'Please select a value for Type!',
  willDispatch: false,
  validation: isNonEmptyString,
  debug: true
});

FieldType.options = BaseField.TYPES;  //available type of form controls based on BaseField static list.


export default ({ state, dispatch }) => {

  const buttonText = state.displayControlOptions ? 'Hide Options' : 'Show Options';

  return (
    <div>
      <h3>Form Detail</h3>
      <h4>{buttonText}</h4>
      <div>The user is <b>{state.auth ? 'currently' : 'not'}</b> logged in.</div>
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
            <div className="col-sm-10">
              {FieldType.jsx()}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="control-label col-sm-2">Default Value</label>

          </div>
          <div className="form-group">
            <label htmlFor="description" className="control-label col-sm-2">Validation</label>

          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">Combo Values</label>
            <div className="col-sm-10">
              <Options state={state} />
            </div>
          </div>
        </form>
      </div>

      <div>
        <span className={state.auth ? 'btn btn-success' : 'btn btn-success hide'} onclick={() => dispatch({ type: 'TOGGLE_OPTIONS' })} >Save</span>
        <span className={state.auth ? 'btn btn-danger' : 'btn btn-danger hide'} >Delete</span>
      </div>

    </div>
  );
}
