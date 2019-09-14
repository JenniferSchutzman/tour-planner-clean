import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTour } from '../../action-creators/individual-tour'
import { singleTour } from './show.js'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import { CircularProgress } from 'material-ui/Progress'
import AddIcon from 'material-ui-icons/Add'
import PhoneIcon from 'material-ui-icons/Phone'
import { compose, filter, map } from 'ramda'
import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation'

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 200
  },
  progress: {
    margin: theme.spacing.unit * 20
  }
})

class IndividualTour extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getTour(id)
  }

  render() {
    console.log(JSON.stringify(this.props.schedule))
    //const schedule = map(x => x.name, day)
    const { classes, value } = this.props
    if (this.props.tour._id !== this.props.match.params.id) {
      return <CircularProgress className={classes.progress} color="secondary" />
    }
    return (
      <div>
        <Card>
          <CardMedia
            className={classes.media}
            image={this.props.tour.img}
            title="Savor the Flavors of Charleston"
          />

          <CardContent>
            <Typography gutterBottom variant="headline" component="h1" />
            {this.props.tour.tourName}
            <p />
            <Typography component="p">{this.props.tour.desc}</Typography>
            <Grid item xs={12} md={6} />
            <p />
            <Typography component="p"> ${this.props.tour.price}</Typography>
            <Typography component="p"> {this.props.tour.duration}</Typography>
            <Typography component="p">
              {' '}
              {this.props.tour.companyName}{' '}
            </Typography>
            <Typography component="p">Tour Times:</Typography>
            <Typography component="p">
              {compose(
                map(x => ['  ', x.day, ':', ' ', x.time, ',', '  ']),
                filter(x => x.open === true)
              )(this.props.schedule)}
            </Typography>
            <Typography component="p">Location:</Typography>
            <Typography component="p"> {this.props.tour.address}</Typography>
            <Typography component="p"> </Typography>
            <Typography component="p">
              <a href={this.props.tour.linkToBookOnline}>Book Online</a>
            </Typography>
            <dim>
              <a href={`tel:${this.props.phone}`}>
                <Button
                  fab
                  color="secondary"
                  aria-label="call"
                  className="fab-button"
                >
                  <PhoneIcon />
                </Button>
              </a>
            </dim>
          </CardContent>
          <CardActions>
            <Link to="/recommendations" style={{ textDecoration: 'none' }}>
              <Button size="small" color="primary">
                GO BACK
              </Button>
            </Link>
            <Link to="/tours" style={{ textDecoration: 'none' }}>
              <Button size="small" color="primary">
                SEE ALL TOURS
              </Button>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button size="small" color="primary">
                START OVER
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tour: state.tour,
    schedule: state.tour.schedule
  }
}

const mapActionsToProps = dispatch => {
  return {
    getTour: id => dispatch(getTour(id))
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(withStyles(styles)(IndividualTour))
