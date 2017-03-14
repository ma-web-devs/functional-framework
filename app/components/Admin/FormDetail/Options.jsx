"use strict"
import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'
import { auth } from '../../../utils/firebase-app'

export default ({ state, dispatch }) => {

    function saveItem(item) {
        var id = +item.srcElement.id;
        var elem = 'input_'.concat(id);

        var x = document.getElementById(elem).value;
        var val = {
            index: id,
            option: x
        };

        dispatch({ type: 'SAVE_OPTION', value: val})
    }

    function removeItem(item) {
        dispatch({ type: 'REMOVE_OPTION', value: +item.srcElement.id })
    }


    function getInputElements() {
        if (state.currentFormDetail.options.length > 0) {
            var rows = [];
            for (var i = 0; i < state.currentFormDetail.options.length; i++) {
                var inputId = 'input_' + i;
                var value = state.currentFormDetail.options[i];

                rows.push(
                    <div>
                        <input id={inputId} type='text' value={value}></input>
                        <span className="btn btn-success fa fa-save" id={i} onclick={(x) => saveItem(x)}></span>
                        <span className="btn btn-danger fa fa-remove" id={i} onclick={(x) => removeItem(x)}></span>
                    </div>
                );
            }

            return (
                <div>
                    {rows}
                </div>
            );
        }
    }


    return (
        <div>
            <span className='btn btn-success' onclick={() => dispatch({ type: 'ADD_OPTION' })} >Add</span>
            {getInputElements()}
        </div>
    );
}
