import React from 'react'
import PropTypes from 'prop-types'
import { Image, Card, Feed, Button } from 'semantic-ui-react'

import { MessageIcon } from '../../assets/icons'

const CEOCard = ({ is_investor, onStartChat }) => (
  <Card className="topline">
    <Card.Content>
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
      {!is_investor && (
        <>
          <Card.Header>Dear Hanna!</Card.Header>
          <Card.Description>
            <p>
              Welcome! The entire Fairmint team and I are thrilled to have you here. At Fairmint, we are on a mission to let everyone in the world support and have a stake in the organizations they use & love. We believe it will give millions of people access to wealth building financial products, while providing continuous financing to organizations. I invite you to join us in our mission by investing in Fairmint,
              <br />
              <br />
              Sincerely,
              <br />
              Thibauld!
            </p>
            <p>
              <Button className="discover-fairmint-btn" basic primary>Discover Fairmint</Button>
            </p>
          </Card.Description>
        </>
      )}
      {is_investor && (
        <>
          <div className="message-box arrow-box">
            <div className="header">Dear Hanna!</div>
            <div className="description">Welcome! The entire Fairmint team and I are thrilled to have you here. </div>
          </div>
          <div className="message-box">
            <div className="description">
              At Fairmint, we are on a mission to let everyone in the world support and have a stake in the organizations they use. This place has been designed for you. Learn how it works and what you can do.We believe that all stakeholders (employees, users, customers, contributors, contractors, suppliers...)
            </div>
          </div>
          <p>
            <Button className="lets-chat-btn" primary onClick={onStartChat}>
              <span>Let’s chat</span>
              <MessageIcon className="message-btn" />
            </Button>
          </p>
        </>
      )}
    </Card.Content>
  </Card>
)

CEOCard.propTypes = {
  is_investor : PropTypes.bool,
  onStartChat : PropTypes.func
}

export default CEOCard
