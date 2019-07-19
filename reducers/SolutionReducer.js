import {
	FETCHED_SOLUTION,
} from '../actions/types';

const INITIAL_STATE = {
    navigationRoute: {
       
    },
	isLoading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case FETCHED_SOLUTION:
            //console.log('reached symptom reducer');
            return { ...state, navigationRoute: action.payload };

		default:
           return state;
	}
};