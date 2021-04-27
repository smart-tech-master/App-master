import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import BerbixVerify from 'berbix-react'

import { Types, Creators } from '../../../redux/actions/user'
import './styles.less'
import config from '../../../config'

class BerbixKYC extends Component {
  constructor(props) {
    super(props)
    this.state = { showBerbixModal: false }
  }

  componentDidMount() {
    this.props.getBerbixStatus()
  }

  onCompleteBerbix = () => {
    this.setState({ showBerbixModal: false })
    this.props.setBerbixCompleted()
  }

  renderBerbixResult(transactionData) {
    return (
      <div>
        result: { transactionData.action }
      </div>
    )
  }

  renderBerbixButton() {
    return (
      <div>
        <Button variant="contained" onClick={() => this.setState({ showBerbixModal: true })}>
          Start
        </Button>
      </div>
    )
  }

  renderContent() {
    const { transactionData, clientToken } = this.props.user.berbix
    if (transactionData) {
      return this.renderBerbixResult(transactionData)
    }
    if (this.props.global.status[Types.SET_BERBIX_COMPLETED]) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    if (clientToken) {
      return this.renderBerbixButton()
    }
    return (
      <div>
        Loading...
      </div>
    )
  }

  render() {
    return (
      <div className="berbix-kyc">
        <h3> Berbix </h3>
        { this.renderContent() }
        <div
          className="modal-background-div"
          style={{ visibility: this.state.showBerbixModal ? 'visible' : 'hidden' }}
          onClick={() => this.setState({ showBerbixModal: false })}
        >
          <div
            className="modal-div"
            onClick={e => e.stopPropagation()}
          >
            <BerbixVerify
              clientId={config.berbix.clientId}
              clientToken={this.props.user.berbix.clientToken}
              onComplete={this.onCompleteBerbix}
            />
          </div>
        </div>
        {/* <Modal show={this.state.showBerbixModal} onHide={() => this.setState({ showBerbixModal: false })}>
        </Modal> */}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  global : store.global,
  auth   : store.auth,
  user   : store.user,
})

const mapDispatchToProps = {
  ...Creators,
}

BerbixKYC.propTypes = {
  global             : PropTypes.object.isRequired,
  user               : PropTypes.object.isRequired,
  getBerbixStatus    : PropTypes.func.isRequired,
  setBerbixCompleted : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(BerbixKYC)
