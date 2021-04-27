import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'semantic-ui-react'
import Slider from 'react-slick'

import {
  TriaRect,
  TriaRectSmall
} from '../../assets/images/homepage'
import QuotePng from '../../assets/images/quote.png'
import './style.less'

const settings = {
  dots           : true,
  infinite       : false,
  speed          : 500,
  slidesToShow   : 1,
  slidesToScroll : 1,
  arrows         : true,
  swipeToSlide   : true,
}

const Quotes = ({ quotes }) => (
  <section className="quotes-section">
    <Image src={TriaRect} className="footer-bg-1" />
    <Image src={TriaRectSmall} className="footer-bg-2" />
    <Slider {...settings}>
      {quotes.map((slide, id) => (
        <div key={id} className="slider-content">
          <Image src={QuotePng} className="double-quote-icon" />
          <div className="main">
            <div className="text">
              {slide.text}
            </div>
            <div className="author">
              {slide.author}
            </div>
            <div className="role">
              {slide.role}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </section>
)

Quotes.propTypes = {
  quotes: PropTypes.array
}

export default Quotes
