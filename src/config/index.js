
const config = {
  stage: {
    sentence      : 'Mainnet, FakeUSD',
    intercomAppId : 'zvhi5494',
    amplify       : {
      API: {
        endpoints: [
          {
            name     : 'lambda',
            endpoint : 'https://415paqijsl.execute-api.us-east-1.amazonaws.com/stage',
            service  : 'lambda',
            region   : 'us-east-1'
          },
        ]
      },
    },
    chain    : 'mainnet',
    hardfork : 'petersburg',
    chainId  : 1,
    web3Node : 'wss://nameless-cool-leaf.quiknode.io/7b70473b-9328-4df2-94c8-9720eef5afdb/T3fqkhDAniwXFPnRIfdIE2Ff8kZHNbQX_GWpV8VqwgDdRwG9c5cDfyIklxHd0_aP5x8ZlUc1C5jsN8INpzh9tw==/',
    corg     : {
      contractAddress: '0x9e9404849B9A6dd520bD6199AEe5CE7f76c09245',
    },
    operatorAddress : '0xF619d01F71F1a0775E7fdCa8BE21068d014412F8',
    berbix          : {
      clientId    : 'hsYi_kSS9qbFMTY_cK2QsS8KLfSbOnqu',
      templateKey : 'pAf9B38sV2Rz6fN53QgkTBOB913XAeXq'
    },
    fundLimit       : 100000,
    fundLimitText   : '$100K',
    fairmintAPIBase : 'https://api.fairmint.co/v1/',
    handshakeKey    : 'xWKJ96dTb80pLsR23'
  },
  dev: {
    sentence      : 'Ropsten, FakeUSD',
    intercomAppId : 'v7e5s2ll',
    amplify       : {
      API: {
        endpoints: [
          {
            name     : 'lambda',
            endpoint : 'https://rdv976g64m.execute-api.us-east-1.amazonaws.com/dev',
            service  : 'lambda',
            region   : 'us-east-1'
          },
        ]
      },
    },
    chain    : 'ropsten',
    hardfork : 'petersburg',
    chainId  : 3,
    web3Node : 'wss://ropsten.infura.io/ws/v3/c13019f552f542188c0b0cdfaeb76cc4',
    corg     : {
      contractAddress: '0xA47807BE67E76E7E464dc1f3cEB58790059785a7',
    },
    operatorAddress : '0x3952ce12818b72443baa87bc1840d2f3df355972',
    berbix          : {
      clientId    : 'zyGgzHw7NyhWO9zKG-iucngO9sjTO8ND',
      templateKey : 'pAf9B38sV2Rz6fN53QgkTBOB913XAeXq'
    },
    fundLimit       : 100000,
    fundLimitText   : '$100K',
    fairmintAPIBase : 'https://api.fairmint.co/v1',
    handshakeKey    : 'xWKJ96dTb80pLsR23'
  },
  common: {
    gaTrackingId : 'UA-133423124-1',
    fundETH      : '0.0007',
    gas          : 500000,
    gasPrice     : '2.1'
  },
}

const REACT_APP_STAGE = process.env.REACT_APP_STAGE || 'dev'

export default {
  ...config.common,
  ...config[REACT_APP_STAGE],
  ...process.env,
  REACT_APP_STAGE
}
