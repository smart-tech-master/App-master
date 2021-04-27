import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'

import { PasswordStrengthMeter, ErrorMsg } from '../../components'
import { InfoIcon } from '../../assets/icons'

const Step2Form = ({ showError, errors, validated, form, signUp, onPasswordStrengthChange, onChangeTermsSatus, onChangeValue, onInputBlur }) => (
  <Form key="step2" autoComplete="off">
    <Form.Field>
      <label htmlFor="email">Your e-mail</label>
      <input
        id="email"
        onChange={onChangeValue}
        onBlur={onInputBlur}
        className={errors.email && 'error'}
      />
      <InfoIcon className="form-info" />
      {showError && <ErrorMsg error={errors.email} />}
    </Form.Field>
    <Form.Field>
      <label htmlFor="password">Create Password</label>
      <input
        type="password"
        id="password"
        onChange={onChangeValue}
        autoComplete="off"
        className={errors.confirmPassword && 'error'}
      />
      <InfoIcon className="form-info" />
      <PasswordStrengthMeter
        password={form.password || ''}
        onStrengthChange={onPasswordStrengthChange}
      />
    </Form.Field>
    <Form.Field>
      <label htmlFor="confirmPassword">Re-enter password</label>
      <input
        type="password"
        id="confirmPassword"
        onChange={onChangeValue}
        onBlur={onInputBlur}
        className={errors.confirmPassword && 'error'}
      />
      {showError && <ErrorMsg error={errors.confirmPassword} />}
    </Form.Field>
    <Form.Field className="terms-and-conditions">
      <Checkbox id="termsAndConds" onChange={onChangeTermsSatus} />
      <span className="other-link-container">
        By continuing I agree to <a href="https://github.com/Fairmint/legal/blob/master/terms-of-service.md" target="_blank">Fairmint's Terms</a> and <a href="https://github.com/Fairmint/legal/blob/master/privacy-policy.md" target="_blank">Privacy Policy</a> and acknowledge the creation of a portfolio using a third party under these terms
      </span>
    </Form.Field>
    <Button
      type="submit"
      className="next-btn"
      disabled={!_.isEmpty(_.pickBy(validated[1], _.isUndefined))}
      primary
      fluid
      onClick={signUp}
    >
      Create my account
    </Button>
  </Form>
)

Step2Form.propTypes = {
  showError                : PropTypes.bool,
  errors                   : PropTypes.object,
  validated                : PropTypes.array,
  form                     : PropTypes.object,
  signUp                   : PropTypes.func,
  onPasswordStrengthChange : PropTypes.func,
  onChangeTermsSatus       : PropTypes.func,
  onChangeValue            : PropTypes.func,
  onInputBlur              : PropTypes.func
}

export default Step2Form
