import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tours from './reducers/tours';
import tour from './reducers/get-tour';
import stateTracker from './reducers/response-tracker';
import { checkDay, stateTrackerExperiences } from './reducers/response-tracker';

const store = createStore(
	combineReducers({
		tour,
		tours,
		stateTracker
	}),
	applyMiddleware(thunk)
);

export default store;
