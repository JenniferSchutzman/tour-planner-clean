import fetch from 'isomorphic-fetch';
import { SELECTED_INTEREST } from '../constants';
const url = 'http://localhost:5000';

export const areaOfInterest = async (dispatch, getState) => {
	dispatch({ type: SELECTED_INTEREST, payload: {} });
	const interests = await fetch(`${url}/interests`).then(res => res.json());
	dispatch({ type: SELECTED_INTEREST, payload: interests });
};
