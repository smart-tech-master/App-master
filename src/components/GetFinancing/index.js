import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Loader } from 'semantic-ui-react'
import JotformEmbed from 'react-jotform-embed'

import { Creators as globalCreators } from '../../redux/actions/global'
import './style.less'

const style = {
  margin   : '0px',
  position : 'absolute',
  top      : 'calc(50% - 24px)',
  left     : 'calc(50% - 24px)',
  zIndex   : 1
}

class GetFinancing extends Component {
  hideGetFinancingModal = () => {
    const { showGetFinancingModal } = this.props
    showGetFinancingModal(false)
  }

  render() {
    return (
      <div className="page-div get-financing-page" onClick={this.hideGetFinancingModal}>
        <Card as="div" className="get-financing-card" onClick={e => e.stopPropagation()}>
          <Card.Content>
            <Loader active inline="centered" size="large" style={style} />
            <JotformEmbed src="https://www.jotform.com/form/92979057025163" />
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

GetFinancing.propTypes = {
  showGetFinancingModal: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(GetFinancing)
