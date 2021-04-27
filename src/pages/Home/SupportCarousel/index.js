/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-return-assign */
import React, { Component } from 'react'
import { Image, Header, Grid } from 'semantic-ui-react'
import Slider from 'react-slick'

import {
  S1, S2, S3, S4, S5, SupportBg
} from '../../../assets/images/homepage'
import './style.less'

const slides = [
  {
    id    : 1,
    title : 'Interested in investing',
    desc  : 'Whether you just discovered a new business or want to support one you\'ve used for years, you\'re just a click away from investing and benefiting if the company succeeds.',
    image : S1
  },
  {
    id    : 2,
    title : 'The word of the CEO',
    desc  : 'Once you\'ve signed up and completed your profile, the CEO will greet you via your dashboard. It\'s a direct link between you and the company.',
    image : S2
  },
  {
    id    : 3,
    title : 'Why to invest',
    desc  : 'Now that you\'ve learned your way around the dashboard, you can do some research: read about the founding team, the company\'s story, and decide if you want to support their mission.',
    image : S3
  },
  {
    id    : 4,
    title : 'Consult financial data',
    desc  : 'Whether you\'re a professional investor or not, you get the answers you need. See clear financial data, key metrics on the company\'s top line results, how things are changing.',
    image : S4
  },
  {
    id    : 5,
    title : 'Invest',
    desc  : 'With your investment plan in mind, whether once or on a recurring basis, start investing with as little as $50/company - and become an insider earning returns if the company succeeds.',
    image : S5
  },
]

class SupportCarousel extends Component {
  componentDidMount() {
    setTimeout(() => {
      document.querySelector('.support-carousel-section').classList.add('animation')
      this.slider.slickPlay()
    }, 500)
  }

  afterChange = (id) => {
    if (id === this.slider.props.children.length - 1) {
      this.slider.slickPause()
      document.querySelector('.support-carousel-section').classList.remove('animation')
    }
  }

  render() {
    const settings = {
      dots           : true,
      infinite       : false,
      speed          : 1500,
      slidesToShow   : 1,
      slidesToScroll : 1,
      autoplay       : true,
      autoplaySpeed  : 8000,
      pauseOnHover   : false,
      customPaging(id) {
        return (
          <button type="button" key={id}>
            <i />
            <span>{slides[id].title}</span>
          </button>
        )
      },
      afterChange: this.afterChange
    }
    return (
      <section id="learn-more" className="support-carousel-section">
        <Grid container>
          <Grid.Row>
            <Grid.Column width={16} className="investment-loop">
              <Image src={SupportBg} />
              <div className="desc">
                Investment Loop
              </div>
            </Grid.Column>
            <Grid.Column width={16} className="header">
              <Header className="title">Support businesses you believe in</Header>
              <div className="desc">
              Follow their progress and benefit from their growth if they succeed
              </div>
            </Grid.Column>
            <Grid.Column width={16}>
              <Slider {...settings} ref={c => (this.slider = c)}>
                {slides.map((slide, index) => (
                  <div key={index}>
                    <div className="main-card">
                      <div className="number">
                        &#183; {slide.id > 10 ? slide.id : `0${slide.id}`}
                      </div>
                      <div className="title">{slide.title}</div>
                      <div className="desc">{slide.desc}</div>
                    </div>
                    <div className="image-content">
                      <Image src={slide.image} />
                    </div>
                  </div>
                ))}
              </Slider>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    )
  }
}

export default SupportCarousel
