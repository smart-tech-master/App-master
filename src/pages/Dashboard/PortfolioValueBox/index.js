import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import ReactApexChart from 'react-apexcharts'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import * as _ from 'lodash'

import './PortfolioValueBox.style.less'

class PortfolioValueBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xAxisLabels : undefined,
      totalDates  : undefined,
      toolTip     : {},
      startDate   : undefined,
      initPrice   : undefined,
      options     : {},
      series      : []
    }
  }

  componentDidMount() {
    const { data } = this.props
    if (data && !_.isEmpty(data)) {
      this.generateChart()
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props
    if (data && !_.isEqual(prevProps.data, data) && !_.isEmpty(data)) {
      this.generateChart()
    }
  }

  generateChart() {
    const { data: ChartData } = this.props
    const dates = Object.keys(ChartData).map(key => key)
    const totalDates = (moment(dates[dates.length - 1]).valueOf() - moment(dates[0]).valueOf()) / 86400000
    const dateDiff = parseInt(totalDates / 5, 10)
    const xAxisLabels = []
    for (let i = 0; i < 5; i++) {
      xAxisLabels.push(totalDates - dateDiff * i - 1)
    }
    xAxisLabels.push(0)

    const dataSet = [[], []]
    const groupData = Object.keys(ChartData).map(key => ChartData[key])
    const newSeries = []
    groupData.forEach((item, index) => {
      if (index === 0) {
        newSeries.push(item)
      } else {
        newSeries.push((item + groupData[index - 1]) / 2)
      }
      newSeries.push(item)
    })

    const newDates = []
    dates.forEach((date) => {
      newDates.push(moment(date).valueOf())
      newDates.push(moment(date).add(12, 'h').valueOf())
    })
    newSeries.pop()
    newSeries.forEach((item, index) => {
      const prevDiff = index > 0 ? (item - newSeries[index - 1]) >= 0 : true
      const nextDiff = newSeries[index + 1] ? (newSeries[index + 1] - item) >= 0 : false
      let it = item
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(item)) it = newSeries[index - 1]
      if (prevDiff !== nextDiff) {
        dataSet[0].push([newDates[index], it])
        dataSet[1].push([newDates[index], it])
      } else if (!prevDiff) {
        dataSet[0].push([newDates[index], null])
        dataSet[1].push([newDates[index], it])
      } else {
        dataSet[0].push([newDates[index], it])
        dataSet[1].push([newDates[index], null])
      }
    })

    const cxt = this
    this.setState({
      initPrice   : dataSet[0][1] && dataSet[0][1][1],
      xAxisLabels : xAxisLabels.reverse(),
      totalDates,
      toolTip     : {
        intersect : true,
        shared    : false
      },
      startDate : dates[0],
      options   : {
        tooltip: {
          intersect : true,
          shared    : false
        },
        chart: {
          zoom: {
            enabled: false
          },
          events: {
            dataPointMouseLeave(event, chartContext, config) {
              const { dataPointIndex } = config
              const arrayId = dataPointIndex > 0 ? dataPointIndex : 0
              document.querySelector('.portfolio-value-box').style.overflow = 'hidden'
              cxt.setState({
                toolTip: {
                  index     : arrayId,
                  showLeft  : 0,
                  showRight : 0
                }
              })
            },
            dataPointMouseEnter(event, chartContext, config) {
              document.querySelector('.portfolio-value-box').style.overflow = 'visible'
              const { dataPointIndex, w: { globals: { series, seriesXvalues, seriesYvalues, colors, gridWidth } } } = config
              const arrayId = dataPointIndex > 0 ? dataPointIndex : 0
              const title = series[1][arrayId]
              if (arrayId % 2 !== 0 && title) {
                if (event.x < gridWidth - 100) {
                  cxt.setState({
                    toolTip: {
                      index     : arrayId,
                      color     : colors[1],
                      x         : seriesXvalues[1][arrayId],
                      y         : seriesYvalues[1][arrayId] - 70,
                      price     : series[1][arrayId],
                      increase  : series[1][arrayId] - series[1][arrayId - 1],
                      showLeft  : 0,
                      showRight : 1,
                    }
                  })
                } else {
                  cxt.setState({
                    toolTip: {
                      index     : arrayId,
                      color     : colors[1],
                      x         : seriesXvalues[1][arrayId] - 60,
                      y         : seriesYvalues[1][arrayId] - 70,
                      price     : series[1][arrayId],
                      increase  : series[1][arrayId] - series[1][arrayId - 1],
                      showLeft  : 1,
                      showRight : 0,
                    }
                  })
                }
              } else if (arrayId % 2 === 0) {
                cxt.setState({
                  toolTip: {
                    index     : arrayId,
                    showLeft  : 0,
                    showRight : 0,
                  }
                })
              } else if (title === null) {
                if (event.x < gridWidth - 100) {
                  cxt.setState({
                    toolTip: {
                      index     : arrayId,
                      color     : colors[0],
                      x         : seriesXvalues[0][arrayId],
                      y         : seriesYvalues[0][arrayId] - 70,
                      price     : series[0][arrayId],
                      increase  : series[0][arrayId] - series[0][arrayId - 1],
                      showLeft  : 0,
                      showRight : 1,
                    }
                  })
                } else {
                  cxt.setState({
                    toolTip: {
                      index     : arrayId,
                      color     : colors[0],
                      x         : seriesXvalues[0][arrayId] - 60,
                      y         : seriesYvalues[0][arrayId] - 70,
                      price     : series[0][arrayId],
                      increase  : series[0][arrayId] - series[0][arrayId - 1],
                      showLeft  : 1,
                      showRight : 0,
                    }
                  })
                }
              } else {
                cxt.setState({
                  toolTip: {
                    index     : arrayId,
                    showLeft  : 0,
                    showRight : 0
                  }
                })
              }
            }
          }
        },
        grid: {
          borderColor     : '#ccc',
          strokeDashArray : 7,
          xaxis           : {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve : 'straight',
          width : 2,
        },
        fill: {
          type     : 'gradient',
          gradient : {
            shadeIntensity : 1,
            opacityFrom    : 0.7,
            opacityTo      : 0.8,
            stops          : [0, 95, 100]
          }
        },
        markers: {
          size  : 4,
          hover : {
            size: 5
          }
        },
        colors : ['#00D1C1', '#FF875F'],
        labels : newDates,
        xaxis  : {
          type       : 'category',
          categories : newDates,
          show       : false
        },
        yaxis: {
          show: false
        },
        legend: {
          horizontalAlign: 'left'
        }
      },
      series: [
        {
          name : 'positive',
          data : dataSet[0]
        },
        {
          name : 'negative',
          data : dataSet[1]
        },
      ],
    })
  }

  render() {
    const { xAxisLabels, totalDates, startDate, series, toolTip, initPrice } = this.state
    if (window.innerWidth < 600) {
      this.mobile = true
      this.mobileW = window.innerWidth
    }
    return (
      <Card className="portfolio-value-box">
        <Card.Content>
          <Card.Header>
            <span>Your portfolio value</span>
            <NumberFormat
              key={toolTip}
              className="price"
              displayType="text"
              value={initPrice}
              thousandSeparator
              fixedDecimalScale
              decimalScale={2}
              prefix="$"
            />
          </Card.Header>
          <Card.Description key="trusy" className="trusy-status">
            <div id="chart">
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="area"
                width={this.mobile ? this.mobileW : undefined}
                height="100%"
              />
              <svg className="toolbar" viewBox="0 0 1000 320" fill="none">
                {xAxisLabels && xAxisLabels.map((date, index) => (
                  <React.Fragment key={index}>
                    <text x={date * 1000 / totalDates + 500 / totalDates} y={315} textAnchor="middle">
                      {moment(startDate).add(date, 'd').format('MMM DD')}
                    </text>
                    <line
                      stroke="#D7D7D7"
                      strokeDasharray="4 8"
                      x1={date * 1000 / totalDates + 500 / totalDates}
                      y1="85"
                      x2={date * 1000 / totalDates + 500 / totalDates}
                      y2="300"
                    />
                  </React.Fragment>
                ))}
              </svg>
              {toolTip.index && series.map((seriesItem, index) => (
                <React.Fragment key={index}>
                  {seriesItem.data[toolTip.index][1] && (
                    <div
                      key={`tooltip-${index}`}
                      id={`series${index}-tooltip`}
                      className="series-tooltip"
                      style={{
                        borderColor : toolTip.color,
                        background  : toolTip.color,
                        left        : toolTip.x,
                        top         : toolTip.y,
                        opacity     : toolTip.showRight
                      }}
                    >
                      <NumberFormat
                        className="price"
                        displayType="text"
                        value={Math.abs(toolTip.price)}
                        thousandSeparator
                        fixedDecimalScale
                        decimalScale={2}
                        prefix="$"
                      />
                      <NumberFormat
                        className="increase"
                        displayType="text"
                        value={Math.abs(toolTip.increase)}
                        thousandSeparator
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={toolTip.increase >= 0 ? '+  $' : '-  $'}
                      />
                    </div>
                  )}
                  {seriesItem.data[toolTip.index][1] && (
                    <div
                      key={`tooltip-left-${index}`}
                      id={`series${index}-tooltip-left`}
                      className="series-tooltip series-tooltip-left"
                      style={{
                        borderColor : toolTip.color,
                        background  : toolTip.color,
                        left        : toolTip.x,
                        top         : toolTip.y,
                        opacity     : toolTip.showLeft
                      }}
                    >
                      <NumberFormat
                        className="price"
                        displayType="text"
                        value={Math.abs(toolTip.price)}
                        thousandSeparator
                        fixedDecimalScale
                        decimalScale={2}
                        prefix="$"
                      />
                      <NumberFormat
                        className="increase"
                        displayType="text"
                        value={Math.abs(toolTip.increase)}
                        thousandSeparator
                        fixedDecimalScale
                        decimalScale={2}
                        prefix={toolTip.increase >= 0 ? '+  $' : '-  $'}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

PortfolioValueBox.propTypes = {
  data: PropTypes.object
}

export default PortfolioValueBox
