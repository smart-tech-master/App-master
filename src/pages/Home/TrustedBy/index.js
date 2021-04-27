import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

import {
  BoostVcPng,
  CollabPng,
  CygniLabsPng
} from '../../../assets/images/homepage'
import './style.less'

const TrustedBy = () => (
  <section className="trusted-by-section">
    <Grid>
      <Grid.Row>
        <Grid.Column computer={5} widescreen={6} largeScreen={6}>
          <div className="guide-txt">Trusted by</div>
          <div className="title">Top Silicon<br />Valley investors</div>
        </Grid.Column>
        <Grid.Column computer={11} widescreen={10} largeScreen={10} className="company-list">
          <div className="company-1"><Image src={BoostVcPng} /></div>
          <div className="company-2"><Image src={CollabPng} /></div>
          <div className="company-3"><Image src={CygniLabsPng} /></div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </section>
)

export default TrustedBy
