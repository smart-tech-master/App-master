import { createReducer } from 'reduxsauce'
import ReactGA from 'react-ga'
import { Types } from '../actions/user'
import { success, failure } from '../utils/action'

// Initial State
const initialState = {
  data          : null,
  account       : null,
  check         : null,
  sdkToken      : null,
  berbix        : {},
  dashboard     : {},
  financialData : {}
}

/* Handlers */
const getUserData = (state, action) => ({
  ...state,
  data: action.payload.data,
})

const verifyEmail = state => ({
  ...state,
  data: {
    ...state.data,
    verified_email: true
  },
})

const setAccountFunded = state => ({
  ...state,
  data: {
    ...state.data,
    account_funded: true
  },
})

const updateAccount = state => ({
  ...state,
  account: window.contracts.data.account
})

const buy = (state) => {
  ReactGA.modalview('/invest/buy/success')

  return {
    ...state,
    account: window.contracts.data.account
  }
}

const buyFailure = (state) => {
  ReactGA.modalview('/invest/buy/error')

  return state
}

const fundAccountUsdc = (state) => {
  ReactGA.modalview('/funding/fake/success')

  return {
    ...state,
    account: window.contracts.data.account
  }
}

const fundAccountUsdcFailure = (state) => {
  ReactGA.modalview('/funding/fake/error')

  return state
}

const getOnfidoStatus = (state, action) => {
  if (action.payload.sdkToken) {
    return {
      ...state,
      sdkToken: action.payload.sdkToken
    }
  }
  return {
    ...state,
    check: action.payload.data.onfido.check
  }
}

const getBerbixStatus = (state, action) => ({
  ...state,
  berbix: action.payload
})

const submitCheck = (state, action) => ({
  ...state,
  check: action.payload.check,
})

const updateDashboard = (state, action) => ({
  ...state,
  dashboard: Object.assign(state.dashboard, { ...action.payload })
})

const updateFinancialData = (state, action) => ({
  ...state,
  financialData: Object.assign(state.financialData, { ...action.payload })
})

// map action types to reducer functions
export const handlers = {
  [success(Types.GET_USER_DATA)]           : getUserData,
  [success(Types.GET_ACCOUNT_INFO)]        : updateAccount,
  [success(Types.KYC_APPROVE)]             : updateAccount,
  [success(Types.BUY)]                     : buy,
  [failure(Types.BUY)]                     : buyFailure,
  [success(Types.SELL)]                    : updateAccount,
  [success(Types.APPROVE)]                 : updateAccount,
  [success(Types.FUND_ACCOUNT_ETH)]        : updateAccount,
  [success(Types.FUND_ACCOUNT_USDC)]       : fundAccountUsdc,
  [failure(Types.FUND_ACCOUNT_USDC)]       : fundAccountUsdcFailure,
  [Types.FUND_ACCOUNT_USDC]                : setAccountFunded,
  [success(Types.GET_ONFIDO_STATUS)]       : getOnfidoStatus,
  [success(Types.GET_BERBIX_STATUS)]       : getBerbixStatus,
  [success(Types.SUBMIT_CHECK)]            : submitCheck,
  [success(Types.VERIFY_EMAIL)]            : verifyEmail,
  [success(Types.GET_INVESTORS)]           : updateDashboard,
  [success(Types.GET_INVESTORS_HIGHLIGHT)] : updateDashboard,
  [success(Types.GET_TRANSACTION_HISTORY)] : updateDashboard,
  [success(Types.GET_CSO_GRAPH)]           : updateFinancialData,
  [success(Types.GET_PORTFOLIO_GRAPH)]     : updateDashboard,
  [success(Types.GET_CSO_INVEST_TOTAL)]    : updateDashboard
}

// Export Reducer
export default createReducer(initialState, handlers)
