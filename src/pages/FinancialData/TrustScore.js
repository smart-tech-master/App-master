import React from 'react'
import PropTypes from 'prop-types'
import { Card, Accordion, Button } from 'semantic-ui-react'

import { SpeedMeter } from '../../components'

import './TrustScore.style.less'

const panels = [
  {
    key   : 1,
    title : {
      content : 'On time payment for the %',
      icon    : 'question',
    },
    content: {
      content: (
        <span>
          To keep their score at a maximum, organizations have to honor their revenue commitment on-time. Any delay will affect their score negatively.
        </span>
      ),
    },
  },
  {
    key   : 2,
    title : {
      content : 'Investors\' commitments',
      icon    : 'question',
    },
    content: {
      content: (
        <span>
          The more investors a company has, the higher their score and the higher the average amount investment, the higher their score.
        </span>
      ),
    },
  },
  {
    key   : 3,
    title : {
      content : 'Secondary market liquidity depth',
      icon    : 'question',
    },
    content: {
      content: (
        <span>
          The larger the liquidity pool on the secondary market, the less volatile the secondary market is and the higher the company score is.
        </span>
      ),
    },
  },
  {
    key   : 4,
    title : {
      content : 'Maturity of the company',
      icon    : 'question',
    },
    content: {
      content: (
        <span>
          The older the company, the higher its score and the more revenues it generates, the higher its score
        </span>
      ),
    },
  },
  {
    key   : 5,
    title : {
      content : 'Age of the continuous security offering',
      icon    : 'question',
    },
    content: {
      content: (
        <span>
          The older the continuous security offering, the higher the company's score
        </span>
      ),
    },
  },
]

const TrustScore = ({ showInvestModal, value }) => (
  <Card className="card-large-padding trustscore">
    <Card.Content>
      <Card.Header>Trust Score</Card.Header>
    </Card.Content>
    <Card.Content>
      <Card.Description>
        <div className="speedmeter-container">
          <SpeedMeter value={value} />
        </div>
        <Accordion defaultActiveIndex={0} panels={panels} />
        <Button className="invest-now-btn" basic primary onClick={showInvestModal}>Invest now</Button>
      </Card.Description>
    </Card.Content>
  </Card>
)

TrustScore.propTypes = {
  showInvestModal : PropTypes.func,
  value           : PropTypes.number
}

export default TrustScore
