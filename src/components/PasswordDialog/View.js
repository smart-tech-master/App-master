import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Header } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'

import { BackArrowIcon } from '../../assets/icons'
import './styles.scss'

const styles = { modalBody: { padding: 40 } }
const initialState = {
  password : '',
  init     : true
}

class View extends Component {
  constructor(props) {
    super(props)
    this.state    = initialState
    this.onOk     = this.onOk.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onOk() {
    if (this.state.password) {
      this.props.onOk(this.state.password)
      this.setState(initialState)
    } else {
      this.setState({ init: false })
    }
  }

  onCancel() {
    this.setState(initialState)
    this.props.onCancel()
  }

  onChangeValue(field) {
    return (event) => {
      this.setState({ [field]: event.target.value })
    }
  }

  render() {
    const { text } = this.props
    return (
      <Modal show={this.props.show} onClick={e => e.stopPropagation()} onHide={this.onCancel} className="password-confirm-modal">
        <Modal.Header closeButton>
          <Header as="div" className="back-icon-header">
            <BackArrowIcon
              className="green-back-icon"
              color="#5D88FD"
            />
          </Header>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <div className="desc">
            { text || 'Please enter your password' }
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              value={this.state.password}
              onChange={this.onChangeValue('password')}
              margin="normal"
              required
              error={this.state.init === false && this.state.password === ''}
            />
          </div>
          <Button primary onClick={this.onOk}> Confirm </Button>
        </Modal.Body>
      </Modal>
    )
  }
}

View.propTypes = {
  onOk     : PropTypes.func.isRequired,
  onCancel : PropTypes.func.isRequired,
  show     : PropTypes.bool.isRequired,
  text     : PropTypes.string
}

export default View
