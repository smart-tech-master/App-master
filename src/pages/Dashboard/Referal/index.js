import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Feed, Input, Button } from 'semantic-ui-react'
import Clipboard from 'react-clipboard.js'
import { NotificationManager } from 'react-notifications'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon
} from 'react-share'
import Lottie from 'react-lottie'
import * as giftAnimation from '../../../assets/lotties/9067-gift.json'

import { MessageIcon, CopyIcon, LinkIcon } from '../../../assets/icons'
import './style.less'

class Referal extends Component {
  state = {
    showShareUrl: false,
  }

  showShareUrlModal = (val) => {
    this.setState({ showShareUrl: val })
  }

  shareUrlWithSocialPlatforms = () => {
    this.setState({ showShareUrl: true })
  }

  showSuccessMessage = () => {
    NotificationManager.success('Link copied to clipboard!')
  }

  emailAddressChange = () => {
  }

  sendEmailInvite = () => {
  }

  render() {
    const { shareUrl } = this.props
    const { showShareUrl } = this.state
    const title = 'Share Link'
    return (
      <Card className="card-large-padding referal-tile">
        <Card.Content>
          <Feed>
            <Feed.Event as="div">
              <Feed.Label>
                <Lottie
                  options={
                    {
                      loop             : true,
                      autoplay         : true,
                      animationData    : giftAnimation.default,
                      rendererSettings : {
                        preserveAspectRatio: 'xMidYMid slice'
                      }
                    }
                  }
                  height={104}
                  width={92}
                />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  Invite your friends to Fairmint and earn money
                </Feed.Summary>
                <Feed.Date>
                  Send an invitation to people including your Fairmint registration referral link. If they use your link to sign up, you'll get $100 in credit on your account whenever a friend funds their account with $1000 or more.
                </Feed.Date>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
        <Card.Content className="flex-content">
          <Input
            placeholder="Enter e-mail address here"
            type="email"
            onChange={this.emailAddressChange}
          />
          <Button className="send-invite-btn" primary onClick={this.sendEmailInvite}>
            <MessageIcon className="icon-btn" />
            <span>Send invite</span>
          </Button>
          <span className="joint">or</span>
          <Button
            basic
            primary
            onClick={() => this.showShareUrlModal(true)}
          >
            {showShareUrl && (
              <>
                <div className="arrow-box">
                  <div className="share-btn">
                    <FacebookShareButton
                      url={shareUrl}
                      quote={title}
                    >
                      <FacebookIcon
                        size={32}
                        round
                      />
                    </FacebookShareButton>
                  </div>
                  <div className="share-btn">
                    <TwitterShareButton
                      url={shareUrl}
                      title={title}
                    >
                      <TwitterIcon
                        size={32}
                        round
                      />
                    </TwitterShareButton>
                  </div>
                  <div className="share-btn">
                    <TelegramShareButton
                      url={shareUrl}
                      title={title}
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                  </div>
                  <div className="share-btn">
                    <WhatsappShareButton
                      url={shareUrl}
                      title={title}
                      separator=":: "
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>

                  <div className="share-btn">
                    <LinkedinShareButton
                      url={shareUrl}
                      windowWidth={750}
                      windowHeight={600}
                    >
                      <LinkedinIcon
                        size={32}
                        round
                      />
                    </LinkedinShareButton>
                  </div>
                </div>
                <div className="box-wrapper" onClick={(e) => { e.stopPropagation(); this.showShareUrlModal(false) }} />
              </>
            )}
            <LinkIcon className="icon-btn" color="#00d1c1" />
            <span>Share link</span>
          </Button>
          <Clipboard
            component="div"
            data-clipboard-text={shareUrl}
            onSuccess={this.showSuccessMessage}
          >
            <Button basic primary>
              <CopyIcon className="icon-btn" />
              <span>Copy link</span>
            </Button>
          </Clipboard>
        </Card.Content>
      </Card>
    )
  }
}

Referal.propTypes = {
  shareUrl: PropTypes.string
}

export default Referal
