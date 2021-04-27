/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import BigNumber from 'bignumber.js'
import * as _ from 'lodash'
import MetaTags from 'react-meta-tags'

import { LoadingSpinner, PageIndicator, AppHeader, AppFooter } from '../../components'
import TrustScore from './TrustScore'
import FinancialDataBox from './FinancialDataBox'
import FairmintStatusBox from './FairmintStatusBox'
import { Creators } from '../../redux/actions/user'
import { Types as authTypes, Creators as authCreators } from '../../redux/actions/auth'
import { Creators as globalCreators } from '../../redux/actions/global'

import ScaleIcon from '../../assets/images/scale_icon.png'
import CoinsIcon from '../../assets/images/coins_icon.png'
import GrowthIcon from '../../assets/images/growth_icon.png'
import PartialIcon from '../../assets/images/partial_icon.png'

import './styles.less'

const FinancialDataLayout = {
  revenueCommitment: {
    iconUrl     : ScaleIcon,
    iconBgColor : '#FEF0D5',
    valuePrefix : undefined,
    valueSuffix : '%',
    title       : 'Revenue Commitment',
    description : 'Fairmint has committed to funnel {value}% of its revenue to the investor\'s reserve that ultimately backs the value of FAIR.'
  },
  numberOfInvestors: {
    iconUrl     : PartialIcon,
    iconBgColor : '#FFDED3',
    valuePrefix : undefined,
    valueSuffix : undefined,
    title       : '# of investors',
    description : 'Numbers of people that invested in Tokens'
  },
  totalInvestment: {
    iconUrl     : CoinsIcon,
    iconBgColor : '#DEE8FF',
    valuePrefix : '$',
    valueSuffix : undefined,
    title       : 'Total Investment',
    description : 'This is the total amount invested in Fairmint FAIR.'
  },
  marketSentiment: {
    iconUrl     : GrowthIcon,
    iconBgColor : '#BDFBE4',
    valuePrefix : undefined,
    valueSuffix : undefined,
    title       : 'Market Sentiment',
    description : 'The market sentiment is the ratio between the last transaction price and the cash reserve price. A high ratio means investors are confident on the ability of the company to grow its revenues in the future.'
  }
}

class FinancialData extends React.Component {
  componentDidMount() {
    if (!this.props.auth.user) {
      this.props.checkToken()
    }
    if (this.props.auth.user) {
      this.props.getCSOGraph()
      this.props.getInvestors()
      if (!window.contracts) {
        this.props.getAccountInfo(this.props.auth.user.walletAddress)
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.user && this.props.auth.user) {
      this.props.getCSOGraph()
      this.props.getInvestors()
      if (!window.contracts) {
        this.props.getAccountInfo(this.props.auth.user.walletAddress)
      }
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

  showInvestModal = () => {
    const { showInvestModal } = this.props
    showInvestModal(true)
  }

  getCorgData = prop => (window.contracts && window.contracts.data[prop] && BigNumber(window.contracts.data[prop]).toFixed(2))

  render() {
    const { global, user: { financialData: data, dashboard: investorsData } } = this.props
    const status = !_.isEmpty(data)
    const loadingTypes = [authTypes.CHECK_TOKEN]
    return (
      <>
        <MetaTags>
          <title>Fairmint - Financial data</title>
        </MetaTags>
        <AppHeader />
        {!loadingTypes.map(t => global.status[t]).includes('request') && (
          <>
            <Grid padded="vertically" className="pages financial-data-page" container stackable>
              <PageIndicator pageName="Financial Data" fairPrice={this.getCorgData('liveFAIRPrice') || '0.00'} />
              <Grid.Row>
                <Grid.Column mobile={16} tablet={11} computer={11} largeScreen={11} widescreen={11}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <FairmintStatusBox key={data.data} status={status} fairPrice={this.getCorgData('liveFAIRPrice') || '0.00'} data={data && data.data} />
                      </Grid.Column>
                      <Grid.Column mobile={16} computer={8}>
                        <FinancialDataBox
                          layout={FinancialDataLayout.revenueCommitment}
                          value={this.getCorgData('revenueCommitment') * 100 || 0}
                        />
                      </Grid.Column>
                      <Grid.Column mobile={16} computer={8}>
                        <FinancialDataBox
                          layout={FinancialDataLayout.totalInvestment}
                          price={(investorsData.investors && investorsData.investors.amount_invested) || 0}
                        />
                      </Grid.Column>
                      <Grid.Column mobile={16} computer={8}>
                        <FinancialDataBox
                          layout={FinancialDataLayout.numberOfInvestors}
                          value={(investorsData.investors && investorsData.investors.investors_total) || 0}
                        />
                      </Grid.Column>
                      <Grid.Column mobile={16} computer={8}>
                        <FinancialDataBox
                          layout={FinancialDataLayout.marketSentiment}
                          value={this.getCorgData('marketSentiment') || 0}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={5} computer={5} largeScreen={5} widescreen={5}>
                  <TrustScore showInvestModal={this.showInvestModal} value={619} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <AppFooter />
          </>
        )}
        { loadingTypes.map(t => global.status[t]).includes('request') && <LoadingSpinner /> }
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

FinancialData.propTypes = {
  global          : PropTypes.object.isRequired,
  auth            : PropTypes.object.isRequired,
  user            : PropTypes.object.isRequired,
  checkToken      : PropTypes.func.isRequired,
  changeLocation  : PropTypes.func,
  showInvestModal : PropTypes.func,
  getCSOGraph     : PropTypes.func.isRequired,
  getAccountInfo  : PropTypes.func.isRequired,
  getInvestors    : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FinancialData)
