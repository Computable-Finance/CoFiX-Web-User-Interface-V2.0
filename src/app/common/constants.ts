export function getContractAddressListByNetwork(network: number): any {
  if (network === 1) {
    return {
      WETH9: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      CoFiToken: '0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1',
      // 对应 NestPriceOracle，接手时规范，未改
      OracleMock: '0x94F36FAa6bB4f74009637292b09C355CcD3e80Eb',
      CofiXController: '0x7e497Be7532CC4954D73c6dF93F016c53CC0C29a',
      CofixFactory: '0x66C64ecC3A6014733325a8f2EBEE46B4CA3ED550',
      // CoFiXKTable:'0x75E360Be6248Bd46030C6818624a09403EF5eC21',
      CofixRouter: '0x26aaD4D82f6c9FA6E34D8c1067429C986A055872',
      CoFiXVaultForLP: '0x6903b1C17A5A0A9484c7346E5c0956027A713fCF',
      CoFiStakingRewards: '0x0061c52768378b84306b2665f098c3e0b2C03308',
      CoFiXVaultForTrader: '0xE6183d3094a9e360B123Ec1330afAE76A74d1cbF',
      HBTC: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      NEST: '0x04abEdA201850aC0124161F037Efd70c74ddC74C',
    };
  } else if (network === 3) {
    return {
      USDT: '0x200506568C2980B4943B5EaA8713A5740eb2c98A',
      HBTC: '0xA674f71ce49CE7F298aea2F23D918d114965eb40',
      NEST: '0xD287Bc43eCD3D892204aA3792165fe8728636E29',
      WETH9: '0x59b8881812Ac484Ab78b8fc7c10b2543e079a6C3',
      CoFiToken: '0x72Fd35b1dB364db812A8E726891685A25a9135D3',
      // 对应 NestPriceOracle，接手时规范，未改
      OracleMock: '0x70B9b6F0e1E4073403cF7143b45a862fe73af3B9',
      CofiXController: '0x36f99d8500CB288c924B50cf4A081F4C3E6d48DD',
      CofixFactory: '0x8E636BDB79752BFa2C41285535852bbBDd50b2ca',
      // CoFiXKTable:'0xe609B978635c7Bb8D22Ffc4Ec7f7a16615a3b1cA',
      CofixRouter: '0xbeE8674291328D09831cAf96eFceaCDf53066B86',
      CoFiXVaultForLP: '0x2494853258c33A99581Abddc7b85b11D1D1885DF',
      CoFiStakingRewards: '0x2a603D9e8b3152B6e235c7eFA41dFc073764d96a',
      CoFiXVaultForTrader: '0xe901e7f88a377D01028aE947cFA3192b3c5f7587',
    };
  } else {
    return {
      WETH9: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      CoFiToken: '0xc2283C20a61847240d2eb10e6925d85bcaef89aE',
      OracleMock: '0x94F36FAa6bB4f74009637292b09C355CcD3e80Eb',
      CofiXController: '0x2f51563044d96105611Cdb5Bee621a5002Ee0264',
      CofixFactory: '0x155BDA3255115b244Fe3767a9eDC002dC76023ad',
      // CoFiXKTable:'0xe609B978635c7Bb8D22Ffc4Ec7f7a16615a3b1cA',
      CofixRouter: '0xA2B29F965b537a9D279f75E1498413248C265Ead',
      CoFiXVaultForLP: '0xF128802361580FB2A74574ddEd4E09F44f4Ec4cF',
      CoFiStakingRewards: '0xD16EeAfc4f614589eED0bc9294C1aE15F459831A',
      CoFiXVaultForTrader: '0x357811E0cA5AD4C66f1d44d05A3C73d98b4583CF',
      HBTC: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
      USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    };
  }
}

export const DB_VERSION = '202011021648';

export const BLOCKNUMS_IN_A_DAY = 6171.4;
export const ETHER_DECIMALS = 18;

export const TOKENS = ['ETH', 'USDT', 'HBTC', 'NEST'];

export const FOOTER_ITEMS = [
  {
    id: 'whitepaper',
    link: 'https://cofix.io/doc/CoFiX_White_Paper.pdf',
    img: 'white_icon.png',
  },
  {
    id: 'word',
    link: 'https://docs.cofix.io/',
    img: 'word.png',
  },
  {
    id: 'github',
    link: 'https://github.com/Computable-Finance',
    img: 'github_icon.png',
  },
  {
    id: 'community',
    link: 'https://t.me/CofiXProtocol',
    img: 'community.png',
  },
];

export const LANG_ITEMS = [
  { id: 'en', label: 'English', img: 'lang_en.png' },
  { id: 'zh', label: '中文', img: 'lang_ch.png' },
];
