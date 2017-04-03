"use strict"
import dom from '../../utils/dom'
import CalendarDrawer from './CalendarDrawer'

/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state, dispatch}) => {
  return (
    <section>
      <div className="calendar-controls">
        <CalendarDrawer state={state} dispatch={dispatch}/>
      </div>
      <div className="calendar-plugin">
        <div id="calendar"/>
      </div>
    </section>
  );
}
