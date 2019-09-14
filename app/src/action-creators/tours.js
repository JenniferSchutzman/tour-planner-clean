import fetch from 'isomorphic-fetch';
import { ALL_RECOMMENDATIONS, ALL_TOURS } from '../constants';
const url = 'http://localhost:5000';

export const recommendations = async (dispatch, getState) => {
	const tours = await fetch(`${url}/recommendations`).then(res => res.json());
	dispatch({ type: ALL_RECOMMENDATIONS, payload: tours });
};

export const allTours = async (dispatch, getState) => {
	const tours = await fetch(`${url}/tours`).then(res => res.json());
	dispatch({ type: ALL_TOURS, payload: tours });
};
