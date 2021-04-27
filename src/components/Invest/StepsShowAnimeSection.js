import React from 'react'
import PropTypes from 'prop-types'

const StepsShowAnimeSection = ({ data }) => (
  <>
    <div className="steps-container">
      <div className="progressbar">
        <div className="progressbar-bg" />
        <div className="progressbar-fg1" />
        <div className="progressbar-fg2" />
      </div>
      {data && data.map((item, index) => (
        <div className={`step step${index + 1}`} key={index}>
          <div className="circles-container">
            <div className="grey-circle" />
            <div className="green-circle" />
            <div className="green-bg-circle" />
            <div className="green-wave-circle" />
          </div>
          <div className="title">
            {item.title}
          </div>
          <div className="desc">
            {item.desc}
          </div>
        </div>
      ))}
      <div className="status">
        This could take between a few seconds and a few minutes
      </div>
    </div>
    <div className="curtain">
      <div className="top-half" />
      <div className="bottom-half" />
    </div>

  </>
)

StepsShowAnimeSection.propTypes = {
  data: PropTypes.array
}

export default StepsShowAnimeSection
