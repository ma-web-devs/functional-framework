"use strict"
import dom from '../../utils/dom'
import {log} from '../../utils/logger'
import CalendarDrawer from 'CalendarDrawer'

/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state}) => {
  return (
    <section>
      <CalendarDrawer state={state}></CalendarDrawer>
      <div id="calendar"/>
    </section>
  );
}
