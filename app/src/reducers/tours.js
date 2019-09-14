// import { ALL_RECOMMENDATIONS } from '../constants'
//
// export const tours = (state = [], action) => {
//   switch (action.type) {
//     case ALL_RECOMMENDATIONS:
//       return action.payload
//     default:
//       return state
//   }
// }
//
// export default tours

import { ALL_RECOMMENDATIONS, ALL_TOURS } from '../constants'

export const tours = (state = [], action) => {
  switch (action.type) {
    case ALL_RECOMMENDATIONS:
      return action.payload
    case ALL_TOURS:
      //  console.log('reducer all tours hit', state)
      return action.payload
    default:
      return state
  }
}

export default tours
