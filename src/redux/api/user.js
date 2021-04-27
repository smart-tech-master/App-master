/* eslint-disable no-underscore-dangle */
import { API } from 'aws-amplify'
import requestPromise from 'request-promise'
import { CorgNetworkSearch, Networks } from '@fairmint/c-org-js'
import { Transaction as EthereumTx } from 'ethereumjs-tx'
import BigNumber from 'bignumber.js'
import { Types } from '../actions/user'
import config from '../../config'

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const waitForTx = async (txData) => {
  let txhash
  while (true) {
    const { data } = await API.get('lambda', `/user/getTransactionStatus/${txData.id}`)
    if (data.txhash) {
      txhash = data.txhash
      break
    } else {
      await sleep(3000)
    }
  }

  const { web3 } = window
  while (true) {
    const receipt = await web3.eth.getTransactionReceipt(txhash)
    if (receipt) {
      if (receipt.status) {
        await window.contracts.refreshAccountInfo(window.contracts.data.account.address)
        return true
      }
      throw new Error('Failed to fund')
    } else {
      await sleep(3000)
    }
  }
}

const apis = {}

apis[Types.GET_ONFIDO_STATUS] = async () => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('no_alert')
  }

  const headers = { Authorization: accessToken }
  const body = { feUrl: window.location.origin }
  const response = await API.post('lambda', '/onfido/getStatus', { headers, body })

  return response
}

apis[Types.VERIFY_EMAIL] = async (action) => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('no_alert')
  }

  const headers = { Authorization: accessToken }
  const body = { pinCode: action.pinCode }
  const response = await API.post('lambda', '/auth/verifyEmail', { headers, body })

  return response
}

apis[Types.FUND_ACCOUNT_ETH] = async () => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('no_alert')
  }

  const headers = { Authorization: accessToken }
  const body = {}
  const { data } = await API.post('lambda', '/user/fundAccountETH', { headers, body })

  await waitForTx(data)
}

apis.signOperatorTx = async (txParams) => {
  const txObj = new EthereumTx(txParams, { chain: config.chain, hardfork: config.hardfork })

  const body = { msgHash: txObj.hash(false).toString('hex') }
  const signature = await API.post('lambda', '/user/signOperatorTx', { body })

  txObj.r = signature.r
  txObj.s = signature.s
  txObj.v = signature.recover + 27 + (config.chainId * 2) + 8
  return '0x' + txObj.serialize().toString('hex')
}

apis[Types.FUND_ACCOUNT_USDC] = async (action, walletAddress) => {
  const { contracts, web3 } = window
  // Send ETH
  const ethParams = {
    from     : config.operatorAddress,
    to       : walletAddress,
    value    : web3.utils.toHex(web3.utils.toWei(config.fundETH, 'ether')),
    gas      : web3.utils.toHex(config.gas),
    gasPrice : web3.utils.toHex(web3.utils.toWei(config.gasPrice, 'Gwei')),
    chainId  : web3.utils.toHex(config.chainId),
    nonce    : web3.utils.toHex(
      await web3.eth.getTransactionCount(config.operatorAddress, 'pending')
    )
  }
  const rawETH = await apis.signOperatorTx(ethParams)
  await apis.sendTx({ txParams: { from: walletAddress } }, rawETH)

  // Send USDC
  const extraData = contracts.currency.methods.transfer(
    walletAddress,
    new BigNumber(action.amount)
      .shiftedBy(contracts.data.currency.decimals)
      .dp(0).toFixed()
  ).encodeABI()
  const usdcParams = {
    data     : extraData,
    from     : config.operatorAddress,
    to       : contracts.currency._address,
    value    : '0x0',
    gas      : web3.utils.toHex(config.gas),
    gasPrice : web3.utils.toHex(web3.utils.toWei(config.gasPrice, 'Gwei')),
    chainId  : web3.utils.toHex(config.chainId),
    nonce    : web3.utils.toHex(
      await web3.eth.getTransactionCount(config.operatorAddress, 'pending')
    )
  }
  const rawUSDC = await apis.signOperatorTx(usdcParams)
  await apis.sendTx({ txParams: { from: walletAddress } }, rawUSDC)
}

apis[Types.GET_BERBIX_STATUS] = async () => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('no_alert')
  }

  const headers = { Authorization: accessToken }
  const body = { }
  const response = await API.post('lambda', '/berbix/getStatus', { headers, body })

  return response
}

apis[Types.SUBMIT_CHECK] = async () => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('no_alert')
  }

  const headers = { Authorization: accessToken }
  const response = await API.post('lambda', '/onfido/submitCheck', { headers })

  return response
}

apis[Types.SET_BERBIX_COMPLETED] = async () => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('no_alert')
  }

  const headers = { Authorization: accessToken }
  const response = await API.post('lambda', '/berbix/setCompleted', { headers })

  return response
}

apis[Types.GET_USER_DATA] = async () => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('no_alert')
  }

  const headers = { Authorization: accessToken }
  const response = await API.get('lambda', '/user/data', { headers })

  return response
}

apis[Types.GET_ACCOUNT_INFO] = async (action) => {
  if (!window.contracts) {
    const networkSearch = new CorgNetworkSearch(Networks)
    const contracts = await networkSearch.getContracts(window.web3, config.corg.contractAddress)
    await contracts.init()
    window.contracts = contracts
  }

  const { walletAddress } = action
  await Promise.all([
    window.contracts.refreshOrgInfo(),
    window.contracts.refreshAccountInfo(walletAddress),
  ])
}

apis[Types.KYC_APPROVE] = async () => {
  const { contracts, web3 } = window
  if (contracts.data.account.kycApproved) {
    return
  }
  if (config.REACT_APP_STAGE !== 'dev') {
    // return
  }

  const result = await requestPromise(
    `https://9uiscks3n0.execute-api.us-east-2.amazonaws.com/default/currency-faucet?network=${contracts.metadata.networkName}&recipient=${contracts.data.account.address}&whitelist=${contracts.whitelist._address}`,
    { json: true }
  )
  if (result.approval.sent) {
    for (let i = 0; i < 9999; i++) {
      const receipt = await web3.eth.getTransactionReceipt(result.approval.result.tx)
      if (receipt && receipt.status !== undefined) {
        await window.contracts.refreshAccountInfo(contracts.data.account.address)
        return
      }
      await sleep(2000)
    }
  }
}

apis[Types.SIGN_TX] = async (action, nonce) => {
  const { web3 } = window
  const { txParams, email, password } = action

  Object.assign(txParams, {
    gas      : web3.utils.toHex(config.gas),
    gasPrice : web3.utils.toHex(web3.utils.toWei(config.gasPrice, 'Gwei')),
    chainId  : web3.utils.toHex(config.chainId),
  })
  if (nonce === undefined) {
    txParams.nonce = web3.utils.toHex(
      await web3.eth.getTransactionCount(txParams.from, 'pending')
    )
  } else {
    txParams.nonce = web3.utils.toHex(nonce)
  }
  const txObj = new EthereumTx(txParams, { chain: config.chain, hardfork: config.hardfork })

  const body = {
    email,
    password,
    msgHash: txObj.hash(false).toString('hex')
  }
  const signature = await API.post('lambda', '/user/signHash', { body })

  txObj.r = signature.r
  txObj.s = signature.s
  txObj.v = signature.recover + 27 + (config.chainId * 2) + 8
  return '0x' + txObj.serialize().toString('hex')
}

apis.sendTx = async (action, rawTx) => {
  const { web3 } = window
  const { txParams } = action

  await web3.eth.sendSignedTransaction(rawTx)
  await window.contracts.refreshAccountInfo(txParams.from)
}

apis.recordAction = async (actionType) => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('no_alert')
  }

  const headers = { Authorization: accessToken }
  const body = { actionType }
  const response = await API.post('lambda', '/user/recordAction', { headers, body })

  return response
}

apis[Types.GET_INVESTORS] = async () => {
  const result = await requestPromise(
    `${config.fairmintAPIBase}/investor/list?HandshakeKey=${config.handshakeKey}`,
    { json: true }
  )
  if (result) {
    return result
  }
  return {}
}

apis[Types.GET_INVESTORS_HIGHLIGHT] = async () => {
  const result = await requestPromise(
    `${config.fairmintAPIBase}/investor/highlight?HandshakeKey=${config.handshakeKey}`,
    { json: true }
  )
  if (result) {
    return result
  }
  return {}
}

apis[Types.GET_TRANSACTION_HISTORY] = async (action) => {
  const { ethAddress } = action
  const result = await requestPromise(
    `${config.fairmintAPIBase}/investor/transactions/${ethAddress.slice(2)}?HandshakeKey=${config.handshakeKey}`,
    { json: true }
  )
  if (result) {
    return result
  }
  return {}
}

apis[Types.GET_CSO_GRAPH] = async () => {
  const result = await requestPromise(
    `${config.fairmintAPIBase}/cso/graph/daily/30?HandshakeKey=${config.handshakeKey}`,
    { json: true }
  )
  if (result) {
    return result
  }
  return {}
}

apis[Types.GET_CSO_INVEST_TOTAL] = async () => {
  const result = await requestPromise(
    `${config.fairmintAPIBase}/cso/investments/total?HandshakeKey=${config.handshakeKey}`,
    { json: true }
  )
  if (result) {
    return result
  }
  return {}
}

apis[Types.GET_PORTFOLIO_GRAPH] = async (action) => {
  const { ethAddress } = action
  const result = await requestPromise(
    `${config.fairmintAPIBase}/investor/history/daily/30/${ethAddress.slice(2)}?HandshakeKey=${config.handshakeKey}`,
    { json: true }
  )
  if (result) {
    return {
      investor_history: result
    }
  }
  return {
    investor_history: {}
  }
}

export default apis
