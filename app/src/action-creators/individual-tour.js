import fetch from 'isomorphic-fetch'
import { GET_TOUR } from '../constants'
const url = 'http://localhost:5000'

export const getTour = id => async (dispatch, getState) => {
  dispatch({ type: GET_TOUR, payload: {} })
  const tour = await fetch(`${url}/recommendations/${id}`)
    .then(res => res.json())
    .catch(err => console.log('err', err))
  dispatch({ type: GET_TOUR, payload: tour })
}
