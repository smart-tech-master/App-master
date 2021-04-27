import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import './style.less'

const Steps = ({ steps, curStep, fillColor }) => (
  <Grid className="step-container">
    <Grid.Row>
      {[...Array(steps)].map((step, index) => (
        <Grid.Column key={index} className="step" style={{ background: curStep >= index ? fillColor : '' }} />
      ))}
    </Grid.Row>
  </Grid>
)

Steps.propTypes = {
  steps     : PropTypes.number,
  curStep   : PropTypes.number,
  fillColor : PropTypes.string
}

export default Steps
