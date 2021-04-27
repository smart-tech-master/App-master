import React from 'react'
import PropTypes from 'prop-types'

import './styles.less'

const cornerArc = require('svg-arc-corners')

const conf = {
  cornerRaidus         : 15,
  cx                   : 400,
  cy                   : 400,
  radius               : 400,
  strokeWidth          : 90,
  highlightStrokeWidth : 120
}

function calcPosition(cx, cy, radius, startA, endA, text, selected) {
  // const alpha = ((endA - startA) / 2 + startA) * Math.PI / 180
  let textY = 0
  let textX = 0
  let triaX = 0
  let triaY = 0
  let rectX = 0
  let rectY = 0

  const rectH = 160
  const rectW = text.length * 20 + 200
  let diff = 0
  switch (true) {
  case startA < 90:
    if (endA < 180) {
      triaX = cx + radius * Math.sin((startA + 10) * Math.PI / 180)
      triaY = cy - radius * Math.cos((startA + 10) * Math.PI / 180) - 50
      diff = triaX + rectW - 800
      rectX = diff < 0 ? triaX - 30 : triaX + 20 - diff
      rectY = triaY - rectH
    } else {
      triaX = cx - 15
      triaY = selected ? 835 : 810
      rectX = cx - rectW / 2
      rectY = triaY
    }
    break
  case startA < 180:
    if (endA < 180) {
      triaX = cx + radius * Math.cos((endA - 10 - 90) * Math.PI / 180)
      triaY = cy + radius * Math.sin((endA - 10 - 90) * Math.PI / 180) + 50
      diff = triaX + rectW - 800
      rectX = diff < 0 ? triaX - 30 : triaX + 60 - diff
      rectY = triaY
    } else {
      triaX = cx - 15
      triaY = selected ? 835 : 810
      rectX = cx - rectW / 2
      rectY = triaY
    }
    break
  case startA < 270:
    if (endA > 330) {
      triaX = cx - radius * Math.cos((endA - 10 - 270) * Math.PI / 180)
      triaY = cy - radius * Math.sin((endA - 10 - 270) * Math.PI / 180) - 50
      diff = 60 + triaX - rectW
      rectX = diff > 0 ? diff : 20
      rectY = triaY - rectH
    } else {
      triaX = cx - radius * Math.sin((startA + 10 - 180) * Math.PI / 180) - 20
      triaY = cy + radius * Math.cos((startA + 10 - 180) * Math.PI / 180) + 50
      rectX = triaX - 30
      rectY = triaY
    }
    break
  case startA < 360:
    triaX = cx - radius * Math.cos((endA - 10 - 270) * Math.PI / 180)
    triaY = cy - radius * Math.sin((endA - 10 - 270) * Math.PI / 180) - 50
    diff = triaX + 60 - rectW
    rectX = diff > 0 ? diff : 20
    rectY = triaY - rectH
    break
  default:
  }
  textX = rectX + rectW / 2
  textY = rectY + rectH / 2 - 30

  return {
    textX,
    textY,
    rectX,
    rectY,
    rectW,
    rectH,
    triaX,
    triaY
  }
}

const SvgDonutChart = ({ data, title, headerTitle, highlightItem, setHighlightCat, hoverItemChanged, donutHoverItem }) => {
  let totalValue = 0
  data.forEach((item) => {
    totalValue += item.value
  })
  let startAngle = 0
  let endAngle = -1.5
  let prevRadius = 0
  const paths = data.map((item, index) => {
    startAngle = endAngle + 3
    const strokeWidth = index === highlightItem ? conf.highlightStrokeWidth : conf.strokeWidth
    endAngle = startAngle + (item.value / totalValue * 360 - 3)
    const radius = prevRadius === 0 ? conf.radius - conf.highlightStrokeWidth + strokeWidth : prevRadius + strokeWidth
    prevRadius =  radius - strokeWidth
    const { textX, textY, rectX, rectY, rectW, triaX, triaY, rectH } = calcPosition(conf.cx, conf.cy, radius, startAngle, endAngle, item.label, index === highlightItem)
    return (
      <React.Fragment key={index}>
        <radialGradient id={`grad${index}`}>
          <stop offset="0%" style={{ stopColor: item.endColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: item.startColor, stopOpacity: 1 }} />
        </radialGradient>
        <path
          onMouseOver={() => hoverItemChanged(index)}
          onFocus={() => hoverItemChanged(index)}
          onClick={() => setHighlightCat(index)}
          d={cornerArc([conf.cx, conf.cy], radius, startAngle, endAngle, strokeWidth, conf.cornerRaidus)}
          fill={`url(#grad${index})`}
        />
        <g id={`tooltip${index}`} className="tooltip">
          <rect x={triaX} y={triaY} width={30} height={30} fill={item.startColor} transform={`rotate(-45 ${triaX} ${triaY})`} stroke="#fff" strokeWidth="3" />
          <rect x={rectX} y={rectY} width={rectW} height={rectH} rx="10" fill={item.startColor} stroke="#fff" strokeWidth="2" />
          <rect x={triaX} y={triaY} width={30} height={30} fill={item.startColor} transform={`rotate(-45 ${triaX} ${triaY})`} />
          <text
            x={textX}
            y={textY}
            dominantBaseline="middle"
            textAnchor="middle"
            style={{ fill: '#fff', fontSize: 50, fontWeight: 500, textTransform: 'capitalize' }}
          >
            {item.label}
          </text>
          <text
            x={textX}
            y={textY + 60}
            dominantBaseline="middle"
            textAnchor="middle"
            style={{ fill: '#fff', fontSize: 40, fontWeight: 600, textTransform: 'capitalize' }}
          >
            {`${item.value.toFixed(2)} FAIR`}
          </text>
        </g>
      </React.Fragment>
    )
  })
  return (
    <svg viewBox="0 0 800 800" className="svg-donut-chart">
      {paths}
      <text
        x="50%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {headerTitle}
      </text>
      <text
        x="50%"
        y="58%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {title}
      </text>
      <use xlinkHref={`#tooltip${donutHoverItem}`} />
    </svg>
  )
}

SvgDonutChart.propTypes = {
  data             : PropTypes.array,
  title            : PropTypes.string,
  headerTitle      : PropTypes.string,
  highlightItem    : PropTypes.number,
  setHighlightCat  : PropTypes.func,
  hoverItemChanged : PropTypes.func,
  donutHoverItem   : PropTypes.number
}

export default SvgDonutChart
