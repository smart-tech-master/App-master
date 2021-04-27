import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'

const styles = { modalBody: { padding: 40 } }
const initialState = {
  email : '',
  init  : true
}

class View extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  onOk = () => {
    if (this.state.email) {
      this.props.onOk(this.state.email)
      this.setState(initialState)
    } else {
      this.setState({ init: false })
    }
  }

  onCancel = () => {
    this.setState(initialState)
    this.props.onCancel()
  }

  onChangeValue(field) {
    return (event) => {
      this.setState({ [field]: event.target.value })
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your email</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          <Input
            label="Email"
            value={this.state.email}
            onChange={this.onChangeValue('email')}
            margin="normal"
            required
            error={this.state.init === false && this.state.email === ''}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" onClick={this.onOk}> Send </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

View.propTypes = {
  onOk     : PropTypes.func.isRequired,
  onCancel : PropTypes.func.isRequired,
  show     : PropTypes.bool.isRequired,
}

export default View
