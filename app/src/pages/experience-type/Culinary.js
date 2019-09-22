import React from 'react';
import { connect } from 'react-redux';
import { prop, find, compose, tap } from 'ramda';
import { SELECTED_CULINARY } from '../../constants';
import ImageGrid from '../../components/ImageGrid';
import ImageButtons from '../../components/ImageButtons';

const Culinary = props => {
	const { classes, onClick, history } = props;
	const width = '30%';
	const data = compose(
		prop('experienceTypes'),
		find(x => x.name === 'Culinary')
	)(props.insideInterests);

	return (
		<div>
			<GridList cellHeight={180}>
				<GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
					<center>
						<p />
						<Typography variant="display1" gutterBottom>
							Which type of culinary focus?
						</Typography>
					</center>
				</GridListTile>
			</GridList>
			{data.map(image => (
				<ButtonBase
					focusRipple
					key={image.name}
					onClick={onClick(history, image.name)}
					className={classes.image}
					style={{
						width: width
					}}>
					<span
						className={classes.imageSrc}
						style={{
							backgroundImage: `url(${image.img})`
						}}
					/>
					<span className={classes.imageBackdrop} />
					<span className={classes.imageButton}>
						<Typography
							component="span"
							variant="subheading"
							color="inherit"
							className={classes.imageTitle}>
							{image.name}
							<span className={classes.imageMarked} />
						</Typography>
					</span>
				</ButtonBase>
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
		onClick: (history, value) => () => {
			dispatch({ type: SELECTED_CULINARY, payload: value });
			history.push(`/schedule`);
		}
	};
}

const connector = connect(mapStateToProps, mapActionsToProps);

export default connector(withStyles(styles)(Culinary));
