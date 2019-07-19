import React from 'react';
//import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import {
	LOGIN_POGRESS,
	FETCHED_SOLUTION,
	PROGRESS_DONE,
	FETCHED_ISSUES,
	FETCH_SYMPTOMS,
	SYMPTOM_LOADING,
	SYMPTOM_SUCCESS,
	API_PROD,
	MAKE_ISENDING_FALSE,
	MAKE_ISENDING_TRUE,
	UPDATE_RADIO_SELECTED_VALUE,
	ISTERMSNOTDONE,
	ISTERMSDONE
} from './types';


//List of issues/diseases
export const fetchIssue = () => {
	return (dispatch) => {
		userIsseusSuccessWithApi(dispatch);
	};
};

const userIsseusSuccessWithApi = (dispatch) => {
	//console.log('reached 1');
	let xUserToken = null
	dispatch({ type: LOGIN_POGRESS });
	fetch(`${API_PROD}/api/v1/flows/start.json`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((responseJson) => {
			//console.log('reached 3');
			console.log(responseJson.success);
			if (responseJson.success === true) {
				dispatch({ type: FETCHED_ISSUES, payload: responseJson.categories });
				console.log(responseJson.categories);
			} else {
				dispatch({ type: PROGRESS_DONE });
				// Alert.alert('Oops', responseJson.error, 'OK');
				Alert.alert(
					'Oops progress Done 1',
					"responseJson.error",
					[
						{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
						{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
						{ text: 'OK', onPress: () => console.log('OK Pressed') },
					],
					{ cancelable: false }
				)
			}
		})
		.catch((error) => {
			dispatch({ type: PROGRESS_DONE });
			// Alert.alert('Oops', error, 'OK');
			Alert.alert(
				'Oops progress_Done 2',
				"error",
				[
					{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
					{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
					{ text: 'OK', onPress: () => console.log('OK Pressed') },
				],
				{ cancelable: false }
			)
		});
};

// Getting yes/no questions
export const fetchSymptom = (id) => {
	return (dispatch) => {
		userSymptoms(dispatch, id);
	};
};

const userSymptoms = (dispatch, id) => {
	//console.log('reached 1');
	let xUserToken = null
	dispatch({ type: SYMPTOM_LOADING });
	fetch(`${API_PROD}/api/v1/flows/initial/${id}.json`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((responseJson) => {
			//console.log('reached 3');
			//console.log(responseJson);
			console.log(responseJson.success);
			if (responseJson.success === true) {
				dispatch({ type: FETCH_SYMPTOMS, payload: responseJson });
				//dispatch({ type: PROGRESS_DONE });
			} else {
				dispatch({ type: SYMPTOM_SUCCESS });
				//  Alert.alert('Oops', responseJson.error, 'OK');
				Alert.alert(
					'Oops symptom_success 1',
					"responseJson.error",
					[
						{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
						{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
						{ text: 'OK', onPress: () => console.log('OK Pressed') },
					],
					{ cancelable: false }
				)
			}
		})
		.catch((error) => {
			console.error(error);
			dispatch({ type: SYMPTOM_SUCCESS });
			//  Alert.alert('Oops', error, 'OK');
			Alert.alert(
				'Oops symtom_success 2',
				"error",
				[
					{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
					{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
					{ text: 'OK', onPress: () => console.log('OK Pressed') },
				],
				{ cancelable: false }
			)
		});
};

//Sending the selected option
export const fetchAnswer = (url, value) => {
	return (dispatch) => {
		userSelectionAnswers(dispatch, url, value);
	};
};


const userSelectionAnswers = (dispatch, url, value) => {
	//console.log('reached 1');
	let xUserToken = null
	dispatch({ type: SYMPTOM_LOADING });
	fetch(`${API_PROD}/${url}.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			selected_val: value,
		}),
	})
		.then((response) => response.json())
		.then((responseJson) => {
			//console.log('reached 9');
			//console.log(responseJson);
			console.log(responseJson.success);
			if (responseJson.success === true) {
				if (responseJson.ending === true) {
					dispatch({ type: MAKE_ISENDING_TRUE });
					dispatch({ type: FETCHED_SOLUTION, payload: responseJson });
				} else {
					dispatch({ type: FETCH_SYMPTOMS, payload: responseJson });
				}

			} else {
				dispatch({ type: SYMPTOM_SUCCESS });
				//  Alert.alert('Oops', responseJson.error, 'OK');
				Alert.alert(
					'Oops symptom_success 3',
					"responseJson.error",
					[
						{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
						{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
						{ text: 'OK', onPress: () => console.log('OK Pressed') },
					],
					{ cancelable: false }
				)
			}
		})
		.catch((error) => {
			console.error(error);
			dispatch({ type: SYMPTOM_SUCCESS });
			//  Alert.alert('Oops', error, 'OK');
			Alert.alert(
				'Oops symptom_success 4',
				"error",
				[
					{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
					{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
					{ text: 'OK', onPress: () => console.log('OK Pressed') },
				],
				{ cancelable: false }
			)
		});
};

//To make isEnding as False
export const makeIsEndingFalse = () => {
	return (dispatch) => {
		dispatch({ type: MAKE_ISENDING_FALSE });
	};
};

export const makeIsTermsDone = () => {
	return (dispatch) => {
		dispatch({ type: ISTERMSDONE });
	};
};

export const makeIsTermsNotDone = () => {
	return (dispatch) => {
		dispatch({ type: ISTERMSNOTDONE });
	};
};

export const updateRadioSelectedValue = (inputs, valueToSend) => {
	return (dispatch) => {
		//console.log('inputs1 - ', inputs)
		dispatch({ type: UPDATE_RADIO_SELECTED_VALUE, payload: { inputs, valueToSend } });
	};
};



export const fetchAnswerForMultiSelection = (url, value) => {
	return (dispatch) => {
		userMultiSelectionAnswers(dispatch, url, value);
	};
};


const userMultiSelectionAnswers = (dispatch, url, value) => {
	//console.log('reached 1');
	let xUserToken = null
	dispatch({ type: SYMPTOM_LOADING });
	fetch(`${API_PROD}/${url}.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			options: value,
		}),
	})
		.then((response) => response.json())
		.then((responseJson) => {
			//console.log('reached 9');
			//console.log(responseJson);
			if (responseJson.success === true) {
				if (responseJson.ending === true) {
					dispatch({ type: MAKE_ISENDING_TRUE });
					dispatch({ type: FETCHED_SOLUTION, payload: responseJson });
				} else {
					dispatch({ type: FETCH_SYMPTOMS, payload: responseJson });
				}

			} else {
				dispatch({ type: SYMPTOM_SUCCESS });
				//  Alert.alert('Oops', responseJson.error, 'OK');
				Alert.alert(
					'Oops symtom success 5',
					"responseJson.error",
					[
						{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
						{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
						{ text: 'OK', onPress: () => console.log('OK Pressed') },
					],
					{ cancelable: false }
				)
			}
		})
		.catch((error) => {
			console.error(error);
			dispatch({ type: SYMPTOM_SUCCESS });
			//  Alert.alert('Oops', error, 'OK');
			Alert.alert(
				'Oops symptom success 6',
				"error",
				[
					{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
					{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
					{ text: 'OK', onPress: () => console.log('OK Pressed') },
				],
				{ cancelable: false }
			)
		});
};