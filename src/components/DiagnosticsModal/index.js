import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Grid } from 'semantic-ui-react'

import { Creators as globalCreators } from '../../redux/actions/global'
import config from '../../config'
import LoadingSpinner from '../LoadingSpinner'
import './style.less'

class DiagnosticsModal extends Component {
  hideDiagnosticsModal = () => {
    const { showDiagnosticsModal } = this.props
    showDiagnosticsModal(false)
  }

  render() {
    const { contracts } = window
    const { user: { data, account } } = this.props
    return (
      <div className="page-div diagnostics-page" onClick={this.hideDiagnosticsModal}>
        <Card as="div" className="diagnostics-card" onClick={e => e.stopPropagation()}>
          { data && account && (
            <>
              <Card.Content>
                <Card.Header>Diagnostics</Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid>
                  <Grid.Row>
                    <Grid.Column mobile={16} computer={8}>
                      <span className="key">First name:</span>
                      <span className="value">{ data.firstname }</span>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                      <span className="key">Last name:</span>
                      <span className="value">{ data.lastname }</span>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={16}>
                      <span className="key">Email:</span>
                      <span className="value">{ data.email }</span>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={16}>
                      <span className="key">Wallet Address:</span>
                      <a href={`https://etherscan.io/address/${data.userId}`} target="_blank" className="value">{ data.userId }</a>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={16}>
                      <span className="key">Verified email:</span>
                      <span className="value">{ data.verified_email ? 'Yes' : 'No' }</span>
                    </Grid.Column>
                    <Grid.Column mobile={8} computer={16}>
                      <span className="key">KYC:</span>
                      <span className="value">{account.kycApproved ? 'Yes' : 'No'}</span>
                    </Grid.Column>
                    <Grid.Column mobile={8} computer={16}>
                      <span className="key">Approved:</span>
                      <span className="value">{ !account.allowance.eq(0) ? 'Yes' : 'No' }</span>
                    </Grid.Column>
                    <Grid.Column mobile={8} computer={16}>
                      <span className="key">Environment:</span>
                      <span className="value">{ config.sentence.split(',')[0] }</span>
                    </Grid.Column>
                    <Grid.Column mobile={8} computer={16}>
                      <span className="key">Currency:</span>
                      <span className="value">{ config.sentence.split(',')[1] }</span>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={16}>
                      <span className="key">Balance:</span>
                      <div className="value">
                        <span>{ account.fairBalance.toFixed(2) } { contracts.data.symbol }</span>,&nbsp;&nbsp;
                        <span>{ account.currencyBalance.toFixed(2) } { contracts.data.currency.symbol }</span>,&nbsp;&nbsp;
                        <span>{ account.ethBalance.toFixed(2) } ETH</span>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </>
          )}
        </Card>
        { !data && !account && <LoadingSpinner /> }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  global : store.global,
  user   : store.user
})

const mapDispatchToProps = {
  ...globalCreators
}

DiagnosticsModal.propTypes = {
  showDiagnosticsModal : PropTypes.func,
  user                 : PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticsModal)
