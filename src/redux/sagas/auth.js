import { put, call, takeLatest, all } from 'redux-saga/effects'
import { NotificationManager } from 'react-notifications'
import { requestCreator, successCreator, failureCreator } from '../utils/action'
import { Types } from '../actions/auth'
import { Creators as userCreators } from '../actions/user'
import API from '../api/auth'
import { sleep } from '../api/user'

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

function* signIn(action) {
  const type = action.type
  let payload
  try {
    yield put(requestCreator(type, {}))
    payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    yield put(failureCreator(type, { err }))
    return
  }

  yield put(userCreators.getAccountInfo(payload.walletAddress))
}

function* verifyEmail(action) {
  const type = action.type
  let payload
  try {
    yield put(requestCreator(type, {}))
    payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    yield put(failureCreator(type, { err }))
    return
  }

  window.localStorage.removeItem('tempToken')
  yield put(userCreators.getAccountInfo(payload.walletAddress))
}

function* signUpAction(action) {
  const startTime = Date.now()
  try {
    yield put(requestCreator(Types.SIGN_UP, {}))
    yield call(API[Types.SIGN_UP], action)

    const duration = Date.now() - startTime
    if (duration < action.minDuration + 300) {
      yield call(sleep, action.minDuration + 300 - duration)
    }

    yield put(successCreator(Types.SIGN_UP, {}))
  } catch (err) {
    const duration = Date.now() - startTime
    if (duration < action.minDuration + 300) {
      yield call(sleep, action.minDuration + 300 - duration)
    }
    yield put(failureCreator(Types.SIGN_UP, { err }))
    return
  }
}

function* createWalletAction(action) {
  let payload
  try {
    const startTime = Date.now()
    yield put(requestCreator(Types.CREATE_WALLET, {}))
    payload = yield call(API[Types.CREATE_WALLET], action)

    const duration = Date.now() - startTime
    if (duration < action.minDuration + 300) {
      yield call(sleep, action.minDuration + 300 - duration)
    }

    yield put(successCreator(Types.CREATE_WALLET, payload))
  } catch (err) {
    yield put(failureCreator(Types.CREATE_WALLET, { err }))
    return
  }
}

function* checkTokenAction(action) {
  const type = action.type
  let payload
  try {
    yield put(requestCreator(type, {}))
    payload = yield call(API[type], action)
    yield put(successCreator(type, payload))
  } catch (err) {
    yield put(failureCreator(type, { err, showAlert: false }))
    return
  }

  yield put(userCreators.getAccountInfo(payload.walletAddress))
}

function* forgotPassword(action) {
  const type = action.type
  try {
    yield put(requestCreator(type, {}))
    const payload = yield call(API[type], action)
    yield put(successCreator(type, payload))

    NotificationManager.success('Reset password page link has been sent to your email', 'Success')
  } catch (err) {
    yield put(failureCreator(type, { err }))
  }
}

export function* authSaga() {
  yield all([
    takeLatest(Types.CHECK_TOKEN,     checkTokenAction),
    takeLatest(Types.SIGN_IN,         signIn),
    takeLatest(Types.SIGN_UP,         signUpAction),
    takeLatest(Types.CREATE_WALLET,   createWalletAction),
    takeLatest(Types.VERIFY_EMAIL,    verifyEmail),
    takeLatest(Types.FORGOT_PASSWORD, forgotPassword),
    takeLatest(Types.RESET_PASSWORD,  sagaAction),
  ])
}
