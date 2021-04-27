import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid } from 'semantic-ui-react'
import Truncate from 'react-truncate'

import { LinkIcon } from '../../assets/icons'
import './OurStory.style.less'

const OurStory = ({ data: { text, links }, isFullRead, readMoreClicked }) => (
  <Card className="card-large-padding">
    <Card.Content>
      <Card.Header>Our Story</Card.Header>
    </Card.Content>
    <Card.Content className="our-story">
      <Grid>
        <Grid.Row only="computer">
          <Card.Description dangerouslySetInnerHTML={{ __html: text }} />
        </Grid.Row>
        <Grid.Row only="mobile">
          {!isFullRead && (
            <>
              <Card.Description as={Truncate} lines={8}>
                <Card.Description dangerouslySetInnerHTML={{ __html: text }} />
              </Card.Description>
              <span className="read-more-btn" onClick={readMoreClicked}>Read More</span>
            </>
          )}
          {isFullRead && (
            <>
              <Card.Description dangerouslySetInnerHTML={{ __html: text }} />
              <span className="read-more-btn" onClick={readMoreClicked}>Less</span>
            </>
          )}
        </Grid.Row>
        <Grid.Row className="links-row">
          {links.map((link, index) => (
            <Grid.Column mobile={16} computer={8} key={index}>
              <a href={link.url} className="our-story-link">
                <LinkIcon className="link-icon" color="#00d1c1" />
                <span>{link.title}</span>
              </a>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Card.Content>
  </Card>
)

OurStory.propTypes = {
  data            : PropTypes.object,
  isFullRead      : PropTypes.bool,
  readMoreClicked : PropTypes.func
}

export default OurStory
