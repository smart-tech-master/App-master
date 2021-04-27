import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Image } from 'semantic-ui-react'

import LogoPng from '../../../assets/images/logo_colored.png'

import Companies1Png from '../../../assets/images/founders-companies-1.png'
import Companies2Png from '../../../assets/images/founders-companies-2.png'
import Companies3Png from '../../../assets/images/founders-companies-3.png'
import Companies4Png from '../../../assets/images/founders-companies-4.png'

import './style.less'

const ArrowBox = ({ text, classes }) => (
  <div className={`arrow-box ${classes}`}>
    {text}
  </div>
)

const Connections = () => (
  <Grid container className="connections-card">
    <Grid.Row>
      <div className="left">
        <Header>Other companies</Header>
        <div className="desc">Here we can exaplin in the general words what we show here and how it works</div>
        <div className="graph">
          <ArrowBox classes="red-arrow-box" text="Each time you want to sit, need to buy to the founder a piece of the founders sea. You will not have full place and rights." />
          <Image src={Companies3Png} className="img1" />
          <Image src={Companies1Png} className="img2" />
          <Image src={Companies2Png} className="img3" />
          <ArrowBox classes="red-arrow-box red-arrow-2" text="You can buy place to someone already seated. So you will pay big amount of money just to have a place" />
        </div>
      </div>
      <div className="divider" />
      <div
        className="right"
      >
        <Image src={LogoPng} className="logo" />
        <div className="desc">Here we can exaplin in the general words what we show here and how it works</div>
        <div className="graph">
          <Image src={Companies4Png} className="img1" />
          <ArrowBox classes="blue-arrow-box" text="With Fairmint, the primary market is always open, so our investors table keeps growing. You all time will a your personal place" />
        </div>
      </div>
    </Grid.Row>
  </Grid>
)

ArrowBox.propTypes = {
  text    : PropTypes.string,
  classes : PropTypes.string
}

export default Connections
