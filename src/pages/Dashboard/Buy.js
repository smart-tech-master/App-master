/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input, Button } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications'
import BigNumber from 'bignumber.js'

import { PasswordDialog } from '../../components'
import { Types, Creators } from '../../redux/actions/user'

class Buy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount             : '',
      maxSlip            : '5',
      estimate           : 0,
      showPasswordDialog : false,
    }
  }

  onChangeValue(fieldName) {
    return (event) => {
      this.setState({ [fieldName]: event.target.value })
    }
  }

  onChangeAmount = async (event) => {
    this.setState({ amount: event.target.value })
    const amount = Number(event.target.value)
    if (!Number.isNaN(amount)) {
      const estimate = await window.contracts.estimateBuyValue(amount)
      this.setState({ estimate: estimate.toString() })
    }
  }

  onClickBuy = async () => {
    const amount = Number(this.state.amount)
    const maxSlip = Number(this.state.maxSlip)
    if (!Number.isNaN(amount) && !Number.isNaN(maxSlip)) {
      const estimate = await window.contracts.estimateBuyValue(amount)
      if (!estimate || estimate.eq(0)) {
        NotificationManager.error('0 expected value!', 'Error')
      } else {
        this.setState({ showPasswordDialog: true })
      }
    } else {
      NotificationManager.error('Please input nubmers!', 'Error')
    }
  }

  callBuy = async (password) => {
    this.setState({ showPasswordDialog: false })

    const amount = Number(this.state.amount)
    const maxSlip = Number(this.state.maxSlip)
    const estimate = await window.contracts.estimateBuyValue(amount)

    const { contracts } = window
    const { walletAddress } = this.props.auth.user

    const buyValue = new BigNumber(amount).shiftedBy(contracts.data.currency.decimals).dp(0)
    const minBuyValue = estimate.times(new BigNumber(100).minus(maxSlip).div(100)).shiftedBy(contracts.data.decimals).dp(0)
    const extraData = contracts.dat.methods.buy(
      walletAddress, buyValue.toFixed(), minBuyValue.toFixed()
    ).encodeABI()

    const txParams = {
      data  : extraData,
      from  : walletAddress,
      to    : contracts.dat._address,
      value : '0x0',
    }
    this.props.signTx(txParams, this.props.auth.user.email, password, Types.BUY)
  }

  closePasswordDialog = () => {
    this.setState({ showPasswordDialog: false })
  }

  render() {
    const { account } = this.props.user
    if (!account)                 return null
    // if (account.allowance.eq(0))  return null
    // if (!account.kycApproved)     return null

    const { amount, maxSlip, estimate } = this.state
    return (
      <div>
        <h2> Buy </h2>
        <Input
          value={amount}
          onChange={this.onChangeAmount}
          label="Send: "
          margin="normal"
          placeholder="100"
          required
        /> { window.contracts.data.currency.symbol }
        <br />
        This will create ~{estimate} FMT
        <br />
        and will be cancelled if the price slips by
        <Input
          value={maxSlip}
          onChange={this.onChangeValue('maxSlip')}
          margin="normal"
          required
        /> % or more
        <br />
        FMT will be sent to your wallet
        <br />
        { this.props.global.status[Types.BUY] === 'request'
          ? <p> Pending... Please wait </p>
          : (
            <Button variant="contained" onClick={this.onClickBuy}>
              Buy
            </Button>
          ) }
        <PasswordDialog
          show={this.state.showPasswordDialog}
          onOk={this.callBuy}
          onCancel={this.closePasswordDialog}
        />
      </div>
    )
  }
}

const mapStateToProps = store => ({
  global : store.global,
  auth   : store.auth,
  user   : store.user,
})

const mapDispatchToProps = {
  ...Creators,
}

Buy.propTypes = {
  global : PropTypes.object.isRequired,
  auth   : PropTypes.object.isRequired,
  user   : PropTypes.object.isRequired,
  signTx : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy)
