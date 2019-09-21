import React from 'react';
import { connect } from 'react-redux';
import { prop, find, compose } from 'ramda';
import { SELECTED_ADVENTURE } from '../../constants';
import ImageGrid from '../../components/ImageGrid';
import ImageButtons from '../../components/ImageButtons';

const Adventure = props => {
	const {
		onClick,
		history,
		useValueForNextScreen,
		imageName,
		getImageName
	} = props;
	// console.log('props on Adventure', props);
	const data = compose(
		prop('experienceTypes'),
		find(x => x.name === 'Adventure')
	)(props.insideInterests);
	// console.log('data', data);

	return (
		<div>
			<ImageGrid data={data} />
			<ImageButtons
				data={data}
				getImageName={useValueForNextScreen(history, imageName)}
			/>
			))}
		</div>
	);
};

function mapStateToProps(state) {
	return {
		insideInterests: state.stateTracker.interests
	};
}

function mapActionsToProps(dispatch) {
	return {
		useValueForNextScreen: (history, value) => () => {
			console.log('hit onclick', value);
			dispatch({ type: SELECTED_ADVENTURE, payload: value });
			console.log('hit onclick', value);
			history.push(`/schedule`);
		}
	};
}
const connector = connect(mapStateToProps, mapActionsToProps);

export default connector(Adventure);
