import { API } from 'aws-amplify'
import { Types } from '../actions/auth'

const apis = {}

apis[Types.CHECK_TOKEN] = async () => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('Token not found')
  }

  const headers = { Authorization: accessToken }
  return API.get('lambda', '/auth/checkToken', { headers })
}

apis[Types.SIGN_UP] = async (action) => {
  const { firstname, lastname, companyName, email, password } = action
  const body = { firstname, lastname, companyName, email, password }
  return API.post('lambda', '/auth/signUp', { body })
}

apis[Types.CREATE_WALLET] = async (action) => {
  const { firstname, lastname, companyName, email, password } = action
  const body = { firstname, lastname, companyName, email, password, feUrl: window.location.origin }
  return API.post('lambda', '/auth/createWallet', { body })
}

apis[Types.SIGN_IN] = async (action) => {
  const { email, password } = action
  const body = { email, password }
  return API.post('lambda', '/auth/signIn', { body })
}

apis[Types.VERIFY_EMAIL] = async (action) => {
  const { pinCode } = action
  if (!pinCode) {
    throw new Error('Pin code cannot be empty')
  }

  const tempToken = window.localStorage.getItem('tempToken')
  if (!tempToken) {
    throw new Error('Token not found')
  }

  const body = { tempToken, pinCode }
  return API.post('lambda', '/auth/verifyEmail', { body })
}

apis[Types.FORGOT_PASSWORD] = async (action) => {
  const { email } = action
  const body = { email, feUrl: window.location.origin }
  return API.post('lambda', '/auth/forgotPassword', { body })
}

apis[Types.RESET_PASSWORD] = async (action) => {
  const { emailToken, newPassword, qrCode } = action
  const body = { emailToken, newPassword, qrCode }
  return API.post('lambda', '/auth/resetPassword', { body })
}

export default apis
