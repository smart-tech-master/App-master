import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import NumberFormat from 'react-number-format'

import { InfoIcon } from '../../assets/icons'
import './FinancialDataBox.style.less'

const FinancialDataBox = ({ layout, value, price }) => (
  <Card className="financial-data-box">
    <Card.Content>
      <Card.Header as="div">
        <div style={{ background: layout.iconBgColor }}>
          <img src={layout.iconUrl} alt="icon" />
        </div>
      </Card.Header>
      <Card.Description>
        <div className="title">
          {price === undefined && (
            <NumberFormat
              displayType="text"
              value={value}
              thousandSeparator=" "
              prefix={layout.valuePrefix}
              suffix={layout.valueSuffix}
            />
          )}
          {price !== undefined && (
            <NumberFormat
              displayType="text"
              value={price > 1000 ? parseInt(price / 1000, 10) : price}
              thousandSeparator=" "
              prefix={layout.valuePrefix}
              suffix={price > 1000 ? 'k' : ''}
            />
          )}
        </div>
        <div className="desc">
          {layout.title}
          <InfoIcon className="details-icon" />
          <div className="info-box-with-arrow">
            {layout.description.replace('{value}', price !== undefined ? price : value)}
          </div>
        </div>
      </Card.Description>
    </Card.Content>
  </Card>
)

FinancialDataBox.propTypes = {
  layout : PropTypes.object,
  value  : PropTypes.number,
  price  : PropTypes.number
}

export default FinancialDataBox
