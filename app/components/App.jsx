"use strict"
import dom from '../utils/dom'

import Footer from './Footer'
import Example from './Example'
import Calendar from './Calendar/Calendar'
import Room from './Admin/Room/Room'
import FormGroupComponent from './Admin/FormGroup/FormGroupComponent'
import FormDetailComponent from './Admin/FormDetail/FormDetailComponent'
import FormDetailList from './Admin/FormDetail/FormDetailList'

import Navigation from './Navigation'
import {Route, Link} from './Router'


/**
 * The main component of the App, containing the main template elements.
 *
 * @param {object} state - contains the state of app passed in from index.js
 */
const AppComponent = ({state, dispatch}) => {

  return (
    <div className="container">

      {/*  Navigation  */}
      <Navigation state={state} dispatch={dispatch}>
        {/* Note: Nested children will be the 2nd argument passed to your component */}
        <strong>Democracy Center</strong>
        <span className="small">
            &nbsp; Events &nbsp;
          <i className="fa fa-flag"/>
          </span>
      </Navigation>



      <section className="row">
        {/*  Calendar route="calendar" */}
        <Route route="index" state={state} dispatch={dispatch} component={Calendar}/>
        {/* Example route="example" */}
        <Route route="example" state={state} dispatch={dispatch} component={Example}/>
        {/*  Admin route="" */}
        <Route route="room" state={state} dispatch={dispatch} component={Room}/>
        <Route route="form-group-component" state={state} dispatch={dispatch} component={FormGroupComponent}/>
        <Route route="form-detail-component" state={state} dispatch={dispatch} component={FormDetailComponent}/>
        <Route route="form-detail-list" state={state} dispatch={dispatch} component={FormDetailList}/>
      </section>

      {/* Footer */}
      <Footer state={state}>
        <strong className="lead label label-danger">
          <i className="fa fa-copyright"></i> MA <em>Web</em>
        </strong> <em className="lead label label-info">Developers</em>
        <strong className="small label label-success">2017</strong>
      </Footer>

    </div>
  );
};


export default AppComponent
