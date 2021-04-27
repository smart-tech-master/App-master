import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Button, Image } from 'semantic-ui-react'

import GetStartedBg from '../../../assets/images/founders-getstarted-main.svg'
import './style.less'

const GetStarted = ({ getFinancingClicked }) => (
  <div className="get-started-card">
    <Grid container>
      <Grid.Row>
        <div className="left">
          <Header>Get financing and stay laser-focused on your business</Header>
          <div className="desc">With Continuous Security Offerings, Fairmint allows founders of private companies to raise funds globally, continuously and compliantly.</div>
          <Button className="get-started-btn" primary onClick={getFinancingClicked}>Get started</Button>
        </div>
        <div
          className="right"
        >
          <Image src={GetStartedBg} />
        </div>
      </Grid.Row>
    </Grid>
  </div>
)

GetStarted.propTypes = {
  getFinancingClicked: PropTypes.func
}

export default GetStarted
