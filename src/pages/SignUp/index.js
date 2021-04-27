import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Header, Image } from 'semantic-ui-react'
import ReactGA from 'react-ga'
import { push } from 'react-router-redux'
import MetaTags from 'react-meta-tags'

import { Steps, LoadingSpinner } from '../../components'
import { Creators, Types } from '../../redux/actions/auth'
import { Creators as globalCreators } from '../../redux/actions/global'

import LogoWhitePng from '../../assets/images/logo_white.png'
import logoPng from '../../assets/images/logo_colored.png'
import MoneySvg from '../../assets/images/signup-money.svg'
import RefreshSvg from '../../assets/images/signup-refresh.svg'
import EqualSvg from '../../assets/images/signup-equal.svg'

import Step1Form from './Step1Form'
import Step2Form from './Step2Form'
import { runSignUpStartAnim, runSignUpWaitAnimation, runReviewAnimation, runWalletCreateAnimation, removeAnimation } from './animations'
import WelcomePage from './Welcome'
import StepsShowAnimeSection from './StepsShowAnimeSection'
import './styles.less'
import './steps.animation.style.less'

const isMobile = require('is-mobile')

const stepsData = [
  {
    title : 'Step1',
    desc  : 'Creating your account'
  },
  {
    title : 'Step2',
    desc  : 'Preparing your portfolio'
  },
  {
    title : 'Step3',
    desc  : 'Sending your security code'
  },
]

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step             : 0,
      showCompanyName  : false,
      form             : {},
      passwordStrength : 'weak',
      errors           : {},
      showError        : false,
      validated        : [{
        firstName   : undefined,
        lastName    : undefined,
        companyName : undefined
      }, {
        email           : undefined,
        password        : undefined,
        confirmPassword : undefined,
        termsAndConds   : undefined
      }]
    }
  }

  componentDidMount() {
    if (this.props.auth.user) {
      this.props.changeLocation('/home')
      return
    }
    this.props.checkToken()
    this.props.resetState()
    if (!isMobile()) {
      const animeContainer = document.querySelector('#signin2ndgraff_hype_container')
      window.runAnimation(animeContainer.offsetWidth, animeContainer.offsetHeight)
    }
  }

  componentDidUpdate(prevProps) {
    const { global: { status }, createWallet, changeLocation, resetState } = this.props
    const { global: { status: prevStatus } } = prevProps

    if (status[Types.CHECK_TOKEN] !== prevStatus[Types.CHECK_TOKEN]) {
      if (status[Types.CHECK_TOKEN] === 'success') {
        changeLocation('/home')
        return
      }
    }

    if (status[Types.SIGN_UP] !== prevStatus[Types.SIGN_UP]) {
      if (status[Types.SIGN_UP] === 'failure') {
        resetState()
        removeAnimation()
        this.reInitSteps()
      }
      if (status[Types.SIGN_UP] === 'success') {
        let minDuration = 0
        if (!isMobile()) {
          minDuration = 3800
          runWalletCreateAnimation(() => true)
        }
        const { form } = this.state
        const companyName = form.companyName ? form.companyName : null
        createWallet(
          minDuration,
          form.firstName, form.lastName, companyName, form.email, form.password
        )
      }
    }

    if (status[Types.CREATE_WALLET] !== prevStatus[Types.CREATE_WALLET]) {
      if (status[Types.CREATE_WALLET] === 'failure') {
        resetState()
        removeAnimation()
        this.reInitSteps()
      }
      if (status[Types.CREATE_WALLET] === 'success') {
        if (isMobile()) {
          changeLocation('/home')
        } else {
          runReviewAnimation(
            () => changeLocation('/home')
          )
        }
      }
    }
  }

  reInitSteps = () => {
    this.setState({
      step             : 0,
      showCompanyName  : false,
      form             : {},
      passwordStrength : 'weak',
      errors           : {},
      showError        : false,
      validated        : [{
        firstName   : undefined,
        lastName    : undefined,
        companyName : undefined
      }, {
        email           : undefined,
        password        : undefined,
        confirmPassword : undefined,
        termsAndConds   : undefined
      }]
    })
  }

  onChangeValue = (event) => {
    const { form, showCompanyName } = this.state
    form[event.target.id] =  event.target.value
    this.checkValidation(form, showCompanyName)
  }

  onChangeTermsSatus = () => {
    const { showCompanyName, form } = this.state
    form.termsAndConds = !form.termsAndConds
    this.checkValidation(form, !showCompanyName)
  }

  onPasswordStrengthChange = (strength) => {
    this.setState({
      passwordStrength: strength,
    })
  }

  onInputBlur = () => {
    this.setState({ showError: true })
  }

  onShowCompanyName = () => {
    const { showCompanyName, form } = this.state
    this.setState({ showCompanyName: !showCompanyName })
    this.checkValidation(form, !showCompanyName)
  }

  checkValidation = (form, showCompanyName) => {
    const { validated, step, passwordStrength } = this.state
    const errors = {}
    switch (step) {
    case 0:
      Object.keys(validated[step]).forEach((key) => {
        if (key === 'companyName') {
          if (showCompanyName && !form.companyName) {
            validated[step][key] = undefined
          } else {
            validated[step][key] = true
          }
        } else if (!form[key]) {
          validated[step][key] = undefined
        } else {
          validated[step][key] = true
        }
      })
      break
    case 1:
      Object.keys(validated[step]).forEach((key) => {
        if (!form[key]) {
          validated[step][key] = undefined
        } else {
          validated[step][key] = true
          if (key === 'email') {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            validated[step][key] = re.test(String(form[key]).toLowerCase()) ? true : undefined
            if (!validated[step][key]) errors.email = '* This email is invalid'
          }
          if (key === 'confirmPassword' && form[key] !== form.password) {
            validated[step][key] = undefined
            if (!validated[step][key]) errors.confirmPassword = 'The Passwords don\'t match'
          }
          if (key === 'password' && passwordStrength === 'weak') {
            validated[step][key] = undefined
          }
        }
      })
      break
    default:
    }
    this.setState({ validated, errors, form, showError: false })
  }

  moveNextStep = () => {
    const { step } = this.state
    this.setState({ step: step + 1 })

    if (step === 0) {
      ReactGA.modalview('/signup/name')
    } else {
      ReactGA.modalview('/signup/wallet')
    }
  }

  signUp = () => {
    const { form } = this.state
    const companyName = form.companyName ? form.companyName : null

    let minDuration = 0
    if (!isMobile()) {
      minDuration = 5200
      runSignUpStartAnim(
        () => runSignUpWaitAnimation()
      )
    }
    this.props.signUp(
      minDuration,
      form.firstName, form.lastName, companyName, form.email, form.password
    )
  }

  render() {
    const { global } = this.props
    const { step, showCompanyName, validated, form, errors, showError } = this.state
    const loadingTypes = [Types.CHECK_TOKEN, Types.SIGN_UP, Types.CREATE_WALLET]
    return (
      <>
        <MetaTags>
          <title>Fairmint - Signup</title>
        </MetaTags>
        <div className="page-div signup-page">
          <Grid className="signup-page">
            { loadingTypes.map(t => global.status[t]).includes('request') && <LoadingSpinner /> }
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
                    <Header as="h3">Create your investor account</Header>
                    <Steps curStep={step} steps={2} fillColor="#FFC107" />
                    {step === 0 && (
                      <Step1Form
                        showCompanyName={showCompanyName}
                        validated={validated}
                        onShowCompanyName={this.onShowCompanyName}
                        moveNextStep={this.moveNextStep}
                        onChangeValue={this.onChangeValue}
                      />
                    )}
                    {step === 1 && (
                      <Step2Form
                        showError={showError}
                        errors={errors}
                        validated={validated}
                        form={form}
                        signUp={this.signUp}
                        onPasswordStrengthChange={this.onPasswordStrengthChange}
                        onChangeTermsSatus={this.onChangeTermsSatus}
                        onChangeValue={this.onChangeValue}
                        onInputBlur={this.onInputBlur}
                      />
                    )}
                  </div>
                </div>
              </Grid.Column>
              <div id="signin2ndgraff_hype_container" className="HYPE_document" />
            </Grid.Row>
          </Grid>
          {isMobile() && global.status[Types.SIGN_UP] === 'request' && global.status[Types.CREATE_WALLET] === 'request' && (
            <LoadingSpinner />
          )}
          <div className="steps-desc-page">
            <StepsShowAnimeSection data={stepsData} />
            <div className="success">
              <WelcomePage />
            </div>
          </div>
        </div>
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
  ...globalCreators,
  changeLocation: push
}

SignUp.propTypes = {
  global         : PropTypes.object.isRequired,
  auth           : PropTypes.object.isRequired,
  checkToken     : PropTypes.func.isRequired,
  signUp         : PropTypes.func.isRequired,
  createWallet   : PropTypes.func.isRequired,
  changeLocation : PropTypes.func.isRequired,
  resetState     : PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
