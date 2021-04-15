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
      CoFiToken: '0xb1f95f76038d6f5BAD85aE87a1678Ae9bd033683',
      // NestQuery
      OracleMock: '0x96534E2d0a6c825a2eeD79C7bD3dFce39D5fA605',
      CofiXController: '0xd807a6c7B09fef8DAeFd2641cB064ddD667A61D8',
      CofixFactory: '0x54db39Ed277CE324874D3734c7F597D2dB0494bE',
      CofixRouter: '0xB58eBBd96Fe456538a680CE6FC65C07e51A62edF',
      CoFiXVaultForLP: '0x01bE7B04bdC0Bd6197D238b8d1F6B990C8eaFA42',
      CoFiStakingRewards: '0x551703F64E1B4F0E82f28E02B2bEfc7673046578',
      CoFiXVaultForTrader: '0x3EEF6Eaf726F74e65396cE08405F236ae71b89C4',
    };
  } else {
    throw new Error('Unknown Network!');
  }
}

export const DB_VERSION = '202104011437';

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
  {
    id: 'v1.0',
    link: 'https://v1.cofix.io',
  },
];

export const LANG_ITEMS = [
  { id: 'en', label: 'English', img: 'lang_en.png' },
  { id: 'zh', label: '中文', img: 'lang_ch.png' },
];

export const DEX_TYPE_COFIX = 0;
export const DEX_TYPE_UNISWAP = 1;

export const NETWORKS = [
  { id: 3, name: 'Ropsten' },
  { id: 42, name: 'Kovan' },
  { id: 4, name: 'Rinkeby' },
  { id: 5, name: 'Görli' },
];
