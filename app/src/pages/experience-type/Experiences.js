import React from 'react';
import { connect } from 'react-redux';
import { prop, find, compose } from 'ramda';
import { SELECTED_EXPERIENCE } from '../../constants';
import ImageGrid from '../../components/ImageGrid';
import ImageButtons from '../../components/ImageButtons';

const Experiences = props => {
	const { history, selectExperience } = props;
	const data = props.insideCorrectCategory;
	console.log('stateTrackerAll', props.stateTrackerAll);
	console.log('inside experiences', data);
	return (
		<div>
			<ImageGrid data={data} />
			<ImageButtons
				data={data}
				onClick={e => selectExperience(history, e.currentTarget.value)}
			/>
			))
		</div>
	);
};

function mapStateToProps(state) {
	console.log('state in experiences', state);
	return {
		insideCorrectCategory: state.stateTracker.interests,
		stateTrackerAll: state.stateTracker
	};
}

function mapActionsToProps(dispatch) {
	return {
		selectExperience: (history, value) => {
			// console.log('experience value', value);
			dispatch({ type: SELECTED_EXPERIENCE, payload: value });
			history.push(`/schedule`);
			// switch (value) {
			// 	case 'Adventure':
			// 		dispatch({ type: SELECTED_ADVENTURE, payload: value });
			// 		history.push(`/schedule`);
			// 	case 'History':
			// 		dispatch({ type: SELECTED_HISTORY, payload: value });
			// 		history.push(`/schedule`);
			// 	case 'Haunted':
			// 		dispatch({ type: SELECTED_HAUNTED, payload: value });
			// 		history.push(`/schedule`);
			// 	case 'Culinary':
			// 		dispatch({ type: SELECTED_CULINARY, payload: value });
			// 		history.push(`/schedule`);
			// }
		}
	};
}

const connector = connect(mapStateToProps, mapActionsToProps);

export default connector(Experiences);
