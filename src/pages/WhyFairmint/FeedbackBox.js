import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Feed, Image } from 'semantic-ui-react'

import QuotePng from '../../assets/images/quote-black.png'
import './FeedbackBox.style.less'

const FeedbackBox = ({ data }) => (
  <Card className="card-large-padding feedback-list">
    <Card.Content>
      <Card.Header>What people are saying</Card.Header>
    </Card.Content>
    <Card.Content>
      <Grid>
        <Grid.Row>
          {data.map((item, index) => (
            <Grid.Column width={16} className="feedback-item" key={`founder-${index}`}>
              <div className="quote">
                <Image src={QuotePng} className="double-quote-icon" />{item.quote}
              </div>
              <Feed size="small">
                <Feed.Event as="a" href={item.url} target="_blank">
                  <Feed.Label image={item.picture} />
                  <Feed.Content>
                    <Feed.Summary>
                      {item.name}
                    </Feed.Summary>
                    <Feed.Date>
                      {item.title}
                    </Feed.Date>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Card.Content>
  </Card>
)

FeedbackBox.propTypes = {
  data: PropTypes.array,
}

export default FeedbackBox
