import React from 'react'
import PropTypes from 'prop-types'

import Steps from '../Steps'
import './style.less'

const colorSchema = {
  weak   : '#FF5722',
  normal : '#FFC107',
  good   : '#06D48A',
  strong : '#00D1C1'
}

class PasswordStrengthMeter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      passwordStrength : '',
      score            : 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { password } = nextProps
    // let errorMessage

    const capsCount = (password.match(/[A-Z]/g) || []).length
    const smallCount = (password.match(/[a-z]/g) || []).length
    const numberCount = (password.match(/[0-9]/g) || []).length
    const symbolCount = (password.match(/\W/g) || []).length
    // if (capsCount < 1) {
    //   errorMessage = 'Please add capitalized characters'
    // } else if (smallCount < 1) {
    //   errorMessage = 'Must contain lowercase characters'
    // } else if (numberCount < 1) {
    //   errorMessage = 'Please add numbers'
    // } else if (symbolCount < 1) {
    //   errorMessage = 'Please add special characters'
    // }
    let score = 1
    let passwordStrength

    if (password.length < 8) score += 1
    if (password.length >= 8) score += 1
    if (password.length >= 10) score += 1
    if (capsCount === 1) score += 1
    if (capsCount > 1) score += 2
    if (numberCount === 1) score += 1
    if (numberCount > 1) score += 2
    if (symbolCount === 1) score += 1
    if (symbolCount > 1) score += 2
    if (smallCount >= 1) score += 1

    switch (score) {
    case 0:
    case 1:
    case 2:
    case 3:
      passwordStrength = 'weak'
      break
    case 4:
    case 5:
      passwordStrength = 'normal'
      break
    case 6:
    case 7:
      passwordStrength = 'good'
      break
    case 8:
      passwordStrength = 'strong'
      break
    default:
      passwordStrength = 'strong'
    }
    this.setState({
      passwordStrength,
      score
    })
  }

  render() {
    const { score, passwordStrength } = this.state
    this.props.onStrengthChange(passwordStrength)
    return (
      <div>
        <Steps curStep={score} steps={9} fillColor={colorSchema[passwordStrength]} />
      </div>
    )
  }
}

PasswordStrengthMeter.propTypes = {
  password         : PropTypes.string,
  onStrengthChange : PropTypes.func
}

export default PasswordStrengthMeter
