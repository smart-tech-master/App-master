import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image, Feed, Header } from 'semantic-ui-react'

import './style.less'
import Steps1Png from '../../../assets/images/founders-steps1.svg'
import Steps2Png from '../../../assets/images/founders-steps2.svg'
import Steps3Png from '../../../assets/images/founders-steps3.svg'
import BlueCirclePng from '../../../assets/images/blue-circle.svg'
import GreenCirclePng from '../../../assets/images/green-circle.svg'

const Steps = () => (
  <section className="founders-steps">
    <Grid container>
      <Image src={GreenCirclePng} className="steps-bg-1" />
      <Image src={BlueCirclePng} className="steps-bg-2" />
      <Grid.Row>
        <Grid.Column width={16}>
          <Header>Fairmint relies on</Header>
          <div className="desc">To make this possible, we built a complete ecosystem with our worldwide well knowns partners.</div>
        </Grid.Column>
        <Grid.Column width={16}>
          <div className="vertical-steps">
            <Feed size="large">
              <Feed.Event>
                <Feed.Label>
                  <Image src={Steps1Png} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    A legal framework
                  </Feed.Summary>
                  <Feed.Date>
                    To issue securities having the best experts to provide you with the safest tool was obvious.  Discover it with our team.
                  </Feed.Date>
                </Feed.Content>
              </Feed.Event>
            </Feed>
            <Feed size="large">
              <Feed.Event>
                <Feed.Label>
                  <Image src={Steps2Png} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    A tax and accounting framework
                  </Feed.Summary>
                  <Feed.Date>
                    Building trust, facilitating transparency also means to respect the entire tax and accounting rules. We've been working on it with the best. To know more, <Link href="/contact-us">contact us</Link>
                  </Feed.Date>
                </Feed.Content>
              </Feed.Event>
            </Feed>
            <Feed size="large">
              <Feed.Event>
                <Feed.Label>
                  <Image src={Steps3Png} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    An economical framework
                  </Feed.Summary>
                  <Feed.Date>
                    Mathematicians, economists and experts worked with us on simulating and validating this novel model. We are super proud of having working with them
                  </Feed.Date>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </section>
)

export default Steps
