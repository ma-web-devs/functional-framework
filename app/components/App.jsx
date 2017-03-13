"use strict"
import dom from '../utils/dom'

import Footer from './Footer'
import Example from './Example'
import Calendar from './Calendar/Calendar'
import Room from './Admin/Room/Room'
import FormGroup from './Admin/FormGroup/FormGroup'
import FormDetail from './Admin/FormDetail/FormDetail'

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
        <Route route="form-group" state={state} dispatch={dispatch} component={FormGroup}/>
        <Route route="form-detail" state={state} dispatch={dispatch} component={FormDetail}/>
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
