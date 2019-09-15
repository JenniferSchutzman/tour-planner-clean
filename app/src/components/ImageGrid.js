import React from 'react';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import Typography from 'material-ui/Typography';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		minWidth: 300,
		width: '100%'
	}
});

const ImageGrid = props => {
	const { classes } = props;
	const width = '70%';

	return (
		<div>
			<GridList cellHeight={150}>
				<GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
					<center>
						<p />
						<Typography variant="display1" gutterBottom>
							Select a type of experience
						</Typography>
					</center>
				</GridListTile>
			</GridList>
		</div>
	);
};

export default withStyles(styles)(ImageGrid);
