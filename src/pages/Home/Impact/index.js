import React from 'react'
import { Grid, Header, Button, Image } from 'semantic-ui-react'

import playBtnPng from '../../../assets/images/play-btn.png'
import WelcomeBoxJpg from '../../../assets/images/welcome_box.jpg'
import './style.less'
import data from './data.json'

const style = {
  containerStyle: {
    backgroundRepeat   : 'no-repeat',
    backgroundSize     : 'cover',
    backgroundPosition : 'center'
  }
}

const Impact = () => (
  <section className="impact-section">
    <Grid container>
      <Grid.Row>
        {/* <div className="statistics-section">
          {data && data.statistics.map((info, index) => (
            <div className="info" data-index={index + 1} key={index}>
              <div className="value">
                {info.value}
                <span>{info.value}</span>
              </div>
              <div className="title">{info.title}</div>
            </div>
          ))}
        </div> */}
        <div className="video-player-card">
          <div className="video-player-card-content">
            <Header>{data.header.title}</Header>
            <div className="desc">{data.header.desc}</div>
            <Button as="a" href="#learn-more" className="read-more-btn" primary>Read more</Button>
          </div>
          <div
            className="video-player-container"
            style={{ ...style.containerStyle, backgroundImage: `url(${WelcomeBoxJpg})` }}
          >
            <Button circular className="raised play-btn"><Image src={playBtnPng} /></Button>
          </div>
        </div>
      </Grid.Row>
    </Grid>
  </section>
)

export default Impact
