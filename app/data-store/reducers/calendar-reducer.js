/**
 * Created by markgrover on 2/27/17.
 */
import {renderInitialCalendar, mapSourcesToCalendar, toggleCalendars} from '../../utils/calendar-utils';
import R, {propOr, map, set, lensProp} from 'ramda';



/**
 * This Reducer is for the Calendar and any actions that stem from its views.
 *
 * @param state      - the current app state
 * @param action     - an action {type: string, action: mixed}
 * @returns {object} - the new app state (or the old state if no change)
 */
export default (state = {}, action) => {

  switch (action.type) {

    case 'INITIAL':
    case 'NAVIGATE':
      if (action.value === "index" || state.router.route === "index") {
        setTimeout(() => {
            // Render the calendar
            renderInitialCalendar();
            // render the visible sources
            mapSourcesToCalendar(propOr([], 'sources', state));
          }, 0);
      }
      return state;

    case 'SET_SOURCES':
      // Remove all sources on calendar
      $('#calendar').fullCalendar('removeEventSources');
      // Set new sources on calendar
      mapSourcesToCalendar(propOr([], 'value', action))
      // Update state.sources
      return Object.assign({}, state, {sources: action.value});

    case 'TOGGLE_ROOM':

      const sources = map(source => {
        if (source === action.value) {
          return set(lensProp('visible'), !source.visible, source);
        }
        return source;
      }, state.sources);

      // Remove all sources on calendar
      $('#calendar').fullCalendar('removeEventSources');
      // Set new sources on calendar
      mapSourcesToCalendar(sources);
      return Object.assign({}, state, {sources});


    case 'SOURCETOGGLED':
      const mySources  = state.sources;
      const idX        = action.value;
      const isAdded    = !mySources[idX].added;
      const activeRoom = Object.assign({}, state, {added: isAdded});
      console.log('activeRoom', activeRoom);
      const newSourceArr = [].concat(mySources.slice(0, idX - 1), activeRoom, mySources.slice(idX));
      return Object.assign({}, state, {sources: newSourceArr});

    case 'TOGGLEROOMS':
      //jQuery('#toggle-all').prop('checked','false');
      return Object.assign({}, state, {showAllToggles: action.value});

    case 'TOGGLEDRAWER':

      return Object.assign({}, state, {calendarDrawer: action.value});

    default:
      // @desc Always have a default to return state object
      return state
  }
}
