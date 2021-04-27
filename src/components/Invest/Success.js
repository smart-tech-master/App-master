import React from 'react'
import PropTypes from 'prop-types'
import { Image, Header, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import NumberFormat from 'react-number-format'

import { CloseIcon } from '../../assets/icons'
import CreateSuccessPng from '../../assets/images/create-success.png'
import './Success.style.less'

const Success = ({ onCloseClick, fairEstimate }) => (
  <div className="text-center invest-success-page">
    <span onClick={onCloseClick}><CloseIcon className="close-icon" /></span>
    <Image src={CreateSuccessPng} className="success-image" />
    <Header as="h2">
      Purchase successful!
    </Header>
    <p className="price">
      <NumberFormat
        value={fairEstimate}
        displayType="text"
        thousandSeparator
        fixedDecimalScale
        decimalScale={4}
        suffix=" Fair"
      />
    </p>
    <p className="desc">
      Congratulations, your FAIR will be delivered to your Portfolio immediately.
    </p>
    <NavLink to="/home">
      <Button primary onClick={onCloseClick}>
        Go to dashboard
      </Button>
    </NavLink>
  </div>
)

Success.propTypes = {
  onCloseClick : PropTypes.func,
  fairEstimate : PropTypes.string
}

export default Success
