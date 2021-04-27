import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Message, Button, Image } from 'semantic-ui-react'
import { InfoOIcon } from '../../assets/icons'

import './style.less'
import WhiteCrossPng from '../../assets/images/cross-white.png'

const NotificationMessage = ({ header, content, list, type, detailsLink, confirmBtn, icon, showClose }) => {
  const [close, setClose] = useState(false)

  return (
    <Message
      info={type === 'info'}
      error={type === 'failure'}
      success={type === 'success'}
      hidden={close}
      className="notify-message-box"
    >
      <div className="main">
        <div className="header">
          {icon && <InfoOIcon className="details-icon" />}
          <span>{header}</span>
        </div>
        {content && (
          <div className="content">
            {content}
          </div>
        )}
        {list && (
          <ul className="list">
            {list.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
        )}
        {detailsLink && (
          <a href={detailsLink} className="details-link">Details</a>
        )}
      </div>
      {confirmBtn && (
        <div className="confirm-btn-container">
          <Button onClick={confirmBtn.onClick} primary basic>
            {confirmBtn.title}
          </Button>
        </div>
      )}
      { showClose && (
        <Image
          className="close-icon"
          src={WhiteCrossPng}
          alt=""
          onClick={() => setClose(!close)}
        />
      )}
    </Message>
  )
}

NotificationMessage.propTypes = {
  header      : PropTypes.string,
  content     : PropTypes.string,
  type        : PropTypes.string,
  list        : PropTypes.array,
  detailsLink : PropTypes.string,
  icon        : PropTypes.bool,
  showClose   : PropTypes.bool,
  confirmBtn  : PropTypes.object
}

NotificationMessage.defaultProps = {
  type: 'info'
}

export default NotificationMessage
