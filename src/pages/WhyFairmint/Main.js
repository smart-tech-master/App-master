import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Feed, Image } from 'semantic-ui-react'

import playBtnPng from '../../assets/images/play-btn.png'
import WelcomeBoxJpg from '../../assets/images/welcome_box.jpg'
import './Main.style.less'

const style = {
  containerStyle: {
    backgroundRepeat   : 'no-repeat',
    backgroundSize     : 'cover',
    backgroundPosition : 'center'
  }
}

const Main = ({ data, playClicked, showInvestModal }) => (
  <Card className="video-player-card">
    <div
      className="video-player-container"
      style={{ ...style.containerStyle, backgroundImage: `url(${WelcomeBoxJpg})` }}
    >
      {data.video && <Button circular className="raised play-btn" onClick={playClicked}><Image src={playBtnPng} /></Button>}
    </div>
    <Card.Content className="video-player-card-content">
      <Card.Header>“{data.quote}”</Card.Header>
      <Feed size="small">
        <Feed.Event>
          <Feed.Label image={data.picture} />
          <Feed.Content>
            <Feed.Summary>
              {data.name}
            </Feed.Summary>
            <Feed.Date>
              {data.title}
            </Feed.Date>
          </Feed.Content>
        </Feed.Event>
      </Feed>
      <Button className="invest-now-btn" basic primary onClick={showInvestModal}>Invest now</Button>
    </Card.Content>
  </Card>
)

Main.propTypes = {
  data            : PropTypes.object,
  playClicked     : PropTypes.func,
  showInvestModal : PropTypes.func
}

export default Main
