import React from 'react'
import { Image, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import logoPng from '../../assets/images/logo_colored.png'
import CreateSuccessPng from '../../assets/images/create-success.png'
import './Welcome.style.less'

const Welcome = () => (
  <div className="text-center welcome-page">
    <Image src={logoPng} className="logo-image" />
    <Image src={CreateSuccessPng} className="success-image" />
    <Header as="h2">
      Your account has been created!
    </Header>
    <Link to="/">
      <Button
        className="next-btn"
        primary
      >
        Let's get you started with Fairmint
      </Button>
    </Link>
  </div>
)

export default Welcome
