import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'

const Step1Form = ({ showCompanyName, validated, onShowCompanyName, moveNextStep, onChangeValue }) => (
  <Form key="step1">
    <Form.Field>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        onChange={onChangeValue}
        placeholder="First name"
      />
    </Form.Field>
    <Form.Field>
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        onChange={onChangeValue}
        placeholder="Last name"
      />
    </Form.Field>
    <Form.Field>
      <Checkbox label="I represent a company" onChange={onShowCompanyName} />
    </Form.Field>
    {showCompanyName && (
      <Form.Field>
        <label htmlFor="companyName">Company name</label>
        <input id="companyName" onChange={onChangeValue} />
      </Form.Field>
    )}
    <Button
      type="submit"
      className="next-btn"
      disabled={!_.isEmpty(_.pickBy(validated[0], _.isUndefined))}
      primary
      fluid
      onClick={moveNextStep}
    >
      Next
    </Button>
    <p className="other-link-container">
      Already have an account? <Link to="/signin">Sign in</Link>
    </p>
  </Form>
)

Step1Form.propTypes = {
  showCompanyName   : PropTypes.bool,
  validated         : PropTypes.array,
  onShowCompanyName : PropTypes.func,
  moveNextStep      : PropTypes.func,
  onChangeValue     : PropTypes.func
}

export default Step1Form
