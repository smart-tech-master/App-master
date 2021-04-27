import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import ModalVideo from 'react-modal-video'

import './style.less'

class NewsAndAnnouncements extends React.Component {
  state = {
    isVideosOpen: [],
  }

  openVideo = (id) => {
    const { isVideosOpen } = this.state
    isVideosOpen.fill(false)
    isVideosOpen[id] = true
    this.setState({ isVideosOpen })
  }

  closeVideo = () => {
    const { isVideosOpen } = this.state
    isVideosOpen.fill(false)
    this.setState({ isVideosOpen })
  }

  render() {
    const { isVideosOpen } = this.state
    const { data } = this.props
    return (
      <Card className="card-large-padding news-and-announcements">
        <Card.Content>
          <Card.Header>Learn more</Card.Header>
        </Card.Content>
        <Card.Content className="video-list">
          {data.videos.map((video, index) => (
            <React.Fragment key={index}>
              <div className="video" onClick={() => this.openVideo(index)}>
                <img src={video.image} alt="" />
              </div>
              <ModalVideo channel="youtube" isOpen={isVideosOpen[index]} videoId={video.link.split('v=').pop()} onClose={this.closeVideo} />
            </React.Fragment>
          ))}
        </Card.Content>
      </Card>
    )
  }
}

NewsAndAnnouncements.propTypes = {
  data: PropTypes.object
}

export default NewsAndAnnouncements
