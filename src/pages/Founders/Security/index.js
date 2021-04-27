import React from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'

import SecurityPng from '../../../assets/images/founders-security2.svg'
import './style.less'

const Security = () => (
  <Grid className="security-card">
    <Grid.Row>
      <div className="left">
        <Header>Security is a serious matter!</Header>
        <div className="desc">To make this possible, we built a complete ecosystem with our worldwide well knowns partners.</div>
      </div>
      <div
        className="right"
      >
        <Image src={SecurityPng} />
      </div>
    </Grid.Row>
  </Grid>
)

export default Security
