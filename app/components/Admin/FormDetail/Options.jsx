"use strict"
import dom from '../../../utils/dom';
import { dispatch, dispatchAsync } from '../../../index'
import { auth } from '../../../utils/firebase-app'

//build option elements for select control
var optionElements = [];
optionElements.push(<div><input type='text' value='One'></input></div>);
optionElements.push(<div><input type='text' value='Two'></input></div>);

// for (var i = 0; i < this.options.length; i++) {
//     optionElements.push(<option value={this.options[i]}>{this.options[i]}</option>);
// }

export default ({ state, dispatch }) => {

    function getOptions() {

        return (
            <div>
                {optionElements}
            </div>
        );
    }

    return (
        <div>
            {getOptions()}
        </div>
    );
}
