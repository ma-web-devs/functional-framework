"use strict"
import R from 'ramda';
import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'
import { auth } from '../../../utils/firebase-app'
import Field from '../../Form/Field-class';
import BaseField from '../../Form/BaseField-class';

import Options from './Options'
import FormDetail from './form-detail-class.js'

const { is, isEmpty, propEq, prop, all, filter, map, join, compose } = R;

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

const FieldDefaultValue = new Field({
  name: 'defaultValue',
  type: 'text',
  errorMsg: '',
  willDispatch: false,
  debug: true
});

const RequiredInput = new Field({
  name: 'required',
  type: 'checkbox',
  debug: true
})







export default ({ state, dispatch }) => {

  var currentFormDetail = Object.assign({}, state.currentFormDetail);

  FieldLabel.fromState(currentFormDetail.label);
  FieldDefaultValue.fromState(currentFormDetail.defaultValue);
  RequiredInput.fromState(true);


  function getOptions() {
    if (currentFormDetail.type == 'Dropdown' | currentFormDetail.type == 'Radio') {
      return (
        <div className="form-group">
          <label className="control-label col-sm-2">Combo Values</label>
          <div className="col-sm-10">
            <Options state={state} dispatch={dispatch} />
          </div>
        </div>

      );
    }
  }

  function saveDetail() {
    const label = FieldLabel.value;
    const type = document.getElementById('type').value;
    const defaultValue = FieldDefaultValue.value;
    const required = document.getElementById('required').checked;

    currentFormDetail.label = label;
    currentFormDetail.type = type;
    currentFormDetail.defaultValue = defaultValue;
    currentFormDetail.required = required;

    FormDetail.save(currentFormDetail);
    dispatch({ type: 'NAVIGATE', value: 'form-detail-list' });
  }

  function deleteDetail() {
    FormDetail.delete(currentFormDetail.key)
    dispatch({ type: 'NAVIGATE', value: 'form-detail-list' });
  }

  function close() {
    dispatch({ type: 'NAVIGATE', value: 'form-detail-list' });
  }

  function formTypeChange(event) {
    const target = event.target;
    var type = document.getElementById("type").value;

    currentFormDetail.type = type;
    if (type != 'Dropdown' & type != 'Radio')
      currentFormDetail.options = [];

    dispatch({ type: 'SET_CURRENT_FORM_DETAIL', value: currentFormDetail });


  }


  function FieldType(value) {
    var selected = '';
    if (value == currentFormDetail.type)
      selected = 'selected';

    return (
      <option value={value} selected={selected}>{value}</option>
    );
  }

  function getFieldTypes() {
    return (
      <select id="type" onchange={formTypeChange}>
        {FieldType('Text')}
        {FieldType('Dropdown')}
        {FieldType('Number')}
        {FieldType('Radio')}
      </select>
    );
  }

  function getRequiredCheckbox() {
    return (
      <input
        id="required"
        type="checkbox"
        checked={currentFormDetail.required} />
    );
  }

  return (
    <div>
      <h3>Form Detail</h3>
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
              {getFieldTypes()}
            </div>
          </div>
          {getOptions()}
          <div className="form-group">
            <label htmlFor="name" className="control-label col-sm-2">Default Value</label>
            <div className="col-sm-10">
              {FieldDefaultValue.jsx()}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="control-label col-sm-2">Required</label>
            <div className="col-sm-10">
              {getRequiredCheckbox()}
            </div>
          </div>
        </form>
      </div>

      <div>
        <span className={state.auth ? 'btn btn-success' : 'btn btn-success hide'} onclick={() => saveDetail()} >Save</span>
        <span className={state.auth ? 'btn btn-danger' : 'btn btn-danger hide'} onclick={() => deleteDetail()}  >Delete</span>
        <span className='btn btn-info' onclick={() => close()}  >Close</span>
      </div>

    </div>
  );
}
