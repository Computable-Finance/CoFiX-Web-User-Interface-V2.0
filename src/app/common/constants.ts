export function getContractAddressListByNetwork(network: number): any {
  if (network === 1) {
    return {
      WETH9: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      CoFiToken: '0xBF4d534CfE1C293c9bb1cBaA01Bb17C8FF65b670',
      // 对应 NestPriceOracle，接手时规范，未改
      OracleMock: '0x94F36FAa6bB4f74009637292b09C355CcD3e80Eb',
      CofiXController: '0x1A53be16D7fAE6180692E9fd3d0C4AE90aD0a5f8',
      CofixFactory: '0xFb374D926E34Add1e5036ef3Edd5d9D698722e97',
      // CoFiXKTable:'0x75E360Be6248Bd46030C6818624a09403EF5eC21',
      CofixRouter: '0x84d9e80D3759AADB5658bcFFbC54Cd2Cf0008b81',
      CoFiXVaultForLP: '0xbc99A5e7764792cd1024fD5310e9867EE578c23D',
      CoFiStakingRewards: '0xf0F095E13b1D86C2C36812A64882565c8ec5f91B',
      CoFiXVaultForTrader: '0x8367f04C7d6c2E1cE9F68e77Cb850F09cfBAEB8D',
      HBTC: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    };
  } else if (network === 3) {
    return {
      USDT: '0x200506568C2980B4943B5EaA8713A5740eb2c98A',
      HBTC: '0xA674f71ce49CE7F298aea2F23D918d114965eb40',
      // NEST:'0xD287Bc43eCD3D892204aA3792165fe8728636E29',
      WETH9: '0x59b8881812Ac484Ab78b8fc7c10b2543e079a6C3',
      CoFiToken: '0xE68976a81572B185899205C7b8BCBD1515DF4f5b',
      OracleMock: '0x70B9b6F0e1E4073403cF7143b45a862fe73af3B9',
      CofiXController: '0xff460A541DC7Af7FeA7b98E0Ba5eF64C80B1409B',
      CofixFactory: '0xC85987c73300CFd1838da40F0A4b29bB64EAed8e',
      // CoFiXKTable:'0xe609B978635c7Bb8D22Ffc4Ec7f7a16615a3b1cA',
      CofixRouter: '0x66aa2AC8F6557B956AE144efe85feF860d848851',
      CoFiXVaultForLP: '0x7e6dCD3581d596fe5F628B77fd6784F10D09b43d',
      CoFiStakingRewards: '0xDe80d5423569Ea4104d127e14E3fC1BE0486531d',
      CoFiXVaultForTrader: '0x12Fc8391e7C868e7aa90C69E204C60f18aA0afab',
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

export const BLOCKNUMS_IN_A_DAY = 6171.4;
export const ETHER_DECIMALS = 18;

export const TOKENS = ['ETH', 'USDT', 'HBTC'];

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
