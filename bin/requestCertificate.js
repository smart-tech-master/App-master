/* eslint-disable import/no-extraneous-dependencies */
const AWS          = require('aws-sdk')
// const deployConfig = require('../config/deploy.json')
// eslint-disable-next-line import/no-unresolved
const deployConfig = require('../config/deploy.json')
/* eslint-enable */

AWS.config.update({ region: 'us-east-1' })

const acm = new AWS.ACM()

const params = {
  DomainName       : deployConfig.domain,
  ValidationMethod : 'DNS'
}

async function requestCertificate() {
  // Request certificate
  console.log('Requesting a public certificate...')
  const { CertificateArn } = await acm.requestCertificate(params).promise()

  // Get CNAME record
  console.log('Getting CNAME record...')
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 7000)
  })
  const certificate = await acm.describeCertificate({ CertificateArn }).promise()
  const { ResourceRecord } = certificate.Certificate.DomainValidationOptions[0]

  // Print instructions
  console.log('')
  console.log('Add the following CNAME record to the DNS configuration for your domain. The procedure for adding CNAME records depends on your DNS service Provider.')
  console.log('')

  // Name
  console.log('Name  :', ResourceRecord.Name)

  // Type
  console.log('Type  :', ResourceRecord.Type)

  // Value
  console.log('Value :', ResourceRecord.Value)

  console.log('')
}

requestCertificate()
