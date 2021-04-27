import React from 'react'
import PropTypes from 'prop-types'
import { Card, Feed, Button } from 'semantic-ui-react'
import Truncate from 'react-truncate'

import './style.less'

const TICKER = 'FAIR'

const InvestorList = ({ data, totalInvestors }) => (
  <Card className="card-large-padding investors-list">
    <Card.Content>
      <Card.Header>Investors</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed size="small">
        {data && data.map((item, index) => (
          <Feed.Event as="a" key={index} href={item.url} target="_blank">
            <Feed.Label image={item.picture} />
            <Feed.Content>
              <Feed.Summary>
                {item.name}
              </Feed.Summary>
              <Feed.Date>
                <Truncate lines={1}>
                  {item.bio}
                </Truncate>
              </Feed.Date>
            </Feed.Content>
          </Feed.Event>
        ))}
        {(totalInvestors || totalInvestors > 5) && (
          <Feed.Event>
            <Feed.Label>
              <Button primary circular>+{ totalInvestors - 5 }</Button>
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                {TICKER} Investors
              </Feed.Summary>
              <Feed.Date content="Join them ..." />
            </Feed.Content>
          </Feed.Event>
        )}
      </Feed>
    </Card.Content>
  </Card>
)

InvestorList.propTypes = {
  data           : PropTypes.array,
  totalInvestors : PropTypes.number
}

export default InvestorList
