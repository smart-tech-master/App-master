import React from 'react'
import { Grid } from 'semantic-ui-react'

const style = {
  footerContainerStyle: {
    // background    : '#F3F3F3',
    // marginTop     : 30,
    paddingTop: 50,
    // paddingBottom : 40,
    // borderTop     : 'solid 1px #D7E0E9'
  },
  footerHeaderStyle: {
    lineHeight: '28px'
  },
  footerContentStyle: {
    fontSize   : 12,
    lineHeight : '16px',
    fontWeight : 500,
    color      : '#5f5f5f'
  }
}

const Footer = () => (
  <div style={style.footerContainerStyle}>
    <Grid container>
      <Grid.Row>
        <Grid.Column style={{ padding: '0 6px 3rem' }}>
          {/* <Header as="h3" style={style.footerHeaderStyle}>
            PLEASE READ THE IMPORTANT DISCLOSURES BELOW.
          </Header>
          <div style={style.footerContentStyle}>
            <p>
              Fairmint is a platform from Fairmint Inc. that companies use to interact with their stakeholders allowing them to invest on a derivative product. The company is not a custodian, is not a digital wallet and is not an exchange. Self-directed financial opportunities processed through FAIRMINT have not been endorsed by the IRS or any government or regulatory agency. The IRS does not review, approve, or endorse any investments.
            </p>
            <p>
              FAIRMINT offers a $1 Million Consumer Protection insurance policy that covers consumers on the transactional side from any internal cases of fraud or theft. FAIRMINT is not FDIC-insured and is not a bank.AIS is not an investment adviser. Information contained on this website is for educational purposes only and is not tailored for any individual investor. It should not be relied upon as financial or investment advice. We encourage you to consult a financial adviser or investment professional to determine whether an investment using the FAIRMINT platform makes sense for you.
            </p>
            <p>
              INVESTING IN CAPITAL RISK IS HIGHLY RISKY. CRYPTOCURRENCIES ARE VERY SPECULATIVE INVESTMENTS AND INVOLVE A HIGH DEGREE OF RISK AS WELL. INVESTORS MUST HAVE THE FINANCIAL ABILITY, SOPHISTICATION/EXPERIENCE AND WILLINGNESS TO BEAR THE RISKS OF AN INVESTMENT, AND A POTENTIAL TOTAL LOSS OF THEIR INVESTMENT. ANY OF THESE FINANCIAL PRODUCT SHOULD BE CONSIDERED A LONG-TERM INVESTMENT. CUSTOMERS SHOULD BE PREPARED TO HOLD  FOR UP TO TEN YEARS TO MAXIMIZE GAINS. See Risk Disclosures. By accessing the FAIRMINT website, you understand the information being presented is provided for informational purposes only and agree to comply with our Terms of Use and Privacy Policy. Information comes from various sources, including customers and third parties, but FAIRMINT cannot guarantee the accuracy and completeness of that information.
            </p>
          </div> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

export default Footer
