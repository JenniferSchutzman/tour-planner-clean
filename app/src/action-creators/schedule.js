import fetch from 'isomorphic-fetch'
import { SELECTED_DAYS, CHECK_DAY } from '../constants'
const url = 'http://localhost:5000'

export const schedule = async (dispatch, getState) => {
  const days = await fetch(`${url}/schedule`).then(res => res.json())
  dispatch({ type: SELECTED_DAYS, payload: days })
}

export const checkDay = async (dispatch, getState) => {
  dispatch({ type: CHECK_DAY })
}
