import gcal from './gcal'
import {dispatch} from '../index';

import {
  propEq, compose, once, tap,
  pickAll, curry, evolve, prop, propOr,
  view, set, lensPath, lensProp, filter, map
} from 'ramda';



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

// This will always return the same sources, it can only run once
// parseOriginalGoogleResp :: RawSources -> Array<Source>
const parseOriginalGoogleResp = once(function (sources) {

  let sourceKey = 0;
  const events = map((source) => {
    const events     = viewItems(source);
    const calendarId = eventCalId(events[0]);

    return Object.assign({
        events: fromSources(source),
        visible: true,
        title: propOr('', 'summary', source),
        description: propOr('', 'description', source),
        id: propOr('', 'id', source),
        key: sourceKey++
      },
      propOr({}, calendarId, colors)
    );

  }, sources);

  return events;
});


// mapSourcesToCalendar :: Array<Source> -> Side Effect
export const mapVisibleSourcesToFullCalendar = compose(
  map(source => $('#calendar').fullCalendar('addEventSource', source)),
  filter(propEq('visible', true))
);

export const setMasterSources = tap(sources => dispatch({type: 'SET_SOURCES', value: sources}));

export function renderInitialCalendar() {
  $('#calendar').fullCalendar({
    header: {
      right:  'month,agendaWeek',
      left:   'prev,next',
      center: 'title'
    }
  });
}


/**
 * When the app first loads we render calendar. The method gcal.getSources
 * returns a Promise that resolves all the Google Calendars.
 *
 * Raw Sources come in -> parse to FullCalendar Sources
 * (this only needs to run once...)
 */
gcal.getSources(renderInitialCalendar)
  .then(tap(sources => {
    /* Raw sources (from Google Calendar API) */
  }))
  .then(parseOriginalGoogleResp)
  .then(setMasterSources)
  .then(tap(sources => {
    /* Parsed sources (as given to the calendar) */
  }))
