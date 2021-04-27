/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Feed, Image } from 'semantic-ui-react'
import {
  TwitterShareButton
} from 'react-share'
import Lottie from 'react-lottie'
import * as giftAnimation from '../../../assets/lotties/5896-twitter.json'
import PandaSharePng from '../../../assets/images/fairmint-share.png'

import './style.less'

const Referal2 = ({ shareText, hashtags }) => {
  const [isPaused, setPaused] = useState(true)
  const [isStopped, setStopped] = useState(false)
  return (
    <>
      <Card className="card-large-padding referal2-tile">
        <Card.Content>
          <Feed>
            <Feed.Event as="div">
              <Feed.Label>
                <Image src={PandaSharePng} width={100} />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  Spread the word
                </Feed.Summary>
                <Feed.Date>
                  The era of closed fundraising reserved to insiders is coming to end. <br />
                  Help us spread the word to let the world know that a better model has arrived!
                </Feed.Date>
              </Feed.Content>
              <div className="send-invite-btn">
                <div
                  className="wrapper"
                  onMouseOver={() => { setStopped(false); setPaused(false) }}
                  onMouseOut={() => { setPaused(true); setStopped(true) }}
                >
                  <TwitterShareButton
                    url="https://fairmint.co"
                    title={shareText}
                    hashtags={hashtags}
                  >
                    <Lottie
                      options={
                        {
                          loop             : true,
                          autoplay         : false,
                          animationData    : giftAnimation.default,
                          rendererSettings : {
                            preserveAspectRatio: 'xMidYMid slice'
                          }
                        }
                      }
                      isPaused={isPaused}
                      isStopped={isStopped}
                      width="80%"
                      height="auto"
                    />
                  </TwitterShareButton>
                </div>
              </div>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    </>
  )
}

Referal2.propTypes = {
  shareText : PropTypes.string,
  hashtags  : PropTypes.array
}

export default Referal2
