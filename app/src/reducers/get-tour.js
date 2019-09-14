import { GET_TOUR } from '../constants'
import { merge } from 'ramda'

const tour = (state = {}, action) => {
  switch (action.type) {
    case GET_TOUR:
      return merge(state, action.payload)
    default:
      return state
  }
}

export default tour
