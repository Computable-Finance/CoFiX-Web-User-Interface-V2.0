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
      USDT: '0xc82C867f9e25303C766e2ba83d512419223d4574',
      HBTC: '0xe089A4d2CBC409f30eb4E6c6661502ceDD5510b5',
      NEST: '0x2CFa7278ecf2DB7f6f97C07EefaC4aAD19b81d80',
      WETH9: '0x59b8881812Ac484Ab78b8fc7c10b2543e079a6C3',
      CoFiToken: '0x7E03E60925D27D6DeF4F05E725f5fD2f03BDbfD5',
      // NestQuery
      OracleMock: '0x406C82f4F116F4FAD75bb47A142C9B5Fb213133C',
      CofiXController: '0x4C73A1f379bD5bC28DB20f4d2D3df344497000BF',
      CofixFactory: '0xebfF4f1E7D2B904876fc53424E2E99A720a71963',
      CofixRouter: '0x59291fa0828290252d743F3A424B35B7aabf6aFF',
      CoFiXVaultForLP: '0x3d8470dA33f8cdEc90f8AcCF1643f9b5670B4823',
      CoFiStakingRewards: '0x551703F64E1B4F0E82f28E02B2bEfc7673046578',
      CoFiXVaultForTrader: '0xE81E2F1c77A3A2C8848494f423D3ff933954625A',
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
