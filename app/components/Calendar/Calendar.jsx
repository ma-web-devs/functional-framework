"use strict"
import dom from '../../utils/dom'
import {log} from '../../utils/logger'
import ToggleCalendar from 'ToggleCalendars'

import {renderCalendar,populateGoogleDates} from '../../utils/calendar-utils'



/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state: {sources,calendarEvents,route}}) => {
console.log(sources);
  return (
      <section>
        <ToggleCalendar state={sources}></ToggleCalendar>
        <div id="calendar" onload={renderCal(sources)} />

      </section>
  );

}
// Loades the calendar if the main view is the calendar view when the document loads.
jQuery(document).ready(function($) {
  // page is now ready, initialize the calendar...
  // Method call stems from our utils/calendar-utils.js file imported above

  //renderCalendar();
});
function renderCal(sources){
  //console.log('hi');
  setTimeout(renderCalendar,14,sources);
  //renderCalendar();
}


