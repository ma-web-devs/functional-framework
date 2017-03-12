import gcal from './gcal'
import {log} from './logger'
import R from 'ramda';

const {view, set, lensPath, lensProp, map, tap, pickAll, curry, evolve, prop, compose} = R;


const eventsToCalendar = (events) => $('#calendar').fullCalendar('addEventSource', events);

const colors = {
  'bdnha1319u329g6gsr6rcksg6c@group.calendar.google.com': {color: '#aeeea9', textColor: '#fef'},
  'led1grg2f8jtbtdrks7hv125fo@group.calendar.google.com': {color: '#ff91a0', textColor: '#fef'},
  '353tn8hvjnrtja3h21gbjgaigo@group.calendar.google.com': {color: '#acb3e8', textColor: '#fef'},
  't0gnqindnl5hfu7noj4iu3dvek@group.calendar.google.com': {color: '#ff9788', textColor: '#fef'}
};


const pickEventProps = pickAll(
  ['start', 'end', 'title', 'description', 'summary', 'iCalUID', 'htmlLink', 'created', 'organizer']);

// Create setter to map _
const setFromMap = curry((_keyA, _keyB, _map, obj) => set(lensProp(_keyA), prop(_keyB, _map), obj));

const viewItems = view(lensProp('items'));
const viewDateTime = view(lensProp('dateTime'));
const eventCalId = view(lensPath(['organizer', 'email']));
const setStartEndTimes = evolve({start: viewDateTime, end: viewDateTime});
const setColorFromCalendarId = obj => setFromMap('color', eventCalId(obj), colors)(obj);
const setTitleFromSummary = obj => setFromMap('title', 'summary', obj)(obj);

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

const fromSources = compose(map(sourceToEvent), viewItems);
const addSourceToCalendar = compose(tap(eventsToCalendar), fromSources);

const parseOriginalGoogleResp = R.once(function (sources) {
  renderInitialCalendar();
  const events = map((source) => {
    const events = viewItems(source);

    const calendarId = eventCalId(events[0]);

    const fullCalendarSource = Object.assign({
        events: fromSources(source)
      },
      R.propOr({}, calendarId, colors)
    );

    eventsToCalendar(fullCalendarSource);

    return fullCalendarSource;
  }, sources);

  log('initial events', events);
});

gcal.getSources()
  .then(R.tap(renderInitialCalendar))
  .then(parseOriginalGoogleResp);



function renderInitialCalendar() {

    const $calendar = $('#calendar');

    if (!$calendar.length){
      return void(0);
    }

    $calendar.fullCalendar({
        header: {
            right: 'month,agendaWeek' ,
            left: 'prev,next',
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
export const renderCalendar = function(timeout = 1, maxTimeout = 3000) {
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
    let sources = $('#calendar').fullCalendar('getEventSources');
    let calExists = false;

    if (sources.length > 0) {

        sources.forEach((source) => {
            if(newSource.calendarId === source.calendarId){
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
function removeEventSource(source){
    if(!source.added){
        let calId = {googleCalendarId: source.calendarId};
        $('#calendar').fullCalendar('removeEventSource', calId);
   }
}

// remove event source
function addEventSource(source){
    if(source.added){
        let calId = {
            googleCalendarId: source.calendarId,
            color: source.color,
            textColor: source.textColor
        };
        $('#calendar').fullCalendar('addEventSource', calId);
    }
}

// toggleCalendars
export function toggleCalendars(source,visible){
    if(!visible){
        removeEventSource(source);
    } else {
        addEventSource(source);
    }
}
export const populateGoogleDates = function(sources){
    sources.forEach((source) => {
        if(((!isSource(source)) && (source.visible === true) && (source.added === false))){
        let calId = {
            googleCalendarId: source.calendarId,
            color: source.color,
            textColor: source.textColor
        };
        $('#calendar').fullCalendar('addEventSource', calId);
        source.added = true;
        }
    });

};
// Render Events On Navigation
export const renderEventsOnNavigate = function(sources){
    displayCalendarFilter();
};

// Toggle Button Display
export const displayCalendarFilter = function (){
    $('#input-1').checkboxpicker({
        html: true,
        offLabel: '<span class="glyphicon glyphicon-remove">',
        onLabel: '<span class="glyphicon glyphicon-ok">',
        baseCls: 'btn btn-xs'
    });
    $('#input-2').checkboxpicker({
        html: true,
        offLabel: '<span class="glyphicon glyphicon-remove">',
        onLabel: '<span class="glyphicon glyphicon-ok">',
        baseCls: 'btn btn-xs'
    });
    $('#input-3').checkboxpicker({
        html: true,
        offLabel: '<span class="glyphicon glyphicon-remove">',
        onLabel: '<span class="glyphicon glyphicon-ok">',
        baseCls: 'btn btn-xs'
    });
    $('#input-4').checkboxpicker({
        html: true,
        offLabel: '<span class="glyphicon glyphicon-remove">',
        onLabel: '<span class="glyphicon glyphicon-ok">',
        baseCls: 'btn btn-xs'
    });
};

export default { renderCalendar , populateGoogleDates, toggleCalendars}
