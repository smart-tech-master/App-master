/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Tab, Table, Button, Header, Menu, Image } from 'semantic-ui-react'
import NumberFormat from 'react-number-format'
import BigNumber from 'bignumber.js'
import { NotificationManager } from 'react-notifications'
import ReactGA from 'react-ga'

import { LoadingSpinner, PasswordDialog } from '../index'
import { CloseIcon, BackArrowIcon } from '../../assets/icons'
import GreenLogoPng from '../../assets/images/green-logo.png'
import DollarPng from '../../assets/images/dollar.png'
import logoPng from '../../assets/images/logo_colored-preview.svg'
import mobileCloseMenuPng from '../../assets/images/cross.png'

import { Creators as authCreators } from '../../redux/actions/auth'
import { Types as UserTypes, Creators as userCreators } from '../../redux/actions/user'
import { Creators as glboalCreators } from '../../redux/actions/global'
import { runInvestAnime, showSuccessAnime, removeInvestAnime } from '../../pages/animations'
import StepsShowAnimeSection from './StepsShowAnimeSection'
import SuccessPage from './Success'
import './style.less'
import './steps.animation.style.less'

const isMobile = require('is-mobile')

const stepsAnimeData = [
  {
    title : 'Step1',
    desc  : 'Preparing your transaction'
  },
  {
    title : 'Step2',
    desc  : 'Sending your transaction'
  },
  {
    title : 'Step3',
    desc  : 'Confirming your transaction'
  },
]

const BuyContent = ({ price, onPriceChange, priceChanged, purchaseStep, error, stepChanged, buyFairmint, fairEstimate, fundAvailable, fairPrice }) => (
  <>
    <div className="fairmint-value">
      <div className="title">I want to invest</div>
      <div className="usd-price">
        <NumberFormat
          className={error ? 'error' : 'valid'}
          placeholder="$0.00"
          thousandSeparator
          displayType={purchaseStep ? 'text' : 'input'}
          onValueChange={onPriceChange}
          fixedDecimalScale
          decimalScale={2}
          prefix="$"
        />
      </div>
      {!priceChanged && (<div className="fairmint-vs-usd">1 FAIR ≈ ${fairPrice}</div>)}
      {priceChanged && (<div className="fairmint-price">You will get: ≈ {fairEstimate} FAIR</div>)}
      <div className="fairmint-price error">{error && 'Insufficient funds'}</div>
    </div>
    {!purchaseStep && (
      <div className="celled-table-wrapper">
        <Table celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Buy</Table.Cell>
              <Table.Cell><div><img src={GreenLogoPng} className="icon" alt="icon" /> FAIR</div></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Pay with</Table.Cell>
              <Table.Cell><div><img src={DollarPng} className="icon" alt="icon" /> USD Portfolio</div></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )}
    {purchaseStep && (
      <>
        <div className="celled-table-wrapper">
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Pay with</Table.Cell>
                <Table.Cell><div><img src={DollarPng} className="icon" alt="icon" /> USD Portfolio</div></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Price</Table.Cell>
                <Table.Cell>
                  <div>
                    <NumberFormat
                      value={fairPrice}
                      displayType="text"
                      thousandSeparator
                      fixedDecimalScale
                      decimalScale={2}
                      prefix="$"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Purchase</Table.Cell>
                <Table.Cell><div>{parseFloat(fairEstimate, 10).toFixed(8)} FAIR</div></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <div className="celled-table-wrapper">
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell className="fee">Fee</Table.Cell>
                <Table.Cell>
                  <div>
                    <NumberFormat
                      value={0.00}
                      className="fee"
                      displayType="text"
                      thousandSeparator
                      fixedDecimalScale
                      decimalScale={2}
                      prefix="$"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="price">Total</Table.Cell>
                <Table.Cell>
                  <div>
                    <NumberFormat
                      value={price}
                      className="price"
                      displayType="text"
                      thousandSeparator
                      fixedDecimalScale
                      decimalScale={2}
                      prefix="$"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </>
    )}
    {purchaseStep && (
      <Button
        primary={!error}
        fluid
        className="submit-btn"
        onClick={buyFairmint}
      >
        Buy now
      </Button>
    )}
    {!purchaseStep && (
      <Button
        primary={!error}
        fluid
        className={['submit-btn', error && 'error'].join(' ')}
        onClick={() => stepChanged(true)}
      >
        Preview Purchase
      </Button>
    )}
    <div className="available-usd">
      <span>Your available USD:</span>
      <NumberFormat
        className="font-weight-bold"
        value={fundAvailable}
        displayType="text"
        thousandSeparator
        fixedDecimalScale
        decimalScale={2}
        prefix="$"
      />
    </div>
    {purchaseStep && (
      <Header as="div" className="back-icon-header">
        <BackArrowIcon
          className="green-back-icon"
          color="#5D88FD"
          onClick={() => stepChanged(false)}
        />
      </Header>
    )}
  </>
)

const SellContent = () => (
  <>
  </>
)

// eslint-disable-next-line react/prefer-stateless-function
class Invest extends Component {
  state = {
    price              : 0.00,
    fairmintFee        : 5,
    fairEstimate       : undefined,
    priceChanged       : false,
    purchaseStep       : false,
    error              : false,
    showPasswordDialog : false,
    buyFairRequested   : false,
  }

  componentWillReceiveProps(nextProps) {
    const { status } = nextProps.global
    const { buyFairRequested } = this.state
    if (buyFairRequested && status[UserTypes.BUY] === 'failure') {
      this.hideInvestModal()
      removeInvestAnime()
      this.props.resetState()
    }
    if (!isMobile()) {
      if (buyFairRequested && status[UserTypes.BUY] === 'success') {
        showSuccessAnime()
      }
    }
  }

  onPriceChange = async (price) => {
    const { account } = this.props.user
    const fundAvailable = account ? parseInt(account.currencyBalance, 10) : 0
    const fairEstimate = await window.contracts.estimateBuyValue(Number(price.floatValue))
    if (Number(price.floatValue) > fundAvailable) {
      this.setState({ price: price.floatValue, fairEstimate: fairEstimate.toString(), priceChanged: true, error: true })
    } else {
      this.setState({ price: price.floatValue, fairEstimate: fairEstimate.toString(), priceChanged: true, error: false })
    }
  }

  stepChanged = (val) => {
    const { price } = this.state
    if (price > 0) {
      this.setState({ purchaseStep: val })
    }

    if (val) {
      ReactGA.modalview('/invest/buy/preview')
    }
  }

  closePasswordDialog = () => {
    this.setState({ showPasswordDialog: false })
  }

  buyFairmint = async () => {
    const amount = Number(this.state.price)
    const maxSlip = Number(this.state.fairmintFee)
    if (!Number.isNaN(amount) && !Number.isNaN(maxSlip)) {
      const estimate = await window.contracts.estimateBuyValue(amount)
      if (!estimate || estimate.eq(0)) {
        NotificationManager.error('0 expected value!', 'Error')
      } else {
        this.setState({ showPasswordDialog: true })

        ReactGA.modalview('/invest/buy/password')
      }
    } else {
      NotificationManager.error('Please input nubmers!', 'Error')
    }
  }

  callBuy =  (password) => {
    this.setState({ showPasswordDialog: false })
    if (!isMobile()) {
      runInvestAnime()
      setTimeout(() => { this.buy(password) }, 15000)
    } else {
      this.buy(password)
    }
  }

  buy = async (password) => {
    this.setState({ buyFairRequested: true })
    const { price, fairmintFee } = this.state

    const amount = Number(price)
    const maxSlip = Number(fairmintFee)
    const estimate = await window.contracts.estimateBuyValue(amount)

    const { contracts } = window
    const { email, walletAddress } = this.props.auth.user

    const buyValue = new BigNumber(amount).shiftedBy(contracts.data.currency.decimals).dp(0)
    const minBuyValue = estimate.times(new BigNumber(100).minus(maxSlip).div(100)).shiftedBy(contracts.data.decimals).dp(0)
    const extraData = contracts.dat.methods.buy(
      walletAddress, buyValue.toFixed(), minBuyValue.toFixed()
    ).encodeABI()

    const txParams = {
      data  : extraData,
      from  : walletAddress,
      // eslint-disable-next-line no-underscore-dangle
      to    : contracts.dat._address,
      value : '0x0',
    }

    if (!this.props.user.account.allowance.eq(0)) {
      this.props.signTx(txParams, email, password, UserTypes.BUY)
      return
    }

    // If account is not approved
    const approveData = contracts.currency.methods.approve(
      contracts.dat._address, -1
    ).encodeABI()
    const approveParams = {
      data  : approveData,
      from  : walletAddress,
      to    : contracts.currency._address,
      value : '0x0',
    }

    this.props.firstBuy(approveParams, txParams, email, password)
  }

  hideInvestModal = () => {
    const { showInvestModal, resetState } = this.props
    showInvestModal(false)
    removeInvestAnime()
    resetState()
  }

  render() {
    const { account } = this.props.user
    const { price, priceChanged, purchaseStep, error, fairEstimate } = this.state
    const fairPrice = (window.contracts && window.contracts.data && window.contracts.data.liveFAIRPrice && window.contracts.data.liveFAIRPrice.toNumber()) || '0.00'
    const { status } = this.props.global
    const loadingTypes = [UserTypes.SIGN_TX, UserTypes.BUY]
    const panes = [
      {
        menuItem : 'Buy',
        render   : () => (
          <Tab.Pane attached={false}>
            <BuyContent
              price={price}
              fairEstimate={fairEstimate}
              priceChanged={priceChanged}
              onPriceChange={this.onPriceChange}
              purchaseStep={purchaseStep}
              stepChanged={this.stepChanged}
              buyFairmint={this.buyFairmint}
              fundAvailable={account ? parseInt(account.currencyBalance, 10) : 0}
              fairPrice={fairPrice}
              error={error}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="sell" className="disabled">
            Sell
          </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false}><SellContent /></Tab.Pane>,
      },
    ]
    return (
      <div className="page-div invest-page">
        <Card as="div" className="invest-buy-sell-card">
          <Card.Content>
            <Menu borderless className="mobile-navmenu">
              <Menu.Item as="a" header>
                <Image src={logoPng} style={{ width: 140 }} />
              </Menu.Item>
              <Menu.Item position="right">
                <Menu.Item as="a" onClick={this.hideInvestModal}>
                  <Image src={mobileCloseMenuPng} style={{ width: 36 }} />
                </Menu.Item>
              </Menu.Item>
            </Menu>
            {status[UserTypes.BUY] !== 'success' && (
              <Card.Header>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                <CloseIcon className="close-icon" onClick={this.hideInvestModal} />
              </Card.Header>
            )}
            {isMobile() && loadingTypes.map(t => status[t]).includes('request') && (
              <LoadingSpinner text="Your transaction is being sent... this may take up to 2 minutes" />
            )}
            {isMobile() && status[UserTypes.BUY] === 'success' && (
              <div className="success">
                <SuccessPage onCloseClick={this.hideInvestModal} fairEstimate={fairEstimate} />
              </div>
            )}
          </Card.Content>
        </Card>
        <div className="invest-steps-desc-page">
          <StepsShowAnimeSection data={stepsAnimeData} />
          <div className="success">
            <SuccessPage onCloseClick={this.hideInvestModal} fairEstimate={fairEstimate} />
          </div>
        </div>
        <PasswordDialog
          show={this.state.showPasswordDialog}
          onOk={this.callBuy}
          onCancel={this.closePasswordDialog}
          text="To confirm your order, please enter your password here:"
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
  ...authCreators,
  ...userCreators,
  ...glboalCreators
}

BuyContent.propTypes = {
  onPriceChange : PropTypes.func,
  stepChanged   : PropTypes.func,
  buyFairmint   : PropTypes.func,
  priceChanged  : PropTypes.bool,
  purchaseStep  : PropTypes.bool,
  error         : PropTypes.bool,
  price         : PropTypes.number,
  fairEstimate  : PropTypes.string,
  fundAvailable : PropTypes.number,
  fairPrice     : PropTypes.string,
}

Invest.propTypes = {
  global          : PropTypes.object.isRequired,
  user            : PropTypes.object,
  showInvestModal : PropTypes.func,
  auth            : PropTypes.object,
  signTx          : PropTypes.func,
  firstBuy        : PropTypes.func,
  resetState      : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Invest)
