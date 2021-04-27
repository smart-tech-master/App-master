import React from 'react'
import PropTypes from 'prop-types'

import './style.less'

const cornerArc = require('svg-arc-corners')

const OPTIONS = {
  min         : 300,
  max         : 850,
  strokewidth : 20,
  statusArr   : [
    {
      min   : 300,
      max   : 600,
      title : 'below avg'
    },
    {
      min   : 601,
      max   : 700,
      title : 'average'
    },
    {
      min   : 701,
      max   : 760,
      title : 'good'
    },
    {
      min   : 761,
      max   : 850,
      title : 'excellent'
    },
  ]
}

const SpeedMeter = ({ value }) => {
  let valuelabel
  OPTIONS.statusArr.forEach((status) => {
    if (status.min < value && status.max > value) {
      valuelabel = status.title
    }
  })
  const angle = parseInt(240 / (OPTIONS.max - OPTIONS.min) * (value - OPTIONS.min), 10) - 120
  return (
    <svg className="speedmeter" viewBox="0 0 300 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d={cornerArc([150, 150], 150, -120, 120, 25, 5)}
        fill="#eee"
      />
      <path
        d={cornerArc([150, 150], 150, -120, angle, 25, 5)}
        fill="url(#paint0_angular)"
      />
      <text
        x="150"
        y="130"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        <tspan fill="#3F3F3F" className="value">{value}</tspan>
      </text>
      <text
        x="150"
        y="160"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        <tspan fill="#9E9E9E" className="status">{valuelabel}</tspan>
      </text>
      <text
        x="20"
        y="240"
        dominantBaseline="middle"
        textAnchor="start"
      >
        <tspan fill="#9E9E9E" className="label">{OPTIONS.min}</tspan>
      </text>
      <text
        x="280"
        y="240"
        dominantBaseline="middle"
        textAnchor="end"
      >
        <tspan fill="#9E9E9E" className="label">{OPTIONS.max}</tspan>
      </text>
      <defs>
        <linearGradient id="paint0_angular" gradientUnits="userSpaceOnUse">
          <stop offset="0.00774689" stopColor="#FF0000" />
          <stop offset="0.127295" stopColor="#FF6B00" />
          <stop offset="0.378055" stopColor="#fff620" />
          <stop offset="0.69438" stopColor="#0ACF70" />
          <stop offset="0.859374" stopColor="#00D1C1" />
        </linearGradient>
      </defs>
    </svg>

  )
}

SpeedMeter.propTypes = {
  value: PropTypes.number,
}

export default SpeedMeter
