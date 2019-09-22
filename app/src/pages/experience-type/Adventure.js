import React from 'react';
import { connect } from 'react-redux';
import { prop, find, compose } from 'ramda';
import { SELECTED_ADVENTURE } from '../../constants';
import ImageGrid from '../../components/ImageGrid';
import ImageButtons from '../../components/ImageButtons';

class Adventure extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = { value: '' };
	// 	this.handleClick = this.handleClick.bind(this);
	// }
	//
	// handleClick(imageName) {
	// 	this.setState({ value: imageName });
	// 	console.log(this.state.value);
	// }
	render() {
		const { history, useValueForNextScreen } = this.props;

		const data = compose(
			prop('experienceTypes'),
			find(x => x.name === 'Adventure')
		)(this.props.insideInterests);

		// const imageName = props.imageName;
		// const print = () => console.log('imageName');

		return (
			<div>
				<ImageGrid data={data} />
				<ImageButtons
					data={data}
					onClick={e => useValueForNextScreen(history, e.currentTarget.value)}
				/>
				))
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		insideInterests: state.stateTracker.interests
	};
}

function mapActionsToProps(dispatch) {
	return {
		useValueForNextScreen: (history, value) => {
			console.log('hit onclick', value);
			dispatch({ type: SELECTED_ADVENTURE, payload: value });
			console.log('hit onclick', value);
			history.push(`/schedule`);
		}
	};
}

const connector = connect(mapStateToProps, mapActionsToProps);

export default connector(Adventure);
