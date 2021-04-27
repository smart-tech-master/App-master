import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import MetaTags from 'react-meta-tags'

import { Creators as globalCreators } from '../../redux/actions/global'

import { HomeHeader, GetFinancing, OurPartners, Quotes } from '../../components'
import GetStarted from './GetStarted'
import Footer from './Footer'
import MainFeatures from './MainFeatures'
import Steps from './Steps'
import Security from './Security'
// import Connections from './Connections'
import './style.less'

import SlidesJSON from './data/slides.json'

class FoundersPage extends Component {
  showFinancingClicked = () => {
    const { showGetFinancingModal } = this.props
    showGetFinancingModal(true)

    ReactGA.modalview('/founders/apply')
  }

  render() {
    const { showGetFinancing } = this.props.global
    return (
      <>
        <MetaTags>
          <title>Launch your Continuous Securities Offerings with Fairmint</title>
        </MetaTags>
        <HomeHeader />
        <Grid className="pages page-founders">
          <Grid.Row>
            <Grid.Column width={16}>
              {showGetFinancing && <GetFinancing />}
              <GetStarted getFinancingClicked={this.showFinancingClicked} />
              <OurPartners />
              <MainFeatures />
              <Steps />
              <Quotes quotes={SlidesJSON.quotes} />
              <Security />
              {/* <Connections /> */}
              <Footer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = store => ({
  global: store.global,
})

const mapDispatchToProps = {
  ...globalCreators
}

FoundersPage.propTypes = {
  global                : PropTypes.object,
  showGetFinancingModal : PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoundersPage)
