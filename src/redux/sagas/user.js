import { put, call, takeLatest, all, select } from 'redux-saga/effects'
import { requestCreator, successCreator, failureCreator } from '../utils/action'
import { Types, Creators } from '../actions/user'
import API, { sleep } from '../api/user'

function* sagaAction(action) {
  const type = action.type
  try {
    yield put(requestCreator(type, {}))
    const payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    yield put(failureCreator(type, { err }))
  }
}

function* fundAccountEth(action) {
  const type = action.type
  try {
    yield put(requestCreator(type, {}))
    const payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    yield put(failureCreator(type, { err }))
  }
}

function* fundAccountUsdc(action) {
  const type = action.type
  try {
    yield put(requestCreator(type, {}))
    const auth = yield select(state => state.auth)
    const payload = yield call(API[type], action, auth.user.walletAddress)
    yield put(successCreator(type, payload))
  } catch (err) {
    console.log(err)
    return yield put(failureCreator(type, { err }))
  }

  try {
    yield call(API.recordAction, 'fund')
  } catch (e) {
    console.log(e)
  }
}

function* getAccountInfoAction(action) {
  const type = action.type
  try {
    yield put(requestCreator(type, {}))
    const payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    yield put(failureCreator(type, { err }))
    return
  }

  yield put(Creators.kycApprove())
}

function* signTxAction(action) {
  let rawTx
  try {
    yield put(requestCreator(Types.SIGN_TX, {}))
    rawTx = yield call(API[Types.SIGN_TX], action)
    yield put(successCreator(Types.SIGN_TX, {}))
  } catch (err) {
    yield put(failureCreator(Types.SIGN_TX, { err }))
    return
  }

  const type = action.txType
  try {
    yield put(requestCreator(type, {}))
    yield call(API.sendTx, action, rawTx)
    yield put(successCreator(type, {}))
  } catch (err) {
    return yield put(failureCreator(type, { err }))
  }

  try {
    if (action.txType === Types.BUY) {
      yield call(API.recordAction, 'invest')
    }
  } catch (e) {
    console.log(e)
  }
}

function* firstBuy(action) {
  yield put(requestCreator(Types.BUY, {}))
  try {
    const auth = yield select(state => state.auth)
    const nonce = yield call(
      window.web3.eth.getTransactionCount,
      auth.user.walletAddress,
      'pending'
    )

    const rawApproveTx = yield call(
      API[Types.SIGN_TX],
      { ...action, txParams: action.approveParams },
      nonce
    )
    yield call(API.sendTx, { txParams: action.approveParams }, rawApproveTx)

    const rawBuyTx = yield call(
      API[Types.SIGN_TX],
      { ...action, txParams: action.buyParams },
      nonce + 1
    )
    yield call(API.sendTx, { txParams: action.buyParams }, rawBuyTx)

    yield put(successCreator(Types.BUY, {}))
  } catch (err) {
    return yield put(failureCreator(Types.BUY, { err }))
  }

  try {
    yield call(API.recordAction, 'invest')
  } catch (e) {
    console.log(e)
  }
}

function* getOnfidoStatus(action) {
  const type = action.type
  let payload
  try {
    yield put(requestCreator(type, {}))
    payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    return yield put(failureCreator(type, { err }))
  }

  if (payload.data && payload.data.onfido.check.status !== 'complete') {
    yield call(sleep, 10000)
    yield put(Creators.getOnfidoStatus())
  }
}

function* getBerbixStatus(action) {
  const type = action.type
  let payload
  try {
    yield put(requestCreator(type, {}))
    payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    return yield put(failureCreator(type, { err }))
  }

  if (payload.transactionData && payload.transactionData.action === 'review') {
    yield call(sleep, 10000)
    yield put(Creators.getBerbixStatus())
  }
}

function* submitCheck(action) {
  const type = action.type
  let payload
  try {
    yield put(requestCreator(type, {}))
    payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    return yield put(failureCreator(type, { err }))
  }

  yield call(sleep, 10000)
  yield put(Creators.getOnfidoStatus())
}

function* setBerbixCompleted(action) {
  const type = action.type
  let payload
  try {
    yield put(requestCreator(type, {}))
    payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    return yield put(failureCreator(type, { err }))
  }

  yield put(Creators.getBerbixStatus())
}

function* getInvestorInfo(action) {
  const type = action.type
  try {
    yield put(requestCreator(type, {}))
    const payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    yield put(failureCreator(type, { err }))
    return
  }
}

export function* userSaga() {
  yield all([
    takeLatest(Types.GET_USER_DATA,     sagaAction),
    takeLatest(Types.VERIFY_EMAIL,      sagaAction),
    takeLatest(Types.FUND_ACCOUNT_ETH,  fundAccountEth),
    takeLatest(Types.FUND_ACCOUNT_USDC, fundAccountUsdc),
    takeLatest(Types.GET_ACCOUNT_INFO,  getAccountInfoAction),
    takeLatest(Types.KYC_APPROVE,       sagaAction),
    takeLatest(Types.SIGN_TX,           signTxAction),
    takeLatest(Types.FIRST_BUY,         firstBuy),
    takeLatest(Types.GET_ONFIDO_STATUS, getOnfidoStatus),
    takeLatest(Types.GET_BERBIX_STATUS, getBerbixStatus),
    takeLatest(Types.SUBMIT_CHECK,      submitCheck),
    takeLatest(Types.SET_BERBIX_COMPLETED, setBerbixCompleted),
    takeLatest(Types.GET_INVESTORS,  getInvestorInfo),
    takeLatest(Types.GET_INVESTORS_HIGHLIGHT,  getInvestorInfo),
    takeLatest(Types.GET_TRANSACTION_HISTORY,  getInvestorInfo),
    takeLatest(Types.GET_CSO_GRAPH,  getInvestorInfo),
    takeLatest(Types.GET_PORTFOLIO_GRAPH,  getInvestorInfo),
    takeLatest(Types.GET_CSO_INVEST_TOTAL,  getInvestorInfo),
  ])
}
