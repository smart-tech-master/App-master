/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Table } from 'semantic-ui-react'
import NumberFormat from 'react-number-format'
import moment from 'moment'

import './style.less'
import { TransIcon } from '../../../assets/icons'

const TransactionHistory = ({ data }) => {
  let transactions
  if (data) {
    transactions = data.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    transactions = transactions.slice(0, 4)
  }
  return (
    <Card className="card-large-padding">
      <Card.Content>
        <Grid className="transaction-history">
          <Grid.Row>
            <Grid.Column width={16}>
              <Table basic="very">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan={4}>Transaction History</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {transactions && transactions.map((transItem, index) => (
                  <Table.Body key={index}>
                    <Table.Row>
                      <Table.Cell>
                        <div className="transaction-date">
                          <span className="month">{ moment(parseInt(transItem.timestamp, 10) * 1000).format('MMM') }</span>
                          <span className="day">{ moment(parseInt(transItem.timestamp, 10) * 1000).format('DD') }</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <TransIcon type={transItem.type} className="transaction-icon" />
                      </Table.Cell>
                      <Table.Cell textAlign="left">
                        <div className="desc">
                          {transItem.type === 'invest' && 'Invested'}
                          {transItem.type === 'deposit' && 'Deposited'}
                          {transItem.type === 'sell' && 'Sold'}
                          {transItem.type === 'withdraw' && 'Withdrew'}
                            &nbsp;
                          <NumberFormat
                            displayType="text"
                            value={transItem.input.value || transItem.output.value}
                            thousandSeparator
                            fixedDecimalScale
                            decimalScale={2}
                            prefix={((transItem.input && transItem.input.currency === 'FAIR') || (!transItem.input.currency && transItem.output && transItem.output.currency === 'FAIR')) ? '' : '$'}
                            suffix={` ${transItem.input.currency || transItem.output.currency}`}
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <NumberFormat
                          className="fair-price"
                          displayType="text"
                          value={transItem.output.value || transItem.input.value}
                          thousandSeparator
                          fixedDecimalScale
                          decimalScale={2}
                          prefix={`${transItem.type !== 'withdraw' ? '+' : '-'}${((transItem.output && transItem.output.currency === 'FAIR') || (!transItem.output.currency && transItem.input && transItem.input.currency === 'FAIR')) ? '' : '$'}`}
                          suffix={` ${transItem.output.currency || transItem.input.currency}`}
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </Grid.Column>
            {/* <Grid.Column width={16} textAlign="right">
                <span
                  className="show-history-btn"
                >
                  {showAll ? 'Hide transaction history' : 'All transaction history'}
                </span>
              </Grid.Column> */}
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

TransactionHistory.propTypes = {
  data: PropTypes.array
}

export default TransactionHistory
