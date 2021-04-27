import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getOnfidoStatus       : [],
  getBerbixStatus       : [],
  submitCheck           : [],
  setBerbixCompleted    : [],
  getUserData           : [],
  getAccountInfo        : ['walletAddress'],
  kycApprove            : [],
  signTx                : ['txParams', 'email', 'password', 'txType'],
  approve               : [],
  buy                   : [],
  sell                  : [],
  verifyEmail           : ['pinCode'],
  fundAccountEth        : [],
  fundAccountUsdc       : ['amount'],
  firstBuy              : ['approveParams', 'buyParams', 'email', 'password'],
  getInvestors          : [],
  getInvestorsHighlight : [],
  getTransactionHistory : ['ethAddress'],
  getCSOGraph           : [],
  getPortfolioGraph     : ['ethAddress'],
  getCSOInvestTotal     : []
}, { prefix: 'user_' })

export { Types, Creators }
