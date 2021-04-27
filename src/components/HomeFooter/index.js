import React from 'react'
import { Grid, Image, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import './style.less'
import { HeartIcon, SunflowerIcon, TwitterIcon, LinkedinIcon, PaperPlaneIcon, QuestionIcon } from '../../assets/icons'
import WhiteLogo from '../../assets/images/logo_white.png'

const HomeFooter = () => (
  <div className="footer">
    <Grid container>
      <Grid.Row>
        <div>
          <Image src={WhiteLogo} className="logo" />
        </div>
        <div>
          <Menu borderless>
            <Menu.Item as={NavLink} to="/">
              Press
            </Menu.Item>
            <Menu.Item as={NavLink} to="/">
              Careers
            </Menu.Item>
            <Menu.Item as={NavLink} to="/">
              Legal
            </Menu.Item>
            <Menu.Item as={NavLink} to="/">
              <PaperPlaneIcon className="paper-plane-icon" />
              Contact us
            </Menu.Item>
            <Menu.Item as="a" href="http://help.fairmint.co/en" target="_blank">
              <QuestionIcon className="question-icon" />
              Help
            </Menu.Item>
          </Menu>
        </div>
        <div className="social-icons">
          <Menu.Item as={NavLink} to="/help" activeClassName="active">
            <TwitterIcon />
          </Menu.Item>
          <Menu.Item as={NavLink} to="/help" activeClassName="active">
            <LinkedinIcon />
          </Menu.Item>
        </div>
      </Grid.Row>
    </Grid>
    <div className="desc">
      <span>Made with</span>
      <HeartIcon className="heart-icon" />
      <span>by founders for founders under the sun of California <SunflowerIcon className="sunflower-icon" /></span>
    </div>
  </div>
)

export default HomeFooter
