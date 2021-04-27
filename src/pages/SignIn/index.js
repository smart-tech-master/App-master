import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, Grid, Image, Header, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags'

import { Types, Creators } from '../../redux/actions/auth'
import { LoadingSpinner, ForgotDialog } from '../../components'

import './styles.less'
import LogoWhitePng from '../../assets/images/logo_white.png'
import MoneySvg from '../../assets/images/signup-money.svg'
import RefreshSvg from '../../assets/images/signup-refresh.svg'
import EqualSvg from '../../assets/images/signup-equal.svg'
import logoPng from '../../assets/images/logo_colored.png'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email            : '',
      password         : '',
      showForgotDialog : false,
    }
  }

  componentDidMount() {
    if (this.props.auth.user) {
      this.props.changeLocation('/home')
      return
    }
    this.props.checkToken()
    const animeContainer = document.querySelector('#signin2ndgraff_hype_container')
    window.runAnimation(animeContainer.offsetWidth, animeContainer.offsetHeight)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.user && this.props.auth.user) {
      this.props.changeLocation('/home')
      return
    }
  }

  onChangeValue = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  onClickForgot = () => {
    this.setState({ showForgotDialog: true })
  }

  callForgotPassword = (email) => {
    this.setState({ showForgotDialog: false })
    this.props.forgotPassword(email)
  }

  signIn = () => {
    const { email, password } = this.state
    this.props.signIn(email, password)
  }


  render() {
    const { status } = this.props.global
    const loadingTypes = [Types.CHECK_TOKEN, Types.SIGN_IN, Types.FORGOT_PASSWORD]
    return (
      <>
        <MetaTags>
          <title>Fairmint - Login</title>
        </MetaTags>
        <Grid className="signin-page">
          <Grid.Row>
            <Grid.Column computer={8} only="computer">
              <div className="left-container">
                <div className="content">
                  <Image src={LogoWhitePng} style={{ width: 160 }} className="logo" />
                  <Header as="h2">Invest in Fairmint, the 1st issuance platform for Continuous Securities Offerings.</Header>
                  <p>
                    Private companies can now get financing globally,
                    <br />continuously and compliantly.
                  </p>
                  <Grid container className="features">
                    <Grid.Row>
                      <Grid.Column className="feature">
                        <Image src={MoneySvg} />
                        <span className="title">Financing</span>
                        <span className="desc">Founders receive funds to grow their business</span>
                      </Grid.Column>
                      <Grid.Column className="feature">
                        <Image src={EqualSvg} />
                        <span className="title">Equitable</span>
                        <span className="desc">Stakeholders get an equitable participation</span>
                      </Grid.Column>
                      <Grid.Column className="feature">
                        <Image src={RefreshSvg} />
                        <span className="title">Continuous</span>
                        <span className="desc">Investors can join and invest at anytime</span>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} only="mobile">
              <div className="text-center mobile-signup-header">
                <Image src={logoPng} style={{ width: 160 }} />
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <div className="flex">
                <div className="right-container">
                  <Header as="h3">Sign in</Header>
                  <Form key="step2" autoComplete="off">
                    <Form.Field>
                      <label htmlFor="email">Your e-mail</label>
                      <input
                        id="email"
                        onChange={this.onChangeValue}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        onChange={this.onChangeValue}
                        autoComplete="off"
                      />
                    </Form.Field>
                    <Button
                      type="submit"
                      className="next-btn"
                      primary
                      fluid
                      onClick={this.signIn}
                    >
                      Sign in
                    </Button>
                  </Form>
                  <div className="other-link-container">
                    <div>
                      Don’t have an account? <Link to="/signup">Sign up</Link>
                    </div>
                    <div>
                      <span
                        className="link"
                        onClick={this.onClickForgot}
                      >
                        Forgot password?
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Grid.Column>
            <div id="signin2ndgraff_hype_container" className="HYPE_document" />
          </Grid.Row>
        </Grid>
        { loadingTypes.map(t => status[t]).includes('request') && <LoadingSpinner /> }
        <ForgotDialog
          show={this.state.showForgotDialog}
          onOk={this.callForgotPassword}
          onCancel={() => this.setState({ showForgotDialog: false })}
        />
      </>
    )
  }
}

const mapStateToProps = store => ({
  global   : store.global,
  auth     : store.auth,
  location : store.router.location,
})

const mapDispatchToProps = {
  ...Creators,
  changeLocation: push
}

SignIn.propTypes = {
  global         : PropTypes.object.isRequired,
  auth           : PropTypes.object.isRequired,
  checkToken     : PropTypes.func.isRequired,
  signIn         : PropTypes.func.isRequired,
  forgotPassword : PropTypes.func.isRequired,
  changeLocation : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
