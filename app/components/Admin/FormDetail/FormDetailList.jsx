"use strict"
import dom from '../../../utils/dom';
import { log } from '../../../utils/logger'
import { dispatch, dispatchAsync } from '../../../index'

import FormDetail from './form-detail-class.js'


export default ({ state, dispatch }) => {

    function edit(detail) {
        dispatch({ type: 'SET_CURRENT_FORM_DETAIL', value: detail })
        dispatch({ type: 'NAVIGATE', value: 'form-detail-component' })
    }

    function add() {
        var detail = new FormDetail();
        edit(detail);
    }


    function getTable() {
        if (state.formDetails.length > 0) {
            return (

                <table className="table">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Label</th>
                            <th>Type</th>
                            <th>Default Value</th>
                            <th>Required</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.formDetails.map(item =>
                            <tr>
                                <td>{item.key}</td>
                                <td>{item.label}</td>
                                <td>{item.type}</td>
                                <td>{item.defaultValue}</td>
                                <td>{item.required.toString()}</td>
                                <td className="btn btn-success fa fa-pencil"
                                    onclick={
                                        () => edit(item)
                                    }>&nbsp;</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            );
        }
    }

    return (
        <div>
            <h3>Form Detail List</h3>
            <div>
                <span className={state.auth ? 'btn btn-success' : 'btn btn-success hide'} onclick={() => FormDetail.loadFormDetails()} >Load</span>
                <span className={state.auth ? 'btn btn-success' : 'btn btn-success hide'} onclick={() => add()} >Add</span>
            </div>
            {getTable()}
        </div>
    );
}

