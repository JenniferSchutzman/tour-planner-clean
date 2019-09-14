import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import GridList, { GridListTile } from 'material-ui/GridList'
import Subheader from 'material-ui/List/ListSubheader'
import ButtonBase from 'material-ui/ButtonBase'
import { SELECTED_INTEREST } from '../../constants'
import classNames from 'classnames'
import Typography from 'material-ui/Typography'
import { pathOr } from 'ramda'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  image: {
    position: 'relative',
    height: 100,
    [theme.breakpoints.down('xs')]: {
      //  width: '100% !important', // Overrides inline-style
      height: 100,
      width: 500,
      minWidth: 400
    },
    '&:hover': {
      zIndex: 1
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15
    },
    '&:hover $imageMarked': {
      opacity: 0
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor'
    }
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
})
const Interests = props => {
  const { classes, onClick, history } = props
  const width = '70%'
  const interests = pathOr([], ['stateTracker', 'interests'], props)
  console.log('interests', interests)
  return (
    <div className={classes.root}>
      <center>
        <GridList cellHeight={150}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <p />
            <Typography variant="display1" gutterBottom>
              What Interests You?
            </Typography>
          </GridListTile>
          console.log()
          {interests.map(image => (
            <ButtonBase
              focusRipple
              key={image.name}
              onClick={onClick(history, image.name)}
              className={classes.image}
              style={{
                width: width
              }}
            >
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
                  className={classes.imageTitle}
                >
                  {image.name}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          ))}
        </GridList>
      </center>
    </div>
  )
}

function mapStateToProps(state) {
  console.log('what is state?', state)
  return {
    stateTracker: state.stateTracker
  }
}

function mapActionsToProps(dispatch) {
  return {
    onClick: (history, value) => () => {
      //console.log('onClick clicked', value)
      dispatch({ type: SELECTED_INTEREST, payload: value })
      history.push(`/interests/${value}`)
    }
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(withStyles(styles)(Interests))
