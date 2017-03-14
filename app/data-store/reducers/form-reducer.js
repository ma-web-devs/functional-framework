import R from 'ramda';

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'ADD_OPTION':
      var detailCopy = Object.assign({}, state.currentFormDetail, { options: [...state.currentFormDetail.options, ''] });
      return Object.assign({}, state, { currentFormDetail: detailCopy });
      break;

    case 'REMOVE_OPTION':
      // return Object.assign({}, state, {
      //   selectOptions: [
      //     ...state.selectOptions.slice(0, action.value),
      //     ...state.selectOptions.slice(action.value + 1)
      //   ]
      // });

      var detailCopy = Object.assign({}, state.currentFormDetail, {
        options: [
          ...state.currentFormDetail.options.slice(0, action.value),
          ...state.currentFormDetail.options.slice(action.value + 1)
        ]
      });

      return Object.assign({}, state, { currentFormDetail: detailCopy });
      break;

    case 'SAVE_OPTION':
      //make copy of and set value
      var optionCopy = Object.assign([], [...state.currentFormDetail.options]);
      optionCopy[action.value.index] = action.value.option;

      //make copy of currentFormDetails with options updated
      var currentFormDetailsCopy = Object.assign({}, state.currentFormDetail, { options: optionCopy });

      //return new object with currentFormDetailsCopy
      return Object.assign({}, state, { currentFormDetail: currentFormDetailsCopy });
      break;

    case 'ADD_FORM_DETAIL':
      const uniqueFormDetailList = R.uniqBy(R.prop('key'), [...state.formDetails, action.value]);
      return Object.assign({}, state, { formDetails: uniqueFormDetailList });
      break;

    case 'UPDATE_FORM_DETAIL':
      //create new array of all existing details up to the one being updated
      var updated = [];

      for (var arr of state.formDetails) {
        if (arr.key == action.value.key)
          updated = Object.assign([], [...updated, action.value]);
        else
          updated = Object.assign([], [...updated, arr]);
      }

      // //create new array of all existing details after to the one being updated
      // var after = [];
      // var found = false;
      // for (var arr of state.formDetails) {
      //   if (arr.key == action.value.key) {
      //     found = true;
      //     continue;
      //   }
      //   else {
      //     if (!found)
      //       continue;
      //     else
      //       after = Object.assign([], [...after, arr]);
      //   }
      // }

      // //create a new array before + updated + after
      // var updated = Object.assign([], [...before, action.value, ...after]);

      return Object.assign({}, state, { formDetails: updated });
      break;

    case 'SET_CURRENT_FORM_DETAIL':
      return Object.assign({}, state, { currentFormDetail: action.value });
      break;

    case 'DELETE_FORM_DETAIL':
      return Object.assign({}, state, { currentFormDetailKey: null }, { formDetails: state.formDetails.filter((detail) => detail.key !== action.value) });
      break;

    default:
      // @desc Always have a default to return state object
      return state;
  }
}
