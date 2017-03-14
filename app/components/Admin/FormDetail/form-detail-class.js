import { database } from '../../../utils/firebase-app'
import { dispatch, dispatchAsync } from '../../../index'


export default class FormDetail {

    constructor(label = '', type = '', options = [], defaultValue = '', required = false) {
        this.key = void (0);
        this.label = label;
        this.type = type;
        this.options = options;
        this.defaultValue = defaultValue;
        this.required = required;
    }

    static ref(key) {
        if (key == null)
            return database.ref('form-details')
        else
            return database.ref('form-details/' + key);
    }

    static update(detail) {

        var ref = FormDetail.ref(detail.key);


        //update firebase
        ref.update({
            label: detail.label,
            type: detail.type,
            options: detail.options,
            defaultValue: detail.defaultValue,
            required: detail.required
        });

        dispatch({ type: 'UPDATE_FORM_DETAIL', value: detail });
        dispatch({ type: 'SET_CURRENT_FORM_DETAIL', value: detail });
    }

    static save(detail) {

        //if key already exists then it is update not an add
        if (detail.key) {
            FormDetail.update(detail);
            return;
        }

        FormDetail.saveToFirebase(detail);
    }

    static saveToFirebase(detail) {
        const { label, type, options, defaultValue, required } = detail

        //push and set at the same time
        let newFormDetail = FormDetail.ref().push({
            label,
            type,
            options,
            defaultValue,
            required
        });

        detail.key = newFormDetail.getKey();

        dispatch({ type: 'ADD_FORM_DETAIL', value: detail });
        dispatch({ type: 'SET_CURRENT_FORM_DETAIL', value: detail });
    }

    static loadFormDetails() {
        //use once instead of on to only get initial snapshot
        FormDetail.ref().once('value', (snapshot) => {
            snapshot.forEach(snap => {
                var detail = FormDetail.fromFirebaseSnapshot(snap);
                dispatch({ type: 'ADD_FORM_DETAIL', value: detail });
            })
        });
    }

    static fromFirebaseSnapshot(snapshot) {

        if (!snapshot || typeof snapshot.val !== "function") {
            throw "FormGroup.fromFirebaseSnapshot expects child of 'form-details' snapshot"
        }

        console.log('snapshot.val()', snapshot.val());

        // Create the instance of Event using Firebase Snapshot
        let { label, type, options, defaultValue, required } = snapshot.val()
        const detail = new FormDetail(label, type, options, defaultValue, required)

        console.log('formDetail', detail);

        detail.key = snapshot.getKey();

        return detail
    }


    static delete(key) {
        //pass undefined to Room.ref will delete all objects
        if (key) {
            FormDetail.ref(key).remove();
        }

        dispatch({ type: 'DELETE_FORM_DETAIL', value: key })
    }

}