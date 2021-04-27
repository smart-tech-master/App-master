import { createReducer } from 'reduxsauce'
import { Types } from '../actions/auth'
import { success, failure } from '../utils/action'
import config from '../../config'

// Initial State
const initialState = { user: null }

/* Handlers */
const checkToken = (state, action) => {
  window.localStorage.setItem('accessToken', action.payload.accessToken)
  window.Intercom('boot', {
    app_id    : config.intercomAppId,
    user_id   : action.payload.walletAddress,
    email     : action.payload.email,
    user_hash : action.payload.intercomHash,
  })
  return {
    ...state,
    user: action.payload
  }
}

const signOut = (state) => {
  window.localStorage.removeItem('accessToken')
  window.Intercom('shutdown')
  return {
    ...state,
    user: null
  }
}

// map action types to reducer functions
export const handlers = {
  [success(Types.CHECK_TOKEN)]   : checkToken,
  [failure(Types.CHECK_TOKEN)]   : signOut,
  [success(Types.CREATE_WALLET)] : checkToken,
  [success(Types.SIGN_IN)]       : checkToken,
  [Types.SIGN_OUT]               : signOut,
}

// Export Reducer
export default createReducer(initialState, handlers)
