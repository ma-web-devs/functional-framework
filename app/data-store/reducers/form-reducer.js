import R, {
  propOr
} from 'ramda';


export default (state = defaultState, action) => {
  switch (action.type) {

    /**
     * TOGGLE_OPTIONS :: Toggle the boolean state.displayControlOptions property.
     *                  (requires no value set on action.value)
     */
    case 'TOGGLE_OPTIONS':
      const displayControlOptions = !propOr(false, 'displayControlOptions', state);
      return Object.assign({}, state, {displayControlOptions});


    default:
      // @desc Always have a default to return state object
      return state
  }
}
