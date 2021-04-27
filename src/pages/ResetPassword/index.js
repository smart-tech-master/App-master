import { connect } from 'react-redux'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Input, Button, Container } from 'semantic-ui-react'
import jsQR from 'jsqr'
import { NotificationManager } from 'react-notifications'
import MetaTags from 'react-meta-tags'

import { Creators, Types } from '../../redux/actions/auth'
import { LoadingSpinner } from '../../components'
import whitePng from './white.png'
import './styles.less'

const canvasSize = 1000

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password        : '',
      confirmPassword : '',
      imageFile       : null,
    }
  }

  onChangeValue(fieldName) {
    return (event) => {
      this.setState({ [fieldName]: event.target.value })
    }
  }

  onClickReset = () => {
    const { password, confirmPassword } = this.state
    if (!password) {
      NotificationManager.error('Password cannot be empty!', 'Error')
      return
    }
    if (password !== confirmPassword) {
      NotificationManager.error('Please check your password again!', 'Error')
      return
    }

    // Get QR code
    const context = this.canvas.getContext('2d')

    context.drawImage(this.whiteImage, 0, 0, canvasSize, canvasSize)
    context.drawImage(this.image, 0, 0, canvasSize, canvasSize)
    const imageData = context.getImageData(0, 0, canvasSize, canvasSize)

    const code = jsQR(imageData.data, imageData.width, imageData.height)
    if (!code) {
      NotificationManager.error('Please upload valid recover kit!', 'Error')
      return
    }

    // dispatch action
    this.props.resetPassword(
      this.props.match.params.emailToken,
      password,
      code.data
    )
  }

  fileChange = (event) => {
    const imageFile = event.target.files[0]
      ? window.URL.createObjectURL(event.target.files[0])
      : null
    this.setState({ imageFile })
  }

  renderSignInLink() {
    return (
      <Link to="/signin" className="signin-link">
        Sign In
      </Link>
    )
  }

  renderBody() {
    if (this.props.global.status[Types.RESET_PASSWORD] === 'success') {
      return null
    }
    const { password, confirmPassword } = this.state

    return (
      <div className="content-div">
        <Input
          value={password}
          onChange={this.onChangeValue('password')}
          label="Password"
          type="password"
          margin="normal"
          required
        />
        <br />
        <Input
          value={confirmPassword}
          onChange={this.onChangeValue('confirmPassword')}
          label="Confirm"
          type="password"
          margin="normal"
          required
        />
        <Input
          type="file"
          onChange={this.fileChange}
        />
        <img
          className="original-img"
          src={this.state.imageFile}
          ref={(el) => { this.image = el }}
          alt=""
        />
        <canvas
          className="invisible-el"
          width={canvasSize}
          height={canvasSize}
          ref={(el) => { this.canvas = el }}
        />
        <img
          className="invisible-el"
          src={whitePng}
          ref={(el) => { this.whiteImage = el }}
          alt=""
        />
        <br />
        <Button
          className="right-button"
          variant="contained"
          onClick={this.onClickReset}
        >
          Reset
        </Button>
      </div>
    )
  }

  renderConfirm() {
    if (this.props.global.status[Types.RESET_PASSWORD] !== 'success') {
      return null
    }

    return (
      <Container className="content-div">
        Your password has been changed!
      </Container>
    )
  }

  render() {
    const { status } = this.props.global
    const loadingTypes = [Types.RESET_PASSWORD]
    return (
      <>
        <MetaTags>
          <title>Fairmint - Reset password</title>
        </MetaTags>
        <div className="page-div reset-password-page">
          { this.renderConfirm() }
          { this.renderBody() }
          { this.renderSignInLink() }
          { loadingTypes.map(t => status[t]).includes('request') && <LoadingSpinner /> }
        </div>
      </>
    )
  }
}

const mapStateToProps = store => ({
  global: store.global,
})

const mapDispatchToProps = {
  ...Creators,
}

ResetPassword.propTypes = {
  global        : PropTypes.object.isRequired,
  match         : PropTypes.object.isRequired,
  resetPassword : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
