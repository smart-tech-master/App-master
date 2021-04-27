/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import PropTypes from 'prop-types'
import { Card, Header, Grid } from 'semantic-ui-react'

import EmailPng from '../../../assets/images/email.png'
import MoneyPng from '../../../assets/images/movey.png'
import ProfilePng from '../../../assets/images/profile.png'
import CheckPng from '../../../assets/images/checkmark.png'
import './ProfileCompleteTile.style.less'

const style = {
  investProfileItemStyle: {
    margin       : 0,
    marginBottom : 8
  }
}

class ProfileCompleteTile extends React.Component {
  render() {
    const { email_verified, verified_identity, account_funded } = this.props.status
    return (
      <>
        {!account_funded && (
          <Card className="card-large-padding profile-complete-tile">
            <Card.Content className="link-btn-header">
              <Card.Header>Profile completion tile</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                To invest, you have to complete your profile
                <Grid columns={3} padded="horizontally" style={{ position: 'relative' }}>
                  <Grid.Row>
                    <div className="dash-line" />
                    <Grid.Column mobile={16}>
                      <div className="text-center invest-profile-item">
                        { !email_verified && <img src={EmailPng} width={80} alt="" /> }
                        { email_verified && <img src={CheckPng} width={80} alt="" /> }
                        <div className="content">
                          <Header as="h5" style={style.investProfileItemStyle}>Verify your email</Header>
                          <p>Verify your email address by clicking on the link in the email we sent you during your registration process. If you have not recieved this email. Send a request for to resend e-mail verification</p>
                        </div>
                        <span className="link-btn">{!email_verified ? 'Resend e-mail' : ''}</span>
                      </div>
                    </Grid.Column>
                    <Grid.Column mobile={16}>
                      <div className="text-center invest-profile-item">
                        { !verified_identity && <img src={ProfilePng} width={80} alt="" /> }
                        { email_verified && verified_identity && <img src={CheckPng} width={80} alt="" /> }
                        <div className="content">
                          <Header as="h5" style={style.investProfileItemStyle}>Verify your identity</Header>
                          <p>Anti-money laundering laws require us to make sure that you are who you say you are.</p>
                        </div>
                        <span className={!email_verified ? 'link-btn disabled' : 'link-btn'}>{!verified_identity ? 'Verify identity' : ''}</span>
                      </div>
                    </Grid.Column>
                    <Grid.Column mobile={16}>
                      <div className="text-center invest-profile-item">
                        { !account_funded && <img src={MoneyPng} width={80} alt="" /> }
                        { email_verified && verified_identity && account_funded && <img src={CheckPng} width={80} alt="" /> }
                        <div className="content last">
                          <Header as="h5" style={style.investProfileItemStyle}>Fund your account</Header>
                          <p>To start investing you'll need to fund your account</p>
                        </div>
                        <span className={!verified_identity ? 'link-btn disabled' : 'link-btn'}>{!account_funded ? 'Fund account' : ''}</span>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </>
    )
  }
}

ProfileCompleteTile.propTypes = {
  status: PropTypes.object
}

export default ProfileCompleteTile
