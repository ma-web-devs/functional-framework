/**
 * Loads the app into an iframe and resizes on Actions from redux
 */
const {error, log} = window.console
const DEV = /(localhost)|(:5000)/.test(window.location.origin),
      iframeSelector = '[data-app="ma-web-dev-booking"]',
      iframeSrc = `${ DEV ? '..' : './app' }/index.html#index`,
      appIframe = document.querySelector(iframeSelector);

if (!Promise) {
  // promise polyfill
  (function (root) {

    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;

    function noop() {
    }

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }

    function Promise(fn) {
      if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function') throw new TypeError('not a function');
      this._state     = 0;
      this._handled   = false;
      this._value     = undefined;
      this._deferreds = [];

      doResolve(fn, this);
    }

    function handle(self, deferred) {
      while (self._state === 3) {
        self = self._value;
      }
      if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
      }
      self._handled = true;
      Promise._immediateFn(function () {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
          return;
        }
        var ret;
        try {
          ret = cb(self._value);
        } catch (e) {
          reject(deferred.promise, e);
          return;
        }
        resolve(deferred.promise, ret);
      });
    }

    function resolve(self, newValue) {
      try {
        // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
        if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (newValue instanceof Promise) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
          } else if (typeof then === 'function') {
            doResolve(bind(then, newValue), self);
            return;
          }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
      } catch (e) {
        reject(self, e);
      }
    }

    function reject(self, newValue) {
      self._state = 2;
      self._value = newValue;
      finale(self);
    }

    function finale(self) {
      if (self._state === 2 && self._deferreds.length === 0) {
        Promise._immediateFn(function () {
          if (!self._handled) {
            Promise._unhandledRejectionFn(self._value);
          }
        });
      }

      for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
      }
      self._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected  = typeof onRejected === 'function' ? onRejected : null;
      this.promise     = promise;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
      var done = false;
      try {
        fn(function (value) {
          if (done) return;
          done = true;
          resolve(self, value);
        }, function (reason) {
          if (done) return;
          done = true;
          reject(self, reason);
        });
      } catch (ex) {
        if (done) return;
        done = true;
        reject(self, ex);
      }
    }

    Promise.prototype['catch'] = function (onRejected) {
      return this.then(null, onRejected);
    };

    Promise.prototype.then = function (onFulfilled, onRejected) {
      var prom = new (this.constructor)(noop);

      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    };

    Promise.all = function (arr) {
      var args = Array.prototype.slice.call(arr);

      return new Promise(function (resolve, reject) {
        if (args.length === 0) return resolve([]);
        var remaining = args.length;

        function res(i, val) {
          try {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }

        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };

    Promise.resolve = function (value) {
      if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
      }

      return new Promise(function (resolve) {
        resolve(value);
      });
    };

    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };

    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve, reject);
        }
      });
    };

    // Use polyfill for setImmediate for performance gains
    Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) {
        setImmediate(fn);
      }) ||
      function (fn) {
        setTimeoutFunc(fn, 0);
      };

    Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
      if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
      }
    };

    /**
     * Set the immediate function to execute callbacks
     * @param fn {function} Function to execute
     * @deprecated
     */
    Promise._setImmediateFn = function _setImmediateFn(fn) {
      Promise._immediateFn = fn;
    };

    /**
     * Change the function to execute on unhandled rejection
     * @param {function} fn Function to execute on unhandled rejection
     * @deprecated
     */
    Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
      Promise._unhandledRejectionFn = fn;
    };

    if (typeof module !== 'undefined' && module.exports) {
      module.exports = Promise;
    } else if (!root.Promise) {
      root.Promise = Promise;
    }

  })(this);
}

hideElem(appIframe)
getRamda('R')
  .then(setupBookingApp, error);


function setupBookingApp(R) {

  const {map, prop, is, contains, compose} = R;

  const app = {
    iframe: appIframe,
    parent: window,
    listeners: [],
    addActionListener(listenerFn, type='@@/ANY') {
      if (is(String, type) && is(Function, listenerFn)) {
        this.listeners = [...this.listeners, {type,listenerFn}];
        return true;
      }
      throw new Error('app.addActionListener expects 2 arguments, a function and a string');
    },
    fireAction({type, value}) {
      map(listener => {
        if (contains(prop('type', listener), [ type, '@@/ANY'])) {
          prop('listenerFn', listener)(value, type);
        }
      }, this.listeners);
    },
    errors: []
  };

  const {iframe, errors} = app;

  if (!(iframe instanceof HTMLIFrameElement)) {
    errors.push(`.iframe must be an HTMLIFrameElement, not ${typeof iframe}`);
    return arguments[0];
  }


  iframe.addEventListener('load', () => {
    setTimeout(
      compose(setIframeHeight, styleVisibleElem), 0, iframe);
  });


  /**
   * Setup a listener for events from the app.
   */
  window.addEventListener('message', function (messageData) {
    if (messageData && messageData.isTrusted && typeof messageData.data === "object") {
      log('Action from embedded app: ', messageData.data);
      app.fireAction(messageData.data);
      setTimeout(setIframeHeight, 0, iframe);
    }
  });

  // set the src property
  iframe.setAttribute('src', iframeSrc);
  return iframe;
}


/**
 * Get Ramda loaded
 * @param NS
 * @returns {Promise}
 */
function getRamda(NS = 'R') {
  const ram = (window || global || {})[NS];

  return new Promise((resolve, reject) => {
    if (ram && typeof ram === "object" && typeof ram.map === "function") {
      // Ramda is loaded
      return resolve(ram);
    }
    const script = document.createElement('script');
    script.onload = () => {
      if (!ram) {
        (window || global || {})[NS] = R;
      }
      return resolve(R);
    }
    script.onerror = reject;
    //script.src = '//cdn.jsdelivr.net/ramda/0.23.0/ramda.min.js';
    script.src = './ramda.min.js';
    document.head.appendChild(script);
  });
}


function hideElem(elem) {
  elem.style.visibility = 'hidden';
  elem.style.width = '100%';
  elem.style.height = '0';
  return elem;
}

function styleVisibleElem(ifrm) {
  ifrm.style.visibility = 'visible';
  ifrm.style.width = '100%';
  ifrm.style.overflow = 'hidden';
  ifrm.style.border = 'unset';
  return ifrm;
}



function setIframeHeight(targetIframe) {
  var doc = targetIframe.contentDocument ? targetIframe.contentDocument : targetIframe.contentWindow.document;
  var parent = targetIframe.parent;
  if (parent) {
    parent.style.height = `${Math.max(10, parseInt(targetIframe.clientHeight), parseInt(parent.clientHeight))}px`;
  }
  targetIframe.style.visibility = 'hidden';
  targetIframe.style.height = "10px"; // reset to minimal height ...
  // IE opt. for bing/msn needs a bit added or scrollbar appears
  var iframeHeight = getDocHeight(doc) + 4;
  if (parent) {
    parent.style.height = `${Math.max(iframeHeight, parseInt(targetIframe.clientHeight), parseInt(parent.clientHeight))}px`;
  }
  targetIframe.style.height = `${iframeHeight}px`;
  targetIframe.style.visibility = 'visible';
  return targetIframe;
}


function getDocHeight(doc) {
  doc = doc || document;
  // stackoverflow.com/questions/1145850/
  var body = doc.body, html = doc.documentElement;
  var height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );
  return height;
}
