import gcal from './gcal'
import {log} from './logger'
import R from 'ramda';
import {dispatch} from '../index';

const {view, set, lensPath, lensProp, filter, map, tap, pickAll, curry, evolve, prop, propOr, propEq, compose} = R;


const eventsToCalendar = (events) => $('#calendar').fullCalendar('addEventSource', events);

const colors = {
  'bdnha1319u329g6gsr6rcksg6c@group.calendar.google.com': {color: '#aeeea9', textColor: '#fef'},
  'led1grg2f8jtbtdrks7hv125fo@group.calendar.google.com': {color: '#ff91a0', textColor: '#fef'},
  '353tn8hvjnrtja3h21gbjgaigo@group.calendar.google.com': {color: '#acb3e8', textColor: '#fef'},
  't0gnqindnl5hfu7noj4iu3dvek@group.calendar.google.com': {color: '#ff9788', textColor: '#fef'}
};


const pickEventProps = pickAll(
  ['start', 'end', 'title', 'description', 'summary', 'iCalUID', 'htmlLink', 'created', 'organizer', 'id']);

// Create setter to map _
const setFromMap = curry((_keyA, _keyB, _map, obj) => set(lensProp(_keyA), prop(_keyB, _map), obj));

const viewItems              = view(lensProp('items'));
const viewDateTime           = view(lensProp('dateTime'));
const eventCalId             = view(lensPath(['organizer', 'email']));
const setStartEndTimes       = evolve({start: viewDateTime, end: viewDateTime});
const setColorFromCalendarId = obj => setFromMap('color', eventCalId(obj), colors)(obj);
const setTitleFromSummary    = obj => setFromMap('title', 'summary', obj)(obj);

/**
 * Get events, there are some properties on the raw source events that
 * must be changed before added to the calendar. This function will
 * map over all items and get the needed values.
 */
const sourceToEvent =
        compose(
          setTitleFromSummary,
          setStartEndTimes,
          pickEventProps
        );

const fromSources         = compose(map(sourceToEvent), viewItems);
const addSourceToCalendar = compose(tap(eventsToCalendar), fromSources);

const parseOriginalGoogleResp = R.once(function (sources) {

  const events = map((source) => {
    const events     = viewItems(source);
    const calendarId = eventCalId(events[0]);

    return Object.assign({
        events: fromSources(source),
        visible: true,
        title: propOr('', 'summary', source),
        description: propOr('', 'description', source),
        id: propOr('', 'id', source)
      },
      R.propOr({}, calendarId, colors)
    );

  }, sources);

  console.log(sources);
  dispatch({type: 'SET_SOURCES', value: events});

});


gcal.getSources()
  .then(R.tap(renderInitialCalendar))
  .then(parseOriginalGoogleResp);

export const mapSourcesToCalendar = compose(
  map(source => $('#calendar').fullCalendar('addEventSource', source)),
  filter(propEq('visible', true))
);

export function renderInitialCalendar() {
  $('#calendar').fullCalendar({
    header: {
      right:  'month,agendaWeek',
      left:   'prev,next',
      center: 'title'
    }
  });
}


// TODO: See what the code below does

/**
 *
 * @param sources     - raw calendars from google calendar
 * @param timeout     - time between re-running if calendar was not on page
 * @param maxTimeout  - max timeout to not try calling renderCalendar again
 * @returns {number}
 */
export const renderCalendar = function (timeout = 1, maxTimeout = 3000) {
  console.log("renderCalendar Still Being Called....")
};


/*
 *  check if resource is already added to calendar
 *
 *  newSource is the object up for comparison
 *
 *  returns (BOOL)
 *
 *  true is in currentSource Array
 *  false if Not
 * */
function isSource(newSource) {
  let sources   = $('#calendar').fullCalendar('getEventSources');
  let calExists = false;

  if (sources.length > 0) {

    sources.forEach((source) => {
      if (newSource.calendarId === source.calendarId) {
        calExists = true;
      }
    });

    return calExists;
  }
  return calExists;
}


/*
 *  add new event source
 *
 *  source is single source object from source array
 *
 *
 * */
function removeEventSource(source) {
  if (!source.added) {
    let calId = {googleCalendarId: source.calendarId};
    $('#calendar').fullCalendar('removeEventSource', calId);
  }
}

// remove event source
function addEventSource(source) {
  if (source.added) {
    let calId = {
      googleCalendarId: source.calendarId,
      color:            source.color,
      textColor:        source.textColor
    };
    $('#calendar').fullCalendar('addEventSource', calId);
  }
}

// toggleCalendars
export function toggleCalendars(source, visible) {
  if (!visible) {
    removeEventSource(source);
  } else {
    addEventSource(source);
  }
}
export const populateGoogleDates    = function (sources) {
  sources.forEach((source) => {
    if (((!isSource(source)) && (source.visible === true) && (source.added === false))) {
      let calId = {
        googleCalendarId: source.calendarId,
        color:            source.color,
        textColor:        source.textColor
      };
      $('#calendar').fullCalendar('addEventSource', calId);
      source.added = true;
    }
  });

};

// Toggle Button Display
export const displayCalendarFilter = function () {
  $('#toggleCalendars input[type=checkbox]').checkboxpicker({
    html:     true,
    offLabel: '<span class="glyphicon glyphicon-remove">',
    onLabel:  '<span class="glyphicon glyphicon-ok">',
    baseCls:  'btn btn-xs'
  });
};

export default {renderCalendar, populateGoogleDates, toggleCalendars}
