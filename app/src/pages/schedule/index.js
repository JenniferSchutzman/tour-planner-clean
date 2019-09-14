import React from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { map } from 'ramda'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import classNames from 'classnames'
import { CHECK_DAY, MAKE_RESULTS_ARRAY } from '../../constants'
import { schedule, checkDay } from '../../action-creators/schedule'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from 'material-ui/List'
import Switch from 'material-ui/Switch'
import TodayIcon from 'material-ui-icons/Today'
import Typography from 'material-ui/Typography'
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  card: {
    maxWidth: '100%'
  },
  media: {
    height: 200
  }
})

const Schedule = props => {
  const { classes, history, onClick } = props
  const data = props.days
  //console.log('state with trues before clear', JSON.stringify(props.state))
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyRVTTO35jEIxHgu-sQ-mNpu4-CnBcm23DRisy5H9kRr2ca2WApA"
          title="Select Your Availability"
        />
      </Card>
      <div style={{ padding: '20px' }}>
        <center>
          <div>
            <center>
              <Typography variant="display1" gutterBottom>
                Availability
              </Typography>
            </center>

            {map(day => (
              <ListItem>
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText primary={day.name} />
                <Switch
                  checked={day.selected}
                  onChange={props.checkDay(day.name)}
                  value={day.name}
                />
              </ListItem>
            ))(data)}
          </div>
          <dim>
            <Link to="/recommendations" style={{ textDecoration: 'none' }}>
              <Button
                variant="raised"
                size="large"
                color="grey"
                className={classes.button}
                onClick={onClick(history, props.state)}
              >
                <p />
                Ready for Results
              </Button>
            </Link>
          </dim>
        </center>
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  //console.log('state', state)
  return {
    days: state.stateTracker.dow,
    exp: state.stateTracker.interests,
    state: state.stateTracker
  }
}

function mapActionsToProps(dispatch, getState) {
  return {
    checkDay: day => event =>
      dispatch({
        type: CHECK_DAY,
        payload: { day, checked: event.target.checked }
      }),
    onClick: (history, data) => () => {
      dispatch({
        type: MAKE_RESULTS_ARRAY,
        payload: data
      })
      history.push(`/recommendations`)
    }
  }
}
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(withStyles(styles)(Schedule))
