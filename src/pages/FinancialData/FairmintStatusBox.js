import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import ReactApexChart from 'react-apexcharts'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import * as _ from 'lodash'

import financialGraphPng from '../../assets/images/financial-graph.png'
import './FairmintStatusBox.style.less'

class FairmintStatusBox extends Component {
  constructor(props) {
    super(props)
    const cxt = this
    this.state = {
      timelineDates : [],
      series        : [],
      options       : {
        annotations: {
          yaxis: [{
            y           : 30,
            borderColor : '#999',
            label       : {
              show  : false,
              text  : '',
              style : {
                color      : '#fff',
                background : '#00E396'
              }
            }
          }]
        },
        chart: {
          events: {
            mouseMove(event, chartContext, config) {
              const { dataPointIndex, globals: { series, pointsArray, colors, gridWidth } } = config
              series.forEach((item, index) => {
                const pos = pointsArray[index]
                const arrayId = dataPointIndex > 0 ? dataPointIndex : 0
                const title = index === 0 ? cxt.props.data[arrayId].reserve : item[arrayId]
                if (title) {
                  if (event.x < gridWidth - 50) {
                    document.querySelector(`#series${index}-tooltip-left`).style.opacity = 0
                    document.querySelector(`#series${index}-tooltip`).style.opacity = 1
                    document.querySelector(`#series${index}-tooltip`).style.borderColor = colors[index]
                    document.querySelector(`#series${index}-tooltip`).style.background = colors[index]
                    document.querySelector(`#series${index}-tooltip`).innerHTML = `$${title}`
                    document.querySelector(`#series${index}-tooltip`).style.left = `${pos[arrayId][0]}px`
                    document.querySelector(`#series${index}-tooltip`).style.top = `${pos[arrayId][1]}px`
                  } else {
                    document.querySelector(`#series${index}-tooltip`).style.opacity = 0
                    document.querySelector(`#series${index}-tooltip-left`).style.opacity = 1
                    document.querySelector(`#series${index}-tooltip-left`).style.borderColor = colors[index]
                    document.querySelector(`#series${index}-tooltip-left`).style.background = colors[index]
                    document.querySelector(`#series${index}-tooltip-left`).innerHTML = `$${title}`
                    document.querySelector(`#series${index}-tooltip-left`).style.left = `${pos[arrayId][0] - 75}px`
                    document.querySelector(`#series${index}-tooltip-left`).style.top = `${pos[arrayId][1]}px`
                  }
                } else {
                  document.querySelector(`#series${index}-tooltip`).style.opacity = 0
                  document.querySelector(`#series${index}-tooltip-left`).style.opacity = 0
                }
                if (dataPointIndex < 0) {
                  document.querySelector(`#series${index}-tooltip-left`).style.opacity = 0
                }
              })
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size  : 0,
          style : 'hollow',
        },
        xaxis: {
          type   : 'datetime',
          labels : {
            show: false
          },
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
        },
        stroke: {
          show   : true,
          curve  : 'smooth', // "smooth" / "straight" / "stepline"
          width  : 1,
          colors : undefined, // array of colors
        },
        toolbar: {
          show: false,
        },
        fill: {
          type     : 'gradient',
          gradient : {
            shadeIntensity : 1,
            opacityFrom    : 0.7,
            opacityTo      : 0.9,
            stops          : [0, 100]
          }
        },
        colors : ['#FF5722', '#00D1C1', '#9C27B0'],
        legend : {
          show                : true,
          showForSingleSeries : false,
          floating            : false,
          position            : 'top',
          horizontalAlign     : 'left',
          verticalAlign       : 'middle',
          fontFamily          : 'SF Pro Text',
          markers             : {
            size        : 3,
            strokeWidth : 0,
            strokeColor : '#fff',
            offsetX     : 0,
            offsetY     : 0,
            shape       : 'circle',
            radius      : 6
          },
          itemMargin: {
            horizontal : 0,
            vertical   : 5
          },
          containerMargin: {
            left   : 10,
            top    : 4,
            right  : 10,
            bottom : 0
          },
        }
      }
    }
  }

  componentDidMount() {
    const { data } = this.props
    if (data) {
      this.generateChartSeries()
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props
    if (data && !_.isEqual(prevProps.data, data)) {
      this.generateChartSeries()
    }
  }

  generateChartSeries = () => {
    const { data } = this.props
    const priceSeries = data.map(item => [item.timestamp * 1000, parseFloat(item.price, 10)])
    const reserveSeries = data.map(item => [item.timestamp * 1000, parseFloat(item.reserve_scaled, 10)])
    const timelineDates = data.map(item => item.timestamp * 1000)
    this.setState({
      timelineDates,
      series: [
        {
          name : 'Cash reserve price',
          data : reserveSeries
        },
        {
          name : 'Last transaction price',
          data : priceSeries
        },
      ],
    })
  }

  render() {
    const { status, fairPrice } = this.props
    const { timelineDates, series } = this.state
    if (window.innerWidth < 600) {
      this.mobile = true
      this.mobileW = window.innerWidth
    }

    return (
      <Card className="financial-status-box">
        <Card.Content>
          <Card.Header>
            <NumberFormat
              className="price"
              displayType="text"
              value={fairPrice}
              thousandSeparator
              fixedDecimalScale
              decimalScale={2}
              prefix="$"
            />
            <span className="unit">Fairmint (FAIR)</span>
          </Card.Header>
          {!status && (
            <Card.Description key="falsy" className="falsy-status">
              <p>
                Fairmint (FAIR) is currently on an initialization phase. Get the most of it.
              </p>
              <img src={financialGraphPng} alt="financial bg" />
            </Card.Description>
          )}
          {status && (
            <Card.Description key="trusy" className="trusy-status">
              <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" width={this.mobile ? this.mobileW : undefined} height="380" />
                <div className="toolbar">
                  {timelineDates && timelineDates.map((date, index) => (
                    <span key={index}>{moment(date).format('MMM DD')}</span>
                  ))}
                </div>
                {series.map((seriesItem, index) => (
                  <React.Fragment key={index}>
                    <div key={`tooltip-${index}`} id={`series${index}-tooltip`} className="series-tooltip" />
                    <div key={`tooltip-left-${index}`} id={`series${index}-tooltip-left`} className="series-tooltip series-tooltip-left" />
                  </React.Fragment>
                ))}
              </div>
            </Card.Description>
          )}
        </Card.Content>
      </Card>
    )
  }
}

FairmintStatusBox.propTypes = {
  status    : PropTypes.bool,
  data      : PropTypes.array,
  fairPrice : PropTypes.number
}

export default FairmintStatusBox
