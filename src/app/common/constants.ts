export function getContractAddressListByNetwork(network: number): any {
  if (network === 1) {
    return {
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      HBTC: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
      NEST: '0x04abEdA201850aC0124161F037Efd70c74ddC74C',
      WETH9: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      CoFiToken: '0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1',
      //  NestQuery
      OracleMock: '0xB5D2890c061c321A5B6A4a4254bb1522425BAF0A',
      CofiXController: '0xf471bFd6c0A1Ab79cAD54B9608652B85638ceD97',
      CofixFactory: '0x39816B841436a57729723d9DA127805755d2CB51',
      CofixRouter: '0x72A63055b9AA997A4311D0D068170e38F5455b82',
      CoFiXVaultForLP: '0x618B7b93b07Bf78D04B2e8FB2B1C3B48049F8ED5',
      CoFiStakingRewards: '0x3C41B1bEAf0a3c0929233009bb49cF00Fd2E8D07',
      CoFiXVaultForTrader: '0xb29A8d980E1408E487B9968f5E4f7fD7a9B0CaC5',
      CoFiXDAO: '0x278f5d08bEa1989BEfcC09A20ad60fB39702D556',
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
      CoFiXDAO: '0xF0BeE33D0db3514dFfC8dA41c81F9E7C2825944e',
    }
  } else if (network === 4) {
    return {
      USDT: '0xc82C867f9e25303C766e2ba83d512419223d4574',
      HBTC: '0xe089A4d2CBC409f30eb4E6c6661502ceDD5510b5',
      NEST: '0x2CFa7278ecf2DB7f6f97C07EefaC4aAD19b81d80',
      WETH9: '0x59b8881812Ac484Ab78b8fc7c10b2543e079a6C3',
      CoFiToken: '0x194c72dc659F884d806d5F5F6CA288bedAcaE519',
      // NestQuery
      OracleMock: '0x97F09D58a87B9a6f0cA1E69aCef77da3EFF8da0A',
      CofiXController: '0x4C73A1f379bD5bC28DB20f4d2D3df344497000BF',
      CofixFactory: '0xebfF4f1E7D2B904876fc53424E2E99A720a71963',
      CofixRouter: '0x59291fa0828290252d743F3A424B35B7aabf6aFF',
      CoFiXVaultForLP: '0x3d8470dA33f8cdEc90f8AcCF1643f9b5670B4823',
      CoFiStakingRewards: '0x551703F64E1B4F0E82f28E02B2bEfc7673046578',
      CoFiXVaultForTrader: '0xE81E2F1c77A3A2C8848494f423D3ff933954625A',
      CoFiXDAO: '0x95C411135F3C10341Ed81fDF2721Ed2223AC2aE2',
    }
  } else {
    throw new Error('Unknown Network!');
  }
}

export const DB_VERSION = '202105072050';

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
  // {
  //   id: 'v1.0',
  //   link: 'https://v1.cofix.io',
  // },
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
