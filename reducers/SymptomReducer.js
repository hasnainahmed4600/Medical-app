import {
	FETCH_SYMPTOMS,
	SYMPTOM_LOADING,
    SYMPTOM_SUCCESS,
    MAKE_ISENDING_FALSE,
    MAKE_ISENDING_TRUE,
    UPDATE_RADIO_SELECTED_VALUE
} from '../actions/types';

const INITIAL_STATE = {
	symptom : { 
        ending: false,
        post_url: "api/v1/flows/set_initial/52",
        prompt: {
            question: "Dose the patient being treated have any of the following conditions?",
            body: "\n•  Severe acne.\n\n•  Unsure if the skin condition is acne.\n\n• A lot of friction or pressure will be applied to the affected skin area, from work or lifestyle.\n\n• Acne is a side effect from a medication. ",
            role: "Boolean"
        },
        inputs: [
        {
            name: "Yes",
            value: 1,
            image: "",
            imageLoading: false
        },
        {
            name: "No",
            value: 2,
            image: "",
            imageLoading: false
        }
    ] }, 
    singleSelectData: null,
	isLoading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case SYMPTOM_LOADING:
            //console.log('progess Happening');
            return { ...state, isLoading: true };

		case SYMPTOM_SUCCESS:
            //console.log('progess Done');
            return { ...state, isLoading: false };

		case FETCH_SYMPTOMS:
            //console.log('reached symptom reducer');
            action.payload.inputs.map(v => v.isSelected = false)
            action.payload.inputs.map(v => v.imageLoading = false)
            //console.log('partner idea');
            //console.log(action.payload);
            return { ...state, symptom: action.payload, isLoading: false, singleSelectData: null };

        case MAKE_ISENDING_TRUE:
            //console.log('reached symptom reducer');
            return { ...state, symptom: { ...state.symptom, ending: true }, isLoading: false };

        case MAKE_ISENDING_FALSE:
            //console.log('reached symptom reducer');
            return { ...state, symptom: { ...state.symptom, ending: false }, isLoading: false };

        case UPDATE_RADIO_SELECTED_VALUE:
            //console.log('inputs2 - ', action.payload)
            return { ...state, symptom: { ...state.symptom, inputs: action.payload.inputs },singleSelectData: action.payload.valueToSend, isLoading: false };
		default:
           return state;
	}
};