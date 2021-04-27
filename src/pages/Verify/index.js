import { connect } from 'react-redux'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { Input, Container, Button } from 'semantic-ui-react'

import { Creators, Types } from '../../redux/actions/auth'
import { LoadingSpinner } from '../../components'
import './styles.less'

class Verify extends Component {
  constructor(props) {
    super(props)
    this.state = { pinCode: '' }
  }

  componentDidMount() {
    if (this.props.auth.user) {
      this.props.changeLocation('/home')
      return
    }
    this.props.checkToken()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.user && this.props.auth.user) {
      this.props.changeLocation('/home')
      return
    }
  }

  onChangeValue(fieldName) {
    return (event) => {
      this.setState({ [fieldName]: event.target.value })
    }
  }

  renderSignInLink() {
    return (
      <Link to="/signin" className="signin-link">
        Sign In
      </Link>
    )
  }

  render() {
    const { status } = this.props.global
    const loadingTypes = [Types.CHECK_TOKEN, Types.VERIFY_EMAIL]
    const { pinCode } = this.state
    return (
      <div className="page-div verify-page">
        <Container className="content-div">
          <Input
            value={pinCode}
            onChange={this.onChangeValue('pinCode')}
            label="Pin code"
            margin="normal"
            required
          />
          <br /><br />
          <Button
            className="right-button"
            variant="contained"
            onClick={() => this.props.verifyEmail(pinCode)}
          >
            Verify
          </Button>
        </Container>
        { this.renderSignInLink() }
        { loadingTypes.map(t => status[t]).includes('request') && <LoadingSpinner /> }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  global : store.global,
  auth   : store.auth,
})

const mapDispatchToProps = {
  ...Creators,
  changeLocation: push
}

Verify.propTypes = {
  global         : PropTypes.object.isRequired,
  auth           : PropTypes.object.isRequired,
  checkToken     : PropTypes.func.isRequired,
  verifyEmail    : PropTypes.func.isRequired,
  changeLocation : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Verify)
