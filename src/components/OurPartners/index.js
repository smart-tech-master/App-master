import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

import {
  PartnersPng
} from '../../assets/images/homepage'
import {
  Frame5,
  Frame7,
  Frame9,
  Frame10,
  Frame11,
  Frame12,
  Frame13
} from '../../assets/images/companies'
import './style.less'

const OurPartners = () => (
  <Grid container className="our-partners-section">
    <Grid.Row>
      <div className="main">
        <Image src={PartnersPng} />
        <div className="guide-txt">Our partners</div>
        <div className="title">We build an ecosystem with awesome partners</div>
      </div>
      <div className="company-list">
        <div className="company"><Image src={Frame7} /></div>
        <div className="company"><Image src={Frame9} /></div>
        <div className="company"><Image src={Frame5} /></div>
        <div className="company"><Image src={Frame10} /></div>
        <div className="company"><Image src={Frame11} /></div>
        <div className="company"><Image src={Frame12} /></div>
        <div className="company"><Image src={Frame13} /></div>
      </div>
    </Grid.Row>
  </Grid>
)

export default OurPartners
