/* eslint-disable import/no-extraneous-dependencies */
const AWS          = require('aws-sdk')
const walk         = require('walkdir')
const path         = require('path')
const fs           = require('fs')
const mime         = require('mime-types')
const deployConfig = require('../config/deploy.json')
/* eslint-enable */

AWS.config.update({ region: 'us-east-1' })
const s3 = new AWS.S3()

const rootFolder = path.resolve(__dirname, '../')
const bucketName = 'invest.fairmint.' + deployConfig.name

async function uploadBuild() {
  console.log('Uploading build folder to S3 bucket')

  const filePaths = walk.sync('./build').filter(
    filePath => fs.statSync(filePath).isFile()
  )
  for (const filePath of filePaths) {
    const Key = filePath.replace(`${rootFolder}/build/`, '')
    console.log(Key)
    await s3.putObject({
      Key,
      Bucket      : bucketName,
      Body        : fs.readFileSync(filePath),
      ContentType : mime.lookup(filePath)
    }).promise()
  }
}

async function setBucketWebsiteConfiguration() {
  console.log('Setting bucket configuration for static website hosting')

  const staticHostParams = {
    Bucket               : bucketName,
    WebsiteConfiguration : {
      ErrorDocument: {
        Key: 'index.html'
      },
      IndexDocument: {
        Suffix: 'index.html'
      },
    }
  }
  await s3.putBucketWebsite(staticHostParams).promise()
}

async function setBucketPolicy() {
  console.log('Granting Read-Only Permission to an Anonymous User')

  const readOnlyAnonUserPolicy = {
    Version   : '2012-10-17',
    Statement : [{
      Sid       : 'AddPerm',
      Effect    : 'Allow',
      Principal : '*',
      Action    : ['s3:GetObject'],
      Resource  : [`arn:aws:s3:::${bucketName}/*`]
    }]
  }

  // Convert policy JSON into string and assign into params
  const bucketPolicyParams = {
    Bucket : bucketName,
    Policy : JSON.stringify(readOnlyAnonUserPolicy)
  }

  // Set Bucket Policy
  await s3.putBucketPolicy(bucketPolicyParams).promise()
}

async function getCertificate() {
  console.log('Checking certificate...')

  const acm = new AWS.ACM()
  const { CertificateSummaryList } = await acm.listCertificates().promise()
  const summaryCert = CertificateSummaryList.find(c => c.DomainName === deployConfig.domain)

  // There is no certificate
  if (!summaryCert) {
    console.log('You need to request a new public certificate.')
    return false
  }

  const { Certificate } = await acm.describeCertificate({ CertificateArn: summaryCert.CertificateArn }).promise()

  // Certificate is not issued yet
  if (Certificate.Status !== 'ISSUED') {
    console.log('Certificate is not issued yet.')
    console.log('Please try again a few minutes later.')
    return false
  }

  // Return Certificate
  return Certificate
}

async function createWebDistribution(Certificate) {
  console.log('Creating CloudFront Web Distribution...')

  const params = {
    DistributionConfig: {
      CallerReference      : bucketName,
      Comment              : `CloudFront distribution for ${bucketName}`,
      DefaultCacheBehavior : {
        TargetOriginId  : bucketName,
        TrustedSigners  : { Enabled: false, Quantity: 0, Items: [] },
        ForwardedValues : {
          Cookies     : { Forward: 'none', },
          QueryString : false,
        },
        MinTTL               : 0,
        ViewerProtocolPolicy : 'allow-all',
        AllowedMethods       : {
          Items         : ['GET', 'HEAD', 'OPTIONS'],
          Quantity      : 3,
          CachedMethods : {
            Items    : ['GET', 'HEAD'],
            Quantity : 2
          }
        },
      },
      Enabled : true,
      Origins : {
        Items: [{
          DomainName         : `${bucketName}.s3-website-us-east-1.amazonaws.com`,
          Id                 : bucketName,
          CustomOriginConfig : {
            HTTPPort             : 80,
            HTTPSPort            : 443,
            OriginProtocolPolicy : 'http-only',
            OriginSslProtocols   : {
              Quantity : 3,
              Items    : ['TLSv1', 'TLSv1.1', 'TLSv1.2']
            },
            OriginReadTimeout      : 30,
            OriginKeepaliveTimeout : 5
          }
        }],
        Quantity: 1
      },
      Aliases: {
        Quantity : 1,
        Items    : [deployConfig.domain]
      },
      ViewerCertificate: {
        ACMCertificateArn      : Certificate.CertificateArn,
        SSLSupportMethod       : 'sni-only',
        MinimumProtocolVersion : 'TLSv1.1_2016',
      },
    }
  }
  const cloudfront = new AWS.CloudFront()
  const { Distribution } = await cloudfront.createDistribution(params).promise()

  // Print instructions
  console.log('')
  console.log('Add the following CNAME record to the DNS configuration for your domain. The procedure for adding CNAME records depends on your DNS service Provider.')
  console.log('')

  // Name
  console.log('Name  :', deployConfig.domain)

  // Type
  console.log('Type  :', 'CNAME')

  // Value
  console.log('Value :', Distribution.DomainName + '.')

  console.log('')
}

async function firstDeploy() {
  // Check certificate
  const Certificate = await getCertificate()
  if (!Certificate) {
    return
  }

  // Create the bucket
  console.log(`Creating new S3 bucket with the name of ${bucketName}`)
  await s3.createBucket({
    Bucket : bucketName,
    ACL    : 'public-read'
  }).promise()

  // Upload build folder to the bucket
  await uploadBuild()

  // Set Bucket Policy
  await setBucketPolicy()

  // Set a Bucket Website Configuration
  await setBucketWebsiteConfiguration()

  // Create cloudfront web distribution
  await createWebDistribution(Certificate)
}

async function deploy() {
  const { Buckets } = await s3.listBuckets().promise()

  if (Buckets.find(b => b.Name === bucketName)) {
    // Upload build folder to the bucket
    await uploadBuild()
  } else {
    // Do deploy
    await firstDeploy()
  }
}

deploy()
