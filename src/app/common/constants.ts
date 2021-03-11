export function getContractAddressListByNetwork(network: number): any {
  if (network === 1) {
    return {
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      HBTC: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
      NEST: '0x04abEdA201850aC0124161F037Efd70c74ddC74C',
      WETH9: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      CoFiToken: '0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1',
      //  NestQuery
      OracleMock: '0x3bf046c114385357838D9cAE9509C6fBBfE306d2',
      CofiXController: '0xc6f45eB40609c9CD30c8750A95042De1b8B1DBFf',
      CofixFactory: '0x66C64ecC3A6014733325a8f2EBEE46B4CA3ED550',
      // CoFiXKTable:'0x75E360Be6248Bd46030C6818624a09403EF5eC21',
      CofixRouter: '0x5C35BaDebD40308e409df891aC56d17C8625c2bC',
      CoFiXVaultForLP: '0x6903b1C17A5A0A9484c7346E5c0956027A713fCF',
      CoFiStakingRewards: '0x0061c52768378b84306b2665f098c3e0b2C03308',
      CoFiXVaultForTrader: '0xE6183d3094a9e360B123Ec1330afAE76A74d1cbF',
    };
  } else if (network === 3) {
    return {
      USDT: '0x200506568C2980B4943B5EaA8713A5740eb2c98A',
      HBTC: '0xA674f71ce49CE7F298aea2F23D918d114965eb40',
      NEST: '0xD287Bc43eCD3D892204aA3792165fe8728636E29',
      WETH9: '0x59b8881812Ac484Ab78b8fc7c10b2543e079a6C3',
      CoFiToken: '0x10b1EbE50007EA4340838A1Dfff77a2E6DA037B0',
      // NestQuery
      OracleMock: '0xf9b3Cb3Dc53962Af692FBf785fE82d5f9781368b',
      CofiXController: '0xb2a1308183eCDC14Ca455C7af35b1b5d39fdB6F4',
      CofixFactory: '0x068Bd34275e516759fb834b432622Ec7137fdFb4',
      // CoFiXKTable:'0xe609B978635c7Bb8D22Ffc4Ec7f7a16615a3b1cA',
      CofixRouter: '0xA0530BDa278Fbd03bCc1DbE4b63dbf9F1Fb2ABCd',
      CoFiXVaultForLP: '0xAD1A5a9C40b58Dc5Bed7131152bDa8B649616573',
      CoFiStakingRewards: '0x1D1D0b886a26A017190eCAa52f3F67BD5E1A484F',
      CoFiXVaultForTrader: '0x22E7A8460cF3C6f1789425399eed92c6c6529D18',
    };
  } else {
    throw new Error('Unknown Network!');
  }
}

export const DB_VERSION = '202103111053';

export const BLOCKNUMS_IN_A_DAY = 6171.4;
export const ETHER_DECIMALS = 18;

export const TOKENS = ['ETH', 'USDT', 'HBTC'];

export const COFIX_TOKENS = ['CoFi', 'XTokens', 'ETH'];

export const PAIRSWITCH_TOKENS = ['USDT', 'HBTC', 'NEST'];

export const FOOTER_ITEMS = [
  {
    id: 'whitepaper',
    link: 'https://cofix.io/doc/CoFiX_White_Paper.pdf',
  },
  {
    id: 'word',
    link: 'https://docs.cofix.io/',
  },
  {
    id: 'github',
    link: 'https://github.com/Computable-Finance',
  },
  {
    id: 'community',
    link: 'https://t.me/CofiXProtocol',
  },
];

export const LANG_ITEMS = [
  { id: 'en', label: 'English', img: 'lang_en.png' },
  { id: 'zh', label: '中文', img: 'lang_ch.png' },
];

export const DEX_TYPE_COFIX = 0;
export const DEX_TYPE_UNISWAP = 1;
