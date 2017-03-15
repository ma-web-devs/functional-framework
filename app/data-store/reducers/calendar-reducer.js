import ActionTypes from '../index';
import {
  renderInitialCalendar,
  mapVisibleSourcesToFullCalendar,
  toggleCalendars
} from '../../utils/calendar-utils';
import R, {
  propOr,
  map,
  set,
  lensProp
} from 'ramda';


// Set an object property {visible: true}
// setVisibleToTrue :: Object -> Object
const setVisibleToTrue = set(lensProp('visible'), true);


/**
 * This Reducer is for the Calendar and any actions that stem from its views.
 *
 * @param state {object}
 *     the current app state
 * @param {{type: string, action: *}} action
 *     an action
 * @returns {object}
 *     the new app state (or the old state if no change)
 */
export default (state = {}, action) => {

  switch (action.type) {

    /**
     *  INITIAL / NAVIGATE :: On index route, show calendar and visible sources
     */
    case ActionTypes.INIT:
    case 'NAVIGATE':
      if (action.value === "index" || state.router.route === "index") {
        setTimeout(() => {
          // Render the calendar
          renderInitialCalendar();
          // render the visible sources
          mapVisibleSourcesToFullCalendar(propOr([], 'sources', state));
        }, 0);
      }
      return state;


    /**
     * SET_SOURCES :: This is to add initial sources, it should not be used
     *                to toggle sources, only update a change of actual events.
     *                (this would remove old sources from state)
     */
    case 'SET_SOURCES':
      // Remove all sources on calendar
      $('#calendar').fullCalendar('removeEventSources');
      // Set new sources on calendar
      mapVisibleSourcesToFullCalendar(propOr([], 'value', action))
      // Update state.sources
      return Object.assign({}, state, {sources: action.value});


    /**
     * TOGGLE_ROOM :: Toggle the boolean property 'visible' on 1 source.
     *                (source to toggle must be value of action.value)
     */
    case 'TOGGLE_ROOM': {
      // Check which source is being toggled and flip the visible switch.
      const sources = map(source => {
        if (source === action.value) {
          return set(lensProp('visible'), !source.visible, source);
        }
        return source;
      }, state.sources);

      // Remove all sources on calendar
      $('#calendar').fullCalendar('removeEventSources');
      // render the visible sources (from updated sources)
      mapVisibleSourcesToFullCalendar(sources || []);
      // Update state.sources
      return Object.assign({}, state, {sources});
    }


    /**
     * SHOW_ALL_SOURCES :: Set the 'visible' flag to true on all sources.
     */
    case 'SHOW_ALL_SOURCES': {
      // Set all sources 'visible' property to true
      const sources = map(setVisibleToTrue, state.sources);
      // Remove all sources on calendar
      $('#calendar').fullCalendar('removeEventSources');
      // render the visible sources (from updated sources)
      mapVisibleSourcesToFullCalendar(sources || []);

      return Object.assign({}, state, {sources});
    }


    /**
     * TOGGLE_DRAWER :: Toggle the boolean state.openCalendarDrawer property.
     *                  (requires no value set on action.value)
     */
    case 'TOGGLE_DRAWER':
      const openCalendarDrawer = !propOr(false, 'openCalendarDrawer', state);
      return Object.assign({}, state, {openCalendarDrawer});


    /**
     * DEFAULT :: return state as-is
     */
    default:
      // @desc Always have a default to return state object
      return state
  }
};
