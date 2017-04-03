"use strict"
import dom from '../../utils/dom'
import {
  displayCalendarFilter,
  setAllCalendarSwitches
} from '../../utils/calendar-utils'
import {
  curry,
  map,
  propOr,
  propEq,
  any
} from 'ramda'


// Succeeds if any have {}.visible == false.
// someAreHidden :: Array<Object> -> Bool
const someAreHidden = any(propEq('visible', false))


/**
 * Create the checkbox toggle switch (it's all CSS, no jQuery)
 *
 * ToggleCheckboxJSX :: Source -> VNode
 *
 * @param dispatch
 * @param source
 * @returns {VNode}
 */
const ToggleCheckboxJSX = curry(
  (dispatch, source) => {

    const offClassName = `btn btn-sm btn-${!source.visible ? 'danger active' : 'default'}`
    const onClassName = `btn btn-sm btn-${source.visible ? 'success active' : 'default'}`

    return (
      <div className="col-xs-6 col-sm-4 toggle-btn">
          <div className="btn-group" tabindex="0"
               onclick={() => dispatch({type: 'TOGGLE_ROOM', value: source})}>
            <a className={offClassName}>
              <span className="glyphicon glyphicon-remove"></span>
            </a>
            <a className={onClassName}>
              <span className="glyphicon glyphicon-thumbs-up"></span>
            </a>
          </div>
          <strong className="checkboxText">{propOr('', 'title', source)}</strong>
      </div>
    )
  })



/**
 * Show all sources button (to toggle all checkboxes to true)
 *
 * showAllSourcesButton :: (Func, Bool) -> VNode
 *
 * @param dispatch
 * @param showButton
 * @returns {*}
 * @constructor
 */
const ShowAllSourcesButton = (dispatch, showButton = false) => {

  return showButton ? (
      <span onclick={() => dispatch({type: 'SHOW_ALL_SOURCES'})}
            className="btn btn-sm btn-success">
        Show All Events
      </span>
    ) : null
}



/**
 * Calendar Toggle Switches Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state: {sources = []}, dispatch}) => {

  const displayShowAll = someAreHidden(sources)

  return (
    <section id="toggleCalendars">
      <div className="toggle-form-container">
        <div className="form form-inline">
          <div className="toggle-wrapper">

            <div className="row">
              <div className="form-group form-group-sm">
                {/* Render Checkboxes for Toggle Switches */}
                {map(ToggleCheckboxJSX(dispatch), sources)}
                {/* Render the "show all" sources button */}
                {ShowAllSourcesButton(dispatch, displayShowAll)}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
