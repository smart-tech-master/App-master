import React from 'react'
import { Image, Grid } from 'semantic-ui-react'

import {
  GreenCirclePng,
  BlueCirclePng,
  DoubleCirclePng,
  RedCurveArrowPng,
  VirtuousCircleBg
} from '../../../assets/images/homepage'
import './style.less'
import data from './data.json'

const VirtuousCircle = () => (
  <Grid container className="virtuous-circle-section">
    <Grid.Row>
      <Image src={DoubleCirclePng} className="virtuous-bg-1" />
      <Image src={RedCurveArrowPng} className="virtuous-bg-2" />
      <Image src={BlueCirclePng} className="virtuous-bg-3" />
      <Image src={GreenCirclePng} className="virtuous-bg-4" />
      <div className="main">
        <div className="title">Virtuous circle of the C.S.O</div>
      </div>
      <div className="graph">
        <Image src={VirtuousCircleBg} className="virtuous-circle-bg" />
        {data.points.map((point, index) => (
          <div className="point" data-index={index + 1} key={index}>
            {index + 1}
            <div className="arrow-box">
              <span className="title">{point.title}</span>
              <span className="content">{point.content}</span>
            </div>
          </div>
        ))}
      </div>
    </Grid.Row>
  </Grid>
)

export default VirtuousCircle
