import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Form, Button } from 'semantic-ui-react'

import { Creators as globalCreators } from '../../redux/actions/global'

import './style.less'

class ContactUs extends Component {
  state = {
    showCompanyName : false,
    form            : {
      email    : undefined,
      name     : undefined,
      question : undefined
    },
  }

  hideContactUsModal = () => {
    const { showContactUsModal } = this.props
    showContactUsModal(false)
  }

  onChangeValue = (event) => {
    const { form, showCompanyName } = this.state
    form[event.target.id] =  event.target.value
    this.checkValidation(form, showCompanyName)
  }

  contactUs = () => {
    this.hideContactUsModal()
    window.Intercom('showNewMessage', 'Feel free to ask us any questions you might have and we\'ll do our best to answer you as soon as possible :)')
  }

  render() {
    return (
      <div className="page-div get-financing-page" onClick={this.hideContactUsModal}>
        <Card as="div" className="get-financing-card" onClick={e => e.stopPropagation()}>
          <Card.Content>
            <Card.Header>Contact us</Card.Header>
            <div className="desc">We are happy to help you and answer on your all questions. </div>
            <Form autoComplete="off">
              <Form.Field>
                <label htmlFor="email">What is your name</label>
                <input
                  id="name"
                  onChange={this.onChangeValue}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="email">Your e-mail</label>
                <input
                  id="email"
                  type="email"
                  onChange={this.onChangeValue}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="email">Your question</label>
                <textarea
                  id="question"
                  onChange={this.onChangeValue}
                />
              </Form.Field>
              <Button
                type="submit"
                className="next-btn"
                primary
                fluid
                onClick={this.contactUs}
              >
                Contact us
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  global: store.global,
})

const mapDispatchToProps = {
  ...globalCreators
}

ContactUs.propTypes = {
  showContactUsModal: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)
