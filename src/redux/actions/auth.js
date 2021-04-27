import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  checkToken     : [],
  signUp         : ['minDuration', 'firstname', 'lastname', 'companyName', 'email', 'password'],
  createWallet   : ['minDuration', 'firstname', 'lastname', 'companyName', 'email', 'password'],
  signIn         : ['email', 'password'],
  signOut        : [],
  verifyEmail    : ['pinCode'],
  forgotPassword : ['email'],
  resetPassword  : ['emailToken', 'newPassword', 'qrCode'],
}, { prefix: 'auth_' })

export { Types, Creators }
