/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Grid, Image, Button } from 'semantic-ui-react'
import { push } from 'react-router-redux'
import { NavLink } from 'react-router-dom'

import { Creators as userCreators } from '../../redux/actions/user'
import { Creators as authCreators } from '../../redux/actions/auth'
import { Creators as glboalCreators } from '../../redux/actions/global'

import Invest from '../Invest'
import QuestionSVG from '-!svg-react-loader!../../assets/images/question.svg'
import logoPng from '../../assets/images/logo_colored.png'
import mobileMenuPng from '../../assets/images/mobile-menu.png'
import mobileCloseMenuPng from '../../assets/images/cross.png'
import { PaperPlaneIcon, StarIcon } from '../../assets/icons'
import './header.less'

const style = {
  noPaddingStyle: {
    padding: 0,
  },
}

class HomeHeader extends React.Component {
  state = {
    mobileMenuOpen: false,
  }

  openMobileMenu = (status) => {
    this.setState({ mobileMenuOpen: status })
  }

  openInvestModal = () => {
    const { showInvestModal } = this.props
    showInvestModal(true)
  }

  openContactUsModal = () => {
    window.Intercom('showNewMessage')
  }

  render() {
    const { global } = this.props
    const { mobileMenuOpen } = this.state
    return (
      <div className="home-header">
        <Grid container>
          <Grid.Row only="computer">
            <Grid.Column>
              <Menu borderless className="desktop-menu-style">
                <NavLink to="/"><Image src={logoPng} className="logo" /></NavLink>
                <Menu.Item position="right" style={style.noPaddingStyle}>
                  <Menu.Item as={NavLink} to="/founders" activeClassName="active">
                    <StarIcon className="star-icon" />
                    Founders space
                  </Menu.Item>
                  <Menu.Item as={NavLink} onClick={this.openContactUsModal} activeClassName="active">
                    <PaperPlaneIcon className="paper-plane-icon" />
                    Contact us
                  </Menu.Item>
                  <NavLink to="/signin">
                    <Button as="a" primary basic className="investBtnStyle login-btn">
                      Log in
                    </Button>
                  </NavLink>
                  <NavLink to="/signup">
                    <Button as="a" primary className="investBtnStyle">
                      Invest now
                    </Button>
                  </NavLink>
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only="mobile tablet" className={mobileMenuOpen ? 'mobile-navbar open' : 'mobile-navbar'}>
            <Grid.Column width={16}>
              <Menu borderless className="mobile-navmenu">
                <Menu.Item header as={NavLink} to="/">
                  <Image src={logoPng} style={{ width: 130 }} />
                </Menu.Item>
                <Menu.Item position="right" style={style.noPaddingStyle}>
                  <Menu.Item as="a" onClick={() => this.openMobileMenu(!mobileMenuOpen)}>
                    {!mobileMenuOpen && <Image src={mobileMenuPng} style={{ width: 36 }} />}
                    {mobileMenuOpen && <Image src={mobileCloseMenuPng} style={{ width: 36 }} />}
                  </Menu.Item>
                </Menu.Item>
              </Menu>
            </Grid.Column>
            {mobileMenuOpen
              && (
                <Grid.Column width={16} onClick={() => this.openMobileMenu(false)}>
                  <Menu borderless vertical>
                    <Menu.Item style={style.noPaddingStyle}>
                      <Menu.Item as={NavLink} to="/founders" activeClassName="active">
                        <StarIcon className="star-icon" />
                        Founders space
                      </Menu.Item>
                      <Menu.Item as={NavLink} onClick={this.openContactUsModal} activeClassName="active">
                        <PaperPlaneIcon className="paper-plane-icon" />
                        Contact us
                      </Menu.Item>
                      <Menu.Item as="a" href="http://help.fairmint.co/en" target="_blank">
                        <QuestionSVG className="verticalMenuItemSvgStyle" />
                        Help
                      </Menu.Item>
                    </Menu.Item>
                    <Grid.Column width={16}>
                      <NavLink to="/signin">
                        <Button as="a" primary basic className="login-btn">
                          Log in
                        </Button>
                      </NavLink>
                    </Grid.Column>
                    <Grid.Column width={16}>
                      <NavLink to="/signup">
                        <Button as="a" primary className="invest-btn">
                          Invest now
                        </Button>
                      </NavLink>
                    </Grid.Column>
                  </Menu>
                </Grid.Column>
              )}
          </Grid.Row>
          {global.showInvest && (
            <Invest />
          )}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  global : store.global,
  user   : store.user,
})

const mapDispatchToProps = {
  ...authCreators,
  ...userCreators,
  ...glboalCreators,
  changeLocation: push
}

HomeHeader.propTypes = {
  global          : PropTypes.object.isRequired,
  showInvestModal : PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
