"use strict"
import dom from '../../utils/dom'
import CalendarInnerDrawer from './CalendarInnerDrawer'
import {propOr, gt} from 'ramda';


/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state, dispatch}) => {

  const sourcesLoaded = gt(propOr(0, 'length', state.sources), 0)
  const buttonText = state.openCalendarDrawer ? 'Hide Calendar Filters' : 'Show Calendar Filters';

  return sourcesLoaded ? (
      <div>
        {/* The Button to Open/Close the Toggle Switch Drawer */}

        <div className="form form-inline">
            <span onclick={() => dispatch({type: 'TOGGLE_DRAWER'})}
                  className="btn btn-sm settings"
                  ariaExpanded="false"
                  ariaControls="calendarToggleControls">
              <i className="glyphicon glyphicon-cog"> </i> {buttonText}
            </span>
        </div>
        <br/>

        {/* The Filters (checkboxes) To Toggle Sources On Calendar */}
        <CalendarInnerDrawer state={state} dispatch={dispatch}/>

      </div>
    ) : null;
}
