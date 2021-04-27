import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'semantic-ui-react'

import financialGraphPng from '../../../assets/images/financial-graph.png'
import './style.less'

const FundAccount = ({ onFund }) => (
  <Card className="fund-account-box">
    <Card.Content>
      <Card.Header>
        Fund your account
      </Card.Header>
      <Card.Description>
        <div className="content">
          <p>
            You need to fund your account to start investing
          </p>
          <Button primary onClick={onFund}>
            Fund your account
          </Button>
        </div>
        <img src={financialGraphPng} alt="financial bg" />
      </Card.Description>
    </Card.Content>
  </Card>
)

FundAccount.propTypes = {
  onFund: PropTypes.func
}

export default FundAccount
