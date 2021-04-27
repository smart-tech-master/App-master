/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Table, Header } from 'semantic-ui-react'
import NumberFormat from 'react-number-format'

import './MyPortfolio.style.less'
import GreenLogoPng from '../../../assets/images/green-logo.png'
import DollarPng from '../../../assets/images/dollar.png'

const MyPortfolio = ({ fundData, fairPrice }) => {
  let totalInvestment = 0
  fundData.forEach((item) => {
    totalInvestment += item.currency_code === 'FAIR' ? parseFloat(item.nb * fairPrice, 10) : parseFloat(item.nb, 10)
  })
  return (
    <Card className="card-large-padding">
      <Card.Content>
        <Grid className="portfolio-chart">
          <Grid.Row only="computer">
            <Grid.Column width={16}>
              <Table basic="very">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={8}>My Portfolio</Table.HeaderCell>
                    <Table.HeaderCell width={2} textAlign="center">#</Table.HeaderCell>
                    <Table.HeaderCell width={4}>&nbsp;</Table.HeaderCell>
                    <Table.HeaderCell width={3} textAlign="center">$</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {fundData && fundData.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <div className="currency">
                          <img src={item.currency_code === 'FAIR' ? GreenLogoPng : DollarPng} className="currency-icon" alt="icon" />
                          <span>{item.currency_name}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <NumberFormat
                          className="fair-price"
                          displayType="text"
                          value={(item.nb).toFixed(2)}
                          thousandSeparator
                          fixedDecimalScale
                          decimalScale={2}
                          prefix={item.currency_code === 'FAIR' ? '' : '$'}
                        />
                      </Table.Cell>
                      <Table.Cell>&nbsp;</Table.Cell>
                      <Table.Cell>
                        <NumberFormat
                          className={item.currency_code === 'FAIR' ? 'usd-price' : 'usd-price cur'}
                          displayType="text"
                          value={item.currency_code === 'FAIR' ? (item.nb * fairPrice).toFixed(2) : (item.nb).toFixed(2)}
                          thousandSeparator
                          fixedDecimalScale
                          decimalScale={2}
                          prefix={item.currency_code === 'FAIR' ? '≈$' : '$'}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={8} className="portfolio-value-container">
              <span className="portfolio-value-title">Total Portfolio Value:</span>
            </Grid.Column>
            <Grid.Column width={8} className="portfolio-value-container" textAlign="right">
              <NumberFormat
                className="portfolio-value-price"
                displayType="text"
                value={totalInvestment}
                thousandSeparator
                fixedDecimalScale
                decimalScale={2}
                prefix="$"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only="mobile">
            <Header as="span">My portfolio</Header>
            <Grid.Column width={16}>
              <Table basic="very">
                {fundData && fundData.map((item, index) => (
                  <Table.Body key={index}>
                    <Table.Row>
                      <Table.Cell colSpan={2}>
                        <div className="currency">
                          <img src={item.currency_code === 'FAIR' ? GreenLogoPng : DollarPng} className="currency-icon" alt="icon" />
                          <span>{item.currency_name}</span>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>#</Table.Cell>
                      <Table.Cell textAlign="right">
                        <NumberFormat
                          className="fair-price"
                          displayType="text"
                          value={item.currency_code === 'FAIR' ? (item.nb).toFixed(2) : (item.nb / fairPrice).toFixed(2)}
                          thousandSeparator
                          fixedDecimalScale
                          decimalScale={2}
                          prefix=""
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>$</Table.Cell>
                      <Table.Cell textAlign="right">
                        <NumberFormat
                          className="usd-price"
                          displayType="text"
                          value={item.currency_code === 'FAIR' ? (item.nb * fairPrice).toFixed(2) : (item.nb).toFixed(2)}
                          thousandSeparator
                          fixedDecimalScale
                          decimalScale={2}
                          prefix="≈$"
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

MyPortfolio.propTypes = {
  fundData  : PropTypes.array,
  fairPrice : PropTypes.number
}

export default MyPortfolio
