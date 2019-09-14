import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { recommendations } from '../../action-creators/individual-tour';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {
	compose,
	find,
	filter,
	contains,
	toLower,
	empty,
	not,
	map,
	tap
} from 'ramda';

const styles = theme => ({
	progress: {
		margin: theme.spacing.unit * 22
	},
	root: {
		//display: 'flex',
		flexGrow: 15,
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	gridList: {
		width: 500,
		height: 450,
		transform: 'translateZ(0)'
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)'
	},
	button: {
		root: theme.typography.button
	}
});
//try out in ramda to get it to recognize if empty[]
//then loading CircularProgress
class Recommendations extends React.Component {
	componentDidMount() {
		this.props.recommendations;
	}
	render() {
		const tag1 = this.props.results[0];
		const tag2 = this.props.results[1];
		const tag3 = this.props.results[2];
		const tag4 = this.props.results[3];
		const tag5 = this.props.results[4];
		const tag6 = this.props.results[5];
		const tag7 = this.props.results[6];
		const tag8 = this.props.results[7];
		const tag9 = this.props.results[8];
		//console.log('tag4', tag4)
		//console.log('tag5', tag5)
		//  console.log('tag6', tag6)
		//const wiretap = x => console.log('tap', x)
		const results = compose(
			map(y => y),
			filter(x =>
				contains(
					toLower(tag3) ||
						toLower(tag4) ||
						toLower(tag5) ||
						toLower(tag6) ||
						toLower(tag7) ||
						toLower(tag8) ||
						toLower(tag9),
					x.options
				)
			),
			filter(x => contains(toLower(tag2), x.options)),
			filter(x => contains(toLower(tag1), x.options))
		)(this.props.tours);
		console.log('filtered', results);
		console.log('this.props.results', JSON.stringify(this.props.results));
		console.log('this.props.tours', JSON.stringify(this.props.tours));
		const { classes, value } = this.props;
		const apiArray = this.props.tours;
		if (apiArray < 1) {
			return (
				<CircularProgress className={classes.progress} color="secondary" />
			);
		}

		return (
			<div className={classes.root}>
				<GridList cellHeight={180} className={this.props.tours.gridList}>
					<GridListTile
						key="Subheader"
						cols={2}
						style={{ height: 'auto', width: '100%' }}>
						<center>
							<p />
							<Typography variant="display1" gutterBottom>
								Your Personalized Recommendations
							</Typography>
						</center>
					</GridListTile>
					{results.map(tile => (
						<GridListTile key={tile.name}>
							<Link
								to={`/recommendations/${tile._id}`}
								style={{ textDecoration: 'none' }}>
								<center>
									<img src={tile.img} />
								</center>
								<GridListTileBar
									title={tile.tourName}
									subtitle={<span> ${tile.price}</span>}
								/>
							</Link>
						</GridListTile>
					))}
				</GridList>
				<p />
				<div className={classes.button}>
					<CardActions>
						<Link
							to="/"
							style={{
								textDecoration: 'none'
							}}>
							<Button size="small" color="primary">
								Start Over
							</Button>
						</Link>

						<Link
							to="/tours"
							style={{
								textDecoration: 'none'
							}}>
							<Button size="small" color="primary">
								See all tours
							</Button>
						</Link>
					</CardActions>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		tours: state.tours,
		results: state.stateTracker
	};
	//  console.log('in mapStateToProps after return', state)
};

const connector = connect(mapStateToProps);

export default connector(withStyles(styles)(Recommendations));
