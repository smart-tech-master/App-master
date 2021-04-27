/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { init as onfidoInit } from 'onfido-sdk-ui'
import BigNumber from 'bignumber.js'
import MetaTags from 'react-meta-tags'

import {
  LoadingSpinner,
  PasswordDialog,
  PageIndicator,
  AppHeader,
  AppFooter,
  NotificationMessage,
  PinCodeDialog,
  FundDialog,
  FundNotification
} from '../../components'
import config from '../../config'
import './home.less'
import InvestorList from './Investors'
import FinancialData from './FinancialData'
import NewsAndAnnouncements from './NewsAndAnnouncements'
import MyPortfolio from './MyPortfolio'
import { Types, Creators } from '../../redux/actions/user'
import { Types as authTypes, Creators as authCreators } from '../../redux/actions/auth'
import { Creators as globalCreators } from '../../redux/actions/global'
// import PortfolioValueBox from './PortfolioValueBox'
import TransactionHistory from './TransactionHistory'
// import Referal from './Referal'
import Referal2 from './Referal2'
import Welcome from './Welcome'
import FundAccount from './FundAccount'

import NewsData from './NewsAndAnnouncements/NewsData.json'

class Home extends React.Component {
  state = {
    showPasswordDialog : false,
    onPasswordOk       : () => {},
    showWelcome        : false
  }

  componentDidMount() {
    if (this.props.user.data) {
      this.showWelcomeModal()
    }
    if (!this.props.auth.user) {
      this.props.checkToken()
    }
    this.props.getUserData()
    if (this.props.auth.user) {
      this.props.getAccountInfo(this.props.auth.user.walletAddress)
      this.props.getInvestors()
      this.props.getInvestorsHighlight()
      this.props.getTransactionHistory(this.props.auth.user.walletAddress)
      this.props.getPortfolioGraph(this.props.auth.user.walletAddress)
      this.props.getCSOInvestTotal()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.data && this.props.user.data) {
      console.log('-- show welcome modal')
      this.showWelcomeModal()
    }
    if (!prevProps.auth.user && this.props.auth.user) {
      this.props.getAccountInfo(this.props.auth.user.walletAddress)
      this.props.getInvestors()
      this.props.getInvestorsHighlight()
      this.props.getTransactionHistory(this.props.auth.user.walletAddress)
      this.props.getPortfolioGraph(this.props.auth.user.walletAddress)
      this.props.getCSOInvestTotal()
    }
    if (prevProps.auth.user && !this.props.auth.user) {
      this.props.changeLocation('/signin')
      return
    }
    if (prevProps.global.status[authTypes.CHECK_TOKEN] === 'request'
      && this.props.global.status[authTypes.CHECK_TOKEN] === 'failure') {
      this.props.changeLocation('/signin')
      return
    }
  }

  onClickApprove() {
    this.setState({
      showPasswordDialog : true,
      onPasswordOk       : this.callApprove
    })
  }

  onChangeValue(fieldName) {
    return (event) => {
      this.setState({ [fieldName]: event.target.value })
    }
  }

  onStartChat = () => {
    window.Intercom('showNewMessage', 'You want to tell us something or advise us on which companies we should get in touch with, please let us know :smile: ')
  }

  onVideoPlayBtnClicked = () => {
    window.Intercom('startTour', 66549)
    this.props.changeLocation('/home?product_tour_id=66549')
  }

  onClickOnfido = () => {
    this.onfido = onfidoInit({
      useModal    : true,
      isModalOpen : true,
      token       : this.props.user.sdkToken,
      steps       : [
        {
          type    : 'welcome',
          options : {
            title        : 'Verify your identity',
            descriptions : [
              "We need to verify that you are who you say you are before we can let you make transactions. It's called KYC, know your customer, and it's a regulatory requirement that lets us make sure Fairmint is a safe place free of fraudsters, money launderers, etc.",
              "And don't worry, it's easy.",
            ],
            nextButton: 'Verify your identity'
          }
        },
        'document',
        'face',
        'complete',
      ],
      onModalRequestClose: () => {
        this.onfido.setOptions({ isModalOpen: false })
      },
      onComplete: () => {
        this.props.submitCheck()
      }
    })
  }

  showWelcomeModal = () => {
    let welcomeModalVisibility
    if (this.props.user.data) {
      welcomeModalVisibility = window.localStorage.getItem(`welcomeModalShown-${this.props.user.data.userId}`)
    }
    console.log('- welcomeModalVisibility:', welcomeModalVisibility, this.props.user.data)
    if (!welcomeModalVisibility) {
      this.setState({ showWelcome: true })
      window.Intercom('shutdown')
    }
  }

  hideWelcomeModal = () => {
    window.localStorage.setItem(`welcomeModalShown-${this.props.user.data.userId}`, true)
    this.setState({ showWelcome: false })
    window.Intercom('boot', {
      app_id    : config.intercomAppId,
      user_id   : this.props.auth.user.walletAddress,
      email     : this.props.auth.user.email,
      user_hash : this.props.auth.user.intercomHash,
    })
  }

  closePasswordDialog = () => {
    this.setState({ showPasswordDialog: false })
  }

  render() {
    const { showWelcome } = this.state
    const { global, user: { dashboard: data, data: userData, account } } = this.props
    const loadingTypes = [authTypes.CHECK_TOKEN, Types.SIGN_TX]
    const fundData =  [
      {
        currency_code : 'FAIR',
        currency_name : 'FAIR',
        nb            : account ? account.fairBalance : 0
      },
      {
        currency_code : 'USDC',
        currency_name : 'USD (coin)',
        nb            : account ? account.currencyBalance : 0
      },
    ]
    return (
      <>
        <MetaTags>
          <title>Fairmint - Dashboard</title>
        </MetaTags>
        <AppHeader />
        {(
          <>
            <Grid padded="vertically" className="pages page-home" container stackable>
              {showWelcome && <Welcome onClose={this.hideWelcomeModal} firstname={userData.firstname} />}
              <PageIndicator
                pageName="Dashboard"
                fairPrice={(window.contracts && window.contracts.data && BigNumber(window.contracts.data.liveFAIRPrice).toFixed(2))
                  || '0.00'}
              />
              <Grid.Row stretched>
                <div className="notification-msg-container">
                  { this.props.user.data && !this.props.user.data.account_funded && window.contracts && (
                    <NotificationMessage
                      icon
                      header="Fund your account"
                      content="You need to fund your account to start investing"
                      confirmBtn={{
                        title   : 'Fund account',
                        onClick : () => this.props.setFundDialog(true)
                      }}
                    />
                  )}
                  { this.props.user.data && !this.props.user.data.verified_email && (
                    <NotificationMessage
                      icon
                      header="Check your e-mail"
                      content="You received a security PIN with your personal recovery file. Please save it in a secure place"
                      confirmBtn={{
                        title   : 'Enter PIN',
                        onClick : () => this.props.setPinCodeDialog(true)
                      }}
                    />
                  )}
                  <FundNotification />
                </div>
                <Grid.Column width={16}>
                  <Referal2 shareText="Testing the first Continuous Securities Offering by @FairmintCO. Get a sneak peek of the future of financing here:" hashtags={['#CSO']} />
                </Grid.Column>
                {/* { this.props.user.data && this.props.user.data.account_funded && !_.isEmpty(data.investor_history) && (
                  <Grid.Column width={16}>
                    <PortfolioValueBox data={data && data.investor_history} />
                  </Grid.Column>
                )} */}
                { this.props.user.data && !this.props.user.data.account_funded && (
                  <Grid.Column width={16}>
                    <FundAccount onFund={() => this.props.setFundDialog(true)} />
                  </Grid.Column>
                )}
                {account && (
                  <Grid.Column width={8}>
                    <MyPortfolio
                      fundData={fundData}
                      fairPrice={(window.contracts && window.contracts.data && window.contracts.data.liveFAIRPrice
                        && window.contracts.data.liveFAIRPrice.toNumber())
                        || 0}
                    />
                  </Grid.Column>
                )}
                {data && data.transactions_history && (
                  <Grid.Column width={8}>
                    <TransactionHistory
                      data={data.transactions_history}
                    />
                  </Grid.Column>
                )}
                {data && data.investors && (
                  <Grid.Column width={8}>
                    <FinancialData
                      data={data.investors}
                    />
                  </Grid.Column>
                )}
                {data && data.investors_highlight && (
                  <Grid.Column width={8}>
                    <InvestorList data={data.investors_highlight} totalInvestors={data.total_investors} />
                  </Grid.Column>
                )}
                {/* <Grid.Column width={16}>
                  <Referal shareUrl="https://www.example.com/share/123" />
                </Grid.Column> */}
                <Grid.Column computer={16} mobile={16}>
                  <NewsAndAnnouncements data={NewsData} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <AppFooter />
          </>
        )}
        { loadingTypes.map(t => global.status[t]).includes('request') && <LoadingSpinner /> }
        <PasswordDialog
          show={this.state.showPasswordDialog}
          onOk={this.state.onPasswordOk}
          onCancel={this.closePasswordDialog}
        />
        <PinCodeDialog />
        <FundDialog />
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
  ...Creators,
  ...authCreators,
  ...globalCreators,
  changeLocation: push
}

Home.propTypes = {
  global                : PropTypes.object.isRequired,
  auth                  : PropTypes.object.isRequired,
  user                  : PropTypes.object.isRequired,
  checkToken            : PropTypes.func.isRequired,
  getUserData           : PropTypes.func.isRequired,
  getAccountInfo        : PropTypes.func.isRequired,
  getInvestors          : PropTypes.func.isRequired,
  getInvestorsHighlight : PropTypes.func.isRequired,
  getTransactionHistory : PropTypes.func.isRequired,
  submitCheck           : PropTypes.func.isRequired,
  getPortfolioGraph     : PropTypes.func.isRequired,
  setFundDialog         : PropTypes.func.isRequired,
  setPinCodeDialog      : PropTypes.func.isRequired,
  changeLocation        : PropTypes.func,
  getCSOInvestTotal     : PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
