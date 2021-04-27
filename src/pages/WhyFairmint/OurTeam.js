import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Feed } from 'semantic-ui-react'

import './OurTeam.style.less'

const OurTeam = ({ data: { founders, employees } }) => (
  <Card className="card-large-padding">
    <Card.Content>
      <Card.Header>Our Team</Card.Header>
    </Card.Content>
    <Card.Content className="our-team">
      <Grid>
        <Grid.Row>
          {founders.map((item, index) => (
            <Grid.Column width={16} className="founder" key={`founder-${index}`}>
              <Feed size="small">
                <Feed.Event>
                  <Feed.Label image={item.picture} />
                  <Feed.Content>
                    <Feed.Summary>
                      {item.name}
                    </Feed.Summary>
                    <Feed.Date>
                      {item.title}
                    </Feed.Date>
                    <Feed.Date className="quote">
                      {item.bio}
                    </Feed.Date>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Date className="quote">
                  {item.bio}
                </Feed.Date>
              </Feed>
            </Grid.Column>
          ))}
          {employees.map((item, index) => (
            <Grid.Column mobile={16} computer={8} className="employee" key={`employee-${index}`}>
              <Feed size="small">
                <Feed.Event>
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

OurTeam.propTypes = {
  data: PropTypes.object,
}

export default OurTeam
