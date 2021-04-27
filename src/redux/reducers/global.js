import { createReducer } from 'reduxsauce'
import ReactGA from 'react-ga'
// Import Actions
import { Types } from '../actions/global'
import { Types as userTypes } from '../actions/user'
import { success } from '../utils/action'

// Initial State
const initialState = {
  status            : {},
  showInvest        : false,
  showPinCodeDialog : false,
  showFundDialog    : false,
  fundAmount        : '',
  showGetFinancing  : false,
  showDiagnostics   : false,
}

/* Handlers */

const updateState = (state, action) => ({
  ...state,
  ...action.payload,
})

const showInvestModal = (state, action) => {
  if (action.flag === true) {
    ReactGA.modalview('/invest/buy/amount')
  }

  return {
    ...state,
    showInvest: action.flag,
  }
}

const showDiagnosticsModal = (state, action) => ({
  ...state,
  showDiagnostics: action.flag,
})


const showGetFinancingModal = (state, action) => ({
  ...state,
  showGetFinancing: action.flag,
})

const setPinCodeDialog = (state, action) => ({
  ...state,
  showPinCodeDialog: action.flag,
})

const setFundDialog = (state, action) => {
  if (action.flag === true) {
    ReactGA.modalview('/funding/fake/amount')
  }

  return {
    ...state,
    showFundDialog: action.flag,
  }
}

const setFundAmount = (state, action) => ({
  ...state,
  fundAmount: action.fundAmount,
})

const verifyEmail = state => ({
  ...state,
  showPinCodeDialog: false,
})

const resetState = () => ({
  ...initialState,
})

// map action types to reducer functions
export const handlers = {
  [Types.UPDATE_STATE]              : updateState,
  [Types.RESET_STATE]               : resetState,
  [Types.SHOW_INVEST_MODAL]         : showInvestModal,
  [Types.SET_PIN_CODE_DIALOG]       : setPinCodeDialog,
  [Types.SET_FUND_DIALOG]           : setFundDialog,
  [Types.SET_FUND_AMOUNT]           : setFundAmount,
  [success(userTypes.VERIFY_EMAIL)] : verifyEmail,
  [Types.SHOW_GET_FINANCING_MODAL]  : showGetFinancingModal,
  [Types.SHOW_DIAGNOSTICS_MODAL]    : showDiagnosticsModal
}

// Export Reducer
export default createReducer(initialState, handlers)
