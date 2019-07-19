import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SymptomReducer from './SymptomReducer';
import SolutionReducer from './SolutionReducer';

export default combineReducers({
	auth: AuthReducer,
	symptoms: SymptomReducer,
	solution: SolutionReducer
});
