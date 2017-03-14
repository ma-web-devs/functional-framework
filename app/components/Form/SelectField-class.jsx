import dom from '../../utils/dom'
import Field from './Field-class';
import { dispatch } from '../../index';

import R, { map } from 'ramda';


class SelectField extends Field {


  constructor({options=[]}) {
    super(...arguments);
  }


  jsx() {
    const currentClass = [this.className, !this.isValid ? this.errorClass : ''].join(' ');
    const onChangeEvent = this.onchange.bind(this);
    const wrapperClass = ['control-group', !this.isValid ? 'error' : ''].join(' ');

    // This only logs if this.debug == true
    this.logFieldInfo('rendering...');

    const optionElements = R.propOr([], 'options', this);

    return (
      <div className={wrapperClass}>
        <select name="cars">{
          map(option => <option value={option}>{option}</option>, optionElements)
        }
        </select>;

        {(!this.isValid ? <span class="help-inline error">{this.errorMsg}</span> : '')}
      </div>
    )
  }

}
