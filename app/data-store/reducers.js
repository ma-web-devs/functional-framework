"use strict"
import routerReducers, {getInitialRouter} from './reducers/router-reducer';
import firebaseReducers from './reducers/firebase-reducer'
import exampleReducers from './reducers/example-reducer'
import roomReducers from './reducers/room-reducer'
import calendarReducers from './reducers/calendar-reducer'
import {combineReducers} from './index'

export const defaultState = {
  balance:        0,
  rooms:          [],
  currentRoom:    null,
  router:         getInitialRouter(window.location),
  auth:           null,
  sources:        [],
  openCalendarDrawer: false
};

/**
 * When an action is dispatched, we handle it here. It is checked and then
 * reduced and then the state is finally updated. Don't mutate the state,
 * if the state doesn't change then just return the state passed in. This
 * reducer is setup as an example.
 *
 * @param  {object} [state=defaultState]      - The current app state
 * @param  {{type:string,value:mixed}} action - Action describing change to make
 *
 * @return {object}                           - The next state
 */
const mainReducer = (state = defaultState, action) => {
  switch (action.type) {

    case 'SET_EVENTS':
      return Object.assign({}, state, {calendarEvents: [].concat(action.value)})

    case 'INITIAL':
      return Object.assign({}, state, action.value)

    default:
      return state

  }
}


/**
 * Each argument should be a reducer function like the one above.
 * combineReducers is variadic up to 255 args.
 * That's a lot of reductions!
 *
 * Import your custom reducer at the top of file and add it as an argument here
 */
export default combineReducers(mainReducer, exampleReducers, roomReducers, routerReducers,calendarReducers, firebaseReducers);
