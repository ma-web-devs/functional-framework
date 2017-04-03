import {updateAt} from '../../utils/helpers';

/**
 * Action to handle depositing Monopoly Money into the bank
 * @param state
 * @param action
 * @returns {*}
 */
function depositMoneyAction(state, action) {
  const oldBalance = state.balance || 0;
  const newBalance = oldBalance + action.value;

  // Clones the state object and then overwrites state.balance
  return updateAt('balance')(newBalance, state);
}


/**
 * Action to handle withdrawals
 * @param state
 * @param action
 * @returns {*}
 */
function withdrawMoneyAction(state, action) {
  const oldBalance = state.balance || 0;
  const newBalance = oldBalance - action.value;

  // Object assign is the same as doing
  return Object.assign({}, state, {balance: newBalance})
}


/**
 * This function is called by the "redux-like" store after one of our components
 * calls the @function dispatch with an @type Action action. It will update the
 * state of the app and trigger all JSX components to create updated virtual nodes.
 * (so if there is a change in your component afterwards, it will render automagically)
 * .
 * @param state      - the current app state
 * @param action     - an action {type: string, action: mixed}
 * @returns {object} - the new app state (or the old state if no change)
 */
export default (state = {}, action) => {

  switch (action.type) {

    case '@@INIT':
      return Object.assign({}, state, {
        example: {
          balance: 0,
          form: {
            amount: {
              value: 0,
              type: 'number',
              validator(val) {
                return val % 2 === 0;
              }
            }
          }}
      })

    case 'EX_CHANGE_AMOUNT':
      const update = updateAt('example', 'form', 'amount', 'value')
      return update(action.value, state)

    case 'DEPOSIT':
      return depositMoneyAction(state, action)

    case 'WITHDRAW':
      return withdrawMoneyAction(state, action)

    default:
      // @desc Always have a default to return state object
      return state
  }
}
