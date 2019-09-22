import React from 'react';
import { connect } from 'react-redux';
import { pathOr } from 'ramda';
import { SELECTED_INTEREST } from '../../constants';
import {
	SELECTED_ADVENTURE,
	SELECTED_HAUNTED,
	SELECTED_HISTORY,
	SELECTED_CULINARY
} from '../../constants';
import ImageGrid from '../../components/ImageGrid';
import ImageButtons from '../../components/ImageButtons';

const Interests = props => {
	const { classes, selectInterest, history } = props;
	const width = '70%';
	const interests = pathOr([], ['stateTracker', 'interests'], props);
	// console.log('interests', interests);
	return (
		<div>
			<center>
				<ImageGrid data={interests} />
				<ImageButtons
					data={interests}
					onClick={e => selectInterest(history, e.currentTarget.value)}
				/>
			</center>
		</div>
	);
};

function mapStateToProps(state) {
	//console.log('what is state?', state);
	return {
		stateTracker: state.stateTracker
	};
}

function mapActionsToProps(dispatch) {
	return {
		selectInterest: (history, value) => {
			console.log('onClick clicked', value);
			switch (value) {
				case 'Adventure':
					dispatch({ type: SELECTED_ADVENTURE, payload: value });
					history.push(`/interests/${value}`);
					return null;
				case 'History':
					dispatch({ type: SELECTED_HISTORY, payload: value });
					history.push(`/interests/${value}`);
					return null;
				case 'Haunted':
					dispatch({ type: SELECTED_HAUNTED, payload: value });
					history.push(`/interests/${value}`);
					return null;
				case 'Culinary':
					dispatch({ type: SELECTED_CULINARY, payload: value });
					history.push(`/interests/${value}`);
					return null;
			}
		}
	};
}

const connector = connect(mapStateToProps, mapActionsToProps);

export default connector(Interests);
