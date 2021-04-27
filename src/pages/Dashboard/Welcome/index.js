/* eslint-disable no-return-assign */
/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { Button, Card, Feed, Image } from 'semantic-ui-react'

import Welcome2Png from '../../../assets/images/welcome-2.png'
import Welcome3Png from '../../../assets/images/welcome-3-fg.png'
import './style.less'

const Welcome = ({ onClose, firstname }) => {
  const settings = {
    dots           : true,
    infinite       : false,
    speed          : 500,
    slidesToShow   : 1,
    slidesToScroll : 1,
    arrows         : false,
    swipeToSlide   : false,
  }
  const [index, setIndex] = useState(0)
  let slider
  const next = () => {
    slider.slickNext()
    setIndex(index + 1)
  }

  return (
    <div className="welcome-modal">
      <div className="slider-container">
        <Slider {...settings} ref={c => (slider = c)}>
          <Card className="welcome-1">
            <Card.Content>
              <Card.Header>
                We're happy to meet you
              </Card.Header>
              <Feed size="large">
                <Feed.Event>
                  <Feed.Label>
                    <Image src="https://i.ibb.co/zP5FdJF/Ellipse.png" size="large" />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      Thibauld
                    </Feed.Summary>
                    <Feed.Date content="CEO @ Fairmint" />
                  </Feed.Content>
                </Feed.Event>
              </Feed>
              <Card.Header>{ firstname ? `Dear ${firstname.trim()}!` : 'Hi there!' }</Card.Header>
              <Card.Description>
                <p>
                  Welcome! The entire Fairmint team and I are thrilled to have you here. At Fairmint, we are on a mission to let everyone in the world support and have a stake in the organizations they use & love. We believe it will give millions of people access to wealth building financial products, while providing continuous financing to organizations. I invite you to join us in our mission by investing in Fairmint,
                  <br />
                  <br />
                  Sincerely,
                  <br />
                  Thibauld!
                </p>
              </Card.Description>
            </Card.Content>
          </Card>
          <div className="welcome-2">
            <Image src={Welcome2Png} className="welcome2-bg" />
            <div className="welcome2-txt">
              Discover <b>Fairmint's mission</b> and how the entire team works hard <b>to revolutionize financing</b> by giving anyone the opportunity <b>to invest in their favorite companies</b>
            </div>
          </div>
          <div className="welcome-3">
            <Image src={Welcome3Png} className="welcome3-bg" />
            <div className="welcome3-txt">
              Get <b>objective financial data</b> and consult the <b>company's Trust Score</b> to wisely invest, in a few clicks.
            </div>
          </div>
        </Slider>
        <div className="controls">
          {index !== 2 && (
            <div className="next-btn" onClick={next}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <circle cx="28" cy="28" r="28" fill="#F5F7FA" />
                  <path opacity="0.5" d="M24.3135 39.6274L35.6272 28.3137L24.3135 17" stroke="#8AAAFF" strokeWidth="3" strokeLinecap="round" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="56" height="56" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}
          {index === 2 && (
            <Button primary onClick={onClose}>
              Get started
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

Welcome.propTypes = {
  onClose   : PropTypes.func,
  firstname : PropTypes.string,
}

export default Welcome
