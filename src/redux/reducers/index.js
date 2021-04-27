/**
 * Root Reducer
 */
import { combineReducers } from 'redux'

// Import Reducers
import { connectRouter } from 'connected-react-router'

import auth from './auth'
import user from './user'
import global from './global'

export default history => combineReducers({
  router: connectRouter(history),
  auth,
  user,
  global,
})
