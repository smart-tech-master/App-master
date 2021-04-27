import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import MetaTags from 'react-meta-tags'

import { Creators as globalCreators } from '../../redux/actions/global'
import { HomeHeader, OurPartners, Invest, Quotes } from '../../components'
import Intro from './Intro'
import TrustedBy from './TrustedBy'
import Footer from './Footer'
import SupportCarousel from  './SupportCarousel'
import Impact from './Impact'
import VirtuousCircle from './VirtuousCircle'
import './style.less'

import SlidesJSON from './data/slides.json'

class Home extends Component {
  showInvestModal = () => {
    const { showInvestModal } = this.props
    showInvestModal(true)
  }

  render() {
    const { showInvest } = this.props.global

    return (
      <>
        <MetaTags>
          <title>Fairmint - The Continuous Securities Offerings Platform</title>
        </MetaTags>
        <HomeHeader />
        <Grid className="pages page-index">
          {showInvest && <Invest />}
          <Grid.Row>
            <Grid.Column width={16}>
              <Intro showInvestModal={this.showInvestModal} />
              <TrustedBy />
              <SupportCarousel />
              <Quotes quotes={SlidesJSON.quotes} />
              <VirtuousCircle />
              <Impact />
              <OurPartners />
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

Home.propTypes = {
  global          : PropTypes.object,
  showInvestModal : PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
