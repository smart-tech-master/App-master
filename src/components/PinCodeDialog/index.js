import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input, Card, Checkbox, Button } from 'semantic-ui-react'
import LoadingSpinner from '../LoadingSpinner'
import { CloseIcon } from '../../assets/icons'

import { Creators as globalCreators } from '../../redux/actions/global'
import { Types, Creators as userCreators } from '../../redux/actions/user'
import './style.less'

const initialState = {
  pinCode   : '',
  confirmed : false
}

class PinCodeDialog extends Component {
  state = initialState

  onChangeValue = fieldName => (event) => {
    this.setState({
      [fieldName]: event.target.value
    })
  }

  onChangeConfirmed = () => {
    this.setState(prevState => ({ confirmed: !prevState.confirmed }))
  }

  onCloseDialog = () => {
    this.setState(initialState)
    this.props.setPinCodeDialog(false)
  }

  render() {
    const { status, showPinCodeDialog } = this.props.global
    const { pinCode, confirmed } = this.state
    const loadingTypes = [Types.VERIFY_EMAIL]
    return (
      <>
        <div
          className="pin-code-container"
          style={{ visibility: showPinCodeDialog ? 'visible' : 'hidden' }}
          onClick={this.onCloseDialog}
        >
          <Card
            className="pin-code-card"
            as="div"
            onClick={e => e.stopPropagation()}
          >
            <Card.Content>
              <Card.Header>
                Check your e-mail and secure account
                <CloseIcon
                  className="close-icon"
                  onClick={this.onCloseDialog}
                />
              </Card.Header>
              <Card.Description className="description-content">
                We sent you a verification code by email. Please check your email and enter it here: &nbsp;
                <Input
                  value={pinCode}
                  onChange={this.onChangeValue('pinCode')}
                  margin="normal"
                  required
                />
              </Card.Description>
              <Card.Description>
                <Checkbox
                  label="I confirm that I did receive my account recovery file by email and that I saved it to be able to recover my account if I were to forget my password."
                  checked={confirmed}
                  onChange={this.onChangeConfirmed}
                />
              </Card.Description>
              <br /> <br />
              <Button
                primary
                fluid
                disabled={!confirmed || !pinCode}
                onClick={() => this.props.verifyEmail(pinCode)}
              >
                Secure my account
              </Button>
            </Card.Content>
          </Card>
        </div>
        { loadingTypes.map(t => status[t]).includes('request') && <LoadingSpinner /> }
      </>
    )
  }
}

const mapStateToProps = store => ({
  global : store.global,
  auth   : store.auth,
  user   : store.user,
})

const mapDispatchToProps = {
  ...globalCreators,
  ...userCreators
}

PinCodeDialog.propTypes = {
  global           : PropTypes.object.isRequired,
  setPinCodeDialog : PropTypes.func.isRequired,
  verifyEmail      : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PinCodeDialog)
