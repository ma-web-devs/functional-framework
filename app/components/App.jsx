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
const AppComponent = (props) => {

  return (
    <div className="container">

      {/*  Navigation  */}
      <Navigation {...props}>
        {/* Note: Nested children will be the 2nd argument passed to your component */}
        <strong>Democracy Center</strong>
        <span className="small">
            &nbsp; Events &nbsp;
          <i className="fa fa-flag"/>
          </span>
      </Navigation>



      <section className="row">
        {/*  Calendar route="calendar" */}
        <Route route="index" {...props} Component={Calendar}/>
        {/* Example route="example" */}
        <Route route="example" {...props} Component={Example}/>
        {/*  Admin route="room" */}
        <Route route="room" {...props} Component={Room}/>
        <Route route="form-group" {...props} Component={FormGroup}/>
        <Route route="form-detail" {...props} Component={FormDetail}/>
      </section>

      {/* Footer */}
      <Footer {...props}>
        <strong className="lead label label-danger">
          <i className="fa fa-copyright"></i> MA <em>Web</em>
        </strong> <em className="lead label label-info">Developers</em>
        <strong className="small label label-success">2017</strong>
      </Footer>

    </div>
  );
};


export default AppComponent
