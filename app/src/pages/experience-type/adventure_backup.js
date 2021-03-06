// import React from 'react';
// import { connect } from 'react-redux';
// import { withStyles } from 'material-ui/styles';
// // import GridList, { GridListTile } from 'material-ui/GridList';
// // import Subheader from 'material-ui/List/ListSubheader';
// import { prop, find, compose } from 'ramda';
// // import ButtonBase from 'material-ui/ButtonBase';
// // import Typography from 'material-ui/Typography';
// import { SELECTED_ADVENTURE } from '../../constants';
//
// const Adventure = props => {
// 	const { classes, onClick, history } = props;
// 	const width = '70%';
// 	const data = compose(
// 		prop('experienceTypes'),
// 		find(x => x.name === 'Adventure')
// 	)(props.insideInterests);
//
// 	return (
// 		<div>
// 			<GridList cellHeight={150}>
// 				<GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
// 					<center>
// 						<p />
// 						<Typography variant="display1" gutterBottom>
// 							Select a type of experience
// 						</Typography>
// 					</center>
// 				</GridListTile>
// 			</GridList>
// 			{data.map(image => (
// 				<ButtonBase
// 					focusRipple
// 					key={image.name}
// 					onClick={onClick(history, image.name)}
// 					className={classes.image}
// 					style={{
// 						width: width
// 					}}>
// 					<span
// 						className={classes.imageSrc}
// 						style={{
// 							backgroundImage: `url(${image.img})`
// 						}}
// 					/>
// 					<span className={classes.imageBackdrop} />
// 					<span className={classes.imageButton}>
// 						<Typography
// 							component="span"
// 							variant="subheading"
// 							color="inherit"
// 							className={classes.imageTitle}>
// 							{image.name}
// 							<span className={classes.imageMarked} />
// 						</Typography>
// 					</span>
// 				</ButtonBase>
// 			))}
// 		</div>
// 	);
// };
//
// function mapStateToProps(state) {
// 	return {
// 		insideInterests: state.stateTracker.interests
// 	};
// }
//
// function mapActionsToProps(dispatch) {
// 	return {
// 		onClick: (history, value) => () => {
// 			dispatch({ type: SELECTED_ADVENTURE, payload: value });
// 			history.push(`/schedule`);
// 		}
// 	};
// }
// const connector = connect(mapStateToProps, mapActionsToProps);
//
// export default connector(withStyles(styles)(Adventure));
