import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Image, Button } from 'semantic-ui-react'
import NumberFormat from 'react-number-format'
import twitterHeart from '../../assets/images/twitter-heart.png'

import { Creators as globalCreators } from '../../redux/actions/global'
import { Creators as userCreators } from '../../redux/actions/user'
import './style.less'
import config from '../../config'

const initialState = {
  step   : 1,
  values : { floatValue: 0 },
}

class FundDialog extends Component {
  state = initialState

  onChangeValue = fieldName => (event) => {
    this.setState({
      [fieldName]: event.target.value
    })
  }

  onCloseDialog = () => {
    this.setState(initialState)
    this.props.setFundDialog(false)
  }

  onClickNext = () => {
    this.setState({ step: 2 })
    // this.props.fundAccountEth()
    this.props.fundAccountUsdc(this.state.values.floatValue)
    this.props.setFundAmount(this.state.values.formattedValue)
  }

  renderStep1() {
    if (!this.props.user.data) {
      return (
        <Card.Content>
          <Card.Header>
            Fund your account
          </Card.Header>
          <Card.Description>
            Loading...
          </Card.Description>
        </Card.Content>
      )
    }
    if (this.props.user.data.funded && config.REACT_APP_STAGE !== 'production') {
      return (
        <Card.Content>
          <Card.Header>
            Fund your account
          </Card.Header>
          <Card.Description>
            Your account is already funded.
          </Card.Description>
        </Card.Content>
      )
    }
    const { values } = this.state
    const error = values.floatValue > config.fundLimit
      ? `Thanks for being so bullish on Faimrint but we can't accept more than ${config.fundLimitText} for the moment :)`
      : ''
    return (
      <Card.Content className="fund-step1">
        <Card.Header>
          Fund your account
        </Card.Header>
        <Card.Description>
          <div className="description1">
            I am very optimistic about the market for Continuous Security Offerings and what Fairmint is building
          </div>
          <div className="description2">
            I am willing to invest in Fairmint the following amount:
          </div>
          <div className="usd-price">
            <NumberFormat
              placeholder="$0.00"
              className={error ? 'error' : 'valid'}
              thousandSeparator
              displayType="input"
              fixedDecimalScale
              decimalScale={2}
              prefix="$"
              value={values.floatValue}
              onValueChange={newValues => this.setState({ values: newValues })}
            />
          </div>
          { error && (
            <div className="fund-error">
              { error }
            </div>
          )}
          <Button
            primary
            fluid
            disabled={!!error || !(values.floatValue > 0)}
            onClick={this.onClickNext}
          >
            Next
          </Button>
        </Card.Description>
      </Card.Content>
    )
  }

  renderStep2() {
    return (
      <Card.Content className="fund-step2">
        <Card.Description>
          <Image src={twitterHeart} style={{ width: 120 }} />
          <div className="description1">
            Amazing, thanks for your support!
          </div>
          <div className="description2">
            We're currently in preview mode, we granted you <span>{ this.state.values.formattedValue }</span> FakeUSD so that you can go ahead and appreciate how easy it is to invest in a Continuous Security Offering.
          </div>
          <div className="description3">
            We'll make sure to let you know once we go live and start accepting real dollars :)
          </div>
          <Button
            primary
            fluid
            onClick={this.onCloseDialog}
          >
            Great, let's do this!
          </Button>
        </Card.Description>
      </Card.Content>
    )
  }

  render() {
    const { showFundDialog } = this.props.global
    const { step } = this.state
    return (
      <>
        <div
          className="fund-container"
          style={{ visibility: showFundDialog ? 'visible' : 'hidden' }}
          onClick={this.onCloseDialog}
        >
          <Card
            className="fund-card"
            onClick={e => e.stopPropagation()}
          >
            { step === 1 ? this.renderStep1() : this.renderStep2() }
          </Card>
        </div>
      </>
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
  ...userCreators
}

FundDialog.propTypes = {
  global          : PropTypes.object.isRequired,
  user            : PropTypes.object.isRequired,
  setFundDialog   : PropTypes.func.isRequired,
  fundAccountEth  : PropTypes.func.isRequired,
  fundAccountUsdc : PropTypes.func.isRequired,
  setFundAmount   : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FundDialog)
