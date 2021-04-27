/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Grid, Image, Button, Dropdown } from 'semantic-ui-react'
import { push } from 'react-router-redux'
import { NavLink } from 'react-router-dom'

import { Creators as userCreators } from '../../redux/actions/user'
import { Creators as authCreators } from '../../redux/actions/auth'
import { Creators as glboalCreators } from '../../redux/actions/global'

import Avatar from '../Avatar'
import Invest from '../Invest'
import DiagnosticsModal from '../DiagnosticsModal'
import DashboardSVG from '-!svg-react-loader!../../assets/images/dashboard.svg'
import FinancialSVG from '-!svg-react-loader!../../assets/images/financial.svg'
import StarSVG from '-!svg-react-loader!../../assets/images/star.svg'
import QuestionSVG from '-!svg-react-loader!../../assets/images/question.svg'
import logoPng from '../../assets/images/logo_colored-preview.svg'
import mobileMenuPng from '../../assets/images/mobile-menu.png'
import mobileCloseMenuPng from '../../assets/images/cross.png'
import './header.less'

const style = {
  investBtnStyle: {
    fontSize   : '1em',
    padding    : '0.8em 2.2em',
    margin     : '0 0.8em',
    fontWeight : 600
  },
  avatarStyle: {
    width     : 45,
    height    : 45,
    margin    : 0,
    boxShadow : '4px 8px 10px rgba(190, 190, 190, 0.118171), 1px 2px 2px #EFEFEF'
  },
  investMobileBtnStyle: {
    fontSize   : '1em',
    padding    : '1em 2.5em',
    margin     : '0 -1em',
    fontWeight : 600,
    width      : 'calc(100% + 2em)'
  },
  desktopMenuStyle: {
    padding: '4px 10px'
  },
  noPaddingStyle: {
    padding: 0,
  },
  verticalMenuItemStyle: {
    display    : 'flex',
    alignItems : 'center',
    width      : '100%',
    padding    : '1em 5px',
    margin     : '1em 0',
    lineHeight : '20px',
    fontSize   : 14
  },
  verticalMenuItemSvgStyle: {
    width       : 20,
    height      : 20,
    marginRight : '0.5em',
  },
}

class AppHeader extends React.Component {
  state = {
    mobileMenuOpen: false,
  }

  openMobileMenu = (status) => {
    this.setState({ mobileMenuOpen: status })
  }

  showInvestModal = () => {
    const { showInvestModal } = this.props
    showInvestModal(true)
  }

  openDiagnosticsModal = () => {
    const { showDiagnosticsModal } = this.props
    showDiagnosticsModal(true)
  }

  render() {
    const { global, user, signOut } = this.props
    const { mobileMenuOpen } = this.state
    return (
      <Grid container className="app-header">
        <Grid.Row only="computer" style={{ marginTop: 10 }}>
          <Grid.Column>
            <Menu borderless style={style.desktopMenuStyle}>
              <Menu.Item as="a" header>
                <Image src={logoPng} style={{ width: 110 }} />
              </Menu.Item>
              <Menu.Item position="right" style={style.noPaddingStyle}>
                <Menu.Item as={NavLink} to="/home" activeclassname="active">
                  <DashboardSVG />
                  Dashboard
                </Menu.Item>
                <Menu.Item as={NavLink} to="/why-fairmint" activeclassname="active">
                  <StarSVG  />
                  Why Fairmint
                </Menu.Item>
                <Menu.Item as={NavLink} to="/financial-data" activeclassname="active">
                  <FinancialSVG  />
                  Financial Data
                </Menu.Item>
                <Menu.Item as="a" href="http://help.fairmint.co/en" target="_blank" activeclassname="active">
                  <QuestionSVG  />
                  Help
                </Menu.Item>
                <Button as="a" primary style={style.investBtnStyle} onClick={this.showInvestModal}>
                  Invest now
                </Button>
                <Menu.Item as="a">
                  {user.data && user.data.firstname && user.data.lastname && (
                    <Dropdown
                      trigger={<Avatar firstName={user.data.firstname} lastName={user.data.lastname} status="online" isNewUser={false} />}
                      floating
                      labeled
                      button
                      icon={null}
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={this.openDiagnosticsModal}>Diagnostics</Dropdown.Item>
                        <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </Menu.Item>
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row only="mobile tablet" className={mobileMenuOpen ? 'mobile-navbar open' : 'mobile-navbar'}>
          <Grid.Column width={16}>
            <Menu borderless className="mobile-navmenu">
              <Menu.Item as="a" header>
                <Image src={logoPng} style={{ width: 140 }} />
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
              <>
                <Grid.Column width={16} onClick={() => this.openMobileMenu(false)}>
                  <Menu borderless vertical>
                    <Menu.Item style={style.noPaddingStyle}>
                      <Menu.Item as={NavLink} to="/home" activeclassname="active" style={style.verticalMenuItemStyle}>
                        <DashboardSVG style={style.verticalMenuItemSvgStyle} />
                        Dashboard
                      </Menu.Item>
                      <Menu.Item as={NavLink} to="/why-fairmint" activeclassname="active" style={style.verticalMenuItemStyle}>
                        <StarSVG style={style.verticalMenuItemSvgStyle} />
                        Why Fairmint
                      </Menu.Item>
                      <Menu.Item as={NavLink} to="/financial-data" activeclassname="active" style={style.verticalMenuItemStyle}>
                        <FinancialSVG style={style.verticalMenuItemSvgStyle} />
                        Financial Data
                      </Menu.Item>
                      <Menu.Item as="a" href="http://help.fairmint.co/en" target="_blank" style={style.verticalMenuItemStyle}>
                        <QuestionSVG style={style.verticalMenuItemSvgStyle} />
                        Help
                      </Menu.Item>
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
                <Grid.Column width={16} className="more-actions-column">
                  <Button as="a" style={style.investMobileBtnStyle} onClick={this.openDiagnosticsModal}>Diagnostics</Button>
                  <Button as="a" basic primary style={style.investMobileBtnStyle} onClick={signOut}>Sign out</Button>
                </Grid.Column>
              </>
            )}
          { user.data && user.data.account_funded && (
            <Grid.Column width={16} style={{ marginTop: 30 }}>
              <Button as="a" primary style={style.investMobileBtnStyle} onClick={this.showInvestModal}>
                Invest now
              </Button>
            </Grid.Column>
          )}
        </Grid.Row>
        {global.showInvest && (
          <Invest />
        )}
        {global.showDiagnostics && (
          <DiagnosticsModal />
        )}
      </Grid>
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

AppHeader.propTypes = {
  global               : PropTypes.object.isRequired,
  user                 : PropTypes.object,
  showDiagnosticsModal : PropTypes.func,
  showInvestModal      : PropTypes.func,
  signOut              : PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
