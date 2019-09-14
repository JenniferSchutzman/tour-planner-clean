import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import Subheader from 'material-ui/List/ListSubheader'
import IconButton from 'material-ui/IconButton'
import InfoIcon from 'material-ui-icons/Info'
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import classNames from 'classnames'
import Button from 'material-ui/Button'
import { recommendations } from '../../action-creators/individual-tour'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'

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
} from 'ramda'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 22
  },
  root: {
    //display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    maxWidth: '100%',
    minWidth: '100%',
    // width: 500,
    // height: 450,
    transform: 'translateZ(0)'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
})
//try out in ramda to get it to recognize if empty[]
//then loading CircularProgress
class AllTours extends React.Component {
  componentDidMount() {
    this.props.recommendations
  }
  render() {
    const { classes, value } = this.props
    const apiArray = this.props.tours
    if (apiArray < 1) {
      return <LinearProgress className={classes.progress} color="secondary" />
    }

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={this.props.tours.gridList}>
          <GridListTile
            key="Subheader"
            cols={2}
            style={{ height: 'auto', width: '100%' }}
          >
            <center>
              <p />
              <Typography variant="display1" gutterBottom>
                See All Tours Here
              </Typography>
            </center>
          </GridListTile>
          {this.props.tours.map(tile => (
            <GridListTile key={tile.name}>
              <Link
                to={`/recommendations/${tile._id}`}
                style={{ textDecoration: 'none' }}
              >
                <center>
                  <div className={classes.gridList}>
                    <img src={tile.img} />
                  </div>
                </center>
                <GridListTileBar
                  title={tile.tourName}
                  subtitle={<span> ${tile.price}</span>}
                />
              </Link>
            </GridListTile>
          ))}
          <div style={{ padding: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <dim>
                <center>
                  <Button variant="raised" size="large" color="grey">
                    START OVER
                  </Button>
                </center>
              </dim>
            </Link>
          </div>
        </GridList>
        <p />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tours: state.tours
  }
}

const connector = connect(mapStateToProps)

export default connector(withStyles(styles)(AllTours))
