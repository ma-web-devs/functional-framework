"use strict"
import dom from '../utils/dom'

import Router, {Link} from './Router'
import Page from './Page'
import Example from './Example'
import Calendar from './Calendar'
import Navigation from './Navigation'

import Room from './Admin/Room/Room'

import { dispatch, dispatchAsync } from '../index'




/**
 * The main component of the App, containing the main template elements.
 *
 * @param {object} state - contains the state of app passed in from index.js
 */
const AppComponent = ({state}) => {

    return (
      <div className="container">

        {/*  Navigation  */}
        <Navigation state={state}>
          {/* Note: Nested children will be the 2nd argument passed to your component */}
          <strong>Democracy Center</strong>
          <span className="small">
            &nbsp; Events &nbsp;
            <i className="fa fa-flag"/>
          </span>
        </Navigation>

        {/*  Calendar  */}
        <div className="row">
          <Calendar state={state} dispatch={dispatch} />
        </div>

        <Link hash="admin" component={Room} state={state} dispatch={dispatch}>Hello</Link>

        <div className="row">
          <div className="col-md-6 col-md-push-3 col-sm-8 col-sm-push-2 col-xs-12">
            <Example state={state} dispatch={dispatch} />
          </div>
        </div>


        {/*  Page and Footer  */}
        <Page state={state} dispatch={dispatch} />

        <Room state={state} dispatch={dispatch} />

        {/*  Example DOM
      <div className="row">
        <Example state={state} dispatch={dispatch} />
      </div>
      */}
      </div>
    );
  };


  export default AppComponent
