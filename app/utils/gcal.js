const CLIENT_ID  = '895512080708-nsu25s3qth29utoqtkb51hps5aoq0c75.apps.googleusercontent.com'
const API_KEY    = 'AIzaSyBF391zC2S8su_r_-zFARAoWo1ekRsgcZE'
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const calId = 't0gnqindnl5hfu7noj4iu3dvek@group.calendar.google.com';

const calendars = [
  ['bdnha1319u329g6gsr6rcksg6c@group.calendar.google.com', 'The Library'],
  ['led1grg2f8jtbtdrks7hv125fo@group.calendar.google.com', 'Cesar Chavez Room'],
  ['353tn8hvjnrtja3h21gbjgaigo@group.calendar.google.com', 'Rosa Parks Room'],
  ['t0gnqindnl5hfu7noj4iu3dvek@group.calendar.google.com', 'Nelson Mandela']
]

const gapiPromise = new Promise(function (resolve, reject) {
  function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
        'apiKey': API_KEY,
        'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
        // clientId and scope are optional if auth is not required.
        'clientId': CLIENT_ID,
        'scope': SCOPES
      })
      .then(resolve, reject);

  };

  // 1. Load the JavaScript client library.
  gapi.load('client', start);
})



function getEventsFromGoogle(calendarId) {
  return new Promise((resolve, reject) => {
    const request = gapi.client.calendar.events.list({
      'calendarId':   calendarId,
      'timeMin':      (new Date()).toISOString(),
      'singleEvents': true,
      'maxResults':   100,
      'orderBy':      'startTime'
    });

    request.execute(function (resp) {
      return resp ? resolve(resp) : reject(resp);
    });
  });
}


const ourAPI = {
  calendars: null,

  /**
   * Return the Promise of Google Calendar Sources.
   * Optionally run a function first
   *
   * @param {Function} [precursorFn] - a function to run before returning sources
   * @returns {Promise}
   */
  getSources(precursorFn) {
    if (precursorFn && typeof precursorFn === "function") {
      precursorFn();
    }
    return new Promise((resolve, reject) => !this.calendars ? reject(null) : resolve(this.calendars))
  },

  /**
   * Only call this if the events aren't loaded (they probably are, they get
   * called when this module loads)
   */
  loadEvents() {
    ourAPI.calendars = gapiPromise.then(() => {
      return new Promise(function (resolve, reject) {
        // Have to load the calendar API First
        gapi.client.load('calendar', 'v3', function () {
          const gapiEventPromises = calendars
            .map(calPair => calPair[0])
            .map(getEventsFromGoogle);

          Promise.all(gapiEventPromises)
            .then(resolve, reject);

        });
      });
    });
  }
}

// initial loading of events
ourAPI.loadEvents();

export default ourAPI;
