"use strict"
import dom from '../../utils/dom'
import ToggleCalendar from './ToggleCalendars'


/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state, dispatch}) => {

  return (
    <div className={!state.openCalendarDrawer ? 'collapse' : ''}
         id="calendarToggleControls">

      {/* The Actual Toggles and Show All Button */}
      <div className="card card-block">
        <ToggleCalendar state={state} dispatch={dispatch}/>
      </div>

    </div>
  )
}
