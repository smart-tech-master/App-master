

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Grid } from 'semantic-ui-react'
import NumberFormat from 'react-number-format'

import { SvgDonut as DonutChart } from '../../../components'
import GreenLogoPng from '../../../assets/images/green-logo.png'
import DollarPng from '../../../assets/images/dollar.png'
import './style.less'

const DONUT_CHART_COLOR_SCHEMA = [
  {
    startColor : '#6679FF',
    endColor   : '#36C7F3'
  },
  {
    startColor : '#F874AB',
    endColor   : '#F53E47'
  },
  {
    startColor : '#F0CC39',
    endColor   : '#FC9B3A'
  },
  {
    startColor : '#3BE8DA',
    endColor   : '#00857A'
  },
  {
    startColor : '#9AE5FF',
    endColor   : '#05ACFF'
  },
  {
    startColor : '#D42518',
    endColor   : '#FF776D'
  },
  {
    startColor : '#06D48A',
    endColor   : '#008899'
  },
  {
    startColor : '#A082DA',
    endColor   : '#421791'
  },
]

const Statistics = ({ data }) => {
  const investorsBreakdown = (data && data.investors_breakdown) || {}
  let num = 0
  const dataForPie = Object.keys(investorsBreakdown).map((key) => {
    num++
    return {
      label      : key,
      value      : investorsBreakdown[key].tokens_held,
      startColor : DONUT_CHART_COLOR_SCHEMA[num - 1].startColor,
      endColor   : DONUT_CHART_COLOR_SCHEMA[num - 1].endColor
    }
  })
  const [donutHoverItem, hoverItemChanged] = useState(undefined)
  const [highlightItem, setHighlightCat] = useState(0)
  return (
    <Card className="card-large-padding statistics">
      <Card.Content>
        <Card.Header>Financial Data</Card.Header>
      </Card.Content>
      <Card.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={6} mobile={16}>
              <DonutChart
                data={dataForPie}
                setHighlightCat={index => setHighlightCat(index)}
                donutHoverItem={donutHoverItem}
                hoverItemChanged={index => hoverItemChanged(index)}
                highlightItem={highlightItem}
                headerTitle="# of Investors"
                title={`${data && data.investors_total}`}
              />
            </Grid.Column>
            <Grid.Column computer={10} mobile={16}>
              <div className="invest-info">
                <div className="total-fair">
                  <div><img src={GreenLogoPng} className="icon" alt="icon" />Total FAIR bought</div>
                  <div>
                    <NumberFormat
                      value={data && data.tokens_outstanding}
                      displayType="text"
                      thousandSeparator=" "
                      fixedDecimalScale
                      decimalScale={2}
                    />
                  </div>
                </div>
                <div className="total-investment">
                  <div><img src={DollarPng} className="icon" alt="icon" />Total Investments</div>
                  <div>
                    <NumberFormat
                      value={data && data.amount_invested >= 1000 ? parseInt(data && data.amount_invested / 1000, 10) : data && data.amount_invested}
                      displayType="text"
                      thousandSeparator
                      fixedDecimalScale
                      prefix="$"
                      suffix={data && data.amount_invested >= 1000 ? 'k' : ''}
                    />
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

Statistics.propTypes = {
  data: PropTypes.object
}

export default Statistics
