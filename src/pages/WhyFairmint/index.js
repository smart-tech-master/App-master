/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Grid } from 'semantic-ui-react'
import BigNumber from 'bignumber.js'
import MetaTags from 'react-meta-tags'

import { LoadingSpinner, PageIndicator, AppHeader, AppFooter } from '../../components'
import './style.less'
import OurStory from './OurStory'
import OurTeam from './OurTeam'
import FeedbackBox from './FeedbackBox'
import Facts from './Facts'
import Main from './Main'
import WhyFairmintData from './PageContent.json'

import { Creators } from '../../redux/actions/user'
import { Types as authTypes, Creators as authCreators } from '../../redux/actions/auth'
import { Creators as glboalCreators } from '../../redux/actions/global'

class WhyFairmint extends React.Component {
  state = {
    isFullRead: false
  }

  componentDidMount() {
    if (!this.props.auth.user) {
      this.props.checkToken()
    }
  }

  componentDidUpdate(prevProps) {
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

  playClicked = () => {
  }

  readMoreClicked = () => {
    const { isFullRead } = this.state
    this.setState({ isFullRead: !isFullRead })
  }

  getCorgData = prop => (window.contracts && window.contracts.data[prop] && BigNumber(window.contracts.data[prop]).toFixed(2))

  render() {
    const { global } = this.props
    const { isFullRead } = this.state
    const loadingTypes = [authTypes.CHECK_TOKEN]
    return (
      <>
        <MetaTags>
          <title>Fairmint - Why Fairmint</title>
        </MetaTags>
        <AppHeader />
        {!loadingTypes.map(t => global.status[t]).includes('request') && (
          <>
            <Grid padded="vertically" className="pages page-WhyFairmint" container stackable>
              <PageIndicator pageName="Why Fairmint" fairPrice={this.getCorgData('liveFAIRPrice') || '0.00'} />
              <Grid.Row>
                <Grid.Column width={16}>
                  <Main data={WhyFairmintData.header} playClicked={this.playClicked} showInvestModal={this.showInvestModal} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="column-stacked">
                <Grid.Column widescreen={10}>
                  <OurStory data={WhyFairmintData.story} isFullRead={isFullRead} readMoreClicked={this.readMoreClicked} />
                </Grid.Column>
                <Grid.Column widescreen={10}>
                  <OurTeam data={WhyFairmintData.team} />
                </Grid.Column>
                <Grid.Column widescreen={6}>
                  <FeedbackBox data={WhyFairmintData.testimonials} />
                </Grid.Column>
                <Grid.Column widescreen={6}>
                  <Facts data={WhyFairmintData.about} />
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
})

const mapDispatchToProps = {
  ...Creators,
  ...authCreators,
  ...glboalCreators,
  changeLocation: push
}

WhyFairmint.propTypes = {
  global          : PropTypes.object.isRequired,
  auth            : PropTypes.object.isRequired,
  checkToken      : PropTypes.func.isRequired,
  changeLocation  : PropTypes.func,
  showInvestModal : PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(WhyFairmint)
