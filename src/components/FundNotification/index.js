import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Message, Button, Image, Loader } from 'semantic-ui-react'
import WhiteCrossPng from '../../assets/images/cross-white.png'

import { Types } from '../../redux/actions/user'
import { Creators as globalCreators } from '../../redux/actions/global'
import './style.less'

class FundNotification extends Component {
  state = {}

  renderError() {
    return (
      <Message
        error
        className="notify-message-box"
      >
        <div className="main">
          <div className="header">
            <span> Something went wrong </span>
          </div>
          <div className="content">
            We failed to send FakeUSD to your account...
          </div>
        </div>
        <Image
          className="close-icon"
          src={WhiteCrossPng}
          alt=""
          onClick={() => this.props.setFundAmount('')}
        />
      </Message>
    )
  }

  renderSuccess() {
    return (
      <Message
        success
        className="notify-message-box"
      >
        <div className="main">
          <div className="header">
            <span> Account funded successfully! </span>
          </div>
          <div className="content">
            You can now start investing in Fairmint
          </div>
        </div>
        <div className="confirm-btn-container">
          <Button onClick={() => this.props.showInvestModal(true)} primary basic>
            Invest now
          </Button>
        </div>
        <Image
          className="close-icon"
          src={WhiteCrossPng}
          alt=""
          onClick={() => this.props.setFundAmount('')}
        />
      </Message>
    )
  }

  render() {
    const { status, fundAmount } = this.props.global
    if (!fundAmount) return null

    if (status[Types.FUND_ACCOUNT_USDC] === 'failure') {
      return this.renderError()
    }

    if (status[Types.FUND_ACCOUNT_USDC] === 'success') {
      return this.renderSuccess()
    }

    return (
      <Message
        info
        className="notify-message-box"
      >
        <div className="main">
          <div className="header">
            <Loader active inline size="tiny" />
            &nbsp;&nbsp;
            <span> Funding... </span>
          </div>
          <div className="content">
            {fundAmount} of FakeUSD are on their way to your account... it can take up to a few minutes
          </div>
        </div>
      </Message>
    )
  }
}

const mapStateToProps = store => ({
  global : store.global,
  auth   : store.auth,
  user   : store.user,
})

const mapDispatchToProps = {
  ...globalCreators,
}

FundNotification.propTypes = {
  global          : PropTypes.object.isRequired,
  setFundAmount   : PropTypes.func.isRequired,
  showInvestModal : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FundNotification)
