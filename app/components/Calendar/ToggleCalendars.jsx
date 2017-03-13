"use strict"
import dom from '../../utils/dom';
import {dispatch} from '../../index';
import {displayCalendarFilter} from '../../utils/calendar-utils';
import {map, propOr} from 'ramda';

const ToggleCheckbox = (source) => {
  return (
    <span>
      <input class="toggle-checkbox"
             type="checkbox"
             checked={source.visible}
             onchange={() => dispatch({type: 'TOGGLE_ROOM', value: source})} />
      <span className="checkboxText">{propOr('', 'title', source)}</span>
    </span>
  );
};


/**
 * Calendar Component
 * @param  {array} calendarEvents - The events for calendar to display
 * @return {VNode}
 */
export default ({state}) => {

  const sources = propOr([], 'sources', state);

  return (
    <section id="toggleCalendars">
      <div className="toggle-form-container">
        <div className="form-inline">
          <div className="toggle-wrapper" onclick={() => {
            let boxes          = jQuery("[id*='input-']");
            const checkedBoxes = boxes.filter((box) => {
              console.log(boxes[box].checked);
              return !boxes[box].checked;
            });
            if (checkedBoxes.length > 0) {
              return dispatch({type: 'TOGGLEROOMS', value: 'show'});
            } else {
              return dispatch({type: 'TOGGLEROOMS', value: 'hide'});
            }
          }}>


            {map(ToggleCheckbox, sources)}


            <span className={state.showAllToggles}><input id="toggle-all" type="checkbox" onchange={(e) => {
              if (e.target.checked) {
                console.log('target', e.target);
                jQuery('#toggle-all').prop('checked', false);
                return (
                  state.sources.forEach((room) => {
                    if (!room.visible) {
                      jQuery('#input-' + room.room).prop('checked', true);
                    }

                    dispatch({type: 'TOGGLEROOMS', value: 'hide'});
                  })
                )
              }
            }
            }/><span className="checkboxText">Show All</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}


jQuery(document).ready(function ($) {
  displayCalendarFilter();
});


