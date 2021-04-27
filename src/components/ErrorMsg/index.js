import React from 'react'
import PropTypes from 'prop-types'

import './style.less'

const ErrorMsg = ({ error }) => (
  <div className="error-msg">
    { error }
  </div>
)

ErrorMsg.propTypes = {
  error: PropTypes.string
}

export default ErrorMsg
