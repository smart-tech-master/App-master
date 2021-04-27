import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

import './style.less'
import BenefitsPng from '../../../assets/images/founders-benefits.svg'
import RedCurvePng from '../../../assets/images/red-curve-arrow.svg'

import Features1Svg from '../../../assets/images/founders-features1.svg'
import Features2Svg from '../../../assets/images/founders-features2.svg'
import Features3Svg from '../../../assets/images/founders-features3.svg'

import data from './data.json'

const images = [
  Features1Svg,
  Features2Svg,
  Features3Svg,
]

const MainFeatures = () => (
  <section className="main-features">
    <Image src={RedCurvePng} className="steps-bg-1" />
    <Grid container>
      <div className="main">
        <Image src={BenefitsPng} />
        <div className="guide-txt">Key Benefits</div>
        <div className="title">You can run your own Continuous Securities Offering and:</div>
      </div>
      <Grid.Row>
        {data.features.map((feature, index) => (
          <Grid.Column key={index} className="feature">
            <Image src={images[index]} />
            <span className="title">{feature.title}</span>
            <span className="desc">{feature.desc}</span>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  </section>
)

export default MainFeatures
