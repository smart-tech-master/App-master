import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'
import NumberFormat from 'react-number-format'

import './style.less'

const PageIndicator = ({ pageName, fairPrice }) => (
  <>
    <Grid.Row className="pageindicator">
      <div>
        <div className="header-with-dash">
          <div className="dash" />
          <Header as="h2">{pageName}</Header>
        </div>
      </div>
      <div className="right">
        <div className="badge" style={{ backgroundColor: 'rgba(59, 232, 218, 0.4)' }}>
          <div className="badge-inner" style={{ backgroundColor: '#00D1c1' }} />
        </div>
        <span>Live FAIR price:&nbsp;</span>
        <NumberFormat
          className="price"
          displayType="text"
          value={fairPrice}
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          prefix="$"
        />
      </div>
    </Grid.Row>
  </>
)

PageIndicator.propTypes = {
  pageName  : PropTypes.string,
  fairPrice : PropTypes.string
}

export default PageIndicator
