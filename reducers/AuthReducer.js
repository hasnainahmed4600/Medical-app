import {
	FETCHED_ISSUES,
	PROGRESS_DONE,
	LOGIN_POGRESS,
	ISTERMSDONE,
	ISTERMSNOTDONE
} from '../actions/types';

const INITIAL_STATE = {
	issues : [{ "id":52,"name":"Acne" }], 
	isLoading: false,
	isTermsAndCondition: true
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case ISTERMSDONE:
		return { ...state, isTermsAndCondition: false };

		case ISTERMSNOTDONE:
		return { ...state, isTermsAndCondition: true };

		case LOGIN_POGRESS:
		//console.log('progess Happening');
		return { ...state, isLoading: true };

		case PROGRESS_DONE:
		//console.log('progess Done');
		return { ...state, isLoading: false };

		case FETCHED_ISSUES:
		   return { ...state, issues: action.payload, isLoading: false };

		default:
           return state;
	}
};
