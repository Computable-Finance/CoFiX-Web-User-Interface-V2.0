export function getTokenListByQuery(chainId, offset, max, queryToken = null) {
  const tokenList = tokens.filter(
    (token) =>
      token.chainId === chainId &&
      (queryToken ? token.symbol.indexOf(queryToken.toUpperCase()) > -1 : true)
  );
  const total = tokenList.length;
  const dataList = tokenList.slice(offset, offset + max);
  return { total, dataList };
}

export function tokenList(chainId) {
  return tokens.filter((token) => token.chainId === chainId);
}

export function tokenLogo(tokenName: string) {
  return tokens.find((token) => token.symbol === tokenName)?.logoURI;
}

export function addToken(chainId, address, symbol, decimals) {
  const newToken = {
    chainId,
    address,
    name: symbol,
    symbol,
    decimals,
    logoURI: tokenLogo(symbol) || './assets/images/icon/UNKNOWN.png',
  };
  tokens.push(newToken);
  return newToken;
}

const tokens = [
  {
    chainId: 3,
    address: undefined,
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: './assets/images/icon/ETH.png',
  },
  {
    chainId: 1,
    address: undefined,
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    logoURI: './assets/images/icon/ETH.png',
  },
  {
    chainId: 3,
    address: '0x200506568C2980B4943B5EaA8713A5740eb2c98A',
    name: 'Tether',
    symbol: 'USDT',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707',
  },
  {
    chainId: 3,
    address: '0xA674f71ce49CE7F298aea2F23D918d114965eb40',
    name: 'Huobi BTC',
    symbol: 'HBTC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12407/small/Unknown-5.png?1599624896',
  },
  {
    chainId: 3,
    address: '0xD287Bc43eCD3D892204aA3792165fe8728636E29',
    name: 'Nest Protocol',
    symbol: 'NEST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11284/small/52954052.png?1589868539',
  },
  // the following is copyed from token list of coingecko
  // https://tokens.coingecko.com/uniswap/all.json
  {
    chainId: 1,
    address: '0x63f88a2298a5c4aee3c216aa6d926b184a4b2437',
    name: 'GameCredits',
    symbol: 'GAME',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/193/small/XlQmXoU.png?1595304945',
  },
  {
    chainId: 1,
    address: '0x3505f494c3f0fed0b594e01fa41dd3967645ca39',
    name: 'Swarm Fund',
    symbol: 'SWM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/197/small/swarm.jpg?1547033949',
  },
  {
    chainId: 1,
    address: '0x221657776846890989a759ba2973e427dff5c9bb',
    name: 'Augur',
    symbol: 'REP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/309/small/REP.png?1596339859',
  },
  {
    chainId: 1,
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    name: 'Tether',
    symbol: 'USDT',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707',
  },
  {
    chainId: 1,
    address: '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a',
    name: 'DigixDAO',
    symbol: 'DGD',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/397/small/dgd.png?1547034124',
  },
  {
    chainId: 1,
    address: '0xaec2e87e0a235266d9c5adc9deb4b2e29b54d009',
    name: 'SingularDTV',
    symbol: 'SNGLS',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/521/small/singulardtv.png?1547034199',
  },
  {
    chainId: 1,
    address: '0xabc430136a4de71c9998242de8c1b4b97d2b9045',
    name: 'Veros',
    symbol: 'VRS',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/539/small/vrs_logo.png?1583913100',
  },
  {
    chainId: 1,
    address: '0x7dd9c5cba05e151c895fde1cf355c9a1d5da6429',
    name: 'Golem',
    symbol: 'GLM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/542/small/Golem_Submark_Positive_RGB.png?1606392013',
  },
  {
    chainId: 1,
    address: '0x3d658390460295fb963f54dc0899cfb1c30776df',
    name: 'Circuits of Value',
    symbol: 'COVAL',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/588/small/coval-logo.png?1599493950',
  },
  {
    chainId: 1,
    address: '0x485d17a6f1b8780392d53d64751824253011a260',
    name: 'chrono tech',
    symbol: 'TIME',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/604/small/TIMEsymbol200x200.png?1572093177',
  },
  {
    chainId: 1,
    address: '0xec67005c4e498ec7f55e092bd1d35cbc47c91892',
    name: 'Melon',
    symbol: 'MLN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/605/small/melon.png?1547034295',
  },
  {
    chainId: 1,
    address: '0xcb94be6f13a1182e4a4b6140cb7bf2025d28e41b',
    name: 'WeTrust',
    symbol: 'TRST',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/645/small/wetrust.png?1547034370',
  },
  {
    chainId: 1,
    address: '0x607f4c5bb672230e8672085532f7e901544a7375',
    name: 'iExec RLC',
    symbol: 'RLC',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/646/small/pL1VuXm.png?1604543202',
  },
  {
    chainId: 1,
    address: '0x667088b212ce3d06a1b553a7221e1fd19000d9af',
    name: 'Wings',
    symbol: 'WINGS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/648/small/wings.png?1548760631',
  },
  {
    chainId: 1,
    address: '0x6810e776880c02933d47db1b9fc05908e5386b96',
    name: 'Gnosis',
    symbol: 'GNO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/662/small/logo_square_simple_300px.png?1609402668',
  },
  {
    chainId: 1,
    address: '0xaaaf91d9b90df800df4f55c205fd6989c977e73a',
    name: 'Monolith',
    symbol: 'TKN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/675/small/Monolith.png?1566296607',
  },
  {
    chainId: 1,
    address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    name: 'Basic Attention Tok',
    symbol: 'BAT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/677/small/basic-attention-token.png?1547034427',
  },
  {
    chainId: 1,
    address: '0xa117000000f279d81a1d3cc75430faa017fa5a2e',
    name: 'Aragon',
    symbol: 'ANT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/681/small/JelZ58cv_400x400.png?1601449653',
  },
  {
    chainId: 1,
    address: '0xf7b098298f7c69fc14610bf71d5e02c60792894c',
    name: 'Guppy',
    symbol: 'GUP',
    decimals: 3,
    logoURI:
      'https://assets.coingecko.com/coins/images/683/small/matchpool.png?1547034437',
  },
  {
    chainId: 1,
    address: '0x426ca1ea2406c07d75db9585f22781c096e3d0e0',
    name: 'Minereum',
    symbol: 'MNE',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/702/small/mne.png?1587615060',
  },
  {
    chainId: 1,
    address: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
    name: 'Bancor Network Toke',
    symbol: 'BNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/736/small/bancor.png?1547034477',
  },
  {
    chainId: 1,
    address: '0x8ae4bf2c33a8e667de34b54938b0ccd03eb8cc06',
    name: 'Patientory',
    symbol: 'PTOY',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/746/small/patientory.png?1548330777',
  },
  {
    chainId: 1,
    address: '0x1776e1f26f98b1a5df9cd347953a26dd3cb46671',
    name: 'Numeraire',
    symbol: 'NMR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/752/small/numeraire.png?1592538976',
  },
  {
    chainId: 1,
    address: '0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a',
    name: 'Populous',
    symbol: 'PPT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/753/small/populous.png?1548331905',
  },
  {
    chainId: 1,
    address: '0x4cf89ca06ad997bc732dc876ed2a7f26a9e7f361',
    name: 'Mysterium',
    symbol: 'MYST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/757/small/mysterium.png?1547034503',
  },
  {
    chainId: 1,
    address: '0x419d0d8bdd9af5e606ae2232ed285aff190e711b',
    name: 'FunFair',
    symbol: 'FUN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/761/small/funfair.png?1592404368',
  },
  {
    chainId: 1,
    address: '0xf433089366899d83a9f26a773d59ec7ecf30355e',
    name: 'Metal',
    symbol: 'MTL',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/763/small/Metal.png?1592195010',
  },
  {
    chainId: 1,
    address: '0x0affa06e7fbe5bc9a764c979aa66e8256a631f02',
    name: 'Polybius',
    symbol: 'PLBT',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/766/small/polybius.png?1547034516',
  },
  {
    chainId: 1,
    address: '0xb97048628db6b661d4c2aa833e95dbe1a905b280',
    name: 'TenX',
    symbol: 'PAY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/775/small/TenX-Icon-CircleBlack.png?1553766360',
  },
  {
    chainId: 1,
    address: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    name: 'OMG Network',
    symbol: 'OMG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/776/small/OMG_Network.jpg?1591167168',
  },
  {
    chainId: 1,
    address: '0x744d70fdbe2ba4cf95131626614a1763df805b9e',
    name: 'Status',
    symbol: 'SNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/779/small/status.png?1548610778',
  },
  {
    chainId: 1,
    address: '0x41e5560054824ea6b0732e656e3ad64e20e94e45',
    name: 'Civic',
    symbol: 'CVC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/788/small/civic.png?1547034556',
  },
  {
    chainId: 1,
    address: '0x5af2be193a6abca9c8817001f45744777db30756',
    name: 'Voyager Token',
    symbol: 'VGX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/794/small/Voyager-vgx.png?1575693595',
  },
  {
    chainId: 1,
    address: '0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098',
    name: 'Santiment Network T',
    symbol: 'SAN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/797/small/santiment-network-token.png?1547034571',
  },
  {
    chainId: 1,
    address: '0xe3818504c1b32bf1557b16c238b2e01fd3149c17',
    name: 'Pillar',
    symbol: 'PLR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/809/small/PLR_Token.png?1595237935',
  },
  {
    chainId: 1,
    address: '0xfca47962d45adfdfd1ab2d972315db4ce7ccf094',
    name: 'iXledger',
    symbol: 'IXT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/814/small/ixledger.png?1547034602',
  },
  {
    chainId: 1,
    address: '0x68aa3f232da9bdc2343465545794ef3eea5209bd',
    name: 'Mothership',
    symbol: 'MSP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/815/small/mothership.png?1547034603',
  },
  {
    chainId: 1,
    address: '0xade00c28244d5ce17d72e40330b1c318cd12b7c3',
    name: 'AdEx',
    symbol: 'ADX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/847/small/adex.png?1547034643',
  },
  {
    chainId: 1,
    address: '0xf8e386eda857484f5a12e4b5daa9984e06e73705',
    name: 'Indorse',
    symbol: 'IND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/848/small/indorse_token.png?1547034644',
  },
  {
    chainId: 1,
    address: '0x0abdace70d3790235af448c88547603b945604ea',
    name: 'district0x',
    symbol: 'DNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/849/small/district0x.png?1547223762',
  },
  {
    chainId: 1,
    address: '0x08d32b0da63e2c3bcf8019c9c5d849d7a9d791e6',
    name: 'Dentacoin',
    symbol: 'DCN',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/850/small/dentacoin.png?1547034647',
  },
  {
    chainId: 1,
    address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    name: '0x',
    symbol: 'ZRX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/863/small/0x.png?1547034672',
  },
  {
    chainId: 1,
    address: '0x514910771af9ca656af840dff83e8264ecf986ca',
    name: 'Chainlink',
    symbol: 'LINK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700',
  },
  {
    chainId: 1,
    address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
    name: 'Decentraland',
    symbol: 'MANA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png?1550108745',
  },
  {
    chainId: 1,
    address: '0xc0eb85285d83217cd7c891702bcbc0fc401e2d9d',
    name: 'Hiveterminal token',
    symbol: 'HVN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/899/small/Hiveterminal_token.jpg?1547034726',
  },
  {
    chainId: 1,
    address: '0x0d88ed6e74bbfd96b831231638b66c05571e824f',
    name: 'Aventus',
    symbol: 'AVT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/901/small/aventus.png?1547034729',
  },
  {
    chainId: 1,
    address: '0x0e0989b1f9b8a38983c2ba8053269ca62ec9b195',
    name: 'Po et',
    symbol: 'POE',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/910/small/poet.png?1548331583',
  },
  {
    chainId: 1,
    address: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
    name: 'Loopring',
    symbol: 'LRC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/913/small/LRC.png?1572852344',
  },
  {
    chainId: 1,
    address: '0x08f5a9235b08173b7569f83645d2c7fb55e8ccd8',
    name: 'Tierion',
    symbol: 'TNT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/923/small/tierion.png?1547034767',
  },
  {
    chainId: 1,
    address: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
    name: 'Kyber Network',
    symbol: 'KNC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/947/small/kyber-logo.png?1547034806',
  },
  {
    chainId: 1,
    address: '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac',
    name: 'Storj',
    symbol: 'STORJ',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/949/small/storj.png?1547034811',
  },
  {
    chainId: 1,
    address: '0xe814aee960a85208c3db542c53e7d4a6c8d5f60f',
    name: 'Chronologic',
    symbol: 'DAY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/951/small/Chronologic-network.png?1547034815',
  },
  {
    chainId: 1,
    address: '0x4156d3342d5c385a87d264f90653733592000581',
    name: 'SALT',
    symbol: 'SALT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/962/small/salt.png?1548608746',
  },
  {
    chainId: 1,
    address: '0xc96df921009b790dffca412375251ed1a2b75c60',
    name: 'Ormeus Coin',
    symbol: 'ORME',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/964/small/ORMEUS_logo.png?1606557243',
  },
  {
    chainId: 1,
    address: '0xc12d1c73ee7dc3615ba4e37e4abfdbddfa38907e',
    name: 'KickToken',
    symbol: 'KICK',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/981/small/kick.png?1568643013',
  },
  {
    chainId: 1,
    address: '0xa8006c4ca56f24d6836727d106349320db7fef82',
    name: 'Internxt',
    symbol: 'INXT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/986/small/round.png?1602484873',
  },
  {
    chainId: 1,
    address: '0xdd6c68bb32462e01705011a4e2ad1a60740f217f',
    name: 'Hubii Network',
    symbol: 'HBT',
    decimals: 15,
    logoURI:
      'https://assets.coingecko.com/coins/images/994/small/hubii-network.png?1547744064',
  },
  {
    chainId: 1,
    address: '0xf3db5fa2c66b7af3eb0c0b782510816cbe4813b8',
    name: 'Everex',
    symbol: 'EVX',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/997/small/everex.png?1548125695',
  },
  {
    chainId: 1,
    address: '0xc42209accc14029c1012fb5680d95fbd6036e2a0',
    name: 'PayPie',
    symbol: 'PPP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/999/small/paypie.png?1548330825',
  },
  {
    chainId: 1,
    address: '0xea610b1153477720748dc13ed378003941d84fab',
    name: 'ALIS',
    symbol: 'ALIS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1003/small/alis.png?1547034909',
  },
  {
    chainId: 1,
    address: '0xba2184520a1cc49a6159c57e61e1844e085615b6',
    name: 'HelloGold',
    symbol: 'HGT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/1005/small/hellogold.png?1547743862',
  },
  {
    chainId: 1,
    address: '0xd4c435f5b09f855c3317c8524cb1f586e42795fa',
    name: 'Cindicator',
    symbol: 'CND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1006/small/cindicator.png?1547034913',
  },
  {
    chainId: 1,
    address: '0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4',
    name: 'Enigma',
    symbol: 'ENG',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/1007/small/enigma-logo.png?1547034914',
  },
  {
    chainId: 1,
    address: '0xced4e93198734ddaff8492d525bd258d49eb388e',
    name: 'Eidoo',
    symbol: 'EDO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1018/small/mark-color-onBright.png?1557386214',
  },
  {
    chainId: 1,
    address: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
    name: 'AirSwap',
    symbol: 'AST',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/1019/small/AST.png?1547034939',
  },
  {
    chainId: 1,
    address: '0x7d4b8cce0591c9044a22ee543533b72e976e36c3',
    name: 'Change',
    symbol: 'CAG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1021/small/change.png?1547034946',
  },
  {
    chainId: 1,
    address: '0x8f8221afbb33998d8584a2b05749ba73c37a938a',
    name: 'Request',
    symbol: 'REQ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1031/small/Request_icon.png?1550832088',
  },
  {
    chainId: 1,
    address: '0x539efe69bcdd21a83efd9122571a64cc25e0282b',
    name: 'Blue Protocol',
    symbol: 'BLUE',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/1036/small/blue-protocol.jpg?1547034969',
  },
  {
    chainId: 1,
    address: '0x957c30ab0426e0c93cd8241e2c60392d08c6ac8e',
    name: 'Modum',
    symbol: 'MOD',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/1040/small/modum.png?1548085261',
  },
  {
    chainId: 1,
    address: '0x4dc3643dbc642b72c158e7f3d2ff232df61cb6ce',
    name: 'Ambrosus',
    symbol: 'AMB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1041/small/_nSEjidJ_400x400.jpg?1593158410',
  },
  {
    chainId: 1,
    address: '0xe469c4473af82217b30cf17b10bcdb6c8c796e75',
    name: 'EXRNchain',
    symbol: 'EXRN',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/1049/small/exrnchain.png?1547395257',
  },
  {
    chainId: 1,
    address: '0xf970b8e36e23f7fc3fd752eea86f8be8d83375a6',
    name: 'Ripio Credit Networ',
    symbol: 'RCN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1057/small/ripio-credit-network.png?1548608361',
  },
  {
    chainId: 1,
    address: '0xac3211a5025414af2866ff09c23fc18bc97e79b1',
    name: 'Dovu',
    symbol: 'DOV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1072/small/dovu.png?1547035027',
  },
  {
    chainId: 1,
    address: '0xefd720c94659f2ccb767809347245f917a145ed8',
    name: 'Quoxent',
    symbol: 'QUO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1084/small/Quoxent_Logo_Final_-_NO_TEXT.png?1581412910',
  },
  {
    chainId: 1,
    address: '0xae4f56f072c34c0a65b3ae3e4db797d831439d93',
    name: 'Gimli',
    symbol: 'GIM',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/1100/small/Gimli-Token.png?1547035075',
  },
  {
    chainId: 1,
    address: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
    name: 'Enjin Coin',
    symbol: 'ENJ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1102/small/enjin-coin-logo.png?1547035078',
  },
  {
    chainId: 1,
    address: '0x595832f8fc6bf59c85c527fec3740a1b7a361269',
    name: 'Power Ledger',
    symbol: 'POWR',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/1104/small/power-ledger.png?1547035082',
  },
  {
    chainId: 1,
    address: '0x12b19d3e2ccc14da04fae33e63652ce469b3f2fd',
    name: 'Grid ',
    symbol: 'GRID',
    decimals: 12,
    logoURI:
      'https://assets.coingecko.com/coins/images/1106/small/grid.png?1547743150',
  },
  {
    chainId: 1,
    address: '0x78b7fada55a64dd895d8c8c35779dd8b67fa8a05',
    name: 'Atlant',
    symbol: 'ATL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1108/small/atlant.png?1547035089',
  },
  {
    chainId: 1,
    address: '0x0cf0ee63788a0849fe5297f3407f701e122cc023',
    name: 'Streamr DATAcoin',
    symbol: 'DATA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1115/small/streamr.png?1547035101',
  },
  {
    chainId: 1,
    address: '0xc813ea5e3b48bebeedb796ab42a30c5599b01740',
    name: 'Autonio',
    symbol: 'NIOX',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/1122/small/NewLogo.png?1597298450',
  },
  {
    chainId: 1,
    address: '0x0c37bcf456bc661c14d596683325623076d7e283',
    name: 'Aeron',
    symbol: 'ARNX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1124/small/ARNX-token-logo-256x256.png?1602652111',
  },
  {
    chainId: 1,
    address: '0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6',
    name: 'Raiden Network Toke',
    symbol: 'RDN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1132/small/raiden-logo.jpg?1547035131',
  },
  {
    chainId: 1,
    address: '0xc3761eb917cd790b30dad99f6cc5b4ff93c4f9ea',
    name: 'ERC20',
    symbol: 'ERC20',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1141/small/erc20.png?1547035146',
  },
  {
    chainId: 1,
    address: '0x3597bfd533a99c9aa083587b074434e61eb0a258',
    name: 'Dent',
    symbol: 'DENT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/1152/small/gLCEA2G.png?1604543239',
  },
  {
    chainId: 1,
    address: '0xf4134146af2d511dd5ea8cdb1c4ac88c57d60404',
    name: 'SunContract',
    symbol: 'SNC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1166/small/suncontract.png?1548611174',
  },
  {
    chainId: 1,
    address: '0xea097a2b1db00627b2fa17460ad260c016016977',
    name: 'Upfiring',
    symbol: 'UFR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1170/small/upfiring.png?1548759693',
  },
  {
    chainId: 1,
    address: '0x103c3a209da59d3e7c4a89307e66521e081cfdf0',
    name: 'Genesis Vision',
    symbol: 'GVT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1173/small/Genesis-vision.png?1558045005',
  },
  {
    chainId: 1,
    address: '0x82b0e50478eeafde392d45d1259ed1071b6fda81',
    name: 'EncrypGen',
    symbol: 'DNA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1215/small/encrypgen.png?1547393601',
  },
  {
    chainId: 1,
    address: '0x99ea4db9ee77acd40b119bd1dc4e33e1c070b80d',
    name: 'Quantstamp',
    symbol: 'QSP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1219/small/0_E0kZjb4dG4hUnoDD_.png?1604815917',
  },
  {
    chainId: 1,
    address: '0x55648de19836338549130b1af587f16bea46f66b',
    name: 'Pebbles',
    symbol: 'PBL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1224/small/publica.png?1548607428',
  },
  {
    chainId: 1,
    address: '0x42d6622dece394b54999fbd73d108123806f6a18',
    name: 'SpankChain',
    symbol: 'SPANK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1226/small/spankchain.png?1548610811',
  },
  {
    chainId: 1,
    address: '0x177d39ac676ed1c67a2b268ad7f1e58826e5b0af',
    name: 'Blox',
    symbol: 'CDT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1231/small/Blox_Staking_Logo_2.png?1609117544',
  },
  {
    chainId: 1,
    address: '0x2e071d2966aa7d8decb1005885ba1977d6038a65',
    name: 'Etheroll',
    symbol: 'DICE',
    decimals: 16,
    logoURI:
      'https://assets.coingecko.com/coins/images/1232/small/etheroll.png?1548125481',
  },
  {
    chainId: 1,
    address: '0x5d60d8d7ef6d37e16ebabc324de3be57f135e0bc',
    name: 'MyBit Token',
    symbol: 'MYB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1240/small/mybit.png?1547035264',
  },
  {
    chainId: 1,
    address: '0xd8912c10681d8b21fd3742244f44658dba12264e',
    name: 'Pluton',
    symbol: 'PLU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1241/small/pluton.png?1548331624',
  },
  {
    chainId: 1,
    address: '0xf04a8ac553fcedb5ba99a64799155826c136b0be',
    name: 'Flixxo',
    symbol: 'FLIXX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1261/small/flixxo.png?1547483809',
  },
  {
    chainId: 1,
    address: '0xd341d1680eeee3255b8c4c75bcce7eb57f144dae',
    name: 'SoMee Social',
    symbol: 'ONG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1286/small/So_Mee_logo_icons_11.png?1581305902',
  },
  {
    chainId: 1,
    address: '0x419c4db4b9e25d6db2ad9691ccb832c8d9fda05e',
    name: 'Dragonchain',
    symbol: 'DRGN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1289/small/dragonchain.png?1547957761',
  },
  {
    chainId: 1,
    address: '0xec213f83defb583af3a000b1c0ada660b1902a0f',
    name: 'Presearch',
    symbol: 'PRE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1299/small/presearch.png?1548331942',
  },
  {
    chainId: 1,
    address: '0xbdc5bac39dbe132b1e030e898ae3830017d7d969',
    name: 'Snovian Space',
    symbol: 'SNOV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1330/small/logo2.png?1547035355',
  },
  {
    chainId: 1,
    address: '0x8806926ab68eb5a7b909dcaf6fdbe5d93271d6e2',
    name: 'Uquid Coin',
    symbol: 'UQC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1341/small/uquid-coin.png?1548759712',
  },
  {
    chainId: 1,
    address: '0x66186008c1050627f979d464eabb258860563dbe',
    name: 'MediShares',
    symbol: 'MDS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1343/small/medishares.png?1547978625',
  },
  {
    chainId: 1,
    address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    name: 'Maker',
    symbol: 'MKR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png?1585191826',
  },
  {
    chainId: 1,
    address: '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
    name: 'Aave  OLD ',
    symbol: 'LEND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1365/small/ethlend.png?1547394586',
  },
  {
    chainId: 1,
    address: '0x2c4e8f2d746113d0696ce89b35f0d8bf88e0aeca',
    name: 'OST',
    symbol: 'OST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1367/small/ost.jpg?1547035393',
  },
  {
    chainId: 1,
    address: '0xbe9375c6a420d2eeb258962efb95551a5b722803',
    name: 'StormX',
    symbol: 'STMX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1369/small/StormX.png?1603113002',
  },
  {
    chainId: 1,
    address: '0xbf2179859fc6d5bee9bf9158632dc51678a4100e',
    name: 'elf',
    symbol: 'ELF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1371/small/aelf-logo.png?1547035397',
  },
  {
    chainId: 1,
    address: '0x558ec3152e2eb2174905cd19aea4e34a23de9ad6',
    name: 'Bread',
    symbol: 'BRD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1440/small/bread.png?1547563238',
  },
  {
    chainId: 1,
    address: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    name: 'Sai',
    symbol: 'SAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1442/small/dai.png?1547035520',
  },
  {
    chainId: 1,
    address: '0xf70a642bd387f94380ffb90451c2c81d4eb82cbc',
    name: 'Starbase',
    symbol: 'STAR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1449/small/starbase.png?1548610771',
  },
  {
    chainId: 1,
    address: '0x0af44e2784637218dd1d32a322d44e603a8f0c6a',
    name: 'MATRYX',
    symbol: 'MTX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1495/small/matryx.png?1547978542',
  },
  {
    chainId: 1,
    address: '0x4fbb350052bca5417566f188eb2ebce5b19bc964',
    name: 'RigoBlock',
    symbol: 'GRG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1532/small/Symbol-RigoblockRGB.png?1547035682',
  },
  {
    chainId: 1,
    address: '0x63e634330a20150dbb61b15648bc73855d6ccf07',
    name: 'Blocklancer',
    symbol: 'LNC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1540/small/blocklancer.png?1547351104',
  },
  {
    chainId: 1,
    address: '0x245ef47d4d0505ecf3ac463f4d81f41ade8f1fd1',
    name: 'Nuggets',
    symbol: 'NUG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1543/small/nuggets.png?1548329505',
  },
  {
    chainId: 1,
    address: '0x9f599410d207f3d2828a8712e5e543ac2e040382',
    name: 'Tapcoin',
    symbol: 'TTT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1580/small/tapcoin.png?1547035760',
  },
  {
    chainId: 1,
    address: '0x1234567461d3f8db7496581774bd869c83d51c93',
    name: 'BitClave',
    symbol: 'CAT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1585/small/bitclave.png?1547035768',
  },
  {
    chainId: 1,
    address: '0x2859021ee7f2cb10162e67f33af2d22764b31aff',
    name: 'Silent Notary',
    symbol: 'SNTR',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/1599/small/silent-notary.png?1548609544',
  },
  {
    chainId: 1,
    address: '0x990e081a7b7d3ccba26a2f49746a68cc4ff73280',
    name: 'KStarCoin',
    symbol: 'KSC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1630/small/ksc.png?1547035850',
  },
  {
    chainId: 1,
    address: '0x1961b3331969ed52770751fc718ef530838b6dee',
    name: 'BitDegree',
    symbol: 'BDG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1653/small/bitdegree.jpg?1547035900',
  },
  {
    chainId: 1,
    address: '0x446c9033e7516d820cc9a2ce2d0b7328b579406f',
    name: 'SOLVE',
    symbol: 'SOLVE',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/1768/small/Solve.Token_logo_200_200_wiyhout_BG.png?1575869846',
  },
  {
    chainId: 1,
    address: '0x4a42d2c580f83dce404acad18dab26db11a1750e',
    name: 'Relex',
    symbol: 'RLX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1799/small/relex.jpg?1547036103',
  },
  {
    chainId: 1,
    address: '0xf3db7560e820834658b590c96234c333cd3d5e5e',
    name: 'CoinPoker',
    symbol: 'CHP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1808/small/coinpoker.jpg?1547036113',
  },
  {
    chainId: 1,
    address: '0xdc9ac3c20d1ed0b540df9b1fedc10039df13f99c',
    name: 'UTRUST',
    symbol: 'UTK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1824/small/300x300_logo.png?1570520533',
  },
  {
    chainId: 1,
    address: '0x6710c63432a2de02954fc0f851db07146a6c0312',
    name: 'Smart MFG',
    symbol: 'MFG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1842/small/mfg-logo.png?1608131645',
  },
  {
    chainId: 1,
    address: '0x0e22734e078d6e399bcee40a549db591c4ea46cb',
    name: 'Streamity',
    symbol: 'STM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1866/small/96708streamity200.png?1595304516',
  },
  {
    chainId: 1,
    address: '0x68d57c9a1c35f63e2c83ee8e49a64e9d70528d25',
    name: 'Sirin Labs Token',
    symbol: 'SRN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1872/small/sirin-labs-token.png?1548609584',
  },
  {
    chainId: 1,
    address: '0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f',
    name: 'OriginTrail',
    symbol: 'TRAC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1877/small/origintrail.jpg?1605694415',
  },
  {
    chainId: 1,
    address: '0x467bccd9d29f223bce8043b84e8c8b282827790f',
    name: 'Telcoin',
    symbol: 'TEL',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/1899/small/tel.png?1547036203',
  },
  {
    chainId: 1,
    address: '0x749826f1041caf0ea856a4b3578ba327b18335f8',
    name: 'TIG Token',
    symbol: 'TIG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1903/small/tigereum.png?1548758748',
  },
  {
    chainId: 1,
    address: '0x910dfc18d6ea3d6a7124a6f8b5458f281060fa4c',
    name: 'X8X Token',
    symbol: 'X8X',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1912/small/x8x.png?1547036213',
  },
  {
    chainId: 1,
    address: '0x2167fb82309cf76513e83b25123f8b0559d6b48f',
    name: 'CoinLion',
    symbol: 'LION',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1917/small/coinlion.png?1547036216',
  },
  {
    chainId: 1,
    address: '0x8a854288a5976036a725879164ca3e91d30c6a1b',
    name: 'GET Protocol',
    symbol: 'GET',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1927/small/GET_Protocol.png?1552893230',
  },
  {
    chainId: 1,
    address: '0xd559f20296ff4895da39b5bd9add54b442596a61',
    name: 'FintruX',
    symbol: 'FTX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1928/small/token-500x500.png?1547036223',
  },
  {
    chainId: 1,
    address: '0x83cee9e086a77e492ee0bb93c2b0437ad6fdeccc',
    name: 'Goldmint',
    symbol: 'MNTP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1944/small/goldmint.png?1547743002',
  },
  {
    chainId: 1,
    address: '0xada86b1b313d1d5267e3fc0bb303f0a2b66d0ea7',
    name: 'Covesting',
    symbol: 'COV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/1950/small/covesting.png?1547036237',
  },
  {
    chainId: 1,
    address: '0xacfa209fb73bf3dd5bbfb1101b9bc999c49062a5',
    name: 'BCdiploma EvidenZ',
    symbol: 'BCDT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2014/small/evidenz-512.png?1594871754',
  },
  {
    chainId: 1,
    address: '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7',
    name: 'Jibrel Network',
    symbol: 'JNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2016/small/Capture.PNG?1547036293',
  },
  {
    chainId: 1,
    address: '0x4cc19356f2d37338b9802aa8e8fc58b0373296e7',
    name: 'SelfKey',
    symbol: 'KEY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2034/small/selfkey.png?1548608934',
  },
  {
    chainId: 1,
    address: '0x4ac00f287f36a6aad655281fe1ca6798c9cb727b',
    name: 'GazeCoin',
    symbol: 'GZE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2035/small/gazecoin.png?1547742556',
  },
  {
    chainId: 1,
    address: '0x7d29a64504629172a429e64183d6673b9dacbfce',
    name: 'Vectorspace AI',
    symbol: 'VXV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2063/small/vectorspace-ai-logo.jpeg?1547036362',
  },
  {
    chainId: 1,
    address: '0xbb1fa4fdeb3459733bf67ebc6f893003fa976a82',
    name: 'Pangea Arbitration ',
    symbol: 'XPAT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2070/small/Pangea-Arbitration-Token-Logo.png?1547036374',
  },
  {
    chainId: 1,
    address: '0xb4efd85c19999d84251304bda99e90b92300bd93',
    name: 'Rocket Pool',
    symbol: 'RPL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2090/small/rocket.png?1563781948',
  },
  {
    chainId: 1,
    address: '0x26e75307fc0c021472feb8f727839531f112f317',
    name: 'CRYPTO20',
    symbol: 'C20',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2097/small/c20.png?1547036413',
  },
  {
    chainId: 1,
    address: '0xda6cb58a0d0c01610a29c5a65c303e13e885887c',
    name: 'carVertical',
    symbol: 'CV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2098/small/carvertical.png?1547738903',
  },
  {
    chainId: 1,
    address: '0xd3fb5cabd07c85395667f83d20b080642bde66c7',
    name: 'Ammbr',
    symbol: 'AMR',
    decimals: 16,
    logoURI:
      'https://assets.coingecko.com/coins/images/2100/small/ammbr.png?1547036418',
  },
  {
    chainId: 1,
    address: '0x78b039921e84e726eb72e7b1212bb35504c645ca',
    name: 'Sether',
    symbol: 'SETH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2101/small/sether.png?1548609212',
  },
  {
    chainId: 1,
    address: '0xd0929d411954c47438dc1d871dd6081f5c5e149c',
    name: 'Refereum',
    symbol: 'RFR',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/2102/small/refereum.png?1548608001',
  },
  {
    chainId: 1,
    address: '0x554ffc77f4251a9fb3c0e3590a6a205f8d4e067d',
    name: 'ZMINE',
    symbol: 'ZMN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2103/small/zmn.png?1547036420',
  },
  {
    chainId: 1,
    address: '0x0e8d6b471e332f140e7d9dbb99e5e3822f728da6',
    name: 'Abyss',
    symbol: 'ABYSS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2105/small/NrFmpxs.png?1600318377',
  },
  {
    chainId: 1,
    address: '0x2604fa406be957e542beb89e6754fcde6815e83f',
    name: 'PlayKey',
    symbol: 'PKT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2116/small/playkey.png?1548331394',
  },
  {
    chainId: 1,
    address: '0xba9d4199fab4f26efe3551d490e3821486f135ba',
    name: 'SwissBorg',
    symbol: 'CHSB',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/2117/small/YJUrRy7r_400x400.png?1589794215',
  },
  {
    chainId: 1,
    address: '0x8eb24319393716668d768dcec29356ae9cffe285',
    name: 'SingularityNET',
    symbol: 'AGI',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/2138/small/singularitynet.png?1548609559',
  },
  {
    chainId: 1,
    address: '0x83984d6142934bb535793a82adb0a46ef0f66b6d',
    name: 'Remme',
    symbol: 'REM',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/2152/small/semme.png?1561622861',
  },
  {
    chainId: 1,
    address: '0xc27a2f05fa577a83ba0fdb4c38443c0718356501',
    name: 'Lamden',
    symbol: 'TAU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2155/small/Lamden_Logo_2020_-_White_w_Black_Borders.png?1597732013',
  },
  {
    chainId: 1,
    address: '0xc12d099be31567add4e4e4d0d45691c3f58f5663',
    name: 'Auctus',
    symbol: 'AUC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2165/small/Auctus.png?1593479271',
  },
  {
    chainId: 1,
    address: '0xa15c7ebe1f07caf6bff097d8a589fb8ac49ae5b3',
    name: 'Pundi X',
    symbol: 'NPXS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2170/small/pundi-x.png?1548386366',
  },
  {
    chainId: 1,
    address: '0x6781a0f84c7e9e846dcb84a9a5bd49333067b104',
    name: 'Zap',
    symbol: 'ZAP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2180/small/zap.png?1547036476',
  },
  {
    chainId: 1,
    address: '0xc666081073e8dff8d3d1c2292a29ae1a2153ec09',
    name: 'Digitex Token',
    symbol: 'DGTX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2188/small/DGTX_coin_icon.png?1606869511',
  },
  {
    chainId: 1,
    address: '0x45245bc59219eeaaf6cd3f382e078a461ff9de7b',
    name: 'BANKEX',
    symbol: 'BKX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2199/small/cEG4Vgx.png?1547036488',
  },
  {
    chainId: 1,
    address: '0x0ebb614204e47c09b6c3feb9aaecad8ee060e23e',
    name: 'Cryptopay',
    symbol: 'CPAY',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/2216/small/cryptopay.png?1547036499',
  },
  {
    chainId: 1,
    address: '0x27f610bf36eca0939093343ac28b1534a721dbb4',
    name: 'WandX',
    symbol: 'WAND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2219/small/wandx.png?1548760294',
  },
  {
    chainId: 1,
    address: '0xe477292f1b3268687a29376116b0ed27a9c76170',
    name: 'HEROcoin',
    symbol: 'PLAY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2221/small/herocoin.png?1547744781',
  },
  {
    chainId: 1,
    address: '0x5adc961d6ac3f7062d2ea45fefb8d8167d44b190',
    name: 'Dether',
    symbol: 'DTH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2231/small/dether.png?1547036510',
  },
  {
    chainId: 1,
    address: '0xdd16ec0f66e54d453e6756713e533355989040e4',
    name: 'Tokenomy',
    symbol: 'TEN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2286/small/logo_%281%29.png?1604543144',
  },
  {
    chainId: 1,
    address: '0x846c66cf71c43f80403b51fe3906b3599d63336f',
    name: 'PumaPay',
    symbol: 'PMA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2307/small/pumapay.png?1548607436',
  },
  {
    chainId: 1,
    address: '0x2ab6bb8408ca3199b8fa6c92d5b455f820af03c4',
    name: 'TE FOOD',
    symbol: 'TONE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2325/small/tec.png?1547036538',
  },
  {
    chainId: 1,
    address: '0x0bb217e40f8a5cb79adf04e1aab60e5abd0dfc1e',
    name: 'SWFT Blockchain',
    symbol: 'SWFTC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/2346/small/QJB0PBHu_400x400.jpg?1565564254',
  },
  {
    chainId: 1,
    address: '0x0a50c93c762fdd6e56d86215c24aaad43ab629aa',
    name: 'LGO Token',
    symbol: 'LGO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/2353/small/2_JNnfVRPMBuA1hwnRubH72A.png?1595311622',
  },
  {
    chainId: 1,
    address: '0x2467aa6b5a2351416fd4c3def8462d841feeecec',
    name: 'qiibee',
    symbol: 'QBX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2365/small/qbx-icon-dark.png?1554082393',
  },
  {
    chainId: 1,
    address: '0x737f98ac8ca59f2c68ad658e3c3d8c8963e40a4c',
    name: 'Amon',
    symbol: 'AMN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2369/small/amon.png?1547036554',
  },
  {
    chainId: 1,
    address: '0x7b0c06043468469967dba22d1af33d77d44056c8',
    name: 'Morpheus Network',
    symbol: 'MRPH',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/2379/small/morpheus-network.png?1548085486',
  },
  {
    chainId: 1,
    address: '0xe61fdaf474fac07063f2234fb9e60c1163cfa850',
    name: 'Coin',
    symbol: 'COIN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2394/small/coin.png?1606626874',
  },
  {
    chainId: 1,
    address: '0x584b44853680ee34a0f337b712a8f66d816df151',
    name: 'AI Doctor',
    symbol: 'AIDOC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2449/small/aidoc.png?1547036587',
  },
  {
    chainId: 1,
    address: '0x28dee01d53fed0edf5f6e310bf8ef9311513ae40',
    name: 'BlitzPredict',
    symbol: 'XBP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2458/small/BlitzPredict.jpg?1547701183',
  },
  {
    chainId: 1,
    address: '0x922ac473a3cc241fd3a0049ed14536452d58d73c',
    name: 'Vetri',
    symbol: 'VLD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2476/small/vld.png?1547036599',
  },
  {
    chainId: 1,
    address: '0xfc05987bd2be489accf0f509e44b0145d68240f7',
    name: 'Essentia',
    symbol: 'ESS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2483/small/Essentia-token.jpg?1547036604',
  },
  {
    chainId: 1,
    address: '0x8727c112c712c4a03371ac87a74dd6ab104af768',
    name: 'Jetcoin',
    symbol: 'JET',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2487/small/jetcoin.png?1547974820',
  },
  {
    chainId: 1,
    address: '0xf83301c5cd1ccbb86f466a6b3c53316ed2f8465a',
    name: 'COMSA',
    symbol: 'CMS',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/2500/small/comsa-_xem_.png?1547036614',
  },
  {
    chainId: 1,
    address: '0x264dc2dedcdcbb897561a57cba5085ca416fb7b4',
    name: 'QunQun',
    symbol: 'QUN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2546/small/qunqun.png?1547036662',
  },
  {
    chainId: 1,
    address: '0x0f4ca92660efad97a9a70cb0fe969c755439772c',
    name: 'Leverj',
    symbol: 'LEV',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/2548/small/leverj.png?1547975721',
  },
  {
    chainId: 1,
    address: '0x2c82c73d5b34aa015989462b2948cd616a37641f',
    name: 'Spectre ai Utility ',
    symbol: 'SXUT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2551/small/spectre-utility.png?1547036668',
  },
  {
    chainId: 1,
    address: '0xf485c5e679238f9304d986bb2fc28fe3379200e5',
    name: 'ugChain',
    symbol: 'UGC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2557/small/ugchain.png?1548759478',
  },
  {
    chainId: 1,
    address: '0x4092678e4e78230f46a1534c0fbc8fa39780892b',
    name: 'Odyssey',
    symbol: 'OCN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2559/small/ocn.png?1547036683',
  },
  {
    chainId: 1,
    address: '0xb705268213d593b8fd88d3fdeff93aff5cbdcfae',
    name: 'IDEX',
    symbol: 'IDEX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2565/small/49046004.png?1557813562',
  },
  {
    chainId: 1,
    address: '0x9af839687f6c94542ac5ece2e317daae355493a1',
    name: 'Hydro Protocol',
    symbol: 'HOT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2570/small/Hydro-Protocol.png?1558069424',
  },
  {
    chainId: 1,
    address: '0xe75ad3aab14e4b0df8c5da4286608dabb21bd864',
    name: 'Acute Angle Cloud',
    symbol: 'AAC',
    decimals: 5,
    logoURI:
      'https://assets.coingecko.com/coins/images/2577/small/acute-angle-cloud.png?1547036708',
  },
  {
    chainId: 1,
    address: '0xb6ee9668771a79be7967ee29a63d4184f8097143',
    name: 'CargoX',
    symbol: 'CXO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2580/small/cargox.png?1547738832',
  },
  {
    chainId: 1,
    address: '0xb056c38f6b7dc4064367403e26424cd2c60655e1',
    name: 'CEEK Smart VR Token',
    symbol: 'CEEK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2581/small/ceek-smart-vr-token-logo.png?1547036714',
  },
  {
    chainId: 1,
    address: '0x20f7a3ddf244dc9299975b4da1c39f8d5d75f05a',
    name: 'Sapien',
    symbol: 'SPN',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/2596/small/Sapien_Token_450x450.png?1607560493',
  },
  {
    chainId: 1,
    address: '0x69b148395ce0015c13e36bffbad63f49ef874e03',
    name: 'DATA',
    symbol: 'DTA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2604/small/data.png?1547036749',
  },
  {
    chainId: 1,
    address: '0x653430560be843c4a3d143d0110e896c2ab8ac0d',
    name: 'Molecular Future',
    symbol: 'MOF',
    decimals: 16,
    logoURI:
      'https://assets.coingecko.com/coins/images/2607/small/molecular_future.png?1547036754',
  },
  {
    chainId: 1,
    address: '0xf03f8d65bafa598611c3495124093c56e8f638f0',
    name: 'View',
    symbol: 'VIEW',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2608/small/view-token.png?1547036756',
  },
  {
    chainId: 1,
    address: '0x3a92bd396aef82af98ebc0aa9030d25a23b11c6b',
    name: 'Tokenbox',
    symbol: 'TBX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2644/small/tokenbox.png?1547036822',
  },
  {
    chainId: 1,
    address: '0x107c4504cd79c5d2696ea0030a8dd4e92601b82e',
    name: 'Bloom',
    symbol: 'BLT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2662/small/bloom.png?1547036854',
  },
  {
    chainId: 1,
    address: '0x6c37bf4f042712c978a73e3fd56d1f5738dd7c43',
    name: 'Elementeum',
    symbol: 'ELET',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2670/small/ELET.png?1558594342',
  },
  {
    chainId: 1,
    address: '0xca0e7269600d353f70b14ad118a49575455c0f2f',
    name: 'AMLT Network',
    symbol: 'AMLT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2703/small/amlt.png?1563794756',
  },
  {
    chainId: 1,
    address: '0x8400d94a5cb0fa0d041a3788e395285d61c9ee5e',
    name: 'Unibright',
    symbol: 'UBT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/2707/small/UnibrightLogo_colorful_500x500_preview.png?1547036916',
  },
  {
    chainId: 1,
    address: '0x58c69ed6cd6887c0225d1fccecc055127843c69b',
    name: 'HalalChain',
    symbol: 'HLC',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/2737/small/halalchain.png?1547036938',
  },
  {
    chainId: 1,
    address: '0xfae4ee59cdd86e3be9e8b90b53aa866327d7c090',
    name: 'CPChain',
    symbol: 'CPC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2760/small/cpchain.png?1547036953',
  },
  {
    chainId: 1,
    address: '0xea5f88e54d982cbb0c441cde4e79bc305e5b43bc',
    name: 'PARETO Rewards',
    symbol: 'PARETO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2783/small/pareto.png?1547036965',
  },
  {
    chainId: 1,
    address: '0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec',
    name: 'Polymath Network',
    symbol: 'POLY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2784/small/inKkF01.png?1605007034',
  },
  {
    chainId: 1,
    address: '0x998b3b82bc9dba173990be7afb772788b5acb8bd',
    name: 'Banca',
    symbol: 'BANCA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2795/small/banca.png?1547036972',
  },
  {
    chainId: 1,
    address: '0x464ebe77c293e473b48cfe96ddcf88fcf7bfdac0',
    name: 'KRYLL',
    symbol: 'KRL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2807/small/krl.png?1547036979',
  },
  {
    chainId: 1,
    address: '0x55a290f08bb4cae8dcf1ea5635a3fcfd4da60456',
    name: 'BITTO',
    symbol: 'BITTO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2814/small/BITTO.jpg?1547036986',
  },
  {
    chainId: 1,
    address: '0x6f259637dcd74c767781e37bc6133cd6a68aa161',
    name: 'Huobi Token',
    symbol: 'HT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2822/small/huobi-token-logo.png?1547036992',
  },
  {
    chainId: 1,
    address: '0x9e46a38f5daabe8683e10793b06749eef7d733d1',
    name: 'PolySwarm',
    symbol: 'NCT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2843/small/polyswarm.png?1548331600',
  },
  {
    chainId: 1,
    address: '0x5732046a883704404f284ce41ffadd5b007fd668',
    name: 'Bluzelle',
    symbol: 'BLZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2848/small/bluzelle.png?1547351698',
  },
  {
    chainId: 1,
    address: '0x41dbecc1cdc5517c6f76f6a6e836adbee2754de3',
    name: 'Medicalchain',
    symbol: 'MTN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2850/small/medicalchain.png?1547037019',
  },
  {
    chainId: 1,
    address: '0x4bcea5e4d0f6ed53cf45e7a28febb2d3621d7438',
    name: 'Modex',
    symbol: 'MODEX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2851/small/LhWIeAg.png?1602566568',
  },
  {
    chainId: 1,
    address: '0x87f56ee356b434187105b40f96b230f5283c0ab4',
    name: 'Pitch',
    symbol: 'PITCH',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/2855/small/pitch_token.jpg?1547037026',
  },
  {
    chainId: 1,
    address: '0xcaaa93712bdac37f736c323c93d4d5fdefcc31cc',
    name: 'CryptalDash',
    symbol: 'CRD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2859/small/cryptaldash.png?1547037030',
  },
  {
    chainId: 1,
    address: '0xe8a1df958be379045e2b46a31a98b93a2ecdfded',
    name: 'EtherSportz',
    symbol: 'ESZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2890/small/ethersportz.png?1547037061',
  },
  {
    chainId: 1,
    address: '0xbbff862d906e348e9946bfb2132ecb157da3d4b4',
    name: 'Sharder protocol',
    symbol: 'SS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2921/small/sharder-200px.png?1595305234',
  },
  {
    chainId: 1,
    address: '0x47bc01597798dcd7506dcca36ac4302fc93a8cfb',
    name: 'Crowd Machine',
    symbol: 'CMCT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/2967/small/crowd-machine.png?1547037212',
  },
  {
    chainId: 1,
    address: '0x0947b0e6d821378805c9598291385ce7c791a6b2',
    name: 'Lendingblock',
    symbol: 'LND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2988/small/lnd.png?1518768584',
  },
  {
    chainId: 1,
    address: '0x12f649a9e821f90bb143089a6e56846945892ffb',
    name: 'Hyprr  Howdoo ',
    symbol: 'UDOO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3078/small/howdoo.png?1547744057',
  },
  {
    chainId: 1,
    address: '0x36ac219f90f5a6a3c77f2a7b660e3cc701f68e25',
    name: 'CoinMetro',
    symbol: 'XCM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3125/small/xcm.png?1547037518',
  },
  {
    chainId: 1,
    address: '0xd42debe4edc92bd5a3fbb4243e1eccf6d63a4a5d',
    name: 'Carboneum',
    symbol: 'C8',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3127/small/c8.png?1547037525',
  },
  {
    chainId: 1,
    address: '0x408e41876cccdc0f92210600ef50372656052a38',
    name: 'REN',
    symbol: 'REN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3139/small/REN.png?1589985807',
  },
  {
    chainId: 1,
    address: '0xbc86727e770de68b1060c91f6bb6945c73e10388',
    name: 'Ink Protocol',
    symbol: 'XNK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3156/small/ink-protocol.png?1547974056',
  },
  {
    chainId: 1,
    address: '0x4a527d8fc13c5203ab24ba0944f4cb14658d1db6',
    name: 'Morpheus Labs',
    symbol: 'MITX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3164/small/mitx.png?1604888269',
  },
  {
    chainId: 1,
    address: '0xb5dbc6d3cf380079df3b27135664b6bcf45d1869',
    name: 'Project SHIVOM',
    symbol: 'OMX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/3167/small/omx.png?1547037607',
  },
  {
    chainId: 1,
    address: '0x954b890704693af242613edef1b603825afcd708',
    name: 'Cardstack',
    symbol: 'CARD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3247/small/cardstack.png?1547037769',
  },
  {
    chainId: 1,
    address: '0xa3d58c4e56fedcae3a7c43a725aee9a71f0ece4e',
    name: 'Metronome',
    symbol: 'MET',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3249/small/metronome.png?1548084800',
  },
  {
    chainId: 1,
    address: '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d',
    name: 'Celsius Network',
    symbol: 'CEL',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/3263/small/CEL_logo.png?1609598753',
  },
  {
    chainId: 1,
    address: '0xa8c8cfb141a3bb59fea1e2ea6b79b5ecbcd7b6ca',
    name: 'Syntropy',
    symbol: 'NOIA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3269/small/Component_1.png?1608275724',
  },
  {
    chainId: 1,
    address: '0x97aeb5066e1a590e868b511457beb6fe99d329f5',
    name: 'Atonomi',
    symbol: 'ATMI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3290/small/atonomi.png?1547037861',
  },
  {
    chainId: 1,
    address: '0x89020f0d5c5af4f3407eb5fe185416c457b0e93e',
    name: 'Edenchain',
    symbol: 'EDN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3292/small/Eden.png?1574126935',
  },
  {
    chainId: 1,
    address: '0xdf2c7238198ad8b389666574f2d8bc411a4b7428',
    name: 'Mainframe',
    symbol: 'MFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3293/small/Mainframe_MFT_icon.png?1605256332',
  },
  {
    chainId: 1,
    address: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26',
    name: 'Origin Protocol',
    symbol: 'OGN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3296/small/op.jpg?1547037878',
  },
  {
    chainId: 1,
    address: '0xbcdfe338d55c061c084d81fd793ded00a27f226d',
    name: 'Decentralized Machi',
    symbol: 'DML',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3297/small/decentralized-machine-learning.png?1547037880',
  },
  {
    chainId: 1,
    address: '0x4fe83213d56308330ec302a8bd641f1d0113a4cc',
    name: 'NuCypher',
    symbol: 'NU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3318/small/photo1198982838879365035.jpg?1547037916',
  },
  {
    chainId: 1,
    address: '0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7',
    name: 'Akropolis',
    symbol: 'AKRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3328/small/Akropolis.png?1547037929',
  },
  {
    chainId: 1,
    address: '0x4946fcea7c692606e8908002e55a582af44ac121',
    name: 'FOAM',
    symbol: 'FOAM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3345/small/K51lJQc.png?1547037959',
  },
  {
    chainId: 1,
    address: '0x6c6ee5e31d828de241282b9606c8e98ea48526e2',
    name: 'Holo',
    symbol: 'HOT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3348/small/Holologo_Profile.png?1547037966',
  },
  {
    chainId: 1,
    address: '0x5d48f293baed247a2d0189058ba37aa238bd4725',
    name: 'NeuroChain',
    symbol: 'NCC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3367/small/neurochain.png?1548085917',
  },
  {
    chainId: 1,
    address: '0xc86d054809623432210c107af2e3f619dcfbf652',
    name: 'Sentinel Protocol',
    symbol: 'UPP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3369/small/Sentinel_Protocol.jpg?1547700074',
  },
  {
    chainId: 1,
    address: '0x4a220e6096b25eadb88358cb44068a3248254675',
    name: 'Quant',
    symbol: 'QNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3370/small/QNT.jpg?1547038004',
  },
  {
    chainId: 1,
    address: '0x85eee30c52b0b379b046fb0f85f4f3dc3009afec',
    name: 'Keep Network',
    symbol: 'KEEP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3373/small/IuNzUb5b_400x400.jpg?1589526336',
  },
  {
    chainId: 1,
    address: '0x5cf04716ba20127f1e2297addcf4b5035000c9eb',
    name: 'NKN',
    symbol: 'NKN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3375/small/nkn.png?1548329212',
  },
  {
    chainId: 1,
    address: '0xa4e8c3ec456107ea67d3075bf9e3df3a75823db0',
    name: 'Loom Network',
    symbol: 'LOOM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3387/small/1_K76UVoLq-FOL7l-_Fag-Qw_2x.png?1547038040',
  },
  {
    chainId: 1,
    address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    name: 'Synthetix Network T',
    symbol: 'SNX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3406/small/SNX.png?1598631139',
  },
  {
    chainId: 1,
    address: '0x1122b6a0e00dce0563082b6e2953f3a943855c1f',
    name: 'Centrality',
    symbol: 'CENNZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3408/small/logo.PNG?1547038083',
  },
  {
    chainId: 1,
    address: '0xd49ff13661451313ca1553fd6954bd1d9b6e02b9',
    name: 'Electrify Asia',
    symbol: 'ELEC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3415/small/d45b1d82743c749d05697da200179874.jpg?1547038096',
  },
  {
    chainId: 1,
    address: '0xffe02ee4c69edf1b340fcad64fbd6b37a7b9e265',
    name: 'NANJCOIN',
    symbol: 'NANJ',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/3424/small/FDGC.png?1547038112',
  },
  {
    chainId: 1,
    address: '0x6ba460ab75cd2c56343b3517ffeba60748654d26',
    name: 'UpToken',
    symbol: 'UP',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/3425/small/uptoken.png?1548759702',
  },
  {
    chainId: 1,
    address: '0x4730fb1463a6f1f44aeb45f6c5c422427f37f4d0',
    name: '4thpillar technolog',
    symbol: 'FOUR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3434/small/fourtoken-symbol-256-256.png?1585742434',
  },
  {
    chainId: 1,
    address: '0xfdbc1adc26f0f8f8606a5d63b7d3a3cd21c22b23',
    name: '1World',
    symbol: '1WO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/3443/small/unnamed.png?1547038151',
  },
  {
    chainId: 1,
    address: '0x0000000000085d4780b73119b644ae5ecd22b376',
    name: 'TrueUSD',
    symbol: 'TUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3449/small/TUSD.png?1559172762',
  },
  {
    chainId: 1,
    address: '0x01ff50f8b7f74e4f00580d9596cd3d0d6d6e326f',
    name: 'BnkToTheFuture',
    symbol: 'BFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3468/small/bnktothefuture.png?1547351865',
  },
  {
    chainId: 1,
    address: '0xa849eaae994fb86afa73382e9bd88c2b6b18dc71',
    name: 'MVL',
    symbol: 'MVL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3476/small/mass-vehicle-ledger.png?1547978299',
  },
  {
    chainId: 1,
    address: '0x543ff227f64aa17ea132bf9886cab5db55dcaddf',
    name: 'DAOstack',
    symbol: 'GEN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3479/small/gen.png?1547038215',
  },
  {
    chainId: 1,
    address: '0xdf1d6405df92d981a2fb3ce68f6a03bac6c0e41f',
    name: 'Verasity',
    symbol: 'VRA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3481/small/3mefBCd.png?1547038219',
  },
  {
    chainId: 1,
    address: '0x4de2573e27e648607b50e1cfff921a33e4a34405',
    name: 'Lendroid Support To',
    symbol: 'LST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3485/small/lst-icon.png?1606992361',
  },
  {
    chainId: 1,
    address: '0x723cbfc05e2cfcc71d3d89e770d32801a5eef5ab',
    name: 'Bitcoin Pro',
    symbol: 'BTCP',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/3545/small/DSiD9ZhWsAE_8cS.png?1547038353',
  },
  {
    chainId: 1,
    address: '0xcc80c051057b774cd75067dc48f8987c4eb97a5e',
    name: 'Deversifi Nectar To',
    symbol: 'NEC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3559/small/NecLogoLoad.png?1592795924',
  },
  {
    chainId: 1,
    address: '0xd98f75b1a3261dab9eed4956c93f33749027a964',
    name: 'ShareToken',
    symbol: 'SHR',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/3609/small/74586729_2443914875881351_2785018663453851648_n.png?1574898410',
  },
  {
    chainId: 1,
    address: '0xa44e5137293e855b1b7bc7e2c6f8cd796ffcb037',
    name: 'Sentinel',
    symbol: 'SENT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/3625/small/download_%287%29.png?1547038545',
  },
  {
    chainId: 1,
    address: '0x076c97e1c869072ee22f8c91978c99b4bcb02591',
    name: 'CommerceBlock Token',
    symbol: 'CBT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3653/small/bb4WjF2.png?1547038622',
  },
  {
    chainId: 1,
    address: '0xfe5f141bf94fe84bc28ded0ab966c16b17490657',
    name: 'LibraToken',
    symbol: 'LBA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3673/small/libra-credit.png?1547975828',
  },
  {
    chainId: 1,
    address: '0xebbdf302c940c6bfd49c6b165f457fdb324649bc',
    name: 'Hydro',
    symbol: 'HYDRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3678/small/Hydro-Blu-512.png?1547038669',
  },
  {
    chainId: 1,
    address: '0xc528c28fec0a90c083328bc45f587ee215760a0f',
    name: 'Endor Protocol Toke',
    symbol: 'EDR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3683/small/0b805574-ef0d-41dc-b518-8d6148bf4716.png?1547038680',
  },
  {
    chainId: 1,
    address: '0x967da4048cd07ab37855c090aaf366e4ce1b9f48',
    name: 'Ocean Protocol',
    symbol: 'OCEAN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3687/small/ocean-protocol-logo.jpg?1547038686',
  },
  {
    chainId: 1,
    address: '0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206',
    name: 'NEXO',
    symbol: 'NEXO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3695/small/nexo.png?1548086057',
  },
  {
    chainId: 1,
    address: '0xd31695a1d35e489252ce57b129fd4b1b05e6acac',
    name: 'TOKPIE',
    symbol: 'TKP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3731/small/tokpie-200x200.png?1562207865',
  },
  {
    chainId: 1,
    address: '0xaf1250fa68d7decd34fd75de8742bc03b29bd58e',
    name: 'Invictus Hyperion F',
    symbol: 'IHF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3747/small/ihp.png?1547038807',
  },
  {
    chainId: 1,
    address: '0x608f006b6813f97097372d0d31fb0f11d1ca3e4e',
    name: 'CryptoAds Marketpla',
    symbol: 'CRAD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3761/small/crad.png?1547038854',
  },
  {
    chainId: 1,
    address: '0xd29f0b5b3f50b07fe9a9511f7d86f4f4bac3f8c4',
    name: 'Liquidity Network',
    symbol: 'LQD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3801/small/liquidity-network.png?1547975994',
  },
  {
    chainId: 1,
    address: '0x048fe49be32adfc9ed68c37d32b5ec9df17b3603',
    name: 'Skrumble Network',
    symbol: 'SKM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3826/small/skrumble-network.png?1548609513',
  },
  {
    chainId: 1,
    address: '0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d',
    name: 'Kleros',
    symbol: 'PNK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3833/small/kleros.png?1547975322',
  },
  {
    chainId: 1,
    address: '0xea26c4ac16d4a5a106820bc8aee85fd0b7b2b664',
    name: 'QuarkChain',
    symbol: 'QKC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3849/small/quarkchain.png?1548387524',
  },
  {
    chainId: 1,
    address: '0x593114f03a0a575aece9ed675e52ed68d2172b8c',
    name: 'BidiPass',
    symbol: 'BDP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3890/small/AxiFAoHc_400x400.jpg?1567461770',
  },
  {
    chainId: 1,
    address: '0x4575f41308ec1483f3d399aa9a2826d74da13deb',
    name: 'Orchid Protocol',
    symbol: 'OXT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3916/small/download_%285%29.png?1576624060',
  },
  {
    chainId: 1,
    address: '0xfef3884b603c33ef8ed4183346e093a173c94da6',
    name: 'MetaMorph',
    symbol: 'METM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3929/small/metamorph.png?1548084814',
  },
  {
    chainId: 1,
    address: '0x4d807509aece24c0fa5a102b6a3b059ec6e14392',
    name: 'Menlo One',
    symbol: 'ONE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3947/small/menlo-one.png?1547038971',
  },
  {
    chainId: 1,
    address: '0xe5dada80aa6477e85d09747f2842f7993d0df71c',
    name: 'Dock',
    symbol: 'DOCK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3978/small/2675.png?1547039034',
  },
  {
    chainId: 1,
    address: '0x115ec79f1de567ec68b7ae7eda501b406626478e',
    name: 'Carry',
    symbol: 'CRE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3994/small/Carry.png?1592402610',
  },
  {
    chainId: 1,
    address: '0xe25b0bba01dc5630312b6a21927e578061a13f55',
    name: 'ShipChain',
    symbol: 'SHIP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3997/small/shipchain.png?1548609236',
  },
  {
    chainId: 1,
    address: '0xaa19961b6b858d9f18a115f25aa1d98abc1fdba8',
    name: 'LocalCoinSwap',
    symbol: 'LCS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/3998/small/LocalCoinSwap.png?1547039086',
  },
  {
    chainId: 1,
    address: '0x4e15361fd6b4bb609fa63c81a2be19d873717870',
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4001/small/Fantom.png?1558015016',
  },
  {
    chainId: 1,
    address: '0x9b4e2b4b13d125238aa0480dd42b4f6fc71b37cc',
    name: 'MyToken',
    symbol: 'MT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4109/small/2712.png?1547039296',
  },
  {
    chainId: 1,
    address: '0x79c75e2e8720b39e258f41c37cc4f309e0b0ff80',
    name: 'Phantasma',
    symbol: 'SOUL',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/4130/small/phantasma.png?1548331035',
  },
  {
    chainId: 1,
    address: '0x66fd97a78d8854fec445cd1c80a07896b0b4851f',
    name: 'Lunch Money',
    symbol: 'LMY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4149/small/lmy.png?1547039390',
  },
  {
    chainId: 1,
    address: '0x6704b673c70de9bf74c8fba4b4bd748f0e2190e1',
    name: 'Ubex',
    symbol: 'UBEX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4163/small/ubex.png?1547039421',
  },
  {
    chainId: 1,
    address: '0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf',
    name: 'Digix Gold',
    symbol: 'DGX',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/4171/small/DGX_Token.png?1547039436',
  },
  {
    chainId: 1,
    address: '0x53066cddbc0099eb6c96785d9b3df2aaeede5da3',
    name: 'Penta Network Token',
    symbol: 'PNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4175/small/pentanetwork.png?1548330852',
  },
  {
    chainId: 1,
    address: '0x4cd988afbad37289baaf53c13e98e2bd46aaea8c',
    name: 'Key',
    symbol: 'KEY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4182/small/bihu-key-token.png?1547039459',
  },
  {
    chainId: 1,
    address: '0x5c872500c00565505f3624ab435c222e558e9ff8',
    name: 'CoTrader',
    symbol: 'COT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4205/small/logo_black.png?1547039508',
  },
  {
    chainId: 1,
    address: '0xe5b826ca2ca02f09c1725e9bd98d9a8874c30532',
    name: 'ZEON Network',
    symbol: 'ZEON',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4247/small/XZqXYc2j_400x400.jpg?1547039580',
  },
  {
    chainId: 1,
    address: '0x3c4bea627039f0b7e7d21e34bb9c9fe962977518',
    name: 'Ubique Chain of Thi',
    symbol: 'UCT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4277/small/Webp.net-resizeimage_%2829%29.jpg?1547039634',
  },
  {
    chainId: 1,
    address: '0xedd7c94fd7b4971b916d15067bc454b9e1bad980',
    name: 'Zippie',
    symbol: 'ZIPT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4302/small/zippie.jpg?1547039665',
  },
  {
    chainId: 1,
    address: '0x0f71b8de197a1c84d31de0f1fa7926c365f052b3',
    name: 'Arcona',
    symbol: 'ARCONA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4312/small/9xfrZX3q_400x400.jpg?1551073749',
  },
  {
    chainId: 1,
    address: '0xd9485499499d66b175cf5ed54c0a19f1a6bcb61a',
    name: 'Usechain',
    symbol: 'USE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4318/small/logo_%281%29.png?1547039678',
  },
  {
    chainId: 1,
    address: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
    name: 'Ankr',
    symbol: 'ANKR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4324/small/U85xTl2.png?1608111978',
  },
  {
    chainId: 1,
    address: '0x21d5a14e625d767ce6b7a167491c2d18e0785fda',
    name: 'Jinbi Token',
    symbol: 'JNB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4349/small/image001.jpg?1547039703',
  },
  {
    chainId: 1,
    address: '0x4f9254c83eb525f9fcf346490bbb3ed28a81c667',
    name: 'Celer Network',
    symbol: 'CELR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4379/small/Celr.png?1554705437',
  },
  {
    chainId: 1,
    address: '0x1ccaa0f2a7210d76e1fdec740d5f323e2e1b1672',
    name: 'Faceter',
    symbol: 'FACE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4383/small/faceter-logo.png?1547039727',
  },
  {
    chainId: 1,
    address: '0x10ba8c420e912bf07bedac03aa6908720db04e0c',
    name: 'Raise Token',
    symbol: 'RAISE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4411/small/Raise.png?1590671180',
  },
  {
    chainId: 1,
    address: '0xb6ed7644c69416d67b522e20bc294a9a9b405b31',
    name: '0xBitcoin',
    symbol: '0XBTC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/4454/small/0xbtc.png?1561603765',
  },
  {
    chainId: 1,
    address: '0xc28e931814725bbeb9e670676fabbcb694fe7df2',
    name: 'Quadrant Protocol',
    symbol: 'EQUAD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4462/small/equad.png?1547039783',
  },
  {
    chainId: 1,
    address: '0x75231f58b43240c9718dd58b4967c5114342a86c',
    name: 'OKB',
    symbol: 'OKB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4463/small/okb_token.png?1548386209',
  },
  {
    chainId: 1,
    address: '0xc275865a6cce78398e94cb2af29fa0d787b7f7eb',
    name: 'RiseCoin Token',
    symbol: 'RSCT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4469/small/rsct.png?1547039788',
  },
  {
    chainId: 1,
    address: '0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c',
    name: 'Ultra',
    symbol: 'UOS',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/4480/small/Ultra.png?1563356418',
  },
  {
    chainId: 1,
    address: '0x22de9912cd3d74953b1cd1f250b825133cc2c1b3',
    name: 'Drep',
    symbol: 'DREP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4486/small/DREP-logo.jpg?1547039799',
  },
  {
    chainId: 1,
    address: '0xd07d9fe2d2cc067015e2b4917d24933804f42cfa',
    name: 'Tolar',
    symbol: 'TOL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4487/small/tolar.png?1548759060',
  },
  {
    chainId: 1,
    address: '0x91af0fbb28aba7e31403cb457106ce79397fd4e6',
    name: 'Aergo',
    symbol: 'AERGO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4490/small/Aergo.png?1558084282',
  },
  {
    chainId: 1,
    address: '0x55296f69f40ea6d20e478533c15a6b08b654e758',
    name: 'XYO Network',
    symbol: 'XYO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4519/small/XYO_Network-logo.png?1547039819',
  },
  {
    chainId: 1,
    address: '0xa9d2927d3a04309e008b6af6e2e282ae2952e7fd',
    name: 'Zipper Network',
    symbol: 'ZIP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4524/small/zip_token_logo.png?1547039822',
  },
  {
    chainId: 1,
    address: '0x83e2be8d114f9661221384b3a50d24b96a5653f5',
    name: '0xcert',
    symbol: 'ZXC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4552/small/0xcert.png?1547039841',
  },
  {
    chainId: 1,
    address: '0x4442556a08a841227bef04c67a7ba7acf01b6fc8',
    name: 'Monarch Token',
    symbol: 'MT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4558/small/mm07ThTv_400x400.jpg?1566389078',
  },
  {
    chainId: 1,
    address: '0xbd356a39bff2cada8e9248532dd879147221cf76',
    name: 'WOM Protocol',
    symbol: 'WOM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4559/small/wom_logo_small.png?1572098941',
  },
  {
    chainId: 1,
    address: '0x6f919d67967a97ea36195a2346d9244e60fe0ddb',
    name: 'Blockcloud',
    symbol: 'BLOC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4572/small/Xd1i27EM_400x400.jpg?1547039854',
  },
  {
    chainId: 1,
    address: '0xc719d010b63e5bbf2c0551872cd5316ed26acd83',
    name: 'Etherisc DIP Token',
    symbol: 'DIP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4586/small/dip.png?1547039863',
  },
  {
    chainId: 1,
    address: '0x5ca381bbfb58f0092df149bd3d243b08b9a8386e',
    name: 'MXC',
    symbol: 'MXC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4604/small/MXC-app-icon10242x.png?1597628240',
  },
  {
    chainId: 1,
    address: '0x6737fe98389ffb356f64ebb726aa1a92390d94fb',
    name: 'Zero Carbon Project',
    symbol: 'ZCC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4610/small/29597798_1994933117411549_6379526843613393871_n.png?1606409572',
  },
  {
    chainId: 1,
    address: '0xad5fe5b0b8ec8ff4565204990e4405b2da117d8e',
    name: 'TronClassic',
    symbol: 'TRXC',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/4626/small/trxc.png?1547039893',
  },
  {
    chainId: 1,
    address: '0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa',
    name: 'Orbs',
    symbol: 'ORBS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4630/small/Orbs.jpg?1547039896',
  },
  {
    chainId: 1,
    address: '0x0c7d5ae016f806603cb1782bea29ac69471cab9c',
    name: 'Bifrost',
    symbol: 'BFC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4639/small/bifrost_32.png?1608520677',
  },
  {
    chainId: 1,
    address: '0x0f8c45b896784a1e408526b9300519ef8660209c',
    name: 'XMax',
    symbol: 'XMX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/4643/small/xmx.png?1574682262',
  },
  {
    chainId: 1,
    address: '0xcc394f10545aeef24483d2347b32a34a44f20e6f',
    name: 'Vault Guardian Toke',
    symbol: 'VGT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4652/small/Vault12.jpg?1547039918',
  },
  {
    chainId: 1,
    address: '0x56e0b2c7694e6e10391e870774daa45cf6583486',
    name: 'DUO Network',
    symbol: 'DUO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4653/small/Duo_Network.png?1556593318',
  },
  {
    chainId: 1,
    address: '0xeca82185adce47f39c684352b0439f030f860318',
    name: 'Perlin',
    symbol: 'PERL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4682/small/PerlinX-Icon-1500px.png?1598633609',
  },
  {
    chainId: 1,
    address: '0x973e52691176d36453868d9d86572788d27041a9',
    name: 'DxChain Token',
    symbol: 'DX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4700/small/VdZwy0Pv_400x400.png?1603089728',
  },
  {
    chainId: 1,
    address: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
    name: 'Ampleforth',
    symbol: 'AMPL',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/4708/small/Ampleforth.png?1561684250',
  },
  {
    chainId: 1,
    address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    name: 'Matic Network',
    symbol: 'MATIC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4713/small/Matic.png?1553498071',
  },
  {
    chainId: 1,
    address: '0x885e127aba09bf8fae058a2895c221b37697c9be',
    name: 'Aced',
    symbol: 'ACED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4761/small/aced.png?1547040086',
  },
  {
    chainId: 1,
    address: '0x14da230d6726c50f759bc1838717f8ce6373509c',
    name: 'Kambria',
    symbol: 'KAT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4784/small/kambria.png?1547040127',
  },
  {
    chainId: 1,
    address: '0x0c6f5f7d555e7518f6841a79436bd2b1eef03381',
    name: 'COCOS BCX',
    symbol: 'COCOS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4932/small/_QPpjoUi_400x400.jpg?1566430520',
  },
  {
    chainId: 1,
    address: '0xb9ef770b6a5e12e45983c5d80545258aa38f3b78',
    name: '0chain',
    symbol: 'ZCN',
    decimals: 10,
    logoURI:
      'https://assets.coingecko.com/coins/images/4934/small/0_Black-svg.png?1600757954',
  },
  {
    chainId: 1,
    address: '0x9b39a0b97319a9bd5fed217c1db7b030453bac91',
    name: 'TigerCash',
    symbol: 'TCH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/4956/small/tigercash-logo.png?1547040378',
  },
  {
    chainId: 1,
    address: '0x8a2279d4a90b6fe1c4b30fa660cc9f926797baa2',
    name: 'Chromia',
    symbol: 'CHR',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/5000/small/Chromia.png?1559038018',
  },
  {
    chainId: 1,
    address: '0xcca0c9c383076649604ee31b20248bc04fdf61ca',
    name: 'Bitmax Token',
    symbol: 'BTMX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5003/small/BTMX.jpg?1547040429',
  },
  {
    chainId: 1,
    address: '0x6a27348483d59150ae76ef4c0f3622a78b0ca698',
    name: 'BeeKan   Beenews',
    symbol: 'BKBT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5004/small/beekan.png?1547040430',
  },
  {
    chainId: 1,
    address: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    name: 'sUSD',
    symbol: 'SUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5013/small/sUSD.png?1562212426',
  },
  {
    chainId: 1,
    address: '0x05079687d35b93538cbd59fe5596380cae9054a9',
    name: 'BitSong',
    symbol: 'BTSG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5041/small/logo_-_2021-01-10T210801.390.png?1610284134',
  },
  {
    chainId: 1,
    address: '0xedf6568618a00c6f0908bf7758a16f76b6e04af9',
    name: 'Arianee',
    symbol: 'ARIA20',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5054/small/Aria_Logo_256.png?1610097866',
  },
  {
    chainId: 1,
    address: '0x76306f029f8f99effe509534037ba7030999e3cf',
    name: 'Acreage Coin',
    symbol: 'ACR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5100/small/acreage-coin.jpg?1547040494',
  },
  {
    chainId: 1,
    address: '0x4eeea7b48b9c3ac8f70a9c932a8b1e8a5cb624c7',
    name: 'Membrana',
    symbol: 'MBN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5117/small/membrana_logo.png?1565238625',
  },
  {
    chainId: 1,
    address: '0xe64b47931f28f89cc7a0c6965ecf89eadb4975f5',
    name: 'Ludos Protocol',
    symbol: 'LUD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5118/small/Ludos_Protocol.jpg?1557216263',
  },
  {
    chainId: 1,
    address: '0x5d4d57cd06fa7fe99e26fdc481b468f77f05073c',
    name: 'Netkoin',
    symbol: 'NTK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5162/small/NTK.png?1606878538',
  },
  {
    chainId: 1,
    address: '0xdb25f211ab05b1c97d595516f45794528a807ad8',
    name: 'STASIS EURO',
    symbol: 'EURS',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/5164/small/EURS_300x300.png?1550571779',
  },
  {
    chainId: 1,
    address: '0x5bc7e5f0ab8b2e10d2d0a3f21739fce62459aef3',
    name: 'Hut34 Entropy',
    symbol: 'ENTRP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5197/small/hut.png?1575869079',
  },
  {
    chainId: 1,
    address: '0x986ee2b944c42d017f52af21c4c69b84dbea35d8',
    name: 'BitMart Token',
    symbol: 'BMX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5236/small/bitmart-token.png?1548835017',
  },
  {
    chainId: 1,
    address: '0x7297862b9670ff015192799cc849726c88bf1d77',
    name: 'SkyMap',
    symbol: 'SKYM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5266/small/soar_earth.png?1547040769',
  },
  {
    chainId: 1,
    address: '0x2ecb13a8c458c379c4d9a7259e202de03c8f3d19',
    name: 'Block chain com',
    symbol: 'BC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5298/small/block-chain-com.png?1547350894',
  },
  {
    chainId: 1,
    address: '0xb1f871ae9462f1b2c6826e88a7827e76f86751d4',
    name: 'GNY',
    symbol: 'GNY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5300/small/icon_gny.jpg?1601926183',
  },
  {
    chainId: 1,
    address: '0x61bfc979ea8160ede9b862798b7833a97bafa02a',
    name: 'RELEASE',
    symbol: 'REL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5387/small/release.jpg?1547041000',
  },
  {
    chainId: 1,
    address: '0x687bfc3e73f6af55f0ccca8450114d107e781a0e',
    name: 'QChi',
    symbol: 'QCH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5392/small/qchi.png?1548607478',
  },
  {
    chainId: 1,
    address: '0x02f2d4a04e6e01ace88bd2cd632875543b2ef577',
    name: 'PKG Token',
    symbol: 'PKG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5422/small/pkg-token.png?1548331357',
  },
  {
    chainId: 1,
    address: '0xd9a8cfe21c232d485065cb62a96866799d4645f7',
    name: 'FingerPrint',
    symbol: 'FGP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5454/small/fingerprint.png?1561602642',
  },
  {
    chainId: 1,
    address: '0x4a621d9f1b19296d1c0f87637b3a8d4978e9bf82',
    name: 'CyberFM',
    symbol: 'CYFM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5476/small/cyberfm.png?1547041216',
  },
  {
    chainId: 1,
    address: '0xba745513acebcbb977497c569d4f7d340f2a936b',
    name: 'Mainstream For The ',
    symbol: 'MFTU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5519/small/Mainstream_for_the_underground.png?1534426154',
  },
  {
    chainId: 1,
    address: '0x48c1b2f3efa85fbafb2ab951bf4ba860a08cdbb7',
    name: 'ShowHand',
    symbol: 'HAND',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/5554/small/showhand.png?1548609179',
  },
  {
    chainId: 1,
    address: '0x2f141ce366a2462f02cea3d12cf93e4dca49e4fd',
    name: 'FREE coin',
    symbol: 'FREE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5585/small/free-coin.png?1548126559',
  },
  {
    chainId: 1,
    address: '0xaea46a60368a7bd060eec7df8cba43b7ef41ad85',
    name: 'Fetch ai',
    symbol: 'FET',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5681/small/Fetch.jpg?1572098136',
  },
  {
    chainId: 1,
    address: '0xd28cfec79db8d0a225767d06140aee280718ab7e',
    name: 'Bizkey',
    symbol: 'BZKY',
    decimals: 16,
    logoURI:
      'https://assets.coingecko.com/coins/images/5766/small/bizkey.png?1547041634',
  },
  {
    chainId: 1,
    address: '0xb20043f149817bff5322f1b928e89abfc65a9925',
    name: 'EXRT Network',
    symbol: 'EXRT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/5954/small/EXRT.jpg?1547041893',
  },
  {
    chainId: 1,
    address: '0x6be61833fc4381990e82d7d4a9f4c9b3f67ea941',
    name: 'Hotbit Token',
    symbol: 'HTB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/5990/small/hotbit-token.png?1547041932',
  },
  {
    chainId: 1,
    address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
    name: 'Gemini Dollar',
    symbol: 'GUSD',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/5992/small/gemini-dollar-gusd.png?1536745278',
  },
  {
    chainId: 1,
    address: '0x780116d91e5592e58a3b3c76a351571b39abcec6',
    name: 'Blockparty',
    symbol: 'BOXX',
    decimals: 15,
    logoURI:
      'https://assets.coingecko.com/coins/images/5995/small/boxx-token.png?1547041938',
  },
  {
    chainId: 1,
    address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    name: 'Paxos Standard',
    symbol: 'PAX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6013/small/paxos_standard.png?1548386291',
  },
  {
    chainId: 1,
    address: '0x8578530205cecbe5db83f7f29ecfeec860c297c2',
    name: 'smARTOFGIVING',
    symbol: 'AOG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6050/small/logo_%286%29.png?1547042007',
  },
  {
    chainId: 1,
    address: '0xcec38306558a31cdbb2a9d6285947c5b44a24f3e',
    name: 'Fantasy Sports',
    symbol: 'DFS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6062/small/fantasy_sports.png?1567508873',
  },
  {
    chainId: 1,
    address: '0x3db6ba6ab6f95efed1a6e794cad492faaabf294d',
    name: 'LTO Network',
    symbol: 'LTO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/6068/small/LTO_Network.png?1567443682',
  },
  {
    chainId: 1,
    address: '0xe48972fcd82a274411c01834e2f031d4377fa2c0',
    name: '2key network',
    symbol: '2KEY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6090/small/2key.png?1591591830',
  },
  {
    chainId: 1,
    address: '0xfef4185594457050cc9c23980d301908fe057bb1',
    name: 'VIDT Datalink',
    symbol: 'VIDT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6115/small/V-ID_blockchain_-logo.png?1547042127',
  },
  {
    chainId: 1,
    address: '0x35a735b7d1d811887966656855f870c05fd0a86d',
    name: 'Thorncoin',
    symbol: 'THRN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6300/small/_VaSXQpe_400x400.jpg?1547042348',
  },
  {
    chainId: 1,
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
  },
  {
    chainId: 1,
    address: '0x01fa555c97d7958fa6f771f3bbd5ccd508f81e22',
    name: 'Civil',
    symbol: 'CVL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6374/small/civil.png?1547042477',
  },
  {
    chainId: 1,
    address: '0xdf59c8ba19b4d1437d80836b45f1319d9a429eed',
    name: 'IZIChain',
    symbol: 'IZI',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/6405/small/logo-icon-200x200.png?1547617296',
  },
  {
    chainId: 1,
    address: '0xf293d23bf2cdc05411ca0eddd588eb1977e8dcd4',
    name: 'Sylo',
    symbol: 'SYLO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6430/small/SYLO.svg?1589527756',
  },
  {
    chainId: 1,
    address: '0xf18432ef894ef4b2a5726f933718f5a8cf9ff831',
    name: 'BioCrypt',
    symbol: 'BIO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/6457/small/200x200logo.png?1547042660',
  },
  {
    chainId: 1,
    address: '0xe1a178b681bd05964d3e3ed33ae731577d9d96dd',
    name: 'BOX Token',
    symbol: 'BOX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6511/small/box-token.png?1547563043',
  },
  {
    chainId: 1,
    address: '0x763fa6806e1acf68130d2d0f0df754c93cc546b2',
    name: 'Lition',
    symbol: 'LIT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6580/small/Lition_ico.png?1547042787',
  },
  {
    chainId: 1,
    address: '0x86ed939b500e121c0c5f493f399084db596dad20',
    name: 'SpaceChain  ERC 20 ',
    symbol: 'SPC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6659/small/Spacechain.jpg?1547042861',
  },
  {
    chainId: 1,
    address: '0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe',
    name: 'DSLA Protocol',
    symbol: 'DSLA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6694/small/dsla_logo-squared_200x200.png?1569571063',
  },
  {
    chainId: 1,
    address: '0xbb1f24c0c1554b9990222f036b0aad6ee4caec29',
    name: 'CryptoSoul',
    symbol: 'SOUL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6723/small/cryptosoul.png?1547042952',
  },
  {
    chainId: 1,
    address: '0x6fe56c0bcdd471359019fcbc48863d6c3e9d4f41',
    name: 'Props Token',
    symbol: 'PROPS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6735/small/photo-2017-10-10-03-32-02.png?1595168186',
  },
  {
    chainId: 1,
    address: '0xfb559ce67ff522ec0b9ba7f5dc9dc7ef6c139803',
    name: 'Probit Token',
    symbol: 'PROB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6765/small/ProBit-Exchange-logo.png?1547043029',
  },
  {
    chainId: 1,
    address: '0x018d7d179350f1bb9853d04982820e37cce13a92',
    name: 'InMax',
    symbol: 'INX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/6826/small/gDALsvq.png?1555895815',
  },
  {
    chainId: 1,
    address: '0x757703bd5b2c4bbcfde0be2c0b0e7c2f31fcf4e9',
    name: 'Zest Token',
    symbol: 'ZEST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/6837/small/33_%281%29.jpg?1594437564',
  },
  {
    chainId: 1,
    address: '0x7de91b204c1c737bcee6f000aaa6569cf7061cb7',
    name: 'Robonomics Network',
    symbol: 'XRT',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/7024/small/Robonomics-Network-logo.png?1547043451',
  },
  {
    chainId: 1,
    address: '0x45af324f53a8d7da1752dad74adc1748126d7978',
    name: 'MyTVchain',
    symbol: 'MYTV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7026/small/MYTV-200x200.png?1585697417',
  },
  {
    chainId: 1,
    address: '0x06e0feb0d74106c7ada8497754074d222ec6bcdf',
    name: 'Bitball',
    symbol: 'BTB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7039/small/BitBall_png_.png?1588640849',
  },
  {
    chainId: 1,
    address: '0x8b79656fc38a04044e495e22fad747126ca305c4',
    name: 'AgaveCoin',
    symbol: 'AGVC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7056/small/G4TML4cb_400x400.jpg?1547043511',
  },
  {
    chainId: 1,
    address: '0xb8e103b60a33597136ea9511f46b6dbeb643a3a5',
    name: 'SiamBitcoin',
    symbol: 'SBTC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7089/small/image-62DF_5C05991C.jpg?1547043573',
  },
  {
    chainId: 1,
    address: '0x2ec95b8eda549b79a1248335a39d299d00ed314c',
    name: 'Fatcoin',
    symbol: 'FAT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7109/small/SV2Xb94q_400x400.jpg?1547043605',
  },
  {
    chainId: 1,
    address: '0x790bfacae71576107c068f494c8a6302aea640cb',
    name: 'CryptoBossCoin',
    symbol: 'CBC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7114/small/eqIkj-ZZ_400x400.jpg?1549521587',
  },
  {
    chainId: 1,
    address: '0x58b6a8a3302369daec383334672404ee733ab239',
    name: 'Livepeer',
    symbol: 'LPT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7137/small/livepeer.png?1547976208',
  },
  {
    chainId: 1,
    address: '0xf1290473e210b2108a85237fbcd7b6eb42cc654f',
    name: 'HedgeTrade',
    symbol: 'HEDG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7196/small/to3Vj4EZ_400x400.jpg?1547043758',
  },
  {
    chainId: 1,
    address: '0x297e4e5e59ad72b1b0a2fd446929e76117be0e0a',
    name: 'Smart Valor',
    symbol: 'VALOR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7231/small/smart_valor.png?1555925772',
  },
  {
    chainId: 1,
    address: '0xdb05ea0877a2622883941b939f0bb11d1ac7c400',
    name: 'Opacity',
    symbol: 'OPCT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7237/small/Opacity.jpg?1551843524',
  },
  {
    chainId: 1,
    address: '0xd4ca5c2aff1eefb0bea9e9eab16f88db2990c183',
    name: 'XRP Classic',
    symbol: 'XRPC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/7259/small/xrpc.png?1572011410',
  },
  {
    chainId: 1,
    address: '0x95daaab98046846bf4b2853e23cba236fa394a31',
    name: 'EthermonToken',
    symbol: 'EMONT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/7272/small/colorfull_with_word_250x250.png?1580111776',
  },
  {
    chainId: 1,
    address: '0x73c9275c3a2dd84b5741fd59aebf102c91eb033f',
    name: 'Bitball Treasure',
    symbol: 'BTRS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7273/small/normal_5b87c9dd5583d.png?1547043898',
  },
  {
    chainId: 1,
    address: '0x70a63225bcadacc4430919f0c1a4f0f5fcffbaac',
    name: 'VEY',
    symbol: 'VEY',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/7282/small/dkDh4z0a_400x400.jpg?1547043914',
  },
  {
    chainId: 1,
    address: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
    name: 'Crypto com Coin',
    symbol: 'CRO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/7310/small/cypto.png?1547043960',
  },
  {
    chainId: 1,
    address: '0xd4f6f9ae14399fd5eb8dfc7725f0094a1a7f5d80',
    name: 'Bitsten Token',
    symbol: 'BST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7335/small/bitsten.png?1589629209',
  },
  {
    chainId: 1,
    address: '0x7865af71cf0b288b4e7f654f4f7851eb46a2b7f8',
    name: 'Sentivate',
    symbol: 'SNTVT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7383/small/2x9veCp.png?1598409975',
  },
  {
    chainId: 1,
    address: '0x03282f2d7834a97369cad58f888ada19eec46ab6',
    name: 'Globex',
    symbol: 'GEX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/7391/small/globex.png?1592450726',
  },
  {
    chainId: 1,
    address: '0xaec7d1069e3a914a3eb50f0bfb1796751f2ce48a',
    name: 'S4FE',
    symbol: 'S4F',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7405/small/logo_%284%29.png?1547085640',
  },
  {
    chainId: 1,
    address: '0x32c4adb9cf57f972bc375129de91c897b4f364f1',
    name: 'Flowchain',
    symbol: 'FLC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7446/small/logo_%2889%29.png?1597459811',
  },
  {
    chainId: 1,
    address: '0xb8a5dba52fe8a0dd737bf15ea5043cea30c7e30b',
    name: 'AFRICUNIA BANK',
    symbol: 'AFCASH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7449/small/afcash.jpg?1592393180',
  },
  {
    chainId: 1,
    address: '0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9',
    name: 'Donut',
    symbol: 'DONUT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7538/small/Donut.png?1548234345',
  },
  {
    chainId: 1,
    address: '0x1beef31946fbbb40b877a72e4ae04a8d1a5cee06',
    name: 'Parachute',
    symbol: 'PAR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7590/small/Parachute_Logo.png?1560918207',
  },
  {
    chainId: 1,
    address: '0xa4bdb11dc0a2bec88d24a3aa1e6bb17201112ebe',
    name: 'Stably Dollar',
    symbol: 'USDS',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/7596/small/logo.png?1604543121',
  },
  {
    chainId: 1,
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744',
  },
  {
    chainId: 1,
    address: '0x965f109d31ccb77005858defae0ebaf7b4381652',
    name: 'BitStash Marketplac',
    symbol: 'STASH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7674/small/bitstash.png?1555301765',
  },
  {
    chainId: 1,
    address: '0x8ffe40a3d0f80c0ce6b203d5cdc1a6a86d9acaea',
    name: 'IG Gold',
    symbol: 'IGG',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/7697/small/N7aEdYrY_400x400.png?1561587437',
  },
  {
    chainId: 1,
    address: '0xa960d2ba7000d58773e7fa5754dec3bb40a069d5',
    name: 'One DEX',
    symbol: 'ODEX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7712/small/WzsJ6pIr_400x400.jpg?1549940214',
  },
  {
    chainId: 1,
    address: '0x1c95b093d6c236d3ef7c796fe33f9cc6b8606714',
    name: 'BOMB',
    symbol: 'BOMB',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/7713/small/Bomb-token.png?1549944422',
  },
  {
    chainId: 1,
    address: '0x5aaefe84e0fb3dd1f0fcff6fa7468124986b91bd',
    name: 'Evedo',
    symbol: 'EVED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7721/small/Variations-09.png?1549979992',
  },
  {
    chainId: 1,
    address: '0x4bd70556ae3f8a6ec6c4080a0c327b24325438f3',
    name: 'Hxro',
    symbol: 'HXRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7805/small/hxro-squarelogo-1585089594129.png?1586221980',
  },
  {
    chainId: 1,
    address: '0xb3e2cb7cccfe139f8ff84013823bf22da6b6390a',
    name: 'Iconic Token',
    symbol: 'ICNQ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7830/small/2_Iconic_Holding_icon.png?1593396172',
  },
  {
    chainId: 1,
    address: '0xe6be436df1ff96956dfe0b2b77fab84ede30236f',
    name: 'Revelation coin',
    symbol: 'REV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7855/small/Db7wCd0.jpg?1551171100',
  },
  {
    chainId: 1,
    address: '0xac9ce326e95f51b5005e9fe1dd8085a01f18450c',
    name: 'VeriSafe',
    symbol: 'VSF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7862/small/verisafe_logo.png?1563852491',
  },
  {
    chainId: 1,
    address: '0xac2385e183d9301dd5e2bb08da932cbf9800dc9c',
    name: 'Netkoin Liquid',
    symbol: 'LIQUID',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7910/small/netkoin-liquid-logo-600x400.png?1551755315',
  },
  {
    chainId: 1,
    address: '0xd9ec3ff1f8be459bb9369b4e79e9ebcf7141c093',
    name: 'KardiaChain',
    symbol: 'KAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7942/small/KardiaChain.png?1591631223',
  },
  {
    chainId: 1,
    address: '0x4b7ad3a56810032782afce12d7d27122bdb96eff',
    name: 'Sparkle Loyalty',
    symbol: 'SPRKL',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/7949/small/SparkleLoyalty_Icon.png?1597653289',
  },
  {
    chainId: 1,
    address: '0xffc63b9146967a1ba33066fb057ee3722221acf0',
    name: 'Alpha Token',
    symbol: 'A',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7968/small/alpha-token.jpg?1552883009',
  },
  {
    chainId: 1,
    address: '0x9aab071b4129b083b01cb5a0cb513ce7eca26fa5',
    name: 'HUNT',
    symbol: 'HUNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7989/small/HUNT.png?1571024256',
  },
  {
    chainId: 1,
    address: '0x0a913bead80f321e7ac35285ee10d9d922659cb7',
    name: 'DOS Network',
    symbol: 'DOS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/7991/small/DOS.png?1552900889',
  },
  {
    chainId: 1,
    address: '0xb9eefc4b0d472a44be93970254df4f4016569d27',
    name: 'DigitalBits',
    symbol: 'XDB',
    decimals: 7,
    logoURI:
      'https://assets.coingecko.com/coins/images/8089/small/digitalbits-logo.jpg?1554454902',
  },
  {
    chainId: 1,
    address: '0x056dd20b01799e9c1952c7c9a5ff4409a6110085',
    name: 'WPP Token',
    symbol: 'WPP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8103/small/WzdD53fh_400x400.jpg?1554860792',
  },
  {
    chainId: 1,
    address: '0x70debcdab2ef20be3d1dbff6a845e9ccb6e46930',
    name: 'BIKI',
    symbol: 'BIKI',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/8119/small/BiKi_icon.png?1581935375',
  },
  {
    chainId: 1,
    address: '0x1fcdce58959f536621d76f5b7ffb955baa5a672f',
    name: 'ForTube',
    symbol: 'FOR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8242/small/for.png?1606195375',
  },
  {
    chainId: 1,
    address: '0xe5caef4af8780e59df925470b050fb23c43ca68c',
    name: 'Ferrum Network',
    symbol: 'FRM',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/8251/small/frm.png?1563777564',
  },
  {
    chainId: 1,
    address: '0x13e9ec660d872f55405d70e5c52d872136f0970c',
    name: 'Twinkle',
    symbol: 'TKT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8260/small/twinkle.png?1557123321',
  },
  {
    chainId: 1,
    address: '0x35a5cb585d51d836922b78a9bb1f5c04635c39b6',
    name: 'Decimated',
    symbol: 'DIO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/8271/small/DIO-white.bg2_.jpg?1557190407',
  },
  {
    chainId: 1,
    address: '0x07597255910a51509ca469568b048f2597e72504',
    name: 'Uptrennd',
    symbol: '1UP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8273/small/Uptrennd_Logo.png?1579334846',
  },
  {
    chainId: 1,
    address: '0x4954db6391f4feb5468b6b943d4935353596aec9',
    name: 'USDQ',
    symbol: 'USDQ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8300/small/favicon-256x256.png?1557315995',
  },
  {
    chainId: 1,
    address: '0x047686fb287e7263a23873dea66b4501015a2226',
    name: 'Blockchain Cuties U',
    symbol: 'CUTE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8328/small/bnLvIEl1_400x400.jpg?1557533240',
  },
  {
    chainId: 1,
    address: '0xe54b3458c47e44c37a267e7c633afef88287c294',
    name: 'Artfinity Token',
    symbol: 'AT',
    decimals: 5,
    logoURI:
      'https://assets.coingecko.com/coins/images/8339/small/artfinity.png?1557604049',
  },
  {
    chainId: 1,
    address: '0x8762db106b2c2a0bccb3a80d1ed41273552616e8',
    name: 'Reserve Rights Toke',
    symbol: 'RSR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8365/small/Reserve_Rights.png?1557737411',
  },
  {
    chainId: 1,
    address: '0x0488401c3f535193fa8df029d9ffe615a06e74e6',
    name: 'SparkPoint',
    symbol: 'SRK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8371/small/U8-03TzL_400x400.jpg?1557811463',
  },
  {
    chainId: 1,
    address: '0x3c76ef53be46ed2e9be224e8f0b92e8acbc24ea0',
    name: 'Bitsou',
    symbol: 'BTU',
    decimals: 3,
    logoURI:
      'https://assets.coingecko.com/coins/images/8378/small/61B3F6DFA9584DDAA760E74B12D6FAD3.png?1557823748',
  },
  {
    chainId: 1,
    address: '0x09617f6fd6cf8a71278ec86e23bbab29c04353a7',
    name: 'Shardus',
    symbol: 'ULT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8383/small/final_logo_photoshop.png?1557890272',
  },
  {
    chainId: 1,
    address: '0x98e0438d3ee1404fea48e38e92853bb08cfa68bd',
    name: 'TVT',
    symbol: 'TVT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/8388/small/g8hXw4QX_400x400.jpg?1557973343',
  },
  {
    chainId: 1,
    address: '0x6c22b815904165f3599f0a4a092d458966bd8024',
    name: 'Bit Public Talent N',
    symbol: 'BPTN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8412/small/7f346702db390a289f5770f008563173.png?1558077057',
  },
  {
    chainId: 1,
    address: '0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3',
    name: 'LEO Token',
    symbol: 'LEO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8418/small/leo-token.png?1558326215',
  },
  {
    chainId: 1,
    address: '0xd36a0e7b741542208ae0fbb35453c893d0136625',
    name: 'ITO Utility Token',
    symbol: 'IUT',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/8420/small/300x300.png?1592800024',
  },
  {
    chainId: 1,
    address: '0xb4272071ecadd69d933adcd19ca99fe80664fc08',
    name: 'CryptoFranc',
    symbol: 'XCHF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8465/small/WhuiuJBc_400x400.jpg?1558699947',
  },
  {
    chainId: 1,
    address: '0xf0bc1ae4ef7ffb126a8347d06ac6f8add770e1ce',
    name: '1Million Token',
    symbol: '1MT',
    decimals: 7,
    logoURI:
      'https://assets.coingecko.com/coins/images/8495/small/1MTp.png?1586964391',
  },
  {
    chainId: 1,
    address: '0xba50933c268f567bdc86e1ac131be072c6b0b71a',
    name: 'ARPA Chain',
    symbol: 'ARPA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8506/small/9u0a23XY_400x400.jpg?1559027357',
  },
  {
    chainId: 1,
    address: '0x8b8a8a91d7b8ec2e6ab37ed8ffbacee062c6f3c7',
    name: 'ECP  Technology',
    symbol: 'ECP',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/8507/small/lhwmJl7R_400x400.png?1574931781',
  },
  {
    chainId: 1,
    address: '0x0e5f00da8aaef196a719d045db89b5da8f371b32',
    name: 'Connectome',
    symbol: 'CNTM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8528/small/200_200_CNTM-LOGO-07.png?1600751947',
  },
  {
    chainId: 1,
    address: '0x11eef04c884e24d9b7b4760e7476d06ddf797f36',
    name: 'MX Token',
    symbol: 'MX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8545/small/TII1YIdv_400x400.png?1559180170',
  },
  {
    chainId: 1,
    address: '0x3166c570935a7d8554c8f4ea792ff965d2efe1f2',
    name: 'Q DAO Governance to',
    symbol: 'QDAO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8599/small/QDAO_logo_white_black.png?1562131656',
  },
  {
    chainId: 1,
    address: '0xd6a55c63865affd67e2fb9f284f87b7a9e5ff3bd',
    name: 'Switch',
    symbol: 'ESH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8608/small/Cco9sLN.png?1603676332',
  },
  {
    chainId: 1,
    address: '0xac4d22e40bf0b8ef4750a99ed4e935b99a42685e',
    name: 'Aeryus',
    symbol: 'AER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8626/small/aerlogo.png.jpeg?1559773242',
  },
  {
    chainId: 1,
    address: '0x5acd07353106306a6530ac4d49233271ec372963',
    name: 'Ethereum Cloud',
    symbol: 'ETY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8682/small/ethereumcloud_mid_1554103232943.png?1570230515',
  },
  {
    chainId: 1,
    address: '0xde7d85157d9714eadf595045cc12ca4a5f3e2adb',
    name: 'STP Network',
    symbol: 'STPT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8713/small/STP.png?1560262664',
  },
  {
    chainId: 1,
    address: '0x1b073382e63411e3bcffe90ac1b9a43fefa1ec6f',
    name: 'Bitpanda Ecosystem ',
    symbol: 'BEST',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/8738/small/BEST_250px.png?1570103109',
  },
  {
    chainId: 1,
    address: '0x79c71d3436f39ce382d0f58f1b011d88100b9d91',
    name: 'Xeonbit Token',
    symbol: 'XNS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8744/small/200x200_icon_darkbg.png?1560826732',
  },
  {
    chainId: 1,
    address: '0xa31b1767e09f842ecfd4bc471fe44f830e3891aa',
    name: 'Roobee',
    symbol: 'ROOBEE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8791/small/Group_11.png?1580344629',
  },
  {
    chainId: 1,
    address: '0x09fe5f0236f0ea5d930197dce254d77b04128075',
    name: 'Wrapped CryptoKitti',
    symbol: 'WCK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8797/small/WCK.png?1561705836',
  },
  {
    chainId: 1,
    address: '0x4c1c4957d22d8f373aed54d0853b090666f6f9de',
    name: 'Silverway',
    symbol: 'SLV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8822/small/Silverway.png?1561629364',
  },
  {
    chainId: 1,
    address: '0x1c48f86ae57291f7686349f12601910bd8d470bb',
    name: 'USDK',
    symbol: 'USDK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8824/small/usdk.png?1563418517',
  },
  {
    chainId: 1,
    address: '0xfc82bb4ba86045af6f327323a46e80412b91b27d',
    name: 'Prometeus',
    symbol: 'PROM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8825/small/G2LY-Dg_.png?1591698270',
  },
  {
    chainId: 1,
    address: '0x87210f1d3422ba75b6c40c63c78d79324dabcd55',
    name: 'EOS TRUST',
    symbol: 'EOST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8829/small/EOS_TRUST.png?1561955075',
  },
  {
    chainId: 1,
    address: '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    name: 'sBTC',
    symbol: 'SBTC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8838/small/XOZPLK3.png?1605006973',
  },
  {
    chainId: 1,
    address: '0x79cdfa04e3c4eb58c4f49dae78b322e5b0d38788',
    name: 'Truefeedback Token',
    symbol: 'TFB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8842/small/5rd7a55q_400x400.png?1562902557',
  },
  {
    chainId: 1,
    address: '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb',
    name: 'sETH',
    symbol: 'SETH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8843/small/9ZAujYk.png?1605006952',
  },
  {
    chainId: 1,
    address: '0xa9859874e1743a32409f75bb11549892138bba1e',
    name: 'iETH',
    symbol: 'IETH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8846/small/iETH.png?1562212479',
  },
  {
    chainId: 1,
    address: '0x8515cd0f00ad81996d24b9a9c35121a3b759d6cd',
    name: 'BlockBurn',
    symbol: 'BURN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8851/small/blockburn.JPG?1582774870',
  },
  {
    chainId: 1,
    address: '0x6226caa1857afbc6dfb6ca66071eb241228031a1',
    name: 'LinkArt',
    symbol: 'LAR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8892/small/pB4iXZbU_400x400.jpg?1562579001',
  },
  {
    chainId: 1,
    address: '0x57b946008913b82e4df85f501cbaed910e58d26c',
    name: 'Marlin',
    symbol: 'POND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8903/small/Marlin.png?1608584519',
  },
  {
    chainId: 1,
    address: '0x191557728e4d8caa4ac94f86af842148c0fa8f7e',
    name: 'Ormeus Ecosystem',
    symbol: 'ECO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/8923/small/logo_eco_low.png?1562902804',
  },
  {
    chainId: 1,
    address: '0x426fc8be95573230f6e6bc4af91873f0c67b21b4',
    name: 'BlackPearl Token',
    symbol: 'BPLC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8931/small/EJIpComQ_400x400.png?1584653141',
  },
  {
    chainId: 1,
    address: '0x740623d2c797b7d8d1ecb98e9b4afcf99ec31e14',
    name: 'DoYourTip',
    symbol: 'DYT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8936/small/image1.png?1578033515',
  },
  {
    chainId: 1,
    address: '0x187d1018e8ef879be4194d6ed7590987463ead85',
    name: 'FUZE Token',
    symbol: 'FUZE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8941/small/logo-fuze-fix-big.png?1563117524',
  },
  {
    chainId: 1,
    address: '0x3b7f247f21bf3a07088c2d3423f64233d4b069f7',
    name: 'DYNAMITE Token',
    symbol: 'DYNMT',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/8951/small/dynamite_logo.jpg?1598851224',
  },
  {
    chainId: 1,
    address: '0xf6537fe0df7f0cc0985cf00792cc98249e73efa0',
    name: 'GIV Token',
    symbol: 'GIV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/8996/small/giv.png?1596069222',
  },
  {
    chainId: 1,
    address: '0x4b4b1d389d4f4e082b30f75c6319c0ce5acbd619',
    name: 'Heart Number',
    symbol: 'HTN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9002/small/htn%28200x200%29.png?1600757668',
  },
  {
    chainId: 1,
    address: '0xbf4a2ddaa16148a9d0fa2093ffac450adb7cd4aa',
    name: 'Ethereum Money',
    symbol: 'ETHMNY',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/9025/small/20200605_131214.png?1597297671',
  },
  {
    chainId: 1,
    address: '0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9',
    name: 'FTX Token',
    symbol: 'FTT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9026/small/F.png?1609051564',
  },
  {
    chainId: 1,
    address: '0x456ae45c0ce901e2e7c99c0718031cec0a7a59ff',
    name: 'Vision Network',
    symbol: 'VSN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9029/small/photo_2020-08-14_20-34-55.jpg?1606133699',
  },
  {
    chainId: 1,
    address: '0x2cd9324ba13b77554592d453e6364086fbba446a',
    name: '502 Bad Gateway Tok',
    symbol: 'Z502',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/9040/small/502.jpg?1563872035',
  },
  {
    chainId: 1,
    address: '0x47e820df943170b0e31f9e18ecd5bdd67b77ff1f',
    name: 'PIGX',
    symbol: 'PIGX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9069/small/IMG_5547.PNG?1604239318',
  },
  {
    chainId: 1,
    address: '0x810908b285f85af668f6348cd8b26d76b3ec12e1',
    name: 'SwapCoinz',
    symbol: 'SPAZ',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9081/small/8HfLK99.png?1586746202',
  },
  {
    chainId: 1,
    address: '0x03fb52d4ee633ab0d06c833e32efdd8d388f3e6a',
    name: 'Super Black Hole',
    symbol: 'HOLE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9087/small/SdAKFUu.png?1564086285',
  },
  {
    chainId: 1,
    address: '0x5b535edfa75d7cb706044da0171204e1c48d00e8',
    name: '808TA Token',
    symbol: '808TA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9120/small/eKmFtFle_400x400.png?1564473061',
  },
  {
    chainId: 1,
    address: '0x675ce995953136814cb05aaaa5d02327e7dc8c93',
    name: 'Blue Baikal',
    symbol: 'BBC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9130/small/symbol_Blue_Baikal.png?1586736403',
  },
  {
    chainId: 1,
    address: '0x83869de76b9ad8125e22b857f519f001588c0f62',
    name: 'EXMO Coin',
    symbol: 'EXM',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9154/small/exmo_token.png?1579588209',
  },
  {
    chainId: 1,
    address: '0x5f9d86fa0454ffd6a59ccc485e689b0a832313db',
    name: 'XWC Dice Token',
    symbol: 'XDT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9189/small/xdt.PNG?1565000033',
  },
  {
    chainId: 1,
    address: '0x8cb1d155a5a1d5d667611b7710920fd9d1cd727f',
    name: 'Aircoins',
    symbol: 'AIRX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9201/small/Aircoins.png?1591615033',
  },
  {
    chainId: 1,
    address: '0x26946ada5ecb57f3a1f91605050ce45c482c9eb1',
    name: 'BitcoinSoV',
    symbol: 'BSOV',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9205/small/bsov.png?1578020375',
  },
  {
    chainId: 1,
    address: '0x3a9fff453d50d4ac52a6890647b823379ba36b9e',
    name: 'Shuffle Monster',
    symbol: 'SHUF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9222/small/shuf.png?1568038008',
  },
  {
    chainId: 1,
    address: '0xebf4ca5319f406602eeff68da16261f1216011b5',
    name: 'Yobit Token',
    symbol: 'YO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9231/small/ybx_logo.gif?1565306320',
  },
  {
    chainId: 1,
    address: '0xe541504417670fb76b612b41b4392d967a1956c7',
    name: 'Bitsonic Token',
    symbol: 'BSC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9238/small/image.png?1604295837',
  },
  {
    chainId: 1,
    address: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
    name: 'cDAI',
    symbol: 'CDAI',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9281/small/cDAI.png?1576467585',
  },
  {
    chainId: 1,
    address: '0x525794473f7ab5715c81d06d10f52d11cc052804',
    name: '12Ships',
    symbol: 'TSHP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9351/small/12ships.png?1566485390',
  },
  {
    chainId: 1,
    address: '0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9',
    name: 'Swipe',
    symbol: 'SXP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9368/small/swipe.png?1566792311',
  },
  {
    chainId: 1,
    address: '0xeb269732ab75a6fd61ea60b06fe994cd32a83549',
    name: 'USDx Stablecoin',
    symbol: 'USDX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9375/small/logo_USDx_256x256.png?1568695741',
  },
  {
    chainId: 1,
    address: '0xf784682c82526e245f50975190ef0fff4e4fc077',
    name: 'INLOCK',
    symbol: 'ILK',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9377/small/qlyyGGYI_400x400.jpg?1566774060',
  },
  {
    chainId: 1,
    address: '0x0cd1b0e93ebaad374752af74fe44f877dd0438c0',
    name: 'TCS Token',
    symbol: 'TCS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9413/small/logo256.png?1567029646',
  },
  {
    chainId: 1,
    address: '0x8e30ea2329d95802fd804f4291220b0e2f579812',
    name: 'Decentralized Vulne',
    symbol: 'DVP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9424/small/4520.png?1568598223',
  },
  {
    chainId: 1,
    address: '0x998ffe1e43facffb941dc337dd0468d52ba5b48a',
    name: 'Rupiah Token',
    symbol: 'IDRT',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/9441/small/57421944_1371636006308255_3647136573922738176_n.jpg?1567462531',
  },
  {
    chainId: 1,
    address: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
    name: 'cUSDC',
    symbol: 'CUSDC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9442/small/Compound_USDC.png?1567581577',
  },
  {
    chainId: 1,
    address: '0x9469d013805bffb7d3debe5e7839237e535ec483',
    name: 'Darwinia Network Na',
    symbol: 'RING',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9443/small/iHFgzyCK_400x400.png?1567463393',
  },
  {
    chainId: 1,
    address: '0x83d60e7aed59c6829fb251229061a55f35432c4d',
    name: 'Infinito',
    symbol: 'INFT',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/9461/small/5TOvk2A.png?1604885818',
  },
  {
    chainId: 1,
    address: '0x0000852600ceb001e08e00bc008be620d60031f2',
    name: 'TrueHKD',
    symbol: 'THKD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9465/small/THKD.png?1567642964',
  },
  {
    chainId: 1,
    address: '0x412d397ddca07d753e3e0c61e367fb1b474b3e7d',
    name: '8X8 Protocol',
    symbol: 'EXE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9466/small/8x8_symbol_512x.png?1574320199',
  },
  {
    chainId: 1,
    address: '0xaa7fb1c8ce6f18d4fd4aabb61a2193d4d441c54f',
    name: 'ShitCoin',
    symbol: 'SHIT',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/9472/small/ShitCoin_200x200.png?1567723695',
  },
  {
    chainId: 1,
    address: '0x4ec2efb9cbd374786a03261e46ffce1a67756f3b',
    name: 'Deflacoin',
    symbol: 'DEFL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9477/small/20190906_172749.png?1567982012',
  },
  {
    chainId: 1,
    address: '0x45804880de22913dafe09f4980848ece6ecbaf78',
    name: 'PAX Gold',
    symbol: 'PAXG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9519/small/paxg.PNG?1568542565',
  },
  {
    chainId: 1,
    address: '0xa689dcea8f7ad59fb213be4bc624ba5500458dc6',
    name: 'EURBASE',
    symbol: 'EBASE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9541/small/Eurbase_Logo.png?1590024287',
  },
  {
    chainId: 1,
    address: '0xd56dac73a4d6766464b38ec6d91eb45ce7457c44',
    name: 'Panvala Pan',
    symbol: 'PAN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9543/small/pan-logo.png?1568674599',
  },
  {
    chainId: 1,
    address: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
    name: 'Band Protocol',
    symbol: 'BAND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9545/small/band-protocol.png?1568730326',
  },
  {
    chainId: 1,
    address: '0xdf574c24545e5ffecb9a659c229253d4111d87e1',
    name: 'HUSD',
    symbol: 'HUSD',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9567/small/HUSD.jpg?1568889385',
  },
  {
    chainId: 1,
    address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    name: 'Binance USD',
    symbol: 'BUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9576/small/BUSD.png?1568947766',
  },
  {
    chainId: 1,
    address: '0xb020ed54651831878e5c967e0953a900786178f9',
    name: 'Baz Token',
    symbol: 'BAZT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9581/small/baz.png?1576038883',
  },
  {
    chainId: 1,
    address: '0x9556f8ee795d991ff371f547162d5efb2769425f',
    name: 'DMme',
    symbol: 'DMME',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9598/small/iyrIZf3N_400x400.png?1569383452',
  },
  {
    chainId: 1,
    address: '0x25901f2a5a4bb0aaabe2cdb24e0e15a0d49b015d',
    name: 'Bitfex',
    symbol: 'BFX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9616/small/CBc5dTJ.png?1569853341',
  },
  {
    chainId: 1,
    address: '0x630d98424efe0ea27fb1b3ab7741907dffeaad78',
    name: 'PEAKDEFI',
    symbol: 'PEAK',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9626/small/PEAKDEFI_Logo_250x250.png?1603094772',
  },
  {
    chainId: 1,
    address: '0x536381a8628dbcc8c70ac9a30a7258442eab4c92',
    name: 'Pantos',
    symbol: 'PAN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9639/small/icon-coin-pan-color_250px.png?1570103344',
  },
  {
    chainId: 1,
    address: '0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5',
    name: 'Tellor',
    symbol: 'TRB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9644/small/Blk_icon_current.png?1584980686',
  },
  {
    chainId: 1,
    address: '0x931ad0628aa11791c26ff4d41ce23e40c31c5e4e',
    name: 'Pegasus',
    symbol: 'PGS',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9646/small/pgs.PNG?1570179224',
  },
  {
    chainId: 1,
    address: '0x1f3f677ecc58f6a1f9e2cf410df4776a8546b5de',
    name: 'VNDC',
    symbol: 'VNDC',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/9670/small/vndc-gold-coin.png?1571032826',
  },
  {
    chainId: 1,
    address: '0x0452aed878805514e28fb5bd0b56bef92176e32a',
    name: 'BPOP',
    symbol: 'BPOP',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9701/small/bpop.PNG?1570916211',
  },
  {
    chainId: 1,
    address: '0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0',
    name: 'dForce Token',
    symbol: 'DF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9709/small/xlGxxIjI_400x400.jpg?1571006794',
  },
  {
    chainId: 1,
    address: '0xe0b9bcd54bf8a730ea5d3f1ffce0885e911a502c',
    name: 'ZUM TOKEN',
    symbol: 'ZUM',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9721/small/zum256x256.png?1571264005',
  },
  {
    chainId: 1,
    address: '0x8888889213dd4da823ebdd1e235b09590633c150',
    name: 'Marblecoin',
    symbol: 'MBC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9770/small/logo_%2824%29.png?1571610155',
  },
  {
    chainId: 1,
    address: '0x7c8155909cd385f120a56ef90728dd50f9ccbe52',
    name: 'Nahmii',
    symbol: 'NII',
    decimals: 15,
    logoURI:
      'https://assets.coingecko.com/coins/images/9786/small/nahmii-sm_icon-full-color.png?1608513773',
  },
  {
    chainId: 1,
    address: '0x3dc9a42fa7afe57be03c58fd7f4411b1e466c508',
    name: 'Attention Mining',
    symbol: 'CLL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9790/small/CLL_drop_Shaddow_200x_200.png?1571874444',
  },
  {
    chainId: 1,
    address: '0x792e0fc822ac6ff5531e46425f13540f1f68a7a8',
    name: 'CoinHot',
    symbol: 'CHT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/9803/small/nav_light.png?1571919368',
  },
  {
    chainId: 1,
    address: '0xdd436a0dce9244b36599ae7b22f0373b4e33992d',
    name: 'TrustUSD',
    symbol: 'TRUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9811/small/TrustUSDlogo.png?1589631273',
  },
  {
    chainId: 1,
    address: '0xaa2ce7ae64066175e0b90497ce7d9c190c315db4',
    name: 'Suterusu',
    symbol: 'SUTER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9830/small/p-NFlBlw_400x400.jpg?1572472860',
  },
  {
    chainId: 1,
    address: '0x9cb2f26a23b8d89973f08c957c4d7cdf75cd341c',
    name: 'Digital Rand',
    symbol: 'DZAR',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/9841/small/logo200_%281%29.png?1572577311',
  },
  {
    chainId: 1,
    address: '0x1412f6aa5adc77c620715bb2a020aa690b85f68a',
    name: 'MargiX',
    symbol: 'MGX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9865/small/MGX_Logo.png?1603614181',
  },
  {
    chainId: 1,
    address: '0xf5a562597d5fb5cc19482379755e1a5275a6607b',
    name: 'XFOC',
    symbol: 'XFOC',
    decimals: 7,
    logoURI:
      'https://assets.coingecko.com/coins/images/9885/small/logo_%2811%29.png?1572942311',
  },
  {
    chainId: 1,
    address: '0x150b0b96933b75ce27af8b92441f8fb683bf9739',
    name: 'Dragonereum GOLD',
    symbol: 'GOLD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9905/small/PO04AL0y_400x400.jpg?1573437136',
  },
  {
    chainId: 1,
    address: '0xd8a8843b0a5aba6b030e92b3f4d669fad8a5be50',
    name: 'AfroDex Labs Token',
    symbol: 'AFDLT',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/9908/small/GOLDEN_TOKEN_4.png?1575868746',
  },
  {
    chainId: 1,
    address: '0x00fc270c9cc13e878ab5363d00354bebf6f05c15',
    name: 'VNX Exchange',
    symbol: 'VNXLU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9945/small/vnx.PNG?1573639467',
  },
  {
    chainId: 1,
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    name: 'Dai',
    symbol: 'DAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png?1574218774',
  },
  {
    chainId: 1,
    address: '0x6f02055e3541dd74a1abd8692116c22ffafadc5d',
    name: 'The Mart Token',
    symbol: 'TMT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9963/small/tmt.png?1585317430',
  },
  {
    chainId: 1,
    address: '0xcf8f9555d55ce45a3a33a81d6ef99a2a2e71dee2',
    name: 'CBI Index 7',
    symbol: 'CBIX7',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9978/small/CBIX7.png?1574320790',
  },
  {
    chainId: 1,
    address: '0x037a54aab062628c9bbae1fdb1583c195585fe41',
    name: 'LCX',
    symbol: 'LCX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9985/small/zRPSu_0o_400x400.jpg?1574327008',
  },
  {
    chainId: 1,
    address: '0xc770eefad204b5180df6a14ee197d99d808ee52d',
    name: 'FOX Token',
    symbol: 'FOX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9988/small/FOX.png?1574330622',
  },
  {
    chainId: 1,
    address: '0x68eb95dc9934e19b86687a10df8e364423240e94',
    name: '3X Long Bitcoin Tok',
    symbol: 'BULL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9992/small/683JEXMN_400x400.png?1574418750',
  },
  {
    chainId: 1,
    address: '0x5f75112bbb4e1af516fbe3e21528c63da2b6a1a5',
    name: 'Chess Coin',
    symbol: 'CHESS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/9998/small/Webp.net-resizeimage.png?1595321722',
  },
  {
    chainId: 1,
    address: '0x38a0df9a08d18dc06cd91fc7ec94a0acdf28d994',
    name: 'Huptex',
    symbol: 'HTX',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/10000/small/qv4yQIm.png?1574655042',
  },
  {
    chainId: 1,
    address: '0x0a9f693fce6f00a51a8e0db4351b5a8078b4242e',
    name: 'Resfinex Token',
    symbol: 'RES',
    decimals: 5,
    logoURI:
      'https://assets.coingecko.com/coins/images/10026/small/logo_%281%29.png?1588935633',
  },
  {
    chainId: 1,
    address: '0x0f7f961648ae6db43c75663ac7e5414eb79b5704',
    name: 'XIO',
    symbol: 'XIO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10029/small/tvXNjFX1_400x400.png?1574896146',
  },
  {
    chainId: 1,
    address: '0x08130635368aa28b217a4dfb68e1bf8dc525621c',
    name: 'AfroDex',
    symbol: 'AFROX',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/10047/small/AfroDex_LOGO.png?1575243022',
  },
  {
    chainId: 1,
    address: '0x4588c3c165a5c66c020997d89c2162814aec9cd6',
    name: 'Bitcoin Wheelchair',
    symbol: 'BTCWH',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10067/small/BTCWH_Logo-1.png?1575426261',
  },
  {
    chainId: 1,
    address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
    name: 'HEX',
    symbol: 'HEX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10103/small/HEX-logo.png?1575942673',
  },
  {
    chainId: 1,
    address: '0x70da48f4b7e83c386ef983d4cef4e58c2c09d8ac',
    name: 'Quras Token',
    symbol: 'XQC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10112/small/FZFHac2z_400x400.jpg?1575964560',
  },
  {
    chainId: 1,
    address: '0x674c6ad92fd080e4004b2312b45f796a192d27a0',
    name: 'Neutrino USD',
    symbol: 'USDN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10117/small/78GWcZu.png?1600845716',
  },
  {
    chainId: 1,
    address: '0x2c537e5624e4af88a7ae4060c022609376c8d0eb',
    name: 'BiLira',
    symbol: 'TRYB',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/10119/small/v1bIhvRr_400x400.png?1576359242',
  },
  {
    chainId: 1,
    address: '0xf51ebf9a26dbc02b13f8b3a9110dac47a4d62d78',
    name: 'APIX',
    symbol: 'APIX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10124/small/5sSKmtlA_400x400.png?1576126911',
  },
  {
    chainId: 1,
    address: '0x6ca88cc8d9288f5cad825053b6a1b179b05c76fc',
    name: 'Universal Protocol ',
    symbol: 'UPT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10136/small/yS35aK0t_400x400_%281%29.jpg?1576191179',
  },
  {
    chainId: 1,
    address: '0x00006100f7090010005f1bd7ae6122c3c2cf0090',
    name: 'TrueAUD',
    symbol: 'TAUD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10146/small/TAUD.png?1576466892',
  },
  {
    chainId: 1,
    address: '0x06af07097c9eeb7fd685c692751d5c66db49c215',
    name: 'Chai',
    symbol: 'CHAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10147/small/CHAI.png?1576467289',
  },
  {
    chainId: 1,
    address: '0xf5dce57282a584d2746faf1593d3121fcac444dc',
    name: 'cSAI',
    symbol: 'CSAI',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10148/small/cSAI.png?1576467788',
  },
  {
    chainId: 1,
    address: '0xcf3c8be2e2c42331da80ef210e9b1b307c03d36a',
    name: 'BetProtocol',
    symbol: 'BEPRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10251/small/bet-protocol.png?1576678652',
  },
  {
    chainId: 1,
    address: '0x3c7b464376db7c9927930cf50eefdea2eff3a66a',
    name: 'USDA',
    symbol: 'USDA',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10280/small/71706577_106238760785222_2649249116525166592_n.png?1576972115',
  },
  {
    chainId: 1,
    address: '0x6368e1e18c4c419ddfc608a0bed1ccb87b9250fc',
    name: 'Tap',
    symbol: 'XTP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10291/small/0_3SJYkk_400x400.jpg?1577229220',
  },
  {
    chainId: 1,
    address: '0x73cee8348b9bdd48c64e13452b8a6fbc81630573',
    name: 'Egoras',
    symbol: 'EGR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10293/small/egoras.png?1594434887',
  },
  {
    chainId: 1,
    address: '0x13339fd07934cd674269726edf3b5ccee9dd93de',
    name: 'Curio',
    symbol: 'CUR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10314/small/is8-HSAQ99o3KejDDwfnqnzW_tOHbqsEPHQlYL_UEVDeVfKhbMe871CfCrEo_BYAeC1MtEFUGcd1aZ2YtJopCQKr5tEbz9dyLmBw7nJGuOgWE4fGa4Bsui2bt8yMSZQt6meB2hAbZ1VPUf6J5pgVPslRkH3C7pSsapnpZslVi0eD7U8wb7CucXp6xuI3T0rsBQaBbHtftdoUrz8d0WiYLcwpflI6A1dVOlCXUIk9llfTuTJE.jpg?1577834182',
  },
  {
    chainId: 1,
    address: '0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d',
    name: 'Fuse Network Token',
    symbol: 'FUSE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10347/small/vUXKHEe.png?1601523640',
  },
  {
    chainId: 1,
    address: '0x4b1e80cac91e2216eeb63e29b957eb91ae9c2be8',
    name: 'Jupiter',
    symbol: 'JUP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10351/small/D6rKYJOz_400x400.png?1578435066',
  },
  {
    chainId: 1,
    address: '0xb5a4ac5b04e777230ba3381195eff6a60c3934f2',
    name: 'inSure',
    symbol: 'SURE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10354/small/logo200.png?1578435990',
  },
  {
    chainId: 1,
    address: '0xecf51a98b71f0421151a1d45e033ab8b88665221',
    name: 'VAYLA',
    symbol: 'VYA',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10358/small/logo_%2879%29.png?1592193166',
  },
  {
    chainId: 1,
    address: '0x37236cd05b34cc79d3715af2383e96dd7443dcf1',
    name: 'Small Love Potion',
    symbol: 'SLP',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/10366/small/SLP.png?1578640057',
  },
  {
    chainId: 1,
    address: '0x48783486ddd7fa85eca6b0c4ae8920bc25dfbcd7',
    name: 'GoMoney2',
    symbol: 'GOM2',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/10374/small/lvAhDIqmH0fh6U3NIiYLmKETR3uUBcySAv-K28eW6CCFm-ODhCdId71Ug5c4TCoEtxsre30Efe08muctK0MlK-JPdAbxilzZ7dHyiBNOCvcc_9AmJIo09TRLaiAafgqcFKsxpNOON2D28oTLnVTaqwxWL8zKSzjbI6ChKTCJKOiM2mq7VhQRZYe93StR30mf2O7DnkqmGEbZ5_i.jpg?1578675305',
  },
  {
    chainId: 1,
    address: '0x8a9c67fee641579deba04928c4bc45f66e26343a',
    name: 'Jarvis Reward Token',
    symbol: 'JRT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10390/small/cfeii0y.png?1578868949',
  },
  {
    chainId: 1,
    address: '0x20ae0ca9d42e6ffeb1188f341a7d63450452def6',
    name: 'CIPHER',
    symbol: 'CPR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10392/small/cipher-logo.png?1578891757',
  },
  {
    chainId: 1,
    address: '0xcfad57a67689809cda997f655802a119838c9cec',
    name: 'Benscoin',
    symbol: 'BSC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10393/small/Benscoin_Logo_200x200_%28CoinGecko%29.png?1594432611',
  },
  {
    chainId: 1,
    address: '0x0ee815f8be0b0259e2657c8b8d1e57bd3d60f26b',
    name: 'Harmony Block Capit',
    symbol: 'TRUST',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/10402/small/trust.PNG?1578951769',
  },
  {
    chainId: 1,
    address: '0x14409b0fc5c7f87b5dad20754fe22d29a3de8217',
    name: 'PYRO Network',
    symbol: 'PYRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10413/small/ldWtWr6.png?1579127581',
  },
  {
    chainId: 1,
    address: '0x2b6ff53fc2493ccd5202d80a6c439741414c5ff2',
    name: 'Tweebaa',
    symbol: 'TWEE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10419/small/tweebaalogo200.png?1588125478',
  },
  {
    chainId: 1,
    address: '0xdcfe18bc46f5a0cd0d3af0c2155d2bcb5ade2fc5',
    name: 'Hue',
    symbol: 'HUE',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/10420/small/untitled.png?1579141360',
  },
  {
    chainId: 1,
    address: '0xac9bb427953ac7fddc562adca86cf42d988047fd',
    name: 'Scatter cx',
    symbol: 'STT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10422/small/scatter.png?1580876890',
  },
  {
    chainId: 1,
    address: '0x5abfd418adb35e89c68313574eb16bdffc15e607',
    name: 'Timvi',
    symbol: 'TMV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10424/small/MiSBHza.png?1603596390',
  },
  {
    chainId: 1,
    address: '0xaea8e1b6cb5c05d1dac618551c76bcd578ea3524',
    name: 'Sogur',
    symbol: 'SGR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10429/small/sgr.png?1600827772',
  },
  {
    chainId: 1,
    address: '0xc962ad021a69d457564e985738c719ae3f79b707',
    name: 'IFX24',
    symbol: 'IFX24',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10444/small/lpFSaoD.png?1579475634',
  },
  {
    chainId: 1,
    address: '0xa2b0fde6d710e201d0d608e924a484d1a5fed57c',
    name: 'sXRP',
    symbol: 'SXRP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10455/small/sXRP.png?1579575399',
  },
  {
    chainId: 1,
    address: '0x4922a015c4407f87432b179bb209e125432e4a2a',
    name: 'Tether Gold',
    symbol: 'XAUT',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/10481/small/tether-gold.png?1579946148',
  },
  {
    chainId: 1,
    address: '0xa6e7dc135bdf4b3fee7183eab2e87c0bb9684783',
    name: 'BIGOCOIN',
    symbol: 'BIGO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10564/small/Bigocoin_1200px.jpg?1597463586',
  },
  {
    chainId: 1,
    address: '0x309627af60f0926daa6041b8279484312f2bf060',
    name: 'USD Bancor',
    symbol: 'USDB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10619/small/busd.png?1581026228',
  },
  {
    chainId: 1,
    address: '0xbcc66ed2ab491e9ae7bf8386541fb17421fa9d35',
    name: 'Skull',
    symbol: 'SKULL',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/10641/small/skull.png?1581339740',
  },
  {
    chainId: 1,
    address: '0xc1fb6c015fc535abd331d3029de76a62e412fb23',
    name: 'Forcer',
    symbol: 'FORCER',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/10642/small/logo.png?1581339963',
  },
  {
    chainId: 1,
    address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
    name: 'cETH',
    symbol: 'CETH',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10643/small/ceth2.JPG?1581389598',
  },
  {
    chainId: 1,
    address: '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407',
    name: 'c0x',
    symbol: 'CZRX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10644/small/czrx1.JPG?1581390510',
  },
  {
    chainId: 1,
    address: '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e',
    name: 'cBAT',
    symbol: 'CBAT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10645/small/cBAT1.JPG?1581390910',
  },
  {
    chainId: 1,
    address: '0xb53e08b97724126bda6d237b94f766c0b81c90fe',
    name: 'PIXBY',
    symbol: 'PIXBY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10681/small/logo.png?1595493823',
  },
  {
    chainId: 1,
    address: '0xdf801468a808a32656d2ed2d2d80b72a129739f4',
    name: 'Somnium Space CUBEs',
    symbol: 'CUBE',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10687/small/Steam_Logo200x200_02.png?1581976974',
  },
  {
    chainId: 1,
    address: '0x3cc5eb07e0e1227613f1df58f38b549823d11cb9',
    name: 'Ethereum eRush',
    symbol: 'EER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10695/small/0x6f371ca338bbddd0baf719e1d5d0797cce20774f.png?1582153688',
  },
  {
    chainId: 1,
    address: '0x3212b29e33587a00fb1c83346f5dbfa69a458923',
    name: 'The Tokenized Bitco',
    symbol: 'IMBTC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10702/small/imbtc.png?1585124381',
  },
  {
    chainId: 1,
    address: '0xf02dab52205aff6bb3d47cc7b21624a5064f9fba',
    name: 'Pyrrhos Gold Token',
    symbol: 'PGOLD',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/10703/small/PGold-Logo-200x200-1.png?1582496992',
  },
  {
    chainId: 1,
    address: '0x23b608675a2b2fb1890d3abbd85c5775c51691d5',
    name: 'Unisocks',
    symbol: 'SOCKS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10717/small/qFrcoiM.png?1582525244',
  },
  {
    chainId: 1,
    address: '0xaffcdd96531bcd66faed95fc61e443d08f79efef',
    name: 'Perth Mint Gold Tok',
    symbol: 'PMGT',
    decimals: 5,
    logoURI:
      'https://assets.coingecko.com/coins/images/10730/small/pmgt_logo_256x256.png?1582668331',
  },
  {
    chainId: 1,
    address: '0x6913ccabbc337f0ea7b4109dd8200d61c704d332',
    name: 'Asac Coin',
    symbol: 'ASAC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10738/small/NiGQ7aKr_400x400.jpg?1582778597',
  },
  {
    chainId: 1,
    address: '0x493c8d6a973246a7b26aa8ef4b1494867a825de5',
    name: 'NuLINK',
    symbol: 'NLINK',
    decimals: 3,
    logoURI:
      'https://assets.coingecko.com/coins/images/10741/small/o1bMQL2.png?1582779928',
  },
  {
    chainId: 1,
    address: '0x804e26c4eff0bb196b805bdfb5b29ab828cf0b1f',
    name: 'Whale Coin',
    symbol: 'WHALE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10743/small/whalecoin200.png?1582835568',
  },
  {
    chainId: 1,
    address: '0x6a4ffaafa8dd400676df8076ad6c724867b0e2e8',
    name: 'bDAI',
    symbol: 'BDAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10747/small/0_hNrqXMnppv8yZaOi.png?1582838339',
  },
  {
    chainId: 1,
    address: '0x4c6e796bbfe5eb37f9e3e0f66c009c8bf2a5f428',
    name: 'FC Bitcoin',
    symbol: 'FCBTC',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/10750/small/FCBTC.png?1583053684',
  },
  {
    chainId: 1,
    address: '0xcd62b1c403fa761baadfc74c525ce2b51780b184',
    name: 'Aragon Court',
    symbol: 'ANJ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10765/small/ANJ.png?1588956187',
  },
  {
    chainId: 1,
    address: '0x51bc0deaf7bbe82bc9006b0c3531668a4206d27f',
    name: 'RAKUN',
    symbol: 'RAKU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10768/small/Rakun_Icon_Red_200x200.png?1583310899',
  },
  {
    chainId: 1,
    address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    name: 'Compound',
    symbol: 'COMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10775/small/COMP.png?1592625425',
  },
  {
    chainId: 1,
    address: '0x0000000000b3f879cb30fe243b4dfee438691c04',
    name: 'GasToken',
    symbol: 'GST2',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/10779/small/gas.png?1583466756',
  },
  {
    chainId: 1,
    address: '0x74faab6986560fd1140508e4266d8a7b87274ffd',
    name: 'HyperDAO',
    symbol: 'HDAO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10780/small/B7-ppPfE_400x400.png?1583467291',
  },
  {
    chainId: 1,
    address: '0x46d473a0b3eeec9f55fade641bc576d5bc0b2246',
    name: 'SurfExUtilityToken',
    symbol: 'SURF',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10783/small/200x200-logo-blu-grey-bkg-4-e1583512409629.png?1583539501',
  },
  {
    chainId: 1,
    address: '0x2bf91c18cd4ae9c2f2858ef9fe518180f7b5096d',
    name: 'KIWI Token',
    symbol: 'KIWI',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10799/small/kiwi_256.png?1583736957',
  },
  {
    chainId: 1,
    address: '0x5228a22e72ccc52d415ecfd199f99d0665e7733b',
    name: 'pTokens BTC',
    symbol: 'PBTC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10805/small/J51iIea.png?1583891599',
  },
  {
    chainId: 1,
    address: '0x975ce667d59318e13da8acd3d2f534be5a64087b',
    name: 'The Whale of Blockc',
    symbol: 'TWOB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10806/small/_6b6b6b.png?1587105970',
  },
  {
    chainId: 1,
    address: '0x666d875c600aa06ac1cf15641361dec3b00432ef',
    name: 'BTSE Token',
    symbol: 'BTSE',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10807/small/BTSE_logo_Square.jpeg?1583965964',
  },
  {
    chainId: 1,
    address: '0x95e40e065afb3059dcabe4aaf404c1f92756603a',
    name: 'King DAG',
    symbol: 'KDAG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10809/small/3xcLUorv_400x400.jpg?1591000563',
  },
  {
    chainId: 1,
    address: '0xb52fc0f17df38ad76f290467aab57cabaeeada14',
    name: 'VideoGamesToken',
    symbol: 'VGTN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10815/small/vgtn.png?1585123177',
  },
  {
    chainId: 1,
    address: '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4',
    name: 'cWBTC',
    symbol: 'CWBTC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/10823/small/cwbtc.png?1584331700',
  },
  {
    chainId: 1,
    address: '0xfc1e690f61efd961294b3e1ce3313fbd8aa4f85d',
    name: 'Aave DAI',
    symbol: 'ADAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10843/small/aDAI.png?1584698791',
  },
  {
    chainId: 1,
    address: '0x1763ad73694d4d64fb71732b068e32ac72a345b1',
    name: 'BEE Coin',
    symbol: 'BEE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10853/small/Xg9uPrki_400x400.jpg?1585523253',
  },
  {
    chainId: 1,
    address: '0xb2cf3a438acf46275839a38db7594065f64151d3',
    name: 'TheWorldsAMine',
    symbol: 'WRLD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10859/small/WRLD.png?1585119261',
  },
  {
    chainId: 1,
    address: '0xc969e16e63ff31ad4bcac3095c616644e6912d79',
    name: 'Seed Venture',
    symbol: 'SEED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10860/small/Seed.png?1585204998',
  },
  {
    chainId: 1,
    address: '0x3c45b24359fb0e107a4eaa56bd0f2ce66c99a0e5',
    name: 'Apple Network',
    symbol: 'ANK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10872/small/ANK.png?1585456588',
  },
  {
    chainId: 1,
    address: '0x94ca37d108e89775dc8ae65f51ae28c2d9599f9a',
    name: 'Cryptotipsfr',
    symbol: 'CRTS',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/10874/small/TOKENCRTS2.png?1591357545',
  },
  {
    chainId: 1,
    address: '0x697ef32b4a3f5a4c39de1cb7563f24ca7bfc5947',
    name: 'Insula',
    symbol: 'ISLA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10884/small/isla.PNG?1585522028',
  },
  {
    chainId: 1,
    address: '0x2781246fe707bb15cee3e5ea354e2154a2877b16',
    name: 'ELYSIA',
    symbol: 'EL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10887/small/CeyRVXPY_400x400.jpg?1585559128',
  },
  {
    chainId: 1,
    address: '0x7e8539d1e5cb91d63e46b8e188403b3f262a949b',
    name: 'SOMIDAX',
    symbol: 'SMDX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10899/small/IcgJHkM.png?1585698101',
  },
  {
    chainId: 1,
    address: '0x8933ea1ce67b946bdf2436ce860ffbb53ce814d2',
    name: 'LINK ETH RSI Ratio ',
    symbol: 'LINKETHRSI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10927/small/linketh_rsi_ratio.png?1585894605',
  },
  {
    chainId: 1,
    address: '0x6b466b0232640382950c45440ea5b630744eca99',
    name: 'Covid19',
    symbol: 'CVD',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/10940/small/bg-2.png?1586140534',
  },
  {
    chainId: 1,
    address: '0xd7efb00d12c2c13131fd319336fdf952525da2af',
    name: 'Proton',
    symbol: 'XPR',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/10941/small/Proton-Icon.png?1588283737',
  },
  {
    chainId: 1,
    address: '0xf8f237d074f637d777bcd2a4712bde793f94272b',
    name: 'ERC223',
    symbol: 'ERC223',
    decimals: 10,
    logoURI:
      'https://assets.coingecko.com/coins/images/10946/small/20200328_235557.png?1586222500',
  },
  {
    chainId: 1,
    address: '0x04fa0d235c4abf4bcf4787af4cf447de572ef828',
    name: 'UMA',
    symbol: 'UMA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10951/small/UMA.png?1586307916',
  },
  {
    chainId: 1,
    address: '0x196f4727526ea7fb1e17b2071b3d8eaa38486988',
    name: 'Reserve',
    symbol: 'RSV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10952/small/Reserve.png?1586372277',
  },
  {
    chainId: 1,
    address: '0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd',
    name: 'PieDAO BTC  ',
    symbol: 'BTC++',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10959/small/BTC__.png?1586499443',
  },
  {
    chainId: 1,
    address: '0x56ed2f7dac19243df100bac10364c56df20cb1e9',
    name: 'Brapper Token',
    symbol: 'BRAP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10962/small/photo_2019-09-12_01-04-13-400x400.jpg?1586506435',
  },
  {
    chainId: 1,
    address: '0x8ba6dcc667d3ff64c1a2123ce72ff5f0199e5315',
    name: 'Alex',
    symbol: 'ALEX',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/10972/small/ALEX.png?1586742545',
  },
  {
    chainId: 1,
    address: '0x8b6c3b7c01d9db4393f9aa734750f36df1543e9a',
    name: 'Vid',
    symbol: 'VI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10978/small/VI_Icon_%281%29.jpg?1594358218',
  },
  {
    chainId: 1,
    address: '0x42726d074bba68ccc15200442b72afa2d495a783',
    name: 'Isiklar Coin',
    symbol: 'ISIKC',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/10992/small/logo_%2866%29.png?1586940186',
  },
  {
    chainId: 1,
    address: '0xeb7355c2f217b3485a591332fe13c8c5a76a581d',
    name: 'Jubi Token',
    symbol: 'JT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/10994/small/Af5MFcVY_400x400.jpg?1586998222',
  },
  {
    chainId: 1,
    address: '0x5313e18463cf2f4b68b392a5b11f94de5528d01d',
    name: 'ULLU',
    symbol: 'ULLU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11003/small/HHo1IBgw_400x400.jpg?1587087634',
  },
  {
    chainId: 1,
    address: '0x646b41183bb0d18c01f75f630688d613a5774dc7',
    name: 'BLUEKEY',
    symbol: 'BKY',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11013/small/bluekeymarket.PNG?1587113081',
  },
  {
    chainId: 1,
    address: '0x70fadbe1f2cccbaf98ac88fdcf94a0509a48e46d',
    name: 'Green Light',
    symbol: 'GL',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11015/small/greenlight.PNG?1587114464',
  },
  {
    chainId: 1,
    address: '0xb83cd8d39462b761bb0092437d38b37812dd80a2',
    name: 'Golden Ratio Token',
    symbol: 'GRT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11022/small/golden_ratio_token.png?1592811112',
  },
  {
    chainId: 1,
    address: '0x25cef4fb106e76080e88135a0e4059276fa9be87',
    name: 'Imperial',
    symbol: 'UNITS',
    decimals: 5,
    logoURI:
      'https://assets.coingecko.com/coins/images/11025/small/Imperial.png?1587285955',
  },
  {
    chainId: 1,
    address: '0xf938c9a22c6fc9e6b81b24b68db94b92dc4a7976',
    name: 'Frinkcoin',
    symbol: 'FRNK',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11027/small/Frinkcoin.png?1587290596',
  },
  {
    chainId: 1,
    address: '0x035df12e0f3ac6671126525f1015e47d79dfeddf',
    name: '0xMonero',
    symbol: '0XMR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11035/small/0xmnr.PNG?1587357680',
  },
  {
    chainId: 1,
    address: '0x491604c0fdf08347dd1fa4ee062a822a5dd06b5d',
    name: 'Cartesi',
    symbol: 'CTSI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11038/small/cartesi.png?1592288021',
  },
  {
    chainId: 1,
    address: '0x310da5e1e61cd9d6eced092f085941089267e71e',
    name: 'Money Token',
    symbol: 'MNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11039/small/mnt_200_by_200.png?1595310635',
  },
  {
    chainId: 1,
    address: '0xcdd0a6b15b49a9eb3ce011cce22fac2ccf09ece6',
    name: 'ARMTOKEN',
    symbol: 'TARM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11040/small/o5FoEVG.png?1587515392',
  },
  {
    chainId: 1,
    address: '0x1062fdf250b44697216d07e41df93824519f47aa',
    name: 'Cryptolandy',
    symbol: 'CRYPL',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11046/small/crypl.png?1587526012',
  },
  {
    chainId: 1,
    address: '0x4bebe99fac607dc7ef2d99d352ca18999f51b709',
    name: 'Bloc',
    symbol: 'DAP',
    decimals: 10,
    logoURI:
      'https://assets.coingecko.com/coins/images/11059/small/b4e2de_467f4949d9a240ffbe68bc0808dfbe5a_mv2.jpg?1597823810',
  },
  {
    chainId: 1,
    address: '0x0ae055097c6d159879521c384f1d2123d1f195e6',
    name: 'xDAI Stake',
    symbol: 'STAKE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11061/small/xdai.png?1587714165',
  },
  {
    chainId: 1,
    address: '0xf26893f89b23084c4c6216038d6ebdbe9e96c5cb',
    name: 'Mega Lottery Servic',
    symbol: 'MLR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11072/small/gg1NiOsG_400x400.jpg?1587958538',
  },
  {
    chainId: 1,
    address: '0x686c650dbcfeaa75d09b883621ad810f5952bd5d',
    name: 'AAX Token',
    symbol: 'AAB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11073/small/GluwoJk__400x400.jpg?1587969347',
  },
  {
    chainId: 1,
    address: '0x79c5a1ae586322a07bfb60be36e1b31ce8c84a1e',
    name: 'Freight Trust Netwo',
    symbol: 'EDI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11074/small/e6YLf6kD_400x400.jpg?1587970897',
  },
  {
    chainId: 1,
    address: '0x2e3c062e16c1a3a04ddc5003c62e294305d83684',
    name: 'LITonium',
    symbol: 'LIT',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/11079/small/Picture_20200206_154444187.png?1588000262',
  },
  {
    chainId: 1,
    address: '0x40fd72257597aa14c7231a7b1aaa29fce868f677',
    name: 'Sora',
    symbol: 'XOR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11093/small/sora_logo_cg_white.png?1588284194',
  },
  {
    chainId: 1,
    address: '0x1f6deadcb526c4710cf941872b86dcdfbbbd9211',
    name: 'Ruletka',
    symbol: 'RTK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11102/small/rtk-logo.png?1595212217',
  },
  {
    chainId: 1,
    address: '0x5fbdb42bb048c685c990a37f2c87fe087c586655',
    name: 'Xenon',
    symbol: 'XEN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11105/small/DyNZKe79_400x400.jpg?1588568617',
  },
  {
    chainId: 1,
    address: '0x147faf8de9d8d8daae129b187f0d02d819126750',
    name: 'GeoDB',
    symbol: 'GEO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11130/small/geodb.png?1588941704',
  },
  {
    chainId: 1,
    address: '0x7b123f53421b1bf8533339bfbdc7c98aa94163db',
    name: 'dfohub',
    symbol: 'BUIDL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11131/small/buidllogo.png?1599577041',
  },
  {
    chainId: 1,
    address: '0xd6940a1ffd9f3b025d1f1055abcfd9f7cda81ef9',
    name: 'YouForia',
    symbol: 'YFR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11132/small/6Won2ZF.png?1588903985',
  },
  {
    chainId: 1,
    address: '0x23935765cdf2f7548f86042ff053d16a22c4e240',
    name: 'TRADEZ',
    symbol: 'TRZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11133/small/trz-logo-1.png?1588904852',
  },
  {
    chainId: 1,
    address: '0xa1d65e8fb6e87b60feccbc582f7f97804b725521',
    name: 'DXdao',
    symbol: 'DXD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11148/small/dxdao.png?1607999331',
  },
  {
    chainId: 1,
    address: '0x1a5f9352af8af974bfc03399e3767df6370d82e4',
    name: 'OWL',
    symbol: 'OWL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11149/small/gnosis-owl_32.png?1589057849',
  },
  {
    chainId: 1,
    address: '0x3d371413dd5489f3a04c07c0c2ce369c20986ceb',
    name: 'YOUcash',
    symbol: 'YOUC',
    decimals: 10,
    logoURI:
      'https://assets.coingecko.com/coins/images/11152/small/round-400x400.png?1589162715',
  },
  {
    chainId: 1,
    address: '0xbca3c97837a39099ec3082df97e28ce91be14472',
    name: 'DUST Token',
    symbol: 'DUST',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11162/small/DUST.png?1589280496',
  },
  {
    chainId: 1,
    address: '0xa9fbb83a2689f4ff86339a4b96874d718673b627',
    name: 'FireAnts',
    symbol: 'ANTS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11179/small/ants200.png?1589510693',
  },
  {
    chainId: 1,
    address: '0x8daebade922df735c38c80c7ebd708af50815faa',
    name: 'tBTC',
    symbol: 'TBTC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11224/small/tBTC.png?1589620754',
  },
  {
    chainId: 1,
    address: '0xf3a2ace8e48751c965ea0a1d064303aca53842b9',
    name: 'HXY Money',
    symbol: 'HXY',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11225/small/hexmoneygradientsmall.png?1595305947',
  },
  {
    chainId: 1,
    address: '0x02fdd6866333d8cd8b1ca022d382080698060bc2',
    name: '6ix9ine Chain',
    symbol: '69C',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11260/small/6ix9ineChain.png?1589789641',
  },
  {
    chainId: 1,
    address: '0x04abeda201850ac0124161f037efd70c74ddc74c',
    name: 'Nest Protocol',
    symbol: 'NEST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11284/small/52954052.png?1589868539',
  },
  {
    chainId: 1,
    address: '0xd15ecdcf5ea68e3995b2d0527a0ae0a3258302f8',
    name: 'Machi X',
    symbol: 'MCX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11329/small/MachiX.png?1589926940',
  },
  {
    chainId: 1,
    address: '0x08d967bb0134f2d07f7cfb6e246680c53927dd30',
    name: 'MATH',
    symbol: 'MATH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11335/small/2020-05-19-token-200.png?1589940590',
  },
  {
    chainId: 1,
    address: '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
    name: 'renBTC',
    symbol: 'RENBTC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11370/small/renBTC.png?1589985711',
  },
  {
    chainId: 1,
    address: '0x4ba6ddd7b89ed838fed25d208d4f644106e34279',
    name: 'Vether',
    symbol: 'VETH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11375/small/HQ6nQhH.png?1605492813',
  },
  {
    chainId: 1,
    address: '0xa8b919680258d369114910511cc87595aec0be6d',
    name: 'LUKSO Token',
    symbol: 'LYXE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11423/small/1_QAHTciwVhD7SqVmfRW70Pw.png?1590110612',
  },
  {
    chainId: 1,
    address: '0x2c50ba1ed5e4574c1b613b044bd1876f0b0b87a9',
    name: 'Kids Cash',
    symbol: 'KASH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11467/small/kash.png?1590242267',
  },
  {
    chainId: 1,
    address: '0x96c645d3d3706f793ef52c19bbace441900ed47d',
    name: 'Mt Pelerin Shares',
    symbol: 'MPS',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/11471/small/MPS.png?1590319120',
  },
  {
    chainId: 1,
    address: '0xa7de087329bfcda5639247f96140f9dabe3deed1',
    name: 'Statera',
    symbol: 'STA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11472/small/Statera.png?1590415353',
  },
  {
    chainId: 1,
    address: '0xc760721eb65aa6b0a634df6a008887c48813ff63',
    name: 'Cryptorg Token',
    symbol: 'CTG',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11474/small/crystal_200.png?1590450209',
  },
  {
    chainId: 1,
    address: '0x249f71f8d9da86c60f485e021b509a206667a079',
    name: 'Singular J',
    symbol: 'SNGJ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11475/small/SNGJ_logo_200x200.png?1590450436',
  },
  {
    chainId: 1,
    address: '0xef9cd7882c067686691b6ff49e650b43afbbcc6b',
    name: 'FinNexus',
    symbol: 'FNX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11488/small/finnexus_gecko.png?1591260971',
  },
  {
    chainId: 1,
    address: '0xbe5b336ef62d1626940363cf34be079e0ab89f20',
    name: 'Bnoincoin',
    symbol: 'BNC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11511/small/bnoincoin_cryptocoin-1.png?1590489689',
  },
  {
    chainId: 1,
    address: '0xb26631c6dda06ad89b93c71400d25692de89c068',
    name: 'Minds',
    symbol: 'MINDS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11517/small/Minds.png?1590580465',
  },
  {
    chainId: 1,
    address: '0x9b53e429b0badd98ef7f01f03702986c516a5715',
    name: 'Hybrix',
    symbol: 'HY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11518/small/icon_%282%29.png?1590618414',
  },
  {
    chainId: 1,
    address: '0x35f82caa11c2459e179bc8102cce439d77c8ef25',
    name: 'Friendcoin007',
    symbol: 'FC007',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11519/small/5VZiP7x.png?1590618834',
  },
  {
    chainId: 1,
    address: '0x06f65b8cfcb13a9fe37d836fe9708da38ecb29b2',
    name: 'SAINT FAME  Genesis',
    symbol: 'FAME',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11521/small/FAME.png?1590622461',
  },
  {
    chainId: 1,
    address: '0x793e2602a8396468f3ce6e34c1b6c6fd6d985bad',
    name: ' ICK Mask',
    symbol: 'ICK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11522/small/ICK.png?1590622642',
  },
  {
    chainId: 1,
    address: '0x38a2fdc11f526ddd5a607c1f251c065f40fbf2f7',
    name: 'PhoenixDAO',
    symbol: 'PHNX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11523/small/PhoenixDAO.png?1590680344',
  },
  {
    chainId: 1,
    address: '0x5b5bb9765eff8d26c24b9ff0daa09838a3cd78e9',
    name: 'Bitanium',
    symbol: 'BI',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/11527/small/200x200logo.png?1595311441',
  },
  {
    chainId: 1,
    address: '0x7841b2a48d1f6e78acec359fed6d874eb8a0f63c',
    name: 'KERMAN',
    symbol: 'KERMAN',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/11536/small/Kerman.png?1590776066',
  },
  {
    chainId: 1,
    address: '0x0a4b2d4b48a63088e0897a3f147ba37f81a27722',
    name: 'CuraDAI',
    symbol: 'CURA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11540/small/61919000.png?1590983686',
  },
  {
    chainId: 1,
    address: '0x60571e95e12c78cba5223042692908f0649435a5',
    name: 'PLAAS FARMERS TOKEN',
    symbol: 'PLAAS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11541/small/Logo_%289%29.png?1590984188',
  },
  {
    chainId: 1,
    address: '0x35dd2ebf20746c6e658fac75cd80d4722fae62f6',
    name: 'CryptoBet',
    symbol: 'CBET',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11543/small/TvJUqCso_400x400.jpg?1591066399',
  },
  {
    chainId: 1,
    address: '0xf0fac7104aac544e4a7ce1a55adf2b5a25c65bd1',
    name: 'Pamp Network',
    symbol: 'PAMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11546/small/pMqJaqDK_400x400.jpg?1595199126',
  },
  {
    chainId: 1,
    address: '0x85eba557c06c348395fd49e35d860f58a4f7c95a',
    name: 'H3X',
    symbol: 'H3X',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11554/small/Ps3O6GY.png?1591058696',
  },
  {
    chainId: 1,
    address: '0x580c8520deda0a441522aeae0f9f7a5f29629afa',
    name: 'Dawn Protocol',
    symbol: 'DAWN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11555/small/dawn_protocol.png?1591060256',
  },
  {
    chainId: 1,
    address: '0x045eb7e34e94b28c7a3641bc5e1a1f61f225af9f',
    name: 'ZelaaPayAE',
    symbol: 'ZPAE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11557/small/ZPAE_.png?1591078880',
  },
  {
    chainId: 1,
    address: '0x261efcdd24cea98652b9700800a13dfbca4103ff',
    name: 'sXAU',
    symbol: 'SXAU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11559/small/sXAU.png?1591090407',
  },
  {
    chainId: 1,
    address: '0x5caf454ba92e6f2c929df14667ee360ed9fd5b26',
    name: 'Dev Protocol',
    symbol: 'DEV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11560/small/Dev.png?1591102698',
  },
  {
    chainId: 1,
    address: '0x679131f591b4f369acb8cd8c51e68596806c3916',
    name: 'Trustlines Network',
    symbol: 'TLN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11562/small/Trustlines.png?1591152088',
  },
  {
    chainId: 1,
    address: '0x459086f2376525bdceba5bdda135e4e9d3fef5bf',
    name: 'renBCH',
    symbol: 'RENBCH',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11563/small/renBCH.png?1591185978',
  },
  {
    chainId: 1,
    address: '0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2',
    name: 'renZEC',
    symbol: 'RENZEC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11564/small/renZEC.png?1591186101',
  },
  {
    chainId: 1,
    address: '0xd9a947789974bad9be77e45c2b327174a9c59d71',
    name: 'Ystar',
    symbol: 'YSR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11575/small/256_256.png?1600495476',
  },
  {
    chainId: 1,
    address: '0xe2f2a5c287993345a840db3b0845fbc70f5935a5',
    name: 'mStable USD',
    symbol: 'MUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11576/small/mStable_USD.png?1595591803',
  },
  {
    chainId: 1,
    address: '0xdc5864ede28bd4405aa04d93e05a0531797d9d59',
    name: 'Falcon Project',
    symbol: 'FNT',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/11579/small/falcon_ava_black.png?1591317863',
  },
  {
    chainId: 1,
    address: '0x0000000000004946c0e9f43f4dee607b0ef1fa1c',
    name: 'Chi Gastoken',
    symbol: 'CHI',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/11583/small/chi.png?1591331659',
  },
  {
    chainId: 1,
    address: '0xb6c4267c4877bb0d6b1685cfd85b0fbe82f105ec',
    name: 'Relevant',
    symbol: 'REL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11586/small/Relevant.png?1591390081',
  },
  {
    chainId: 1,
    address: '0x0f8794f66c7170c4f9163a8498371a747114f6c4',
    name: 'Flama',
    symbol: 'FMA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11587/small/Flama.png?1591498092',
  },
  {
    chainId: 1,
    address: '0x96b52b5bf8d902252d0714a1bd2651a785fd2660',
    name: 'EtherBone',
    symbol: 'ETHBN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11596/small/dogdata.png?1591667966',
  },
  {
    chainId: 1,
    address: '0x0e7f79e89ba8c4a13431129fb2db0d4f444b5b9a',
    name: 'Xank',
    symbol: 'XANK',
    decimals: 16,
    logoURI:
      'https://assets.coingecko.com/coins/images/11599/small/9zAYweVj_400x400.png?1591671435',
  },
  {
    chainId: 1,
    address: '0xf5238462e7235c7b62811567e63dd17d12c2eaa0',
    name: 'CACHE Gold',
    symbol: 'CGT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11601/small/cache-gold-icon-200x200.png?1591755874',
  },
  {
    chainId: 1,
    address: '0x26ce25148832c04f3d7f26f32478a9fe55197166',
    name: 'DexTools',
    symbol: 'DEXT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11603/small/dext.png?1605790188',
  },
  {
    chainId: 1,
    address: '0xf2f9a7e93f845b3ce154efbeb64fb9346fcce509',
    name: 'UniPower',
    symbol: 'POWER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11618/small/unipower.png?1591943398',
  },
  {
    chainId: 1,
    address: '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9',
    name: 'cUSDT',
    symbol: 'CUSDT',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11621/small/cUSDT.png?1592113270',
  },
  {
    chainId: 1,
    address: '0x5299d6f7472dcc137d7f3c4bcfbbb514babf341a',
    name: 'sXMR',
    symbol: 'SXMR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11625/small/sXMR.png?1592124269',
  },
  {
    chainId: 1,
    address: '0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24',
    name: 'Render Token',
    symbol: 'RNDR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11636/small/uTDd98ZN_400x400.jpg?1592200150',
  },
  {
    chainId: 1,
    address: '0x256845e721c0c46d54e6afbd4fa3b52cb72353ea',
    name: 'UniDollar',
    symbol: 'UNIUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11637/small/Unidollar.png?1592272468',
  },
  {
    chainId: 1,
    address: '0x6b785a0322126826d8226d77e173d75dafb84d11',
    name: 'Bankroll Vault',
    symbol: 'VLT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11638/small/vlt-200.png?1592272725',
  },
  {
    chainId: 1,
    address: '0x24e96809b4e720ea911bc3de8341400e26d6e994',
    name: 'VINYL RECORDS TOKEN',
    symbol: 'VRTN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11641/small/5016134.png?1592274804',
  },
  {
    chainId: 1,
    address: '0x91d6f6e9026e43240ce6f06af6a4b33129ebde94',
    name: 'Rivex',
    symbol: 'RVX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11644/small/200px_logo_RX_3d-01.png?1602130114',
  },
  {
    chainId: 1,
    address: '0x9a48bd0ec040ea4f1d3147c025cd4076a2e71e3e',
    name: 'PieDAO USD  ',
    symbol: 'USD++',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11658/small/USD__.png?1592389079',
  },
  {
    chainId: 1,
    address: '0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed',
    name: 'pNetwork',
    symbol: 'PNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11659/small/pNetwork.png?1592411134',
  },
  {
    chainId: 1,
    address: '0x051aab38d46f6ebb551752831c7280b2b42164db',
    name: 'FreelancerChain',
    symbol: 'FCN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11661/small/LOGO200_%286%29.png?1592432680',
  },
  {
    chainId: 1,
    address: '0x27702a26126e0b3702af63ee09ac4d1a084ef628',
    name: 'Aleph im',
    symbol: 'ALEPH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11676/small/Monochram-aleph.png?1608483725',
  },
  {
    chainId: 1,
    address: '0xed91879919b71bb6905f23af0a68d231ecf87b14',
    name: 'DMM  Governance',
    symbol: 'DMG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11677/small/dmm.png?1592674690',
  },
  {
    chainId: 1,
    address: '0x58a3520d738b268c2353ecee518a1ad8e28e4ae5',
    name: 'HEIDI',
    symbol: 'HDI',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/11679/small/Untitled-design-4-removebg-preview.png?1592789518',
  },
  {
    chainId: 1,
    address: '0x4f56221252d117f35e2f6ab937a3f77cad38934d',
    name: 'CryptoCricketClub',
    symbol: '3CS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11685/small/crypto-cricket-club-logo-e1592305032921.png?1592793917',
  },
  {
    chainId: 1,
    address: '0x95172ccbe8344fecd73d0a30f54123652981bd6f',
    name: 'Meridian Network',
    symbol: 'LOCK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11687/small/LOCK_cropped.png?1599614902',
  },
  {
    chainId: 1,
    address: '0xb4058411967d5046f3510943103805be61f0600e',
    name: 'STONK',
    symbol: 'STONK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11690/small/Iu1YBsl.png?1592798197',
  },
  {
    chainId: 1,
    address: '0x827eed050df933f6fda3a606b5f716cec660ecba',
    name: 'BurnDrop',
    symbol: 'BD',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11691/small/Burn_Drop_Logo_200x200.png?1592798838',
  },
  {
    chainId: 1,
    address: '0x4599836c212cd988eaccc54c820ee9261cdaac71',
    name: 'Cryptid',
    symbol: 'CID',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11692/small/yWrCHzW.png?1592799534',
  },
  {
    chainId: 1,
    address: '0xf80d589b3dbe130c270a69f1a69d050f268786df',
    name: 'Datamine',
    symbol: 'DAM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11695/small/qxsFH8W.png?1592880463',
  },
  {
    chainId: 1,
    address: '0x61cdb66e56fad942a7b5ce3f419ffe9375e31075',
    name: 'RAIN Network',
    symbol: 'RAIN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11699/small/v4Bpj2k.png?1592963188',
  },
  {
    chainId: 1,
    address: '0x34612903db071e888a4dadcaa416d3ee263a87b9',
    name: 'ethArt',
    symbol: 'ARTE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11720/small/Arte.png?1607332372',
  },
  {
    chainId: 1,
    address: '0xa0471cdd5c0dc2614535fd7505b17a651a8f0dab',
    name: 'EasySwap',
    symbol: 'ESWA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11721/small/Easyswap.png?1593080991',
  },
  {
    chainId: 1,
    address: '0x265ba42daf2d20f3f358a7361d9f69cb4e28f0e6',
    name: 'Unibomb',
    symbol: 'UBOMB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11722/small/aLjLmGNT_400x400.png?1596603288',
  },
  {
    chainId: 1,
    address: '0x625ae63000f46200499120b906716420bd059240',
    name: 'Aave SUSD',
    symbol: 'ASUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11723/small/aSUSD.png?1593082612',
  },
  {
    chainId: 1,
    address: '0xa64bd6c70cb9051f6a9ba1f163fdc07e0dfb5f84',
    name: 'Aave LINK',
    symbol: 'ALINK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11729/small/aLINK.png?1593084323',
  },
  {
    chainId: 1,
    address: '0x328c4c80bc7aca0834db37e6600a6c49e12da4de',
    name: 'Aave SNX',
    symbol: 'ASNX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11733/small/aSNX.png?1593085047',
  },
  {
    chainId: 1,
    address: '0x6ee0f7bb50a54ab5253da0667b0dc2ee526c30a8',
    name: 'Aave BUSD',
    symbol: 'ABUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11736/small/aBUSD.png?1593085489',
  },
  {
    chainId: 1,
    address: '0x239b0fa917d85c21cf6435464c2c6aa3d45f6720',
    name: 'Amun Ether 3x Daily',
    symbol: 'ETH3L',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11740/small/token-eth3l.png?1593140154',
  },
  {
    chainId: 1,
    address: '0xe61eecfdba2ad1669cee138f1919d08ced070b83',
    name: 'VGTGToken',
    symbol: 'VGTG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11742/small/vgtg_gold_209x209.png?1593142842',
  },
  {
    chainId: 1,
    address: '0x995de3d961b40ec6cdee0009059d48768ccbdd48',
    name: 'Union Fair Coin',
    symbol: 'UFC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11750/small/maiOmI3b_400x400.png?1593417703',
  },
  {
    chainId: 1,
    address: '0xa7c71d444bf9af4bfed2ade75595d7512eb4dd39',
    name: 'Travel1Click',
    symbol: 'T1C',
    decimals: 16,
    logoURI:
      'https://assets.coingecko.com/coins/images/11752/small/t1c.png?1594683555',
  },
  {
    chainId: 1,
    address: '0x469eda64aed3a3ad6f868c44564291aa415cb1d9',
    name: 'FLUX',
    symbol: 'FLUX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11756/small/fluxres.png?1593748917',
  },
  {
    chainId: 1,
    address: '0x95ba34760ac3d7fbe98ee8b2ab33b4f1a6d18878',
    name: 'DeCash',
    symbol: 'DESH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11772/small/Logo_Blanc_%28DESH%29_V3_200x200_rond.png?1597752785',
  },
  {
    chainId: 1,
    address: '0xeeee2a622330e6d2036691e983dee87330588603',
    name: 'Asko',
    symbol: 'ASKO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11773/small/Asko_Logo_%28200x200%29.png?1604706371',
  },
  {
    chainId: 1,
    address: '0x43044f861ec040db59a7e324c40507addb673142',
    name: 'Cap',
    symbol: 'CAP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11775/small/CAP.png?1594083244',
  },
  {
    chainId: 1,
    address: '0xf29e46887ffae92f1ff87dfe39713875da541373',
    name: 'UniCrypt  Old ',
    symbol: 'UNC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11782/small/200x200_%289%29.png?1593999474',
  },
  {
    chainId: 1,
    address: '0xfab25d4469444f28023075db5932497d70094601',
    name: 'European Coin Allia',
    symbol: 'ECA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11785/small/eca.png?1594001400',
  },
  {
    chainId: 1,
    address: '0x638155f4bd8f85d401da32498d8866ee39a150b8',
    name: 'Jurasaur',
    symbol: 'JREX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11792/small/jura_logo.png?1594172306',
  },
  {
    chainId: 1,
    address: '0xcc4304a31d09258b0029ea7fe63d032f52e44efe',
    name: 'Trustswap',
    symbol: 'SWAP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11795/small/Trustswap.png?1594311216',
  },
  {
    chainId: 1,
    address: '0x4e352cf164e64adcbad318c3a1e222e9eba4ce42',
    name: 'MCDex',
    symbol: 'MCB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11796/small/mcb.png?1594355515',
  },
  {
    chainId: 1,
    address: '0x9355372396e3f6daf13359b7b607a3374cc638e0',
    name: 'WHALE',
    symbol: 'WHALE',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/11797/small/WHALE.png?1595004706',
  },
  {
    chainId: 1,
    address: '0xd6bd97a26232ba02172ff86b055d5d7be789335b',
    name: 'Ormeus Cash',
    symbol: 'OMC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11798/small/Vooo8SX.png?1594359387',
  },
  {
    chainId: 1,
    address: '0x0d4b4da5fb1a7d55e85f8e22f728701ceb6e44c9',
    name: 'DigiMax',
    symbol: 'DGMT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11807/small/0053e154-964b-485a-9827-d3ef7015a9b9.png?1594375316',
  },
  {
    chainId: 1,
    address: '0x56d811088235f11c8920698a204a5010a788f4b3',
    name: 'bZx Protocol',
    symbol: 'BZRX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11811/small/bzrx.png?1594563172',
  },
  {
    chainId: 1,
    address: '0x55eb5288c9b65037a4cd2289637f38a4f9db3a6b',
    name: 'KAWANGGAWA',
    symbol: 'KGW',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11815/small/f_HFXjBE_400x400.jpg?1594597195',
  },
  {
    chainId: 1,
    address: '0x30f271c9e86d2b7d00a6376cd96a1cfbd5f0b9b3',
    name: 'Decentr',
    symbol: 'DEC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11816/small/Decentr.png?1594637985',
  },
  {
    chainId: 1,
    address: '0x40f8b7a82b6355d26546d363ce9c12ce104cf0ce',
    name: 'GLOBALTRUSTFUND TOK',
    symbol: 'GTF',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11817/small/gtf.png?1594679456',
  },
  {
    chainId: 1,
    address: '0xc4199fb6ffdb30a829614beca030f9042f1c3992',
    name: 'snglsDAO Governance',
    symbol: 'SGT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11823/small/SGT-icon.png?1594681863',
  },
  {
    chainId: 1,
    address: '0x625687081ba9fcbffb0ae6bfe8d7fad6f616f494',
    name: 'Medalte',
    symbol: 'MDTL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11827/small/PicsArt_05-15-08.59.17-1-e1590371242800.png?1594710840',
  },
  {
    chainId: 1,
    address: '0x37ee79e0b44866876de2fb7f416d0443dd5ae481',
    name: 'Tatcoin',
    symbol: 'TAT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11828/small/54098571.png?1594714629',
  },
  {
    chainId: 1,
    address: '0xe1afe1fd76fd88f78cbf599ea1846231b8ba3b6b',
    name: 'sDEFI',
    symbol: 'SDEFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11832/small/sDEFI.png?1594787588',
  },
  {
    chainId: 1,
    address: '0x0f8b6440a1f7be3354fe072638a5c0f500b044be',
    name: 'Katerium',
    symbol: 'KTH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11837/small/katerium.png?1594896508',
  },
  {
    chainId: 1,
    address: '0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a',
    name: 'Orion Protocol',
    symbol: 'ORN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11841/small/orion_logo.png?1594943318',
  },
  {
    chainId: 1,
    address: '0xfca59cd816ab1ead66534d82bc21e7515ce441cf',
    name: 'Rarible',
    symbol: 'RARI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11845/small/Rari.png?1594946953',
  },
  {
    chainId: 1,
    address: '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
    name: 'Meta',
    symbol: 'MTA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11846/small/mStable.png?1594950533',
  },
  {
    chainId: 1,
    address: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    name: 'yearn finance',
    symbol: 'YFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png?1598325330',
  },
  {
    chainId: 1,
    address: '0x7533d63a2558965472398ef473908e1320520ae2',
    name: 'INTEXCOIN',
    symbol: 'INTX',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/11854/small/INTX.png?1595167044',
  },
  {
    chainId: 1,
    address: '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8',
    name: 'LP yCurve',
    symbol: 'YCURVE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11858/small/yCrv.png?1595203628',
  },
  {
    chainId: 1,
    address: '0xdaab5e695bb0e8ce8384ee56ba38fa8290618e52',
    name: 'CRDT',
    symbol: 'CRDT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11859/small/image_%281%29.png?1600937373',
  },
  {
    chainId: 1,
    address: '0x5c84bc60a796534bfec3439af0e6db616a966335',
    name: 'Bone',
    symbol: 'BONE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11860/small/Bone200x200.png?1595231768',
  },
  {
    chainId: 1,
    address: '0xc76fb75950536d98fa62ea968e1d6b45ffea2a55',
    name: 'Unit Protocol',
    symbol: 'COL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11862/small/Unit.png?1595580755',
  },
  {
    chainId: 1,
    address: '0xa10ae543db5d967a73e9abcc69c81a18a7fc0a78',
    name: 'BLOCKCLOUT',
    symbol: 'CLOUT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11870/small/communityIcon_nys28lije4b51.png?1595505057',
  },
  {
    chainId: 1,
    address: '0x5dc60c4d5e75d22588fa17ffeb90a63e535efce0',
    name: 'dKargo',
    symbol: 'DKA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11875/small/bVD0g0dlmrEOPIkt943KZIBZ086eCshyY0jIQFti4zxYdOlFltU8tKa6uJlcA14HvNjX4bc7dxdMvlpoW5NFMND85oG4aiiCbFRhI6eowDfKEBY3BoSVY0IrBbA9SFGIxh_IYrkNC5uNdG-roZ0_TlGO3098now6Tbzga0p4IDqVk6lnaX3TuRC7pgnAYWZM15RD-uEIHr3O_3OoIIWP-.jpg?1595563347',
  },
  {
    chainId: 1,
    address: '0x53db6b7fee89383435e424764a8478acda4dd2cd',
    name: 'Vibz8',
    symbol: 'VIBS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11880/small/vibslogo200.png?1595739621',
  },
  {
    chainId: 1,
    address: '0xdfe691f37b6264a90ff507eb359c45d55037951c',
    name: 'Karma DAO',
    symbol: 'KARMA',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/11884/small/Karma.png?1597042574',
  },
  {
    chainId: 1,
    address: '0x08ad83d779bdf2bbe1ad9cc0f78aa0d24ab97802',
    name: 'Robonomics Web Serv',
    symbol: 'RWS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11885/small/rws_logo.png?1595745253',
  },
  {
    chainId: 1,
    address: '0x3f8a2f7bcd70e7f7bdd3fbb079c11d073588dea2',
    name: 'FIRE',
    symbol: 'FIRE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11888/small/tYmI5eG.png?1597282794',
  },
  {
    chainId: 1,
    address: '0x42382f39e7c9f1add5fa5f0c6e24aa62f50be3b3',
    name: 'ZOM',
    symbol: 'ZOM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11889/small/ZOM-200x200.png?1595803982',
  },
  {
    chainId: 1,
    address: '0x0d438f3b5175bebc262bf23753c1e53d03432bde',
    name: 'Wrapped NXM',
    symbol: 'WNXM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11890/small/wrapped-nexus-mutual.jpg?1595811559',
  },
  {
    chainId: 1,
    address: '0x9f284e1337a815fe77d2ff4ae46544645b20c5ff',
    name: 'Darwinia Commitment',
    symbol: 'KTON',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11895/small/logo.png?1595856452',
  },
  {
    chainId: 1,
    address: '0xf29992d7b589a0a6bd2de7be29a97a6eb73eaf85',
    name: 'DMScript',
    symbol: 'DMST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11896/small/h0snSnDE_400x400.jpg?1595892384',
  },
  {
    chainId: 1,
    address: '0x1e3a2446c729d34373b87fd2c9cbb39a93198658',
    name: 'DeFi Nation Signals',
    symbol: 'DSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11898/small/iLgw2f82_400x400.png?1596078737',
  },
  {
    chainId: 1,
    address: '0xc25a3a3b969415c80451098fa907ec722572917f',
    name: 'LP sCurve',
    symbol: 'SCURVE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11899/small/Curvefi_sCrv_32.png?1595931870',
  },
  {
    chainId: 1,
    address: '0xa1d0e215a23d7030842fc67ce582a6afa3ccab83',
    name: 'DFI money',
    symbol: 'YFII',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11902/small/YFII-logo.78631676.png?1598677348',
  },
  {
    chainId: 1,
    address: '0xa8892bfc33fa44053a9e402b1839966f4fec74a4',
    name: 'Crypto User Base',
    symbol: 'CUB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11906/small/logo-200x200.png?1596074026',
  },
  {
    chainId: 1,
    address: '0x400b1d8a7dd8c471026b2c8cbe1062b27d120538',
    name: 'Limestone Network',
    symbol: 'LIMEX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11907/small/nw1FE_f4_400x400.png?1596074376',
  },
  {
    chainId: 1,
    address: '0x2863916c6ebdbbf0c6f02f87b7eb478509299868',
    name: 'SIMBA Storage Token',
    symbol: 'SST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11908/small/1_4OdZX6cWBKd9pRGoOCG5Bg.jpeg?1596075333',
  },
  {
    chainId: 1,
    address: '0x174bea2cb8b20646681e855196cf34fcecec2489',
    name: 'FreeTip',
    symbol: 'FTT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11920/small/sW08mMhz_400x400.jpg?1596078313',
  },
  {
    chainId: 1,
    address: '0x0417912b3a7af768051765040a55bb0925d4ddcf',
    name: 'Liquidity Dividends',
    symbol: 'LID',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11921/small/logo-200.png?1596100933',
  },
  {
    chainId: 1,
    address: '0x1f8f123bf24849443a56ed9fc42b9265b7f3a39a',
    name: 'UniTopia Token',
    symbol: 'UTO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11922/small/logo200.png?1596101623',
  },
  {
    chainId: 1,
    address: '0x57700244b20f84799a31c6c96dadff373ca9d6c5',
    name: 'TrustDAO',
    symbol: 'TRUST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11923/small/trustwhite.png?1596704613',
  },
  {
    chainId: 1,
    address: '0x1453dbb8a29551ade11d89825ca812e05317eaeb',
    name: 'Tendies',
    symbol: 'TEND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11924/small/aaaaa.jpg?1596645622',
  },
  {
    chainId: 1,
    address: '0xf911a7ec46a2c6fa49193212fe4a2a9b95851c27',
    name: 'Antiample',
    symbol: 'XAMP',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/11925/small/antiample.png?1596168983',
  },
  {
    chainId: 1,
    address: '0x695106ad73f506f9d0a9650a78019a93149ae07c',
    name: 'BNS Token',
    symbol: 'BNS',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11926/small/HS7eNJdt_400x400.jpg?1596170654',
  },
  {
    chainId: 1,
    address: '0x4ba012f6e411a1be55b98e9e62c3a4ceb16ec88b',
    name: 'Cybercoin',
    symbol: 'CBR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11927/small/ezDztuH.png?1596179588',
  },
  {
    chainId: 1,
    address: '0x49184e6dae8c8ecd89d8bdc1b950c597b8167c90',
    name: 'LIBERTAS',
    symbol: 'LIBERTAS',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/11928/small/logo200x200_%281%29.png?1596409240',
  },
  {
    chainId: 1,
    address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11939/small/SHIBLOGO.png?1600752116',
  },
  {
    chainId: 1,
    address: '0xcee1d3c3a02267e37e6b373060f79d5d7b9e1669',
    name: 'yffi finance',
    symbol: 'YFFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11940/small/yffi-finance.jpg?1596289302',
  },
  {
    chainId: 1,
    address: '0xc3dd23a0a854b4f9ae80670f528094e9eb607ccb',
    name: 'Trendering',
    symbol: 'TRND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11941/small/trnd-ico-200.png?1605147194',
  },
  {
    chainId: 1,
    address: '0x6d6506e6f438ede269877a0a720026559110b7d5',
    name: 'BONK Token',
    symbol: 'BONK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11942/small/2Updated_2x.png?1598511690',
  },
  {
    chainId: 1,
    address: '0x56687cf29ac9751ce2a4e764680b6ad7e668942e',
    name: 'FlynnJamm',
    symbol: 'JAMM',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/11943/small/jamm.png?1602491065',
  },
  {
    chainId: 1,
    address: '0x355c665e101b9da58704a8fddb5feef210ef20c0',
    name: 'dForce GOLDx',
    symbol: 'GOLDX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11947/small/logo_DF_200x200_%281%29.png?1596409058',
  },
  {
    chainId: 1,
    address: '0x3d3ab800d105fbd2f97102675a412da3dc934357',
    name: 'Marvrodi Salute Vis',
    symbol: 'MSV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11950/small/vRZShfV.jpg?1596418526',
  },
  {
    chainId: 1,
    address: '0x6b9f031d718dded0d681c20cb754f97b3bb81b78',
    name: 'GEEQ',
    symbol: 'GEEQ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11953/small/GeeqLogoPNGTransparent-1.png?1596421769',
  },
  {
    chainId: 1,
    address: '0xe277ac35f9d327a670c1a3f3eec80a83022431e4',
    name: 'PolypuX',
    symbol: 'PUX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11954/small/puxlogoforcoingecko.png?1609516934',
  },
  {
    chainId: 1,
    address: '0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419',
    name: 'DIA',
    symbol: 'DIA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11955/small/DIA-icon-colour_%281%29.png?1596423488',
  },
  {
    chainId: 1,
    address: '0x607c794cda77efb21f8848b7910ecf27451ae842',
    name: 'DeFiPie',
    symbol: 'PIE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11956/small/98j5E_EG_400x400.png?1596644614',
  },
  {
    chainId: 1,
    address: '0x075b1bb99792c9e1041ba13afef80c91a1e70fb3',
    name: 'LP sBTC Curve',
    symbol: 'SBTCCURVE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11958/small/Curvefi_sbtcCrv_32.png?1596436054',
  },
  {
    chainId: 1,
    address: '0x7c9d8fb3bde3d9ea6e89170618c2dc3d16695d36',
    name: 'WhiteRockCasino',
    symbol: 'WRC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11962/small/cwSeVyY.png?1605338879',
  },
  {
    chainId: 1,
    address: '0xf0b0a13d908253d954ba031a425dfd54f94a2e3d',
    name: 'FlashX Advance',
    symbol: 'FSXA',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11966/small/logo-200x200_%281%29.png?1596460801',
  },
  {
    chainId: 1,
    address: '0xa5a283557653f36cf9aa0d5cc74b1e30422349f2',
    name: 'Useless Eth Token L',
    symbol: 'UETL',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/11967/small/UETL-LOGO-2020v2.png?1596461432',
  },
  {
    chainId: 1,
    address: '0x0763fdccf1ae541a5961815c0872a8c5bc6de4d7',
    name: 'SUKU',
    symbol: 'SUKU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11969/small/UmfW5S6f_400x400.jpg?1596602238',
  },
  {
    chainId: 1,
    address: '0x476c5e26a75bd202a9683ffd34359c0cc15be0ff',
    name: 'Serum',
    symbol: 'SRM',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/11970/small/serum-logo.png?1597121577',
  },
  {
    chainId: 1,
    address: '0x362bc847a3a9637d3af6624eec853618a43ed7d2',
    name: 'PARSIQ',
    symbol: 'PRQ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11973/small/DsNgK0O.png?1596590280',
  },
  {
    chainId: 1,
    address: '0x2ba592f78db6436527729929aaf6c908497cb200',
    name: 'Cream',
    symbol: 'CREAM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11976/small/Cream.png?1596593418',
  },
  {
    chainId: 1,
    address: '0xabe580e7ee158da464b51ee1a83ac0289622e6be',
    name: 'Offshift',
    symbol: 'XFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11977/small/offshift_logo.png?1596597308',
  },
  {
    chainId: 1,
    address: '0x26b3038a7fc10b36c426846a9086ef87328da702',
    name: 'Yield Farming Token',
    symbol: 'YFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11981/small/photo_2020-08-04_03-25-28.jpg?1596622873',
  },
  {
    chainId: 1,
    address: '0x6f87d756daf0503d08eb8993686c7fc01dc44fb1',
    name: 'Unitrade',
    symbol: 'TRADE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11982/small/unitrade.PNG?1597009487',
  },
  {
    chainId: 1,
    address: '0x5beabaebb3146685dd74176f68a0721f91297d37',
    name: 'Bounce Token',
    symbol: 'BOT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/11984/small/photo_2020-10-19_09.17.57.jpeg?1603070366',
  },
  {
    chainId: 1,
    address: '0x9235bda06b8807161b8fbb1e102cb654555b212f',
    name: 'Feellike',
    symbol: 'FLL',
    decimals: 3,
    logoURI:
      'https://assets.coingecko.com/coins/images/12075/small/FLL_logo_200.png?1596751266',
  },
  {
    chainId: 1,
    address: '0xeeeeeeeee2af8d0e1940679860398308e0ef24d6',
    name: 'Ethverse',
    symbol: 'ETHV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12076/small/logo_%2888%29.png?1596751504',
  },
  {
    chainId: 1,
    address: '0x722f97a435278b7383a1e3c47f41773bebf3232c',
    name: 'UCROWDME',
    symbol: 'UCM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12079/small/UKm2qXh.png?1605346168',
  },
  {
    chainId: 1,
    address: '0x28cb7e841ee97947a86b06fa4090c8451f64c0be',
    name: 'YF Link',
    symbol: 'YFL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12081/small/YFLink.png?1596987945',
  },
  {
    chainId: 1,
    address: '0x3c6ff50c9ec362efa359317009428d52115fe643',
    name: 'PeerEx Network',
    symbol: 'PERX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12091/small/2AyoUJyQ_400x400.jpg?1597273390',
  },
  {
    chainId: 1,
    address: '0x990f341946a3fdb507ae7e52d17851b87168017c',
    name: 'Strong',
    symbol: 'STRONG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12092/small/STRONG-Token-256x256.png?1597823573',
  },
  {
    chainId: 1,
    address: '0x93ecd2ecdfb91ab2fee28a8779a6adfe2851cda6',
    name: 'LoanBurst',
    symbol: 'LBURST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12093/small/oKczM17b_400x400.jpg?1597273304',
  },
  {
    chainId: 1,
    address: '0x309013d55fb0e8c17363bcc79f25d92f711a5802',
    name: 'Soft Bitcoin',
    symbol: 'SBTC',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12094/small/soft_bitcoin_logo.jpg?1597043537',
  },
  {
    chainId: 1,
    address: '0x4639cd8cd52ec1cf2e496a606ce28d8afb1c792f',
    name: 'CBDAO',
    symbol: 'BREE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12096/small/cbdao_logo.jpg?1597059848',
  },
  {
    chainId: 1,
    address: '0x314bd765cab4774b2e547eb0aa15013e03ff74d2',
    name: 'MONEY PARTY',
    symbol: 'PARTY',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12097/small/MoneyPartyIcon.png?1597103516',
  },
  {
    chainId: 1,
    address: '0xb339fca531367067e98d7c4f9303ffeadff7b881',
    name: 'Aludra Network',
    symbol: 'ALD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12098/small/20200810_135504.jpg?1597112432',
  },
  {
    chainId: 1,
    address: '0xb2279b6769cfba691416f00609b16244c0cf4b20',
    name: 'Waifu Token',
    symbol: 'WAIF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12100/small/Small-Waifu_token.png?1597120029',
  },
  {
    chainId: 1,
    address: '0x2579bb08387f0de7ab135edd6c2a985a3f577b6b',
    name: 'Sports Betting Mark',
    symbol: 'SBX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12104/small/HOTavatar.png?1599272463',
  },
  {
    chainId: 1,
    address: '0x907cb97615b7cd7320bc89bb7cdb46e37432ebe7',
    name: 'Frens Community',
    symbol: 'FRENS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12105/small/7doj_8eF_400x400.jpg?1597273085',
  },
  {
    chainId: 1,
    address: '0x00d1793d7c3aae506257ba985b34c76aaf642557',
    name: 'Tacos',
    symbol: 'TACO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12108/small/photo_2020-08-12_05-50-46.jpg?1597217863',
  },
  {
    chainId: 1,
    address: '0x821144518dfe9e7b44fcf4d0824e15e8390d4637',
    name: 'Atlantis Token',
    symbol: 'ATIS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12112/small/atis_token_logo.png?1600097654',
  },
  {
    chainId: 1,
    address: '0xa462d0e6bb788c7807b1b1c96992ce1f7069e195',
    name: 'Equus Mining Token',
    symbol: 'EQMT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12114/small/RYy8zR9jCnDE5Wqnnh-06q2UBuEq2NhsAaoeZhGLCy3q2zDcOOTTnaB8Tadw9-CO8IUQ34HwIPPFf4wG-7saZk1awoHQIaH9ZdHyKKeQth0GDewgEGbtgpNDxV2fxMbJB8CFpGljfF6LiLadmJsMmT0Gm0sZqzygRtxOAyTCMu5pVopFo5tz4I1R1NA-HDyjCBkXnxR6ovo0dbH.jpg?1597275175',
  },
  {
    chainId: 1,
    address: '0x68a118ef45063051eac49c7e647ce5ace48a68a5',
    name: 'Based Money',
    symbol: 'BASED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12115/small/Based.png?1597261198',
  },
  {
    chainId: 1,
    address: '0x8a6f3bf52a26a21531514e23016eeae8ba7e7018',
    name: 'Multiplier',
    symbol: 'MXX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12119/small/MXXlogo.png?1597306184',
  },
  {
    chainId: 1,
    address: '0x3408b204d67ba2dbca13b9c50e8a45701d8a1ca6',
    name: 'Sendvibe',
    symbol: 'SVB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12120/small/U6Uf6r70_400x400.jpg?1597298729',
  },
  {
    chainId: 1,
    address: '0xe17f017475a709de58e976081eb916081ff4c9d5',
    name: 'RMPL',
    symbol: 'RMPL',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12122/small/rmpl_logo.jpg?1597298400',
  },
  {
    chainId: 1,
    address: '0xc75f15ada581219c95485c578e124df3985e4ce0',
    name: 'zzz finance',
    symbol: 'ZZZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12123/small/zzz_finance_logo.jpg?1597306287',
  },
  {
    chainId: 1,
    address: '0xd533a949740bb3306d119cc777fa900ba034cd52',
    name: 'Curve DAO Token',
    symbol: 'CRV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12124/small/Curve.png?1597369484',
  },
  {
    chainId: 1,
    address: '0x4ecb692b0fedecd7b486b4c99044392784877e8c',
    name: 'Cherry',
    symbol: 'CHERRY',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12125/small/clubcherry-2-scaled-uai-516x516.jpg?1597463169',
  },
  {
    chainId: 1,
    address: '0xa19a40fbd7375431fab013a4b08f00871b9a2791',
    name: 'Swagg Network',
    symbol: 'SWAGG',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12126/small/swagg_logo.png?1597376071',
  },
  {
    chainId: 1,
    address: '0x1b980e05943de3db3a459c72325338d327b6f5a9',
    name: 'Bitgear',
    symbol: 'GEAR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12127/small/bitgear_logo.png?1597377982',
  },
  {
    chainId: 1,
    address: '0x2129ff6000b95a973236020bcd2b2006b0d8e019',
    name: 'MYX Network',
    symbol: 'MYX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12128/small/oKkmWEt.png?1597395102',
  },
  {
    chainId: 1,
    address: '0x3845badade8e6dff049820680d1f14bd3903a5d0',
    name: 'SAND',
    symbol: 'SAND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg?1597397942',
  },
  {
    chainId: 1,
    address: '0x2cad4991f62fc6fcd8ec219f37e7de52b688b75a',
    name: 'Schain Wallet',
    symbol: 'SCHA',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/12135/small/schain.png?1597462731',
  },
  {
    chainId: 1,
    address: '0xd5525d397898e5502075ea5e830d8914f6f0affe',
    name: 'Meme',
    symbol: 'MEME',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12140/small/meme.jpg?1597476037',
  },
  {
    chainId: 1,
    address: '0x6a7ef4998eb9d0f706238756949f311a59e05745',
    name: 'Keysians Network',
    symbol: 'KEN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12141/small/Keysians_logo.jpg?1597542966',
  },
  {
    chainId: 1,
    address: '0x54c9ea2e9c9e8ed865db4a4ce6711c2a0d5063ba',
    name: 'BarterTrade',
    symbol: 'BART',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12142/small/200x200-transparent.png?1606958206',
  },
  {
    chainId: 1,
    address: '0x539f3615c1dbafa0d008d87504667458acbd16fa',
    name: 'Fera',
    symbol: 'FERA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12143/small/IMG_20200908_085545_557.jpg?1599563732',
  },
  {
    chainId: 1,
    address: '0x7777770f8a6632ff043c8833310e245eba9209e6',
    name: 'Tokens of Babel',
    symbol: 'TOB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12144/small/tokens_of_babel_logo.jpg?1597566356',
  },
  {
    chainId: 1,
    address: '0x1b4052d98fb1888c2bf3b8d3b930e0aff8a910df',
    name: 'Community Token',
    symbol: 'COM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12145/small/community_token_logo.png?1597631449',
  },
  {
    chainId: 1,
    address: '0xfbeea1c75e4c4465cb2fccc9c6d6afe984558e20',
    name: 'DuckDaoDime',
    symbol: 'DDIM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12146/small/token_DDIM-01.png?1606982032',
  },
  {
    chainId: 1,
    address: '0xc6e64729931f60d2c8bc70a27d66d9e0c28d1bf9',
    name: 'Flow Protocol',
    symbol: 'FLOW',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12147/small/FLOW_LOGO_BLACK_BG_200_200.png?1599722242',
  },
  {
    chainId: 1,
    address: '0x6251e725cd45fb1af99354035a414a2c0890b929',
    name: 'MixTrust',
    symbol: 'MXT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12148/small/MXT_LOGO_200_200.png?1597578983',
  },
  {
    chainId: 1,
    address: '0x38c4102d11893351ced7ef187fcf43d33eb1abe6',
    name: 'Shrimp Finance',
    symbol: 'SHRIMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12150/small/shrimp_logo.jpg?1597653144',
  },
  {
    chainId: 1,
    address: '0x3593d125a4f7849a1b059e64f4517a86dd60c95d',
    name: 'MANTRA DAO',
    symbol: 'OM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12151/small/OM_3D_whtbg.png?1598332353',
  },
  {
    chainId: 1,
    address: '0x87f5f9ebe40786d49d35e1b5997b07ccaa8adbff',
    name: 'Rebased',
    symbol: 'REB2',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12153/small/reb.png?1608516711',
  },
  {
    chainId: 1,
    address: '0x784561b89a160990f46de6db19571ca1b5f14bce',
    name: 'Most Protocol',
    symbol: 'MOST',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12162/small/most_protocol_logo.png?1597728245',
  },
  {
    chainId: 1,
    address: '0x0e29e5abbb5fd88e28b2d355774e73bd47de3bcd',
    name: 'Hakka Finance',
    symbol: 'HAKKA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12163/small/Hakka-icon.png?1597746776',
  },
  {
    chainId: 1,
    address: '0x0ff6ffcfda92c53f615a4a75d982f399c989366b',
    name: 'UniLayer',
    symbol: 'LAYER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12164/small/Unilayer.jpg?1597779313',
  },
  {
    chainId: 1,
    address: '0x646707246d7d5c2a86d7206f41ca8199ea9ced69',
    name: 'Porkchop',
    symbol: 'CHOP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12169/small/Porkchop.png?1597803275',
  },
  {
    chainId: 1,
    address: '0xe54f9e6ab80ebc28515af8b8233c1aee6506a15e',
    name: 'Spaghetti',
    symbol: 'PASTA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12170/small/pasta_logo.png?1597803191',
  },
  {
    chainId: 1,
    address: '0x64c5572e7a100af9901c148d75d72c619a7f1e9d',
    name: 'UniCrapToken xyz',
    symbol: 'UNICRAP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12172/small/GfCR6sqZMaJmDBJ80CQBSSxzm2fe1Y0Cd87I9ZgwUU32Zr70LZDGA7ue_2aisyeXuEhweh4fQaRYg1KRbQzuZVrnDJota1LsNLgcjWj23eYTAdo8bI79hg6oxwVC-FPi58jxlqKO6e-5G-ICeqzUbW-LPQjSeG0esscG9a5y_9R64p4rMTHCqudAO01tLmBrYfIUn9bEyK-pgicSGY0.jpg?1597804376',
  },
  {
    chainId: 1,
    address: '0x3c4030839708a20fd2fb379cf11810dde4888d93',
    name: 'IMSWallet',
    symbol: 'IMS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12173/small/wqtIArTS_400x400.jpg?1597804992',
  },
  {
    chainId: 1,
    address: '0xcb8d1260f9c92a3a545d409466280ffdd7af7042',
    name: 'NFT Protocol',
    symbol: 'NFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12174/small/nftprotocol_32.png?1597818115',
  },
  {
    chainId: 1,
    address: '0xbd2949f67dcdc549c6ebe98696449fa79d988a9f',
    name: 'Meter Governance ma',
    symbol: 'EMTRG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12175/small/Dark-blue-icon-transparent-vector-white-icon200x200.png?1597819237',
  },
  {
    chainId: 1,
    address: '0x29e9fdf5933824ad21bc6dbb8bf156efa3735e32',
    name: 'Meter Stable mapped',
    symbol: 'EMTR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12176/small/Meter-Logo-Vertical-Gray-Light-Blue-rgb-200x200px.png?1597819702',
  },
  {
    chainId: 1,
    address: '0x56015bbe3c01fe05bc30a8a9a9fd9a88917e7db3',
    name: 'Cat Token',
    symbol: 'CAT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12177/small/cat.png?1598137093',
  },
  {
    chainId: 1,
    address: '0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a',
    name: 'YAM v2',
    symbol: 'YAMV2',
    decimals: 24,
    logoURI:
      'https://assets.coingecko.com/coins/images/12179/small/YAM-v2.png?1597892396',
  },
  {
    chainId: 1,
    address: '0x2d80f5f5328fdcb6eceb7cacf5dd8aedaec94e20',
    name: 'AGA Token',
    symbol: 'AGA',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12180/small/aga-logo.png?1597937396',
  },
  {
    chainId: 1,
    address: '0xae697f994fc5ebc000f8e22ebffee04612f98a0d',
    name: 'LGCY Network',
    symbol: 'LGCY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12181/small/LGCY_network.jpg?1597926587',
  },
  {
    chainId: 1,
    address: '0x31024a4c3e9aeeb256b825790f5cb7ac645e7cd5',
    name: 'Xiotri',
    symbol: 'XIOT',
    decimals: 3,
    logoURI:
      'https://assets.coingecko.com/coins/images/12182/small/xiot_logo_512x512.png?1601775223',
  },
  {
    chainId: 1,
    address: '0xf552b656022c218c26dad43ad88881fc04116f76',
    name: 'MORK',
    symbol: 'MORK',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12183/small/mork-logo.png?1597941710',
  },
  {
    chainId: 1,
    address: '0x70d2b7c19352bb76e4409858ff5746e500f2b67c',
    name: 'Pawtocol',
    symbol: 'UPI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12186/small/pawtocol.jpg?1597962008',
  },
  {
    chainId: 1,
    address: '0xee3b9b531f4c564c70e14b7b3bb7d516f33513ff',
    name: 'DeFi Omega',
    symbol: 'DFIO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12191/small/defi_omega_logo.png?1597978243',
  },
  {
    chainId: 1,
    address: '0x10bae51262490b4f4af41e12ed52a0e744c1137a',
    name: 'Soft Link',
    symbol: 'SLINK',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12192/small/LogoSLINK.png?1597983753',
  },
  {
    chainId: 1,
    address: '0xc8d2ab2a6fdebc25432e54941cb85b55b9f152db',
    name: 'Grap Finance',
    symbol: 'GRAP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12193/small/0WBMFrtk_400x400.jpg?1597984167',
  },
  {
    chainId: 1,
    address: '0xb7ba8461664de526a3ae44189727dfc768625902',
    name: 'YMPL',
    symbol: 'YMPL',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12194/small/xm0vpJqS_400x400.jpg?1597984439',
  },
  {
    chainId: 1,
    address: '0x56cdbbeec9828962cecb3f1b69517d430295d952',
    name: 'Davecoin',
    symbol: 'DDTG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12195/small/davecoin.png?1597991174',
  },
  {
    chainId: 1,
    address: '0x9903a4cd589da8e434f264deafc406836418578e',
    name: 'Harrison First',
    symbol: 'FIRST',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12196/small/cc2016f6-0c74-4a95-b89b-b1684c7b9426.png?1597991823',
  },
  {
    chainId: 1,
    address: '0x165440036ce972c5f8ebef667086707e48b2623e',
    name: 'UniGraph',
    symbol: 'GRAPH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12197/small/unigraph_logo.png?1597992376',
  },
  {
    chainId: 1,
    address: '0xecc0f1f860a82ab3b442382d93853c02d6384389',
    name: 'Axis DeFi',
    symbol: 'AXIS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12199/small/YeLWZ3V.jpg?1597998424',
  },
  {
    chainId: 1,
    address: '0x4fe5851c9af07df9e5ad8217afae1ea72737ebda',
    name: 'OpenPredict Token',
    symbol: 'OPT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12200/small/9idIjfrY_400x400.jpg?1598020161',
  },
  {
    chainId: 1,
    address: '0x11a2ab94ade17e96197c78f9d5f057332a19a0b9',
    name: 'Orbicular',
    symbol: 'ORBI',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12201/small/orbicular_logo.png?1598005710',
  },
  {
    chainId: 1,
    address: '0x6bff2fe249601ed0db3a87424a2e923118bb0312',
    name: 'Fyooz',
    symbol: 'FYZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12202/small/fyooz.png?1598017956',
  },
  {
    chainId: 1,
    address: '0xbff0e42eec4223fbd12260f47f3348d29876db42',
    name: 'Xtake',
    symbol: 'XTK',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12204/small/xtake.jpg?1598080058',
  },
  {
    chainId: 1,
    address: '0x2f3e054d233c93c59140c0905227c7c607c70cbb',
    name: 'CoomCoin',
    symbol: 'COOM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12205/small/coom.jpg?1598081856',
  },
  {
    chainId: 1,
    address: '0x11f4c6b3e8f50c50935c7889edc56c96f41b5399',
    name: 'Yield Breeder DAO',
    symbol: 'YBREE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12207/small/ybdao_logo.jpg?1598094230',
  },
  {
    chainId: 1,
    address: '0x26e43759551333e57f073bb0772f50329a957b30',
    name: 'DegenVC',
    symbol: 'DGVC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12208/small/degen_vc_logo.png?1598186601',
  },
  {
    chainId: 1,
    address: '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c',
    name: 'yUSD',
    symbol: 'YVAULT-LP-YCURVE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12210/small/yUSD.png?1600166557',
  },
  {
    chainId: 1,
    address: '0x0bf6261297198d91d4fa460242c69232146a5703',
    name: 'Libera',
    symbol: 'LIB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12211/small/19nmRSeR_400x400.jpg?1598234697',
  },
  {
    chainId: 1,
    address: '0xc4cb5793bd58bad06bf51fb37717b86b02cbe8a4',
    name: 'PROXI DeFi',
    symbol: 'CREDIT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12212/small/_credit.png?1598235420',
  },
  {
    chainId: 1,
    address: '0x3d3d35bb9bec23b06ca00fe472b50e7a4c692c30',
    name: 'Vidya',
    symbol: 'VIDYA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12219/small/VIDYA_TOKEN.png?1598240425',
  },
  {
    chainId: 1,
    address: '0x8c3ee4f778e282b59d42d693a97b80b1ed80f4ee',
    name: 'SatoPay',
    symbol: 'STOP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12220/small/stop.png?1598241582',
  },
  {
    chainId: 1,
    address: '0xb81d70802a816b5dacba06d708b5acf19dcd436d',
    name: 'Dextoken Governance',
    symbol: 'DEXG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12223/small/dextoken-logo-v2_200.png?1598408669',
  },
  {
    chainId: 1,
    address: '0xab37e1358b639fd877f015027bb62d3ddaa7557e',
    name: 'Lien',
    symbol: 'LIEN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12224/small/Lien.png?1598262819',
  },
  {
    chainId: 1,
    address: '0xd55bd2c12b30075b325bc35aef0b46363b3818f8',
    name: 'Zombie Finance',
    symbol: 'ZOMBIE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12227/small/logo2_%285%29.png?1598307645',
  },
  {
    chainId: 1,
    address: '0xf0be50ed0620e0ba60ca7fc968ed14762e0a5dd3',
    name: 'Cowboy Finance',
    symbol: 'COW',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12228/small/cowboy.png?1598309446',
  },
  {
    chainId: 1,
    address: '0x52132a43d7cae69b23abe77b226fa1a5bc66b839',
    name: 'Truample',
    symbol: 'TMPL',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12229/small/tmpl.jpg?1598311641',
  },
  {
    chainId: 1,
    address: '0x16b0a1a87ae8af5c792fabc429c4fe248834842b',
    name: 'Algory',
    symbol: 'ALG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12231/small/logo-2.png?1605256312',
  },
  {
    chainId: 1,
    address: '0xf7623a0a44045b907d81aad8479aa3c4a818211d',
    name: 'Sperax',
    symbol: 'SPA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12232/small/sperax_logo.jpg?1598342904',
  },
  {
    chainId: 1,
    address: '0x3936ad01cf109a36489d93cabda11cf062fd3d48',
    name: 'Coil',
    symbol: 'COIL',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12234/small/Coil_-_Logo_open_%28256x256%29_tp.png?1598519979',
  },
  {
    chainId: 1,
    address: '0xd379700999f4805ce80aa32db46a94df64561108',
    name: 'Dextrust',
    symbol: 'DETS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12235/small/logo_dark.png?1598425651',
  },
  {
    chainId: 1,
    address: '0x09e64c2b61a5f1690ee6fbed9baf5d6990f8dfd0',
    name: 'GROWTH DeFi',
    symbol: 'GRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12239/small/growthdefi_logo.png?1598438196',
  },
  {
    chainId: 1,
    address: '0x6f022e991ea21d26f85f6716c088e2864101dfec',
    name: 'Hands of Steel',
    symbol: 'STEEL',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/12246/small/HOSlogo.png?1598496572',
  },
  {
    chainId: 1,
    address: '0x70efdc485a10210b056ef8e0a32993bc6529995e',
    name: 'Blaze Network',
    symbol: 'BLZN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12248/small/A8JOuPSJ_400x400.jpg?1598511402',
  },
  {
    chainId: 1,
    address: '0xf063fe1ab7a291c5d06a86e14730b00bf24cb589',
    name: 'DxSale Network',
    symbol: 'SALE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12250/small/logoicon_200-200.png?1598513464',
  },
  {
    chainId: 1,
    address: '0xf9c36c7ad7fa0f0862589c919830268d1a2581a1',
    name: 'BOA',
    symbol: 'BOA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12251/small/5f4336749313bc77f88e3927_the-ouroboros-or-uroborus-english-school-p-500.jpeg?1598515550',
  },
  {
    chainId: 1,
    address: '0xfffffffff15abf397da76f1dcc1a1604f45126db',
    name: 'Falconswap',
    symbol: 'FSW',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12256/small/falconswap.png?1598534184',
  },
  {
    chainId: 1,
    address: '0xc4c2614e694cf534d407ee49f8e44d125e4681c4',
    name: 'Chain Games',
    symbol: 'CHAIN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12257/small/chain-logo-centered-500x500.png?1599617244',
  },
  {
    chainId: 1,
    address: '0x9e78b8274e1d6a76a0dbbf90418894df27cbceb5',
    name: 'Unifi',
    symbol: 'UNIFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12258/small/Unifi.png?1598548933',
  },
  {
    chainId: 1,
    address: '0x44086035439e676c02d411880fccb9837ce37c57',
    name: 'unified Stable Doll',
    symbol: 'USD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12259/small/Uniswap_State_Dollar.png?1598550804',
  },
  {
    chainId: 1,
    address: '0xbbe319b73744db9d54f5d29df7d8256b7e43995c',
    name: 'Aragon China',
    symbol: 'ANC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12261/small/bbs-panda200.png?1598579736',
  },
  {
    chainId: 1,
    address: '0x78571accaf24052795f98b11f093b488a2d9eaa4',
    name: 'Rocket Token',
    symbol: 'RCKT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12262/small/IAY0DFX4_400x400.jpg?1598584324',
  },
  {
    chainId: 1,
    address: '0xba21ef4c9f433ede00badefcc2754b8e74bd538a',
    name: 'Swapfolio',
    symbol: 'SWFL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12263/small/swapfolio-token-logo-icon-symbol-256-256.png?1598593097',
  },
  {
    chainId: 1,
    address: '0xfab5a05c933f1a2463e334e011992e897d56ef0a',
    name: 'DeFi of Thrones',
    symbol: 'DOTX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12265/small/logo200x200.jpg?1598599911',
  },
  {
    chainId: 1,
    address: '0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1',
    name: 'PowerPool Concentra',
    symbol: 'CVP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12266/small/Powerpool.jpg?1598621373',
  },
  {
    chainId: 1,
    address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    name: 'Sushi',
    symbol: 'SUSHI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png?1606986688',
  },
  {
    chainId: 1,
    address: '0xae9cbe6ebf72a51c9fcea3830485614486318fd4',
    name: 'Newtonium',
    symbol: 'NEWTON',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12273/small/newton.jpg?1598689904',
  },
  {
    chainId: 1,
    address: '0x3aef8e803bd9be47e69b9f36487748d30d940b96',
    name: 'Vesta',
    symbol: 'VESTA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12276/small/t693cWC.png?1598736747',
  },
  {
    chainId: 1,
    address: '0x86965a86539e2446f9e72634cefca7983cc21a81',
    name: 'YFISCURITY',
    symbol: 'YFIS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12277/small/Logo_YFIS_.png?1598737945',
  },
  {
    chainId: 1,
    address: '0xa54c67bd320da4f9725a6f585b7635a0c09b122e',
    name: 'TimeMiner',
    symbol: 'TIME',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12280/small/2WTMX74.png?1598739901',
  },
  {
    chainId: 1,
    address: '0x29f6e320dbdbf1f5ebf599d36242634739a24609',
    name: 'Mobius Crypto',
    symbol: 'MOBI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12281/small/nTcbsIgu_400x400.jpg?1598741341',
  },
  {
    chainId: 1,
    address: '0x19810559df63f19cfe88923313250550edadb743',
    name: 'Toast finance',
    symbol: 'HOUSE',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/12287/small/icon_%284%29.png?1598825274',
  },
  {
    chainId: 1,
    address: '0x23aeff664c1b2bba98422a0399586e96cc8a1c92',
    name: 'Fee Active Collater',
    symbol: 'FACT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12288/small/PfFTv2JB_200x200.jpg?1598826350',
  },
  {
    chainId: 1,
    address: '0x47eb79217f42f92dbd741add1b1a6783a2c873cf',
    name: 'Bast',
    symbol: 'BAST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12289/small/bast_logo.png?1598865533',
  },
  {
    chainId: 1,
    address: '0x9b9087756eca997c5d595c840263001c9a26646d',
    name: 'DogeFi',
    symbol: 'DOGEFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12290/small/DOGEFI-Logo.png?1598868716',
  },
  {
    chainId: 1,
    address: '0x4b4701f3f827e1331fb22ff8e2beac24b17eb055',
    name: 'DistX',
    symbol: 'DISTX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12291/small/DISTX-icon.png?1598885812',
  },
  {
    chainId: 1,
    address: '0xd3e8695d2bef061eab38b5ef526c0f714108119c',
    name: 'YFIVE FINANCE',
    symbol: 'YFIVE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12292/small/0gW17G6E_400x400.jpg?1598886392',
  },
  {
    chainId: 1,
    address: '0xaea5e11e22e447fa9837738a0cd2848857748adf',
    name: 'Social Finance',
    symbol: 'SOFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12296/small/logo-transparent.png?1598931704',
  },
  {
    chainId: 1,
    address: '0x4b4f5286e0f93e965292b922b9cd1677512f1222',
    name: 'YUNo Finance',
    symbol: 'YUNO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12297/small/y.png?1598942444',
  },
  {
    chainId: 1,
    address: '0x4d953cf077c0c95ba090226e59a18fcf97db44ec',
    name: 'Mini',
    symbol: 'MINI',
    decimals: 19,
    logoURI:
      'https://assets.coingecko.com/coins/images/12298/small/IrTAVc_GqZ7iQucAa3fNYlh_Cqt3tY9wM_pmzOl5SifscRMpuzrp_dizMzGTiMr_NxDJPCKigBgz8THrzvO_DqT3JLzqZIYeytDBRw3qKI73dljS0BnFaaI2aLadpdCZah4RkhydddLIDDbQlGit77farlQRaq7qEgxdjVe0aqEeh4phE-DWAKi_KS_Yz-fFdDfjWgifVCKkZRBeNSWWQEplxxl.jpg?1598961320',
  },
  {
    chainId: 1,
    address: '0xd7b7d3c0bda57723fb54ab95fd8f9ea033af37f2',
    name: 'Pylon Finance',
    symbol: 'PYLON',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12299/small/NewPylonLogo.png?1604457455',
  },
  {
    chainId: 1,
    address: '0x94d863173ee77439e4292284ff13fad54b3ba182',
    name: 'Akropolis Delphi',
    symbol: 'ADEL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12300/small/adel_on_white_10x.png?1598967061',
  },
  {
    chainId: 1,
    address: '0x0501e7a02c285b9b520fdbf1badc74ae931ad75d',
    name: 'Walnut finance',
    symbol: 'WTF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12301/small/photo_2020-08-31_04-24-32.jpg?1598968170',
  },
  {
    chainId: 1,
    address: '0x1e18821e69b9faa8e6e75dffe54e7e25754beda0',
    name: 'KIMCHI finance',
    symbol: 'KIMCHI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12302/small/VBa2Z60o_400x400.png?1598982471',
  },
  {
    chainId: 1,
    address: '0xb6ee603933e024d8d53dde3faa0bf98fe2a3d6f1',
    name: 'DeFiat',
    symbol: 'DFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12303/small/defiat.jpg?1598985049',
  },
  {
    chainId: 1,
    address: '0xa0246c9032bc3a600820415ae600c6388619a14d',
    name: 'Harvest Finance',
    symbol: 'FARM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12304/small/Harvest.png?1599007988',
  },
  {
    chainId: 1,
    address: '0x39795344cbcc76cc3fb94b9d1b15c23c2070c66d',
    name: 'Seigniorage Shares',
    symbol: 'SHARE',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12306/small/logo_%281%29.png?1607658707',
  },
  {
    chainId: 1,
    address: '0xd0df3b1cf729a29b7404c40d61c750008e631ba7',
    name: 'Rug',
    symbol: 'RUG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12307/small/rug_token_logo.png?1599029152',
  },
  {
    chainId: 1,
    address: '0x90d702f071d2af33032943137ad0ab4280705817',
    name: 'YFFS Finance',
    symbol: 'YFFS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12309/small/KijHtdcg_400x400.jpg?1599041092',
  },
  {
    chainId: 1,
    address: '0x420ab548b18911717ed7c4ccbf46371ea758458c',
    name: 'NOODLE Finance',
    symbol: 'NOODLE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12311/small/noodle.jpg?1599053738',
  },
  {
    chainId: 1,
    address: '0x466912baa9430a4a460b141ee8c580d817441449',
    name: 'BLOCKMAX',
    symbol: 'OCB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12315/small/200x200-01.png?1599086761',
  },
  {
    chainId: 1,
    address: '0xcb3df3108635932d912632ef7132d03ecfc39080',
    name: 'Wing Shop',
    symbol: 'WING',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12318/small/6584.png?1599087626',
  },
  {
    chainId: 1,
    address: '0x322124122df407b0d0d902cb713b3714fb2e2e1f',
    name: 'Soft Yearn',
    symbol: 'SYFI',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12320/small/soft_yearn.png?1599094189',
  },
  {
    chainId: 1,
    address: '0x69bbc3f8787d573f1bbdd0a5f40c7ba0aee9bcc9',
    name: 'Yup',
    symbol: 'YUP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12322/small/yupx.png?1599094638',
  },
  {
    chainId: 1,
    address: '0x89ee58af4871b474c30001982c3d7439c933c838',
    name: 'yfBeta',
    symbol: 'YFBETA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12325/small/yfbeta_logo.jpg?1599096612',
  },
  {
    chainId: 1,
    address: '0x3678d8cc9eb08875a3720f34c1c8d1e1b31f5a11',
    name: 'Obee Network',
    symbol: 'OBEE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12326/small/ObeeNetwork.png?1599099616',
  },
  {
    chainId: 1,
    address: '0x798a9055a98913835bbfb45a0bbc209438dcfd97',
    name: 'New Year Bull',
    symbol: 'NYB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12327/small/bull.jpg?1599102873',
  },
  {
    chainId: 1,
    address: '0xd6c67b93a7b248df608a653d82a100556144c5da',
    name: 'ExNetwork Token',
    symbol: 'EXNT',
    decimals: 16,
    logoURI:
      'https://assets.coingecko.com/coins/images/12328/small/exnt_logo.png?1599102916',
  },
  {
    chainId: 1,
    address: '0x3e780920601d61cedb860fe9c4a90c9ea6a35e78',
    name: 'Boosted Finance',
    symbol: 'BOOST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12329/small/boosted.jpg?1599105606',
  },
  {
    chainId: 1,
    address: '0x8a3d77e9d6968b780564936d15b09805827c21fa',
    name: 'Uniris',
    symbol: 'UCO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12330/small/e353ZVj.png?1599112996',
  },
  {
    chainId: 1,
    address: '0x5bc25f649fc4e26069ddf4cf4010f9f706c23831',
    name: 'DefiDollar',
    symbol: 'DUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12333/small/defidollar_logo.png?1599116360',
  },
  {
    chainId: 1,
    address: '0x6a6c2ada3ce053561c2fbc3ee211f23d9b8c520a',
    name: 'TONToken',
    symbol: 'TON',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12334/small/ton.jpg?1599128436',
  },
  {
    chainId: 1,
    address: '0x175ab41e2cedf3919b2e4426c19851223cf51046',
    name: 'BaconSwap',
    symbol: 'BACON',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12336/small/bacon_swap_logo.png?1599133231',
  },
  {
    chainId: 1,
    address: '0xf4c17bc4979c1dc7b4ca50115358dec58c67fd9d',
    name: 'Omega Protocol Mone',
    symbol: 'OPM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12337/small/opm-200px.png?1599136480',
  },
  {
    chainId: 1,
    address: '0x9043d4d51c9d2e31e3f169de4551e416970c27ef',
    name: 'Prime DAI',
    symbol: 'PDAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12338/small/pdai-200px.png?1599136775',
  },
  {
    chainId: 1,
    address: '0x9aeb50f542050172359a0e1a25a9933bc8c01259',
    name: 'OIN Finance',
    symbol: 'OIN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12339/small/oin_finance_logo.jpg?1599137603',
  },
  {
    chainId: 1,
    address: '0x177ba0cac51bfc7ea24bad39d81dcefd59d74faa',
    name: 'KittenFinance',
    symbol: 'KIF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12340/small/SnQPkABT_400x400.png?1599173267',
  },
  {
    chainId: 1,
    address: '0xed0439eacf4c4965ae4613d77a5c2efe10e5f183',
    name: 'Shroom Finance',
    symbol: 'SHROOM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12341/small/icon_%285%29.png?1599173559',
  },
  {
    chainId: 1,
    address: '0x1da01e84f3d4e6716f274c987ae4bee5dc3c8288',
    name: 'DeFi Bids',
    symbol: 'BID',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12344/small/IMG_20200919_115022_477.png?1600739441',
  },
  {
    chainId: 1,
    address: '0xcbd55d4ffc43467142761a764763652b48b969ff',
    name: 'AstroTools',
    symbol: 'ASTRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12345/small/AT-flat-purple_logo.png?1599190828',
  },
  {
    chainId: 1,
    address: '0x47632da9227e322eda59f9e7691eacc6430ac87c',
    name: 'YFI Business',
    symbol: 'YFIB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12346/small/fkPIR2pc_400x400.jpg?1599192901',
  },
  {
    chainId: 1,
    address: '0x6c972b70c533e2e045f333ee28b9ffb8d717be69',
    name: 'FoundryDAO Logistic',
    symbol: 'FRY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12348/small/lNceCqHc_400x400.jpg?1599202157',
  },
  {
    chainId: 1,
    address: '0x012ba3ae1074ae43a34a14bca5c4ed0af01b6e53',
    name: 'YUGE',
    symbol: 'TRUMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12350/small/flat-750x-075-f-pad-750x1000-f8f8f8.png?1599968841',
  },
  {
    chainId: 1,
    address: '0x0cf58006b2400ebec3eb8c05b73170138a340563',
    name: 'Good Boy Points',
    symbol: 'GBP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12351/small/good_boy_points_logo.png?1599206547',
  },
  {
    chainId: 1,
    address: '0x6dddf4111ad997a8c7be9b2e502aa476bf1f4251',
    name: 'Unimonitor',
    symbol: 'UNT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12352/small/logo-2.png?1599206919',
  },
  {
    chainId: 1,
    address: '0xef327568556310d344c49fb7ce6cbfe7b2bb83e6',
    name: 'YFA Finance',
    symbol: 'YFA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12354/small/2020-08-31_19.04.20.png?1599260762',
  },
  {
    chainId: 1,
    address: '0xd9bae39c725a1864b1133ad0ef1640d02f79b78c',
    name: 'Touch Social',
    symbol: 'TST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12355/small/RhEvWed.png?1599260984',
  },
  {
    chainId: 1,
    address: '0xc5e19fd321b9bc49b41d9a3a5ad71bcc21cc3c54',
    name: 'TradePower Dex',
    symbol: 'TDEX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12356/small/slider-img.png?1599261139',
  },
  {
    chainId: 1,
    address: '0x9d24364b97270961b2948734afe8d58832efd43a',
    name: 'Yefam Finance',
    symbol: 'FAM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12359/small/FAM200.png?1600333720',
  },
  {
    chainId: 1,
    address: '0xb8baa0e4287890a5f79863ab62b7f175cecbd433',
    name: 'Swerve',
    symbol: 'SWRV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12361/small/swerve.png?1599278316',
  },
  {
    chainId: 1,
    address: '0x0128e4fccf5ef86b030b28f0a8a029a3c5397a94',
    name: 'FlashSwap',
    symbol: 'FSP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12362/small/ZKvuJEUR_400x400.jpg?1599299420',
  },
  {
    chainId: 1,
    address: '0x96d62cdcd1cc49cb6ee99c867cb8812bea86b9fa',
    name: 'Yearn Finance Proto',
    symbol: 'YFP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12363/small/yearn.jpg?1599309396',
  },
  {
    chainId: 1,
    address: '0x41efc0253ee7ea44400abb5f907fdbfdebc82bec',
    name: ' AAPL',
    symbol: 'AAPL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12367/small/oF1_9R1K_400x400.jpg?1599345463',
  },
  {
    chainId: 1,
    address: '0x668dbf100635f593a3847c0bdaf21f0a09380188',
    name: 'BNSD Finance',
    symbol: 'BNSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12368/small/bnsd.png?1599358388',
  },
  {
    chainId: 1,
    address: '0xbd301be09eb78df47019aa833d29edc5d815d838',
    name: 'YFUEL',
    symbol: 'YFUEL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12369/small/Untitled-3-1.png?1600765495',
  },
  {
    chainId: 1,
    address: '0xf1f5de69c9c8d9be8a7b01773cc1166d4ec6ede2',
    name: 'Definitex',
    symbol: 'DFX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12370/small/dfx.jpg?1599360540',
  },
  {
    chainId: 1,
    address: '0x557b933a7c2c45672b610f8954a3deb39a51a8ca',
    name: 'REVV',
    symbol: 'REVV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12373/small/Nxy8QwOU.png?1599385982',
  },
  {
    chainId: 1,
    address: '0xb1ec548f296270bc96b8a1b3b3c8f3f04b494215',
    name: 'Foresight',
    symbol: 'FORS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12374/small/foresight_logo.jpg?1599389915',
  },
  {
    chainId: 1,
    address: '0x87b008e57f640d94ee44fd893f0323af933f9195',
    name: 'Coin Artist',
    symbol: 'COIN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12375/small/coin_artist_logo.png?1599403918',
  },
  {
    chainId: 1,
    address: '0x035bfe6057e15ea692c0dfdcab3bb41a64dd2ad4',
    name: 'Universal Liquidity',
    symbol: 'ULU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12376/small/ulu_finance_logo.ico?1599444401',
  },
  {
    chainId: 1,
    address: '0x2f6081e3552b1c86ce4479b80062a1dda8ef23e3',
    name: 'Dollars',
    symbol: 'USDX',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12377/small/rCdP56C.png?1599445426',
  },
  {
    chainId: 1,
    address: '0x5580ab97f226c324c671746a1787524aef42e415',
    name: 'JustLiquidity',
    symbol: 'JUL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12378/small/JUL256_256.png?1599445678',
  },
  {
    chainId: 1,
    address: '0x6e36556b3ee5aa28def2a8ec3dae30ec2b208739',
    name: 'BUILD Finance',
    symbol: 'BUILD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12380/small/build.PNG?1599463828',
  },
  {
    chainId: 1,
    address: '0xbc396689893d065f41bc2c6ecbee5e0085233447',
    name: 'Perpetual Protocol',
    symbol: 'PERP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12381/small/perpetual_protocol_logo.jpg?1599469619',
  },
  {
    chainId: 1,
    address: '0x4889f721f80c5e9fade6ea9b85835d405d79a4f4',
    name: 'Mafia Network',
    symbol: 'MAFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12383/small/MAFI.jpg?1599488498',
  },
  {
    chainId: 1,
    address: '0x1dd80016e3d4ae146ee2ebb484e8edd92dacc4ce',
    name: 'Lead Token',
    symbol: 'LEAD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12384/small/lead.jpg?1599491466',
  },
  {
    chainId: 1,
    address: '0xf4cd3d3fda8d7fd6c5a500203e38640a70bf9577',
    name: 'YfDAI finance',
    symbol: 'YF-DAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12385/small/LOGO_Coingechko.png?1600514429',
  },
  {
    chainId: 1,
    address: '0x556148562d5ddeb72545d7ec4b3ec8edc8f55ba7',
    name: 'Predix Network',
    symbol: 'PRDX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12388/small/main-logo.png?1599531749',
  },
  {
    chainId: 1,
    address: '0x468ab3b1f63a1c14b361bc367c3cc92277588da1',
    name: 'Yeld Finance',
    symbol: 'YELD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12389/small/yeld_logo.png?1599537337',
  },
  {
    chainId: 1,
    address: '0xdb2f2bcce3efa95eda95a233af45f3e0d4f00e2a',
    name: 'Aegis',
    symbol: 'AGS',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12391/small/logo-3.png?1599540071',
  },
  {
    chainId: 1,
    address: '0x00a8b738e453ffd858a7edf03bccfe20412f0eb0',
    name: 'AllianceBlock',
    symbol: 'ALBT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12392/small/alliance_block_logo.jpg?1599546617',
  },
  {
    chainId: 1,
    address: '0x5f7fa1a0ae94b5dd6bb6bd1708b5f3af01b57908',
    name: 'YFIKing Finance',
    symbol: 'YFIKING',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12395/small/Kinglog_200px.png?1599550956',
  },
  {
    chainId: 1,
    address: '0x270d09cb4be817c98e84feffde03d5cd45e30a27',
    name: 'Maki Finance',
    symbol: 'MAKI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12397/small/256x256_maki_logo.png?1599551429',
  },
  {
    chainId: 1,
    address: '0x6c4b85cab20c13af72766025f0e17e0fe558a553',
    name: 'YFFII Finance',
    symbol: 'YFFII',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12398/small/4hWupcq.jpg?1599553239',
  },
  {
    chainId: 1,
    address: '0xa17de0ab0a97bc5e56fa8b39ebfc81cc3f1f349e',
    name: 'DefiKing',
    symbol: 'DFK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12405/small/dfklogo.png?1599603745',
  },
  {
    chainId: 1,
    address: '0x0316eb71485b0ab14103307bf65a021042c6d380',
    name: 'Huobi BTC',
    symbol: 'HBTC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12407/small/Unknown-5.png?1599624896',
  },
  {
    chainId: 1,
    address: '0x3080ec2a6960432f179c66d388099a48e82e2047',
    name: 'Popcorn Token',
    symbol: 'CORN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12408/small/n425bUN.png?1599625062',
  },
  {
    chainId: 1,
    address: '0xff20817765cb7f73d4bde2e66e067e58d11095c2',
    name: 'Amp',
    symbol: 'AMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12409/small/amp-200x200.png?1599625397',
  },
  {
    chainId: 1,
    address: '0x5150956e082c748ca837a5dfa0a7c10ca4697f9c',
    name: 'Zeedex',
    symbol: 'ZDEX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12412/small/Untitled-design-4.png?1599647173',
  },
  {
    chainId: 1,
    address: '0x87047986e8e4961c11d2edcd94285e3a1331d97b',
    name: 'Yakuza DFO',
    symbol: 'YKZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12413/small/UeUSmpx.png?1601970433',
  },
  {
    chainId: 1,
    address: '0xcec2387e04f9815bf12670dbf6cf03bba26df25f',
    name: 'YFILEND FINANCE',
    symbol: 'YFILD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12414/small/ylend.png?1599684775',
  },
  {
    chainId: 1,
    address: '0x84294fc9710e1252d407d3d80a84bc39001bd4a8',
    name: 'Squirrel Finance',
    symbol: 'NUTS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12415/small/transparent_logo200.png?1599690422',
  },
  {
    chainId: 1,
    address: '0x601938988f0fdd937373ea185c33751462b1d194',
    name: 'Etherpay',
    symbol: 'ETHPY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12417/small/Captura-de-Tela-2020-09-09-a-s-13-54-20.png?1599692074',
  },
  {
    chainId: 1,
    address: '0x4208d8d500b1643dca98dd27ba6c0060bca311c5',
    name: 'Rebase',
    symbol: 'REBASE',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12420/small/rebase_logo.jpg?1599719177',
  },
  {
    chainId: 1,
    address: '0x86642d169db9f57a02c65052049cbbbfb3e3b08c',
    name: 'dRAY',
    symbol: 'DRAY',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12421/small/draylogo_200x200.png?1599727930',
  },
  {
    chainId: 1,
    address: '0x05fcc72cfb4150abae415c885f7a433ff523296f',
    name: 'YOKcoin',
    symbol: 'YOK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12425/small/YOKcoin_200x200.png?1599732314',
  },
  {
    chainId: 1,
    address: '0xc28e27870558cf22add83540d2126da2e4b464c2',
    name: 'Sashimi',
    symbol: 'SASHIMI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12427/small/SashimiSwap-200x200.png?1601347413',
  },
  {
    chainId: 1,
    address: '0x066798d9ef0833ccc719076dab77199ecbd178b0',
    name: 'SakeToken',
    symbol: 'SAKE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12428/small/sake.png?1599777402',
  },
  {
    chainId: 1,
    address: '0xb9464ef80880c5aea54c7324c0b8dd6ca6d05a90',
    name: 'LOCK Token',
    symbol: 'LOCK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12429/small/sherlock.jpg?1599780187',
  },
  {
    chainId: 1,
    address: '0x930ed81ad809603baf727117385d01f04354612e',
    name: 'Solarite',
    symbol: 'SOLARITE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12430/small/solarite_logo.jpg?1599785957',
  },
  {
    chainId: 1,
    address: '0x5d1b1019d0afa5e6cc047b9e78081d44cc579fc4',
    name: 'yfrb Finance',
    symbol: 'YFRB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12431/small/yfrb.png?1599786507',
  },
  {
    chainId: 1,
    address: '0x8eef5a82e6aa222a60f009ac18c24ee12dbf4b41',
    name: 'Tixl',
    symbol: 'TXL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12432/small/Tixl-Logo-200-transparent.png?1610248504',
  },
  {
    chainId: 1,
    address: '0x3b4caaaf6f3ce5bee2871c89987cbd825ac30822',
    name: 'OFIN TOKEN',
    symbol: 'ON',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12433/small/oin.png?1599796457',
  },
  {
    chainId: 1,
    address: '0xc9ce70a381910d0a90b30d408cc9c7705ee882de',
    name: 'Nyan Finance',
    symbol: 'NYAN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12434/small/Nyan_Logo_corrected1.png?1602429349',
  },
  {
    chainId: 1,
    address: '0x429881672b9ae42b8eba0e26cd9c73711b891ca5',
    name: 'Pickle Finance',
    symbol: 'PICKLE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12435/small/pickle_finance_logo.jpg?1599817746',
  },
  {
    chainId: 1,
    address: '0x5979f50f1d4c08f9a53863c2f39a7b0492c38d0f',
    name: 'pTokens LTC',
    symbol: 'PLTC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12436/small/pLTC_logo.png?1599819176',
  },
  {
    chainId: 1,
    address: '0x675e7d927af7e6d0082e0153dc3485b687a6f0ad',
    name: 'Creed Finance',
    symbol: 'CREED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12437/small/creed_finance_logo.jpg?1599840364',
  },
  {
    chainId: 1,
    address: '0x3a1c1d1c06be03cddc4d3332f7c20e1b37c97ce9',
    name: 'Vybe',
    symbol: 'VYBE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12438/small/22k5gGG.jpg?1609924524',
  },
  {
    chainId: 1,
    address: '0xea004e8fa3701b8e58e41b78d50996e0f7176cbd',
    name: 'yffc finance',
    symbol: 'YFFC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12439/small/yffc.png?1599868672',
  },
  {
    chainId: 1,
    address: '0x36f3fd68e7325a35eb768f1aedaae9ea0689d723',
    name: 'Empty Set Dollar',
    symbol: 'ESD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12440/small/esd_logo_circle.png?1603676421',
  },
  {
    chainId: 1,
    address: '0x68a3637ba6e75c0f66b61a42639c4e9fcd3d4824',
    name: 'MoonSwap',
    symbol: 'MOON',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12441/small/moon.jpg?1599880968',
  },
  {
    chainId: 1,
    address: '0x94939d55000b31b7808904a80aa7bab05ef59ed6',
    name: 'Jiaozi',
    symbol: 'JIAOZI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12442/small/JiaoziFarm.png?1599888576',
  },
  {
    chainId: 1,
    address: '0x488e0369f9bc5c40c002ea7c1fe4fd01a198801c',
    name: 'Golff',
    symbol: 'GOF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12445/small/_x-AmLBv_400x400.jpg?1599902833',
  },
  {
    chainId: 1,
    address: '0x5befbb272290dd5b8521d4a938f6c4757742c430',
    name: 'Xfinance',
    symbol: 'XFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12449/small/go.png?1599904281',
  },
  {
    chainId: 1,
    address: '0x6c5ba91642f10282b576d91922ae6448c9d52f4e',
    name: 'Phala Network',
    symbol: 'PHA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12451/small/phala.png?1600061318',
  },
  {
    chainId: 1,
    address: '0xd0c59798f986d333554688cd667033d469c2398e',
    name: 'Ymen Finance',
    symbol: 'YMEN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12452/small/logoymen.png?1603008881',
  },
  {
    chainId: 1,
    address: '0x7968bc6a03017ea2de509aaa816f163db0f35148',
    name: 'Hedget',
    symbol: 'HGET',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12453/small/Hedget.png?1599944809',
  },
  {
    chainId: 1,
    address: '0x584bc13c7d411c00c01a62e8019472de68768430',
    name: 'Hegic',
    symbol: 'HEGIC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12454/small/Hegic.png?1599938210',
  },
  {
    chainId: 1,
    address: '0x69692d3345010a207b759a7d1af6fc7f38b35c5e',
    name: 'CHADS VC',
    symbol: 'CHADS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12455/small/Chad_VC.png?1599940044',
  },
  {
    chainId: 1,
    address: '0x7a545ed3863221a974f327199ac22f7f12535f11',
    name: 'Baguette Token',
    symbol: 'BGTT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12456/small/baguette_logo.png?1599945036',
  },
  {
    chainId: 1,
    address: '0xc3771d47e2ab5a519e2917e61e23078d0c05ed7f',
    name: 'Gather',
    symbol: 'GTH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12458/small/Gather-Logo-Working-File.png?1599981686',
  },
  {
    chainId: 1,
    address: '0x4086692d53262b2be0b13909d804f0491ff6ec3e',
    name: 'Yield Farming Known',
    symbol: 'YFKA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12459/small/5f5cfce7b7b794f5e1e4c6b5_logo200.jpg?1599982854',
  },
  {
    chainId: 1,
    address: '0x1f6bd8766f8a8aa58f7441c8dd3709afa3a56202',
    name: 'Zyro',
    symbol: 'ZYRO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12460/small/ZgY3lJY19Nljpd5T3SMuNMhyW3eVVufukR5_BMUaOXnofn33hGUIc1PkOPyoCLi-UEtW5ZmotNVqva-qIj2dcRBTFOcas4fmGXrGqsFB22BIHoS7AHap8VsuAw3fu3RrR2Ckx4BWGu1kRF8VH7sot1fcQ4db0K91blRzz2i6drL9ivir9S9iraMl39xgHOATYYA5rWHOIXaS_0c.jpg?1599983652',
  },
  {
    chainId: 1,
    address: '0x9a7a4c141a3bcce4a31e42c1192ac6add35069b4',
    name: 'Momentum',
    symbol: 'XMM',
    decimals: 10,
    logoURI:
      'https://assets.coingecko.com/coins/images/12461/small/logo-transparent-200.png?1600007183',
  },
  {
    chainId: 1,
    address: '0x7031ab87dcc46818806ec07af46fa8c2ad2a2bfc',
    name: 'Tribute',
    symbol: 'TRBT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12463/small/Tribute_Coin-04.png?1600034100',
  },
  {
    chainId: 1,
    address: '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b',
    name: 'DeFiPulse Index',
    symbol: 'DPI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12465/small/defi_pulse_index_set.png?1600051053',
  },
  {
    chainId: 1,
    address: '0x5c4ac68aac56ebe098d621cd8ce9f43270aaa355',
    name: 'bXIOT',
    symbol: 'BXIOT',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12466/small/bxiot_logo_512x512.png?1601775151',
  },
  {
    chainId: 1,
    address: '0x3f382dbd960e3a9bbceae22651e88158d2791550',
    name: 'Aavegotchi',
    symbol: 'GHST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12467/small/ghst_200.png?1600750321',
  },
  {
    chainId: 1,
    address: '0x1a231e75538a931c395785ef5d1a5581ec622b0e',
    name: 'Zoom Protocol',
    symbol: 'ZOM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12468/small/zoom_protocol_logo.jpeg?1600098680',
  },
  {
    chainId: 1,
    address: '0x0746b8cb6dd33134baf0ead66146f442c098b42e',
    name: 'HaloOracle',
    symbol: 'HALO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12469/small/1_-6YxpHv34QNEAAIp-vKYxA.jpeg?1600116457',
  },
  {
    chainId: 1,
    address: '0xe6410569602124506658ff992f258616ea2d4a3d',
    name: 'Katana Finance',
    symbol: 'KATANA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12473/small/AyHMMbK.jpeg?1600124081',
  },
  {
    chainId: 1,
    address: '0x90f62b96a62801488b151ff3c65eac5fae21a962',
    name: 'GemSwap',
    symbol: 'GEM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12474/small/gem.png?1600124318',
  },
  {
    chainId: 1,
    address: '0xf5d0fefaab749d8b14c27f0de60cc6e9e7f848d1',
    name: 'YFARM Token',
    symbol: 'YFARM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12475/small/yffs.jpg?1600136951',
  },
  {
    chainId: 1,
    address: '0xa91ac63d040deb1b7a5e4d4134ad23eb0ba07e14',
    name: 'Bella Protocol',
    symbol: 'BEL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12478/small/Bella.png?1602230054',
  },
  {
    chainId: 1,
    address: '0xf8c3527cc04340b208c854e985240c02f7b7793f',
    name: 'Frontier',
    symbol: 'FRONT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12479/small/frontier_logo.png?1600145472',
  },
  {
    chainId: 1,
    address: '0xb05af453011d7ad68a92b0065ffd9d1277ed2741',
    name: 'Team Finance',
    symbol: 'TEAM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12480/small/team_token_logo.jpg?1600158847',
  },
  {
    chainId: 1,
    address: '0xd03b6ae96cae26b743a6207dcee7cbe60a425c70',
    name: 'UniDexBot',
    symbol: 'UNDB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12481/small/logo_128.png?1601814643',
  },
  {
    chainId: 1,
    address: '0xf2da15ae6ef94988534bad4b9e646f5911cbd487',
    name: 'Fame',
    symbol: 'FAME',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12491/small/tEXH2Dz0_400x400.jpg?1600209124',
  },
  {
    chainId: 1,
    address: '0x15d4c048f83bd7e37d49ea4c83a07267ec4203da',
    name: 'Gala',
    symbol: 'GALA',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12493/small/GALA-COINGECKO.png?1600233435',
  },
  {
    chainId: 1,
    address: '0xfef3bef71a5eb97e097039038776fd967ae5b106',
    name: 'YFMoonshot',
    symbol: 'YFMS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12496/small/yfmoonshot_logo.jpg?1600266768',
  },
  {
    chainId: 1,
    address: '0x54b8c98268da0055971652a95f2bfd3a9349a38c',
    name: 'Printer Finance',
    symbol: 'PRINT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12497/small/moneyprinter_anm.png?1600499835',
  },
  {
    chainId: 1,
    address: '0x4690d8f53e0d367f5b68f7f571e6eb4b72d39ace',
    name: 'WinPlay',
    symbol: 'WNRZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12498/small/winplay.png?1600279162',
  },
  {
    chainId: 1,
    address: '0xc0e47007e084eef3ee58eb33d777b3b4ca98622f',
    name: 'StarDEX',
    symbol: 'XSTAR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12500/small/token_icon.png?1600296899',
  },
  {
    chainId: 1,
    address: '0x88ef27e69108b2633f8e1c184cc37940a075cc02',
    name: 'Dego Finance',
    symbol: 'DEGO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12503/small/c185FKx.png?1600298167',
  },
  {
    chainId: 1,
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    name: 'Uniswap',
    symbol: 'UNI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
  },
  {
    chainId: 1,
    address: '0xbc16da9df0a22f01a16bc0620a27e7d6d6488550',
    name: 'Percent',
    symbol: 'PCT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12505/small/1*T5u1FDg9LLpvHifwr4WCwQ.png?1600310998',
  },
  {
    chainId: 1,
    address: '0x1efb2286bf89f01488c6b2a22b2556c0f45e972b',
    name: 'Moon YFI',
    symbol: 'MYFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12506/small/moonyfi_logo.jpg?1600316838',
  },
  {
    chainId: 1,
    address: '0x06ff1a3b08b63e3b2f98a5124bfc22dc0ae654d3',
    name: 'Atlas',
    symbol: 'KASSIAHOTEL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12507/small/KassiaHotelLogo.png?1600318010',
  },
  {
    chainId: 1,
    address: '0xca1207647ff814039530d7d35df0e1dd2e91fa84',
    name: 'dHEDGE DAO',
    symbol: 'DHT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12508/small/dht.png?1600752201',
  },
  {
    chainId: 1,
    address: '0x3e9bc21c9b189c09df3ef1b824798658d5011937',
    name: 'Linear',
    symbol: 'LINA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12509/small/linear.jpg?1606884470',
  },
  {
    chainId: 1,
    address: '0xdea67845a51e24461d5fed8084e69b426af3d5db',
    name: 'HodlTree',
    symbol: 'HTRE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12511/small/htre.jpg?1600373697',
  },
  {
    chainId: 1,
    address: '0x8ef47555856f6ce2e0cd7c36aef4fab317d2e2e2',
    name: 'PayAccept',
    symbol: 'PAYT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12513/small/logo.png?1603801944',
  },
  {
    chainId: 1,
    address: '0xf3281c539716a08c754ec4c8f2b4cee0fab64bb9',
    name: 'Markaccy',
    symbol: 'MKCY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12522/small/e2eLPzTF_400x400.png?1600499534',
  },
  {
    chainId: 1,
    address: '0x1d37986f252d0e349522ea6c3b98cb935495e63e',
    name: 'ChartEx',
    symbol: 'CHART',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12523/small/chartex.png?1600499406',
  },
  {
    chainId: 1,
    address: '0x3b58c52c03ca5eb619eba171091c86c34d603e5f',
    name: 'MCI Coin',
    symbol: 'MCI',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12524/small/mcicoin-logo.png?1600471686',
  },
  {
    chainId: 1,
    address: '0x49e833337ece7afe375e44f4e3e8481029218e5c',
    name: 'Value Liquidity',
    symbol: 'VALUE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12525/small/value_logo_-_500x500.png?1601478115',
  },
  {
    chainId: 1,
    address: '0x6f3009663470475f0749a6b76195375f95495fcb',
    name: 'Hatch DAO',
    symbol: 'HATCH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12526/small/hatch-dao.jpg?1600480488',
  },
  {
    chainId: 1,
    address: '0x53378825d95281737914a8a2ac0e5a9304ae5ed7',
    name: 'Samurai',
    symbol: 'SAM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12529/small/UkWCWt1.png?1600495292',
  },
  {
    chainId: 1,
    address: '0x0aacfbec6a24756c20d41914f2caba817c0d8521',
    name: 'YAM',
    symbol: 'YAM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12530/small/YAM-icon.png?1600495536',
  },
  {
    chainId: 1,
    address: '0xcad2d4c4469ff09ab24d02a63bcedfcd44be0645',
    name: 'Crypto Accept',
    symbol: 'ACPT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12531/small/crypto-accept.png?1600497829',
  },
  {
    chainId: 1,
    address: '0x0ef3b2024ae079e6dbc2b37435ce30d2731f0101',
    name: 'UNIFI DeFi',
    symbol: 'UNIFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12533/small/unifi_defi_logo.jpg?1600531278',
  },
  {
    chainId: 1,
    address: '0x062f90480551379791fbe2ed74c1fe69821b30d3',
    name: 'YMAX',
    symbol: 'YMAX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12535/small/Jec_HMyy_400x400.png?1600555787',
  },
  {
    chainId: 1,
    address: '0x37e808f084101f75783612407e7c3f5f92d8ee3f',
    name: 'RI Token',
    symbol: 'RI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12536/small/Ri_logo_512x512.png?1601775196',
  },
  {
    chainId: 1,
    address: '0x579353231f3540b218239774422962c64a3693e7',
    name: 'Bitcratic Revenue',
    symbol: 'BCTR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12537/small/BCTR.png?1600557934',
  },
  {
    chainId: 1,
    address: '0x3b62f3820e0b035cc4ad602dece6d796bc325325',
    name: 'DEUS Finance',
    symbol: 'DEUS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12539/small/deus_logo.jpg?1600572115',
  },
  {
    chainId: 1,
    address: '0x3b544e6fcf6c8dce9d8b45a4fdf21c9b02f9fda9',
    name: 'Giftedhands',
    symbol: 'GHD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12540/small/K-8uHktJ.png?1600644856',
  },
  {
    chainId: 1,
    address: '0x9b06d48e0529ecf05905ff52dd426ebec0ea3011',
    name: 'XSwap',
    symbol: 'XSP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12541/small/256x256_%282%29.png?1600645409',
  },
  {
    chainId: 1,
    address: '0x3b78dc5736a49bd297dd2e4d62daa83d35a22749',
    name: 'Finswap',
    symbol: 'FNSP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12542/small/finswap-orange-200x200-1.png?1600663987',
  },
  {
    chainId: 1,
    address: '0x44001a5656baafa5a3359ced8fa38e150a71eea2',
    name: 'VN Finance',
    symbol: 'VFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12543/small/VFI200.png?1600664014',
  },
  {
    chainId: 1,
    address: '0x3f09400313e83d53366147e3ea0e4e2279d80850',
    name: 'Kush Finance',
    symbol: 'KSEED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12545/small/kush.finance-512.png?1600844515',
  },
  {
    chainId: 1,
    address: '0x7afb39837fd244a651e4f0c5660b4037214d4adf',
    name: 'Soda Token',
    symbol: 'SODA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12546/small/soda.acd4d701.png?1600671234',
  },
  {
    chainId: 1,
    address: '0x5322a3556f979ce2180b30e689a9436fddcb1021',
    name: 'yTSLA Finance',
    symbol: 'YTSLA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12547/small/YTSLA_%284%29.png?1600740522',
  },
  {
    chainId: 1,
    address: '0x685aea4f02e39e5a5bb7f7117e88db1151f38364',
    name: 'Shill',
    symbol: 'POSH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12548/small/alone.png?1600676559',
  },
  {
    chainId: 1,
    address: '0x32a7c02e79c4ea1008dd6564b35f131428673c41',
    name: 'Crust Network',
    symbol: 'CRU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12549/small/sAB3KVzD_400x400.jpg?1600680411',
  },
  {
    chainId: 1,
    address: '0xa117ea1c0c85cef648df2b6f40e50bb5475c228d',
    name: 'Ducato Protocol Tok',
    symbol: 'DUCATO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12550/small/70691538.png?1600680832',
  },
  {
    chainId: 1,
    address: '0xf0a0f3a6fa6bed75345171a5ea18abcadf6453ba',
    name: 'Yearn Finance Bit',
    symbol: 'YFBT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12551/small/logo-200x200.png?1600681308',
  },
  {
    chainId: 1,
    address: '0x0b342c51d1592c41068d5d4b4da4a68c0a04d5a4',
    name: 'OneSwap DAO Token',
    symbol: 'ONES',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12552/small/logo.png?1600682344',
  },
  {
    chainId: 1,
    address: '0xc6bf2a2a43ca360bb0ec6770f57f77cdde64bb3f',
    name: 'UnityDAO',
    symbol: 'UTY',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12553/small/UTY_LOGO.png?1600734985',
  },
  {
    chainId: 1,
    address: '0xa4f779074850d320b5553c9db5fc6a8ab15bd34a',
    name: 'YFIX finance',
    symbol: 'YFIX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12554/small/yfix-icon-200.png?1600739144',
  },
  {
    chainId: 1,
    address: '0x46f4e420c75401494a39b70653f4bbb88ad2d728',
    name: 'WenBurn',
    symbol: 'WENB',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12557/small/moonOnFire.jpg?1600746273',
  },
  {
    chainId: 1,
    address: '0x4cc84b41ececc387244512242eec226eb7948a92',
    name: 'Kassia Home',
    symbol: 'KASSIAHOME',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12558/small/farmer.4e48cd5b.png?1600899057',
  },
  {
    chainId: 1,
    address: '0xd04785c4d8195e4a54d9dec3a9043872875ae9e2',
    name: 'Rotten',
    symbol: 'ROT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12560/small/rot_logo.png?1600762626',
  },
  {
    chainId: 1,
    address: '0x73ee6d7e6b203125add89320e9f343d65ec7c39a',
    name: 'Axioms',
    symbol: 'AXI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12562/small/axioms_logo.png?1600772415',
  },
  {
    chainId: 1,
    address: '0x889efb523cc39590b8483eb9491890ac71407f64',
    name: 'Moon Juice',
    symbol: 'JUICE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12564/small/-TMHqn9S_400x400.jpg?1600899021',
  },
  {
    chainId: 1,
    address: '0x9d47894f8becb68b9cf3428d256311affe8b068b',
    name: 'Rope',
    symbol: 'ROPE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12567/small/Rope_Icon.jpg?1604038203',
  },
  {
    chainId: 1,
    address: '0xe63684bcf2987892cefb4caa79bd21b34e98a291',
    name: 'Chicken',
    symbol: 'KFC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12569/small/download.png?1600840301',
  },
  {
    chainId: 1,
    address: '0xde201daec04ba73166d9917fdf08e1728e270f06',
    name: 'MOJI Experience Poi',
    symbol: 'MEXP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12571/small/mexp_logo.png?1600842788',
  },
  {
    chainId: 1,
    address: '0x9cd39da8f25ec50cf2ee260e464ac23ea23f6bb0',
    name: 'Toshify finance',
    symbol: 'YFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12574/small/QskdLwuY_400x400.png?1600899144',
  },
  {
    chainId: 1,
    address: '0x0e9b56d2233ea2b5883861754435f9c51dbca141',
    name: 'Rare Pepe',
    symbol: 'RPEPE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12575/small/rare_pepe_logo.png?1600856124',
  },
  {
    chainId: 1,
    address: '0xe09216f1d343dd39d6aa732a08036fee48555af0',
    name: 'Contribute',
    symbol: 'TRIB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12576/small/New_logo_circle.png?1604214723',
  },
  {
    chainId: 1,
    address: '0xab7aaf9e485a3bc885985184abe9fc6aba727bd6',
    name: 'MANY',
    symbol: 'MANY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12577/small/MANY_logo_NoBanksNearby.png?1601347315',
  },
  {
    chainId: 1,
    address: '0x8be6a6158f6b8a19fe60569c757d16e546c2296d',
    name: 'YFF Finance',
    symbol: 'YFF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12578/small/5ymP5emT_400x400.jpg?1600913790',
  },
  {
    chainId: 1,
    address: '0x042afd3869a47e2d5d42cc787d5c9e19df32185f',
    name: 'Hotpot Base Token',
    symbol: 'POT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12580/small/hotpot.f49fb832.png?1600916677',
  },
  {
    chainId: 1,
    address: '0x81313f7c5c9c824236c9e4cba3ac4b049986e756',
    name: 'HippoFinance',
    symbol: 'HIPPO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12581/small/chef.50555ea1.png?1600922357',
  },
  {
    chainId: 1,
    address: '0xf7e04d8a32229b4ca63aa51eea9979c7287fea48',
    name: 'Beowulf',
    symbol: 'BWF',
    decimals: 5,
    logoURI:
      'https://assets.coingecko.com/coins/images/12586/small/BWF.png?1600932145',
  },
  {
    chainId: 1,
    address: '0xef8ba8cba86f81b3108f60186fce9c81b5096d5c',
    name: 'YFII Gold',
    symbol: 'YFIIG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12587/small/yfiigold_logo.png?1600937694',
  },
  {
    chainId: 1,
    address: '0x2a8e1e676ec238d8a992307b495b45b3feaa5e86',
    name: 'Origin Dollar',
    symbol: 'OUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12589/small/ousd-logo-200x200.png?1600943287',
  },
  {
    chainId: 1,
    address: '0xc57d533c50bc22247d49a368880fb49a1caa39f7',
    name: 'PowerTrade Fuel',
    symbol: 'PTF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12590/small/powertrade_logo.jpg?1600944549',
  },
  {
    chainId: 1,
    address: '0x7d36cce46dd2b0d28dde12a859c2ace4a21e3678',
    name: 'Combine finance',
    symbol: 'COMB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12592/small/combine_finance_logo.jpg?1602417055',
  },
  {
    chainId: 1,
    address: '0x3ac2ab91ddf57e2385089202ca221c360ced0062',
    name: 'SwapShip',
    symbol: 'SWSH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12593/small/SwapShip.png?1600975182',
  },
  {
    chainId: 1,
    address: '0x7240ac91f01233baaf8b064248e80feaa5912ba3',
    name: 'OctoFi',
    symbol: 'OCTO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12594/small/octofi_logo.png?1600994674',
  },
  {
    chainId: 1,
    address: '0x174897edd3ce414084a009d22db31c7b7826400d',
    name: 'JOON',
    symbol: 'JOON',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12595/small/logo.png?1600995905',
  },
  {
    chainId: 1,
    address: '0x25e1474170c4c0aa64fa98123bdc8db49d7802fa',
    name: 'Bidao',
    symbol: 'BID',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12596/small/bidao.png?1600996485',
  },
  {
    chainId: 1,
    address: '0x44ea84a85616f8e9cd719fc843de31d852ad7240',
    name: 'NO Trump Augur Pred',
    symbol: 'NTRUMP',
    decimals: 15,
    logoURI:
      'https://assets.coingecko.com/coins/images/12597/small/nX10wsB.png?1600997655',
  },
  {
    chainId: 1,
    address: '0x3af375d9f77ddd4f16f86a5d51a9386b7b4493fa',
    name: 'YES Trump Augur Pre',
    symbol: 'YTRUMP',
    decimals: 15,
    logoURI:
      'https://assets.coingecko.com/coins/images/12598/small/yes.png?1600997679',
  },
  {
    chainId: 1,
    address: '0x5913d0f34615923552ee913dbe809f9f348e706e',
    name: 'BMJ Master Nodes',
    symbol: 'BMJ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12601/small/200.png?1601001633',
  },
  {
    chainId: 1,
    address: '0x213c53c96a01a89e6dcc5683cf16473203e17513',
    name: 'Defi Shopping Stake',
    symbol: 'DSS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12602/small/DSS.png?1601002204',
  },
  {
    chainId: 1,
    address: '0x5d762f76b9e91f71cc4f94391bdfe6333db8519c',
    name: 'IYF finance',
    symbol: 'IYF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12603/small/MenqcTv.png?1601006342',
  },
  {
    chainId: 1,
    address: '0x825130aa1beef07bdf4f389705321816d05b0d0f',
    name: 'UNII Finance',
    symbol: 'UNII',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12604/small/P3KzPgJ9_400x400.jpg?1601013005',
  },
  {
    chainId: 1,
    address: '0x8a6aca71a218301c7081d4e96d64292d3b275ce0',
    name: 'S Finance',
    symbol: 'SFG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12605/small/Z7D8B4b.png?1605346184',
  },
  {
    chainId: 1,
    address: '0x3a8cccb969a61532d1e6005e2ce12c200caece87',
    name: 'TitanSwap',
    symbol: 'TITAN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12606/small/nqGlQzdz_400x400.png?1601019805',
  },
  {
    chainId: 1,
    address: '0x250a3500f48666561386832f1f1f1019b89a2699',
    name: 'SAFE2',
    symbol: 'SAFE2',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12608/small/safe2.jpg?1601259102',
  },
  {
    chainId: 1,
    address: '0xbf06035c31386d0d024895a97d0cc6ef6884854f',
    name: 'Fanta Finance',
    symbol: 'FANTA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12612/small/LOGOFANTA.png?1601241841',
  },
  {
    chainId: 1,
    address: '0xecbf566944250dde88322581024e611419715f7a',
    name: 'xBTC',
    symbol: 'XBTC',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12613/small/Y3ZxUNM.png?1601242661',
  },
  {
    chainId: 1,
    address: '0xe2b8c4938a3103c1ab5c19a6b93d07ab6f9da2ba',
    name: 'Convertible ACXT',
    symbol: 'CACXT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12615/small/ACDX_Original_05.png?1601262530',
  },
  {
    chainId: 1,
    address: '0x78175901e9b04090bf3b3d3cb7f91ca986fb1af6',
    name: 'Antique Zombie Shar',
    symbol: 'ZOMB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12617/small/cryptopunks-zomb.png?1602398280',
  },
  {
    chainId: 1,
    address: '0x6369c3dadfc00054a42ba8b2c09c48131dd4aa38',
    name: 'Morpher',
    symbol: 'MPH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12619/small/morpher_200_200.png?1601524084',
  },
  {
    chainId: 1,
    address: '0xb1dc9124c395c1e97773ab855d66e879f053a289',
    name: 'yAxis',
    symbol: 'YAX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12620/small/Logo.png?1608310944',
  },
  {
    chainId: 1,
    address: '0xb48e0f69e6a3064f5498d495f77ad83e0874ab28',
    name: 'CXN Network',
    symbol: 'CXN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12622/small/Webp.net-resizeimage.png?1601282522',
  },
  {
    chainId: 1,
    address: '0xaf9f549774ecedbd0966c52f250acc548d3f36e5',
    name: 'RioDeFi',
    symbol: 'RFUEL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12623/small/RFUEL_SQR.png?1602481093',
  },
  {
    chainId: 1,
    address: '0x9b62ec1453cea5dde760aaf662048ca6eeb66e7f',
    name: 'Consensus Cell Netw',
    symbol: 'ECELL',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/12624/small/98201030_131705818496610_9196703627136204800_n.jpg?1601283839',
  },
  {
    chainId: 1,
    address: '0x73a9fb46e228628f8f9bb9004eca4f4f529d3998',
    name: 'Wrapped LEO',
    symbol: 'WLEO',
    decimals: 3,
    logoURI:
      'https://assets.coingecko.com/coins/images/12626/small/4XfO3w3.png?1601286769',
  },
  {
    chainId: 1,
    address: '0xb1f66997a5760428d3a87d68b90bfe0ae64121cc',
    name: 'Lua Token',
    symbol: 'LUA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12627/small/Screenshot_2020-09-28_at_6.24.59_PM.jpg?1601288721',
  },
  {
    chainId: 1,
    address: '0x4be40bc9681d0a7c24a99b4c92f85b9053fc2a45',
    name: 'Dify Finance',
    symbol: 'YFIII',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12628/small/zNTAjrF.png?1601294851',
  },
  {
    chainId: 1,
    address: '0xa4eed63db85311e22df4473f87ccfc3dadcfa3e3',
    name: 'Rubic',
    symbol: 'RBC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12629/small/200x200.png?1607952509',
  },
  {
    chainId: 1,
    address: '0xb2c822a1b923e06dbd193d2cfc7ad15388ea09dd',
    name: 'Vampire Protocol',
    symbol: 'VAMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12630/small/vampire.jpeg?1601335717',
  },
  {
    chainId: 1,
    address: '0xf4a81c18816c9b0ab98fac51b36dcb63b0e58fde',
    name: 'YieldWars',
    symbol: 'WAR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12633/small/121169136_333321361293975_7238588238572942050_n.png?1602551929',
  },
  {
    chainId: 1,
    address: '0x5f64ab1544d28732f0a24f4713c2c8ec0da089f0',
    name: 'DEXTF',
    symbol: 'DEXTF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12634/small/DEXTFiconNEGATIVE-page-001.jpg?1601349042',
  },
  {
    chainId: 1,
    address: '0x62359ed7505efc61ff1d56fef82158ccaffa23d7',
    name: 'cVault finance',
    symbol: 'CORE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12635/small/cvault.finance_logo.png?1601353499',
  },
  {
    chainId: 1,
    address: '0x212dd60d4bf0da8372fe8116474602d429e5735f',
    name: 'Stobox Token',
    symbol: 'STBU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12637/small/logo200x200.png?1601363179',
  },
  {
    chainId: 1,
    address: '0x87c00817abe35ed4c093e59043fae488238d2f74',
    name: 'Yoink',
    symbol: 'YNK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12639/small/yoin_logo.png?1601368710',
  },
  {
    chainId: 1,
    address: '0x05d27cdd23e22ca63e7f9c7c6d1b79ede9c4fcf5',
    name: 'Yearn Finance Passi',
    symbol: 'YFPI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12640/small/200.png?1601369185',
  },
  {
    chainId: 1,
    address: '0x5df94780f00140fe72d239d0d261f7797e3fbd1b',
    name: 'QChi Chain',
    symbol: 'QHC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12642/small/logo.png?1601370470',
  },
  {
    chainId: 1,
    address: '0x33811d4edbcaed10a685254eb5d3c4e4398520d2',
    name: 'YFE Money',
    symbol: 'YFE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12644/small/logo-round.png?1601373377',
  },
  {
    chainId: 1,
    address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    name: 'Aave',
    symbol: 'AAVE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12645/small/AAVE.png?1601374110',
  },
  {
    chainId: 1,
    address: '0x05d3606d5c81eb9b7b18530995ec9b29da05faba',
    name: 'TomoChain ERC 20',
    symbol: 'TOMOE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12646/small/tomoe_logo.png?1601377449',
  },
  {
    chainId: 1,
    address: '0xd6d3608f2d770d0a8d0da62d7afe21ea1da86d9c',
    name: 'AmericanHorror Fina',
    symbol: 'AHF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12647/small/KBakm0K.jpg?1601386376',
  },
  {
    chainId: 1,
    address: '0x83e6f1e41cdd28eaceb20cb649155049fac3d5aa',
    name: 'Polkastarter',
    symbol: 'POLS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12648/small/polkastarter.png?1609813702',
  },
  {
    chainId: 1,
    address: '0x8feef860e9fa9326ff9d7e0058f637be8579cc29',
    name: 'Timers',
    symbol: 'IPM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12649/small/logo200x200_%282%29.png?1601421807',
  },
  {
    chainId: 1,
    address: '0x2e6e152d29053b6337e434bc9be17504170f8a5b',
    name: 'Yearn Finance Ecosy',
    symbol: 'YFIEC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12650/small/pypIqcG.jpg?1601431822',
  },
  {
    chainId: 1,
    address: '0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd',
    name: 'DODO',
    symbol: 'DODO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12651/small/dodo_logo.png?1601433025',
  },
  {
    chainId: 1,
    address: '0x7b0f66fa5cf5cc28280c1e7051af881e06579362',
    name: 'YFarmLand Token',
    symbol: 'YFARMER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12652/small/yfarmer.png?1601435163',
  },
  {
    chainId: 1,
    address: '0x41bc0913ed789428e107c4ea9ed007815c5a8230',
    name: 'Kompass',
    symbol: 'KOMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12655/small/kompass_symbol.png?1601436438',
  },
  {
    chainId: 1,
    address: '0x152687bc4a7fcc89049cf119f9ac3e5acf2ee7ef',
    name: 'DeltaHub Community',
    symbol: 'DHC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12656/small/DHC_Transparent_200x200.png?1601440150',
  },
  {
    chainId: 1,
    address: '0x41523a22144f3d129dddf1e9a549333148d0c37d',
    name: 'CryptoPunk  3831 Sh',
    symbol: 'COZOM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12659/small/unnamed_%281%29.png?1601446454',
  },
  {
    chainId: 1,
    address: '0xca76baa777d749de63ca044853d22d56bc70bb47',
    name: 'Fiscus FYI',
    symbol: 'FFYI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12663/small/FFYI.png?1601450423',
  },
  {
    chainId: 1,
    address: '0xefc1c73a3d8728dc4cf2a18ac5705fe93e5914ac',
    name: 'MetricExchange',
    symbol: 'METRIC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12664/small/metric_exchange_logo.png?1601453711',
  },
  {
    chainId: 1,
    address: '0x209c1808febf6c1ab7c65764bb61ad67d3923fcc',
    name: 'APEcoin',
    symbol: 'APE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12665/small/apecoin_logo.jpg?1601459267',
  },
  {
    chainId: 1,
    address: '0x8e57c27761ebbd381b0f9d09bb92ceb51a358abb',
    name: 'extraDNA',
    symbol: 'XDNA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12667/small/Logo_coin_black.png?1601463830',
  },
  {
    chainId: 1,
    address: '0x61bc1f530ac6193d73af1e1a6a14cb44b9c3f915',
    name: 'Pajama Finance',
    symbol: 'PJM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12669/small/pajama200.png?1601501914',
  },
  {
    chainId: 1,
    address: '0xeed9e4f2450035d6426276a8aa2084966ee3b1bb',
    name: 'Steaks Finance',
    symbol: 'STEAK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12672/small/MtZuJ_Gq6mqy4BaGacnKNMKmviA1xeDWg2wUiPMqZ-1MzfSiTiAbEzfclWWsU4FF3QxYJcrs5ia_DSWAvdwNYbROJEkm-UK9mZRBPK_z61JciH4XhqMEDpYParjxnkEDqIoobaGaW9bOzPPN_YYHYcv0A1LxjnzdPZF47ZigVuAoOa46YZNFJ_IkM-e-Cuf_-XCpbS2EtbMYvCEhbSuzrI.jpg?1601518956',
  },
  {
    chainId: 1,
    address: '0xd0658324074d6249a51876438916f7c423075451',
    name: 'Yearn Land',
    symbol: 'YLAND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12673/small/SXMzvraK_400x400.jpg?1601522909',
  },
  {
    chainId: 1,
    address: '0x326caf6980d4e9161cfb3c55f195b3d825c266d4',
    name: 'BullionsChain',
    symbol: 'BLC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12674/small/transparent1.png?1601523923',
  },
  {
    chainId: 1,
    address: '0xc22b30e4cce6b78aaaadae91e44e73593929a3e9',
    name: 'RAC',
    symbol: 'RAC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12675/small/rac_logo_%281%29.jpg?1601526417',
  },
  {
    chainId: 1,
    address: '0x14eb60f5f270b059b0c788de0ddc51da86f8a06d',
    name: 'Phantasma Energy',
    symbol: 'KCAL',
    decimals: 10,
    logoURI:
      'https://assets.coingecko.com/coins/images/12678/small/kcal-logo-coingecko.png?1602063865',
  },
  {
    chainId: 1,
    address: '0xed7fa212e100dfb3b13b834233e4b680332a3420',
    name: 'Street Cred',
    symbol: 'CRED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12680/small/cred_logo.png?1601611472',
  },
  {
    chainId: 1,
    address: '0xa47c8bf37f92abed4a126bda807a7b7498661acd',
    name: 'TerraUSD',
    symbol: 'UST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12681/small/UST.png?1601612407',
  },
  {
    chainId: 1,
    address: '0x7afac1d878c66a47263dce57976c371ae2e74882',
    name: 'YFMoonBeam',
    symbol: 'YFMB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12682/small/yuqS66I.png?1601619725',
  },
  {
    chainId: 1,
    address: '0x38acefad338b870373fb8c810fe705569e1c7225',
    name: 'Yearn4 Finance',
    symbol: 'YF4',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12683/small/yearn4logo.png?1601621780',
  },
  {
    chainId: 1,
    address: '0x1b7c4d4f226ccf3211b0f99c4fdfb84a2606bf8e',
    name: 'Orb V2',
    symbol: 'ORB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12686/small/favicon_%281%29.png?1601630265',
  },
  {
    chainId: 1,
    address: '0x68496ee825dafe1cf66d4083f776b9eaab31e447',
    name: 'ErcauX',
    symbol: 'RAUX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12687/small/raux_logo.jpeg?1601633375',
  },
  {
    chainId: 1,
    address: '0xb1191f691a355b43542bea9b8847bc73e7abb137',
    name: 'Kirobo',
    symbol: 'KIRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12688/small/QmScxyKBwqbGJZmp38EwaoRpXbzPkq3tvuMjeuJE1YLZeG.png?1601672684',
  },
  {
    chainId: 1,
    address: '0x3383c5a8969dc413bfddc9656eb80a1408e4ba20',
    name: 'Wrapped ANATHA',
    symbol: 'WANATHA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12690/small/CrZ8h9FV_400x400.png?1601678935',
  },
  {
    chainId: 1,
    address: '0x8901bed88a57db0eae2bb87d72ced14c6c91164b',
    name: 'YFI Product Token',
    symbol: 'YFIP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12691/small/YFI_LOGO_TRANSPERANT.png?1604466364',
  },
  {
    chainId: 1,
    address: '0x98a90499b62ae48e151a66b0f647570b5a473b1c',
    name: 'ZAC Finance',
    symbol: 'ZAC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12692/small/zaclogo200.png?1601693830',
  },
  {
    chainId: 1,
    address: '0xad32a8e6220741182940c5abf610bde99e737b2d',
    name: 'PieDAO DOUGH v2',
    symbol: 'DOUGH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12693/small/DOUGH2v.png?1602655308',
  },
  {
    chainId: 1,
    address: '0x26cf82e4ae43d31ea51e72b663d26e26a75af729',
    name: 'Moonbase',
    symbol: 'MBBASED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12694/small/mb-logo.png?1601715131',
  },
  {
    chainId: 1,
    address: '0x2216e873ea4282ebef7a02ac5aea220be6391a7c',
    name: 'smol',
    symbol: 'SMOL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12695/small/blockfolio-gecko-smol-clean-up.png?1601867705',
  },
  {
    chainId: 1,
    address: '0x8da25b8ed753a5910013167945a676921e864436',
    name: 'Bellevue Network',
    symbol: 'BLV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12697/small/BLV-200x200-1.png?1601825641',
  },
  {
    chainId: 1,
    address: '0xbd05cee8741100010d8e93048a80ed77645ac7bf',
    name: 'Cyclops Treasure',
    symbol: 'CYTR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12698/small/Untitled-design-9-removebg-preview.png?1601855912',
  },
  {
    chainId: 1,
    address: '0xcf9c692f7e62af3c571d4173fd4abf9a3e5330d0',
    name: 'Onigiri',
    symbol: 'ONIGIRI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12699/small/onigiri-coingecko.png?1601857724',
  },
  {
    chainId: 1,
    address: '0xad6a626ae2b43dcb1b39430ce496d2fa0365ba9c',
    name: 'PieDAO DEFI Small C',
    symbol: 'DEFI+S',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12701/small/DefiS.png?1601862595',
  },
  {
    chainId: 1,
    address: '0x706cb9e741cbfee00ad5b3f5acc8bd44d1644a74',
    name: 'YFOX Finance',
    symbol: 'YFOX',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12702/small/Yfox.png?1601865990',
  },
  {
    chainId: 1,
    address: '0x40b92fce37cefa03baf7603e7913c1d34dd1a4ec',
    name: 'YeaFinance',
    symbol: 'YEA',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12705/small/logoeth.png?1601877470',
  },
  {
    chainId: 1,
    address: '0x83f873388cd14b83a9f47fabde3c9850b5c74548',
    name: 'Zero Utility Token',
    symbol: 'ZUT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12706/small/logo.png?1605007113',
  },
  {
    chainId: 1,
    address: '0xcd254568ebf88f088e40f456db9e17731243cb25',
    name: 'YFOS finance',
    symbol: 'YFOS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12707/small/wHQeaUF.jpg?1601888512',
  },
  {
    chainId: 1,
    address: '0x03e4bdce611104289333f35c8177558b04cc99ff',
    name: 'Yield Stake Finance',
    symbol: 'YI12',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12708/small/yi12_logo.jpg?1601894672',
  },
  {
    chainId: 1,
    address: '0xeaccb6e0f24d66cf4aa6cbda33971b9231d332a1',
    name: 'Polyient Games Gove',
    symbol: 'PGT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12709/small/Polyent.png?1601897060',
  },
  {
    chainId: 1,
    address: '0x0fdc5313333533cc0c00c22792bff7383d3055f2',
    name: 'YFPRO Finance',
    symbol: 'YFPRO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12712/small/STOV7niY_400x400.png?1602630888',
  },
  {
    chainId: 1,
    address: '0xde4ee8057785a7e8e800db58f9784845a5c2cbd6',
    name: 'DeXe',
    symbol: 'DEXE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12713/small/logo_%2814%29.png?1601952779',
  },
  {
    chainId: 1,
    address: '0x3108ccfd96816f9e663baa0e8c5951d229e8c6da',
    name: 'Dark Build',
    symbol: 'DARK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12716/small/DARK-black.jpg?1601968540',
  },
  {
    chainId: 1,
    address: '0x8f87ec6aad3b2a8c44f1298a1af56169b8e574cf',
    name: 'LYNC Network',
    symbol: 'LYNC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12717/small/coingecko_200x200.png?1604203317',
  },
  {
    chainId: 1,
    address: '0x2a7f709ee001069771ceb6d42e85035f7d18e736',
    name: 'OWL Token',
    symbol: 'OWL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12720/small/logo-transbg_200x200.png?1602024124',
  },
  {
    chainId: 1,
    address: '0xe0e4839e0c7b2773c58764f9ec3b9622d01a0428',
    name: 'EnCore',
    symbol: 'ENCORE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12721/small/72530481.png?1605256352',
  },
  {
    chainId: 1,
    address: '0x1df6f1bb7454e5e4ba3bca882d3148fbf9b5697a',
    name: 'Yfscience',
    symbol: 'YFSI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12723/small/Yfscience_logo.png?1602038268',
  },
  {
    chainId: 1,
    address: '0x00000000441378008ea67f4284a57932b1c000a5',
    name: 'TrueGBP',
    symbol: 'TGBP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12724/small/TGBP.png?1602042166',
  },
  {
    chainId: 1,
    address: '0x00000100f2a2bd000715001920eb70d229700085',
    name: 'TrueCAD',
    symbol: 'TCAD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12725/small/TCAD.png?1602043400',
  },
  {
    chainId: 1,
    address: '0x2688213fedd489762a281a67ae4f2295d8e17ecc',
    name: 'FUD finance',
    symbol: 'FUD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12727/small/fud_finance_logo.png?1602055414',
  },
  {
    chainId: 1,
    address: '0x0954906da0bf32d5479e25f46056d22f08464cab',
    name: 'Index Cooperative',
    symbol: 'INDEX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12729/small/c7w3TmXs_400x400.png?1602630788',
  },
  {
    chainId: 1,
    address: '0x2e1e15c44ffe4df6a0cb7371cd00d5028e571d14',
    name: 'Mettalex',
    symbol: 'MTLX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12730/small/nrEqFTEW_400x400.jpg?1602063980',
  },
  {
    chainId: 1,
    address: '0xec0a0915a7c3443862b678b0d4721c7ab133fdcf',
    name: 'Wrapped Origin Axie',
    symbol: 'WOA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12732/small/WOA_logo.png?1602116474',
  },
  {
    chainId: 1,
    address: '0x2dbd330bc9b7f3a822a9173ab52172bdddcace2a',
    name: 'YFED Finance',
    symbol: 'YFED',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12736/small/yfed_logo.png?1602123697',
  },
  {
    chainId: 1,
    address: '0xa1faa113cbe53436df28ff0aee54275c13b40975',
    name: 'Alpha Finance',
    symbol: 'ALPHA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12738/small/ec7316b1-8bd9-4a76-8a1e-2d5c0b287d2f.jpg?1602306985',
  },
  {
    chainId: 1,
    address: '0xb526fd41360c98929006f3bdcbd16d55de4b0069',
    name: 'Thirm Protocol',
    symbol: 'THIRM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12739/small/thrim_logo.png?1602129709',
  },
  {
    chainId: 1,
    address: '0x054bd236b42385c938357112f419dc5943687886',
    name: 'Heavens Gate',
    symbol: 'HATE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12740/small/BUQoiaJY_400x400.png?1602630549',
  },
  {
    chainId: 1,
    address: '0x913d8adf7ce6986a8cbfee5a54725d9eea4f0729',
    name: 'EasyFi',
    symbol: 'EASY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12742/small/skiXdJLe_400x400.png?1602630380',
  },
  {
    chainId: 1,
    address: '0x03042482d64577a7bdb282260e2ea4c8a89c064b',
    name: 'Centaur',
    symbol: 'CNTR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12743/small/logo_%2898%29.png?1602630445',
  },
  {
    chainId: 1,
    address: '0x454cb9d0845bb4a28462f98c21a4fafd16ceb25f',
    name: 'Yearn finance Infra',
    symbol: 'YLAB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12744/small/kKGUHNFn_400x400.jpg?1602193258',
  },
  {
    chainId: 1,
    address: '0x159a1dfae19057de57dfffcbb3da1ae784678965',
    name: 'Reflex',
    symbol: 'RFX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12745/small/2MKGMRCT_400x400.png?1602194456',
  },
  {
    chainId: 1,
    address: '0xb944b46bbd4ccca90c962ef225e2804e46691ccf',
    name: 'Decore',
    symbol: 'DCORE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12746/small/86jI-acy_400x400.png?1602208062',
  },
  {
    chainId: 1,
    address: '0x39eae99e685906ff1c11a962a743440d0a1a6e09',
    name: 'Holyheld',
    symbol: 'HOLY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12747/small/veqfbl.png?1602211222',
  },
  {
    chainId: 1,
    address: '0xedfbd6c48c3ddff5612ade14b45bb19f916809ba',
    name: 'pulltherug finance',
    symbol: 'RUGZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12749/small/rugz_logo.png?1602218634',
  },
  {
    chainId: 1,
    address: '0xb2b9335791346e94245dcd316a9c9ed486e6dd7f',
    name: 'Baby Power Index Po',
    symbol: 'PIPT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12750/small/powerpool.jpeg?1602233006',
  },
  {
    chainId: 1,
    address: '0xfe9a29ab92522d14fc65880d817214261d8479ae',
    name: 'Snowswap',
    symbol: 'SNOW',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12751/small/uQBJL3A.png?1602237225',
  },
  {
    chainId: 1,
    address: '0xd9a6803f41a006cbf389f21e55d7a6079dfe8df3',
    name: 'NovaDeFi',
    symbol: 'NMT',
    decimals: 19,
    logoURI:
      'https://assets.coingecko.com/coins/images/12752/small/nova_defi_logo.png?1602241365',
  },
  {
    chainId: 1,
    address: '0xb987d48ed8f2c468d52d6405624eadba5e76d723',
    name: 'Stabilize',
    symbol: 'STBZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12753/small/icon.png?1608771101',
  },
  {
    chainId: 1,
    address: '0xb78b3320493a4efaa1028130c5ba26f0b6085ef8',
    name: 'Dracula Token',
    symbol: 'DRC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12758/small/dracula_protocol.png?1602316655',
  },
  {
    chainId: 1,
    address: '0x9ceb84f92a0561fa3cc4132ab9c0b76a59787544',
    name: 'Doki Doki Finance',
    symbol: 'DOKI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12759/small/doki_logo.png?1602338064',
  },
  {
    chainId: 1,
    address: '0x1712aad2c773ee04bdc9114b32163c058321cd85',
    name: 'LimitSwap',
    symbol: 'LIMIT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12760/small/limit_swap_logo.png?1602347106',
  },
  {
    chainId: 1,
    address: '0x73374ea518de7addd4c2b624c0e8b113955ee041',
    name: 'Juggernaut',
    symbol: 'JGN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12761/small/juggernaut_logo.png?1602428976',
  },
  {
    chainId: 1,
    address: '0x33c2da7fd5b125e629b3950f3c38d7f721d7b30d',
    name: 'Seal Finance',
    symbol: 'SEAL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12762/small/seal.png?1602434721',
  },
  {
    chainId: 1,
    address: '0xb4fbed161bebcb37afb1cb4a6f7ca18b977ccb25',
    name: 'Dogeswap',
    symbol: 'DOGES',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12763/small/20200926-220107.png?1602455597',
  },
  {
    chainId: 1,
    address: '0x9dfc4b433d359024eb3e810d77d60fbe8b0d9b82',
    name: 'Dandy Dego',
    symbol: 'DANDY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12764/small/487ogltc_400x400.jpg?1602463048',
  },
  {
    chainId: 1,
    address: '0x6006fc2a849fedaba8330ce36f5133de01f96189',
    name: 'SHAKE',
    symbol: 'SHAKE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12765/small/shake_logo.jpg?1602470135',
  },
  {
    chainId: 1,
    address: '0x1cbb83ebcd552d5ebf8131ef8c9cd9d9bab342bc',
    name: 'Non Fungible Yearn',
    symbol: 'NFY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12766/small/NFY_logo.png?1602686886',
  },
  {
    chainId: 1,
    address: '0x80c8c3dcfb854f9542567c8dac3f44d709ebc1de',
    name: 'MILK2',
    symbol: 'MILK2',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12771/small/PVXczB4M.png?1602482463',
  },
  {
    chainId: 1,
    address: '0xa09ff006c652496e72d648cef2f4ee6777efdf6f',
    name: 'deCraft Finance',
    symbol: 'CRAFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12775/small/decraft_logo.jpg?1602486383',
  },
  {
    chainId: 1,
    address: '0xea3cb156745a8d281a5fc174186c976f2dd04c2e',
    name: 'Nobrainer Finance',
    symbol: 'BRAIN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12778/small/brain_logo.jpg?1602493938',
  },
  {
    chainId: 1,
    address: '0x9a0aba393aac4dfbff4333b06c407458002c6183',
    name: 'ACoconut',
    symbol: 'AC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12779/small/ac_logo.png?1602500084',
  },
  {
    chainId: 1,
    address: '0x054f76beed60ab6dbeb23502178c52d6c5debe40',
    name: 'DeFiner',
    symbol: 'FIN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12780/small/PdaW8Lb.png?1602500407',
  },
  {
    chainId: 1,
    address: '0x1a23a6bfbadb59fa563008c0fb7cf96dfcf34ea1',
    name: 'CoFiX',
    symbol: 'COFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12781/small/dnPnSkfa_400x400.png?1602885321',
  },
  {
    chainId: 1,
    address: '0xd82bb924a1707950903e2c0a619824024e254cd1',
    name: 'DAOFi',
    symbol: 'DAOFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12782/small/DAOFi.png?1602548740',
  },
  {
    chainId: 1,
    address: '0x88d59ba796fdf639ded3b5e720988d59fdb71eb8',
    name: 'Payship',
    symbol: 'PSHP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12789/small/pshp_logo.png?1602566222',
  },
  {
    chainId: 1,
    address: '0x0d9227f9c4ab3972f994fccc6eeba3213c0305c4',
    name: 'SERGS Governance',
    symbol: 'SSL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12790/small/1SSL_Ticker_Etherscan_256x256.png?1607928756',
  },
  {
    chainId: 1,
    address: '0x2e6539edc3b76f1e21b71d214527faba875f70f3',
    name: 'Yearn Finance DOT',
    symbol: 'YFDOT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12791/small/logo_%2815%29.png?1602580328',
  },
  {
    chainId: 1,
    address: '0x260e63d91fccc499606bae3fe945c4ed1cf56a56',
    name: 'MoonTools',
    symbol: 'MOONS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12793/small/moontools-token-logo.png?1602588060',
  },
  {
    chainId: 1,
    address: '0x72f020f8f3e8fd9382705723cd26380f8d0c66bb',
    name: 'PlotX',
    symbol: 'PLOT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12795/small/plotx.jpg?1602637180',
  },
  {
    chainId: 1,
    address: '0xb1e9157c2fdcc5a856c8da8b2d89b6c32b3c1229',
    name: 'Zenfuse',
    symbol: 'ZEFU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12796/small/zenfuse.jpg?1602640333',
  },
  {
    chainId: 1,
    address: '0x11b0a8c0fa626627601ed518c3538a39d92d609e',
    name: 'Generation of Yield',
    symbol: 'YGY',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12798/small/ygycg.png?1602643175',
  },
  {
    chainId: 1,
    address: '0xa150db9b1fa65b44799d4dd949d922c0a33ee606',
    name: 'Digital Reserve Cur',
    symbol: 'DRC',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/12802/small/DRC-Digital-Reserve-Currency-Coingecko.png?1603355646',
  },
  {
    chainId: 1,
    address: '0x155ff1a85f440ee0a382ea949f24ce4e0b751c65',
    name: 'Behodler',
    symbol: 'EYE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12804/small/beholder_logo.png?1602682616',
  },
  {
    chainId: 1,
    address: '0x87edffde3e14c7a66c9b9724747a1c5696b742e6',
    name: 'SWAG Finance',
    symbol: 'SWAG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12805/small/photo_2020-10-14_23.17.02.jpeg?1602688642',
  },
  {
    chainId: 1,
    address: '0x40ce0a1d8f4999807b92ec266a025f071814b15d',
    name: 'Dai If Trump Loses ',
    symbol: 'NOTRUMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12806/small/noTrump.png?1602689764',
  },
  {
    chainId: 1,
    address: '0x5963fd7ca9b17b85768476019f81cb43d9d1818e',
    name: 'Dai If Trump Wins T',
    symbol: 'YESTRUMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12807/small/yesTrump.png?1602689766',
  },
  {
    chainId: 1,
    address: '0x82866b4a71ba9d930fe338c386b6a45a7133eb36',
    name: 'Qcore Finance',
    symbol: 'QCORE',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/12809/small/logo_%281%29_%281%29.png?1602714432',
  },
  {
    chainId: 1,
    address: '0x014a543f767b3b06e31a811b0a75483ee8dfd72d',
    name: 'BonezYard',
    symbol: 'BNZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12810/small/bnz_icon.png?1602716875',
  },
  {
    chainId: 1,
    address: '0x0391d2021f89dc339f60fff84546ea23e337750f',
    name: 'BarnBridge',
    symbol: 'BOND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12811/small/barnbridge.jpg?1602728853',
  },
  {
    chainId: 1,
    address: '0x7f9a00e03c2e53a3af6031c17a150dbedaaab3dc',
    name: 'Read This Contract',
    symbol: 'RTC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12812/small/rtc_logo.png?1602730411',
  },
  {
    chainId: 1,
    address: '0x9ed8e7c9604790f7ec589f99b94361d8aab64e5e',
    name: 'Unistake',
    symbol: 'UNISTAKE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12813/small/logo_%2816%29.png?1602731319',
  },
  {
    chainId: 1,
    address: '0x3142dad33b1c6e1371d8627365f2ee2095eb6b37',
    name: 'Hauteclere Shards',
    symbol: 'HAUT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12815/small/astt.png?1602884781',
  },
  {
    chainId: 1,
    address: '0x30b1efb052205e6ca3c4888c3c50c5b339cc0602',
    name: 'Cargo Gems',
    symbol: 'GEM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12818/small/gems_logo.jpg?1602743920',
  },
  {
    chainId: 1,
    address: '0x0202be363b8a4820f3f4de7faf5224ff05943ab1',
    name: 'UniLend Finance',
    symbol: 'UFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12819/small/UniLend_Finance_logo_PNG.png?1602748658',
  },
  {
    chainId: 1,
    address: '0x4d2ee5dae46c86da2ff521f7657dad98834f97b8',
    name: 'Pepemon Pepeballs',
    symbol: 'PPBLZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12823/small/200pepebball-BIG.png?1603330304',
  },
  {
    chainId: 1,
    address: '0x1378ec93ab2b07ba5a0eaef19cf354a33f64b9fd',
    name: 'Yearn Finance Diamo',
    symbol: 'YFDT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12824/small/yfdt_logo.png?1602814305',
  },
  {
    chainId: 1,
    address: '0x80ab141f324c3d6f2b18b030f1c4e95d4d658778',
    name: 'DEA',
    symbol: 'DEA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12825/small/dea_logo.png?1602820454',
  },
  {
    chainId: 1,
    address: '0xeef9f339514298c6a857efcfc1a762af84438dee',
    name: 'Hermez Network',
    symbol: 'HEZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12826/small/hermez_logo.png?1602826556',
  },
  {
    chainId: 1,
    address: '0xad0887734461af8c6033068bde4047dbe84074cc',
    name: 'Arbiswap',
    symbol: 'ASWAP',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12827/small/logo_%283%29.png?1602831070',
  },
  {
    chainId: 1,
    address: '0x1368452bfb5cd127971c8de22c58fbe89d35a6bf',
    name: 'JNTR e',
    symbol: 'JNTRE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12829/small/jntr_logo.jpg?1602835757',
  },
  {
    chainId: 1,
    address: '0xa58a4f5c4bb043d2cc1e170613b74e767c94189b',
    name: 'UTU Coin',
    symbol: 'UTU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12831/small/Aa5nmbkJ_400x400.png?1602884636',
  },
  {
    chainId: 1,
    address: '0x70e8de73ce538da2beed35d14187f6959a8eca96',
    name: 'XSGD',
    symbol: 'XSGD',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12832/small/opiTgkh.png?1602856852',
  },
  {
    chainId: 1,
    address: '0x04b5e13000c6e9a3255dc057091f3e3eeee7b0f0',
    name: 'Unifund',
    symbol: 'IFUND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12833/small/unifund_logo.png?1602859047',
  },
  {
    chainId: 1,
    address: '0x4b34c0cbeef271f895d339c5f76322d71a60782b',
    name: 'Yearn Finance Manag',
    symbol: 'YEFIM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12836/small/jOVGT0Y.png?1602886889',
  },
  {
    chainId: 1,
    address: '0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f',
    name: 'RAMP',
    symbol: 'RAMP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12837/small/RampdefiExternal200.png?1602897632',
  },
  {
    chainId: 1,
    address: '0xa7925aa2a6e4575ab0c74d169f3bc3e03d4c319a',
    name: 'Better Money',
    symbol: 'BETTER',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12838/small/BETTER_MONEY_MASK_ICON.png?1602899651',
  },
  {
    chainId: 1,
    address: '0x39fa206c1648944f92e8f7b626e1cbdf78d7e9db',
    name: 'DXY Finance',
    symbol: 'DXY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12839/small/dxy_finance.png?1602903489',
  },
  {
    chainId: 1,
    address: '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4',
    name: 'cCOMP',
    symbol: 'CCOMP',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12840/small/1_z8UrVtod3bme4-J_pXAQQA_2x.png?1602936322',
  },
  {
    chainId: 1,
    address: '0x1695936d6a953df699c38ca21c2140d497c08bd9',
    name: 'SynLev',
    symbol: 'SYN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12841/small/synlev_logo.jpg?1602945400',
  },
  {
    chainId: 1,
    address: '0xb9782532fa7062a6f73df1ce71d75c0e16046ebc',
    name: 'YFI Paprika',
    symbol: 'YFIP',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12842/small/yfipaprika.png?1602990259',
  },
  {
    chainId: 1,
    address: '0xf1f955016ecbcd7321c7266bccfb96c68ea5e49b',
    name: 'Rally',
    symbol: 'RLY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12843/small/rally.png?1603005291',
  },
  {
    chainId: 1,
    address: '0x53f64be99da00fec224eaf9f8ce2012149d2fc88',
    name: 'Nice',
    symbol: 'NICE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12844/small/nice-200px.png?1603031077',
  },
  {
    chainId: 1,
    address: '0x8b6dd24bcb2d0aea92c3abd4eb11103a5db6d714',
    name: 'dXIOT',
    symbol: 'DXIOT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12850/small/dxiot.png?1603074874',
  },
  {
    chainId: 1,
    address: '0x573be8873cc39149e71b92918e73634acb3c54d5',
    name: 'FridayBeers',
    symbol: 'BEER',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12852/small/256x256.png?1603976502',
  },
  {
    chainId: 1,
    address: '0x6051c1354ccc51b4d561e43b02735deae64768b8',
    name: 'yRise Finance',
    symbol: 'YRISE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12853/small/logoyrise-200px.png?1603084410',
  },
  {
    chainId: 1,
    address: '0x9c2dc0c3cc2badde84b0025cf4df1c5af288d835',
    name: 'Coreto',
    symbol: 'COR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12856/small/photo_2020-10-27_11-13-23.jpg?1603768611',
  },
  {
    chainId: 1,
    address: '0x47fd85128312ee72aa0e0382a531a8f848b8b2cb',
    name: 'Gallery Finance',
    symbol: 'GLF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12857/small/U5VMHQ5q_400x400.jpg?1603090892',
  },
  {
    chainId: 1,
    address: '0x2edf094db69d6dcd487f1b3db9febe2eec0dd4c5',
    name: 'ZeroSwap',
    symbol: 'ZEE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12861/small/zeroswap.jpg?1603111827',
  },
  {
    chainId: 1,
    address: '0x1de5e000c41c8d35b9f1f4985c23988f05831057',
    name: 'BonFi',
    symbol: 'BNF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12862/small/bonfi_logo.png?1603114422',
  },
  {
    chainId: 1,
    address: '0xcb2fa15f4ea7c55bf6ef9456a662412b137043e9',
    name: 'Payou Finance',
    symbol: 'PAYOU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12863/small/PAYOU-LOGO.png?1603118094',
  },
  {
    chainId: 1,
    address: '0xb4ae194a0dcf1b4080b164c1d775ee06e0817305',
    name: 'Super Saiya jin',
    symbol: 'SSJ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12867/small/super_saiyan_jin_logo.jpg?1603168317',
  },
  {
    chainId: 1,
    address: '0x81b1bfd6cb9ad42db395c2a27f73d4dcf5777e2d',
    name: 'Rare',
    symbol: 'RARE',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12868/small/rare_logo.png?1603170092',
  },
  {
    chainId: 1,
    address: '0xa10740ff9ff6852eac84cdcff9184e1d6d27c057',
    name: 'Wrapped Gen 0 Crypt',
    symbol: 'WG0',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12870/small/wg0_logo.png?1603176705',
  },
  {
    chainId: 1,
    address: '0xadb2437e6f65682b85f814fbc12fec0508a7b1d0',
    name: 'UniCrypt',
    symbol: 'UNCX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12871/small/unicrypt_logo.png?1603178739',
  },
  {
    chainId: 1,
    address: '0x7d91e637589ec3bb54d8213a9e92dc6e8d12da91',
    name: 'Friends With Benefi',
    symbol: 'FWB',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12873/small/fwb_logo.png?1603182111',
  },
  {
    chainId: 1,
    address: '0x25c7b64a93eb1261e130ec21a3e9918caa38b611',
    name: 'Wrapped Virgin Gen ',
    symbol: 'WVG0',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12875/small/wvg0.png?1603211534',
  },
  {
    chainId: 1,
    address: '0x016bf078abcacb987f0589a6d3beadd4316922b0',
    name: 'Rari Stable Pool To',
    symbol: 'RSPT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12877/small/rspt.png?1603248283',
  },
  {
    chainId: 1,
    address: '0x92ef4ffbfe0df030837b65d7fccfe1abd6549579',
    name: 'Swirge',
    symbol: 'SWG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12879/small/swirge_logo.png?1603250039',
  },
  {
    chainId: 1,
    address: '0x12d102f06da35cc0111eb58017fd2cd28537d0e1',
    name: 'Vox Finance',
    symbol: 'VOX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12880/small/BSensIa.png?1603261093',
  },
  {
    chainId: 1,
    address: '0xee87b220d9b0e762f0643c501fadefd6d9cc5b7e',
    name: 'Dragon Network',
    symbol: 'DGNN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12881/small/logo_256x256.png?1603254107',
  },
  {
    chainId: 1,
    address: '0xe28b3b32b6c345a34ff64674606124dd5aceca30',
    name: 'Injective Protocol',
    symbol: 'INJ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12882/small/injective_logo.jpg?1603255762',
  },
  {
    chainId: 1,
    address: '0xe3a64a3c4216b83255b53ec7ea078b13f21a7dad',
    name: 'DeFi Gold',
    symbol: 'DFGL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12883/small/defi_gold.jpg?1603281766',
  },
  {
    chainId: 1,
    address: '0x22222c03318440305ac3e8a7820563d6a9fd777f',
    name: 'Clover',
    symbol: 'CLV',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/12888/small/clover_logo.png?1603274615',
  },
  {
    chainId: 1,
    address: '0x1ad606adde97c0c28bd6ac85554176bc55783c01',
    name: 'Moonday Finance',
    symbol: 'MOONDAY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12890/small/qJWRxsz.jpeg?1603327151',
  },
  {
    chainId: 1,
    address: '0xa9c44135b3a87e0688c41cf8c27939a22dd437c9',
    name: 'BooBank',
    symbol: 'BOOB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12894/small/boobank.PNG?1604043315',
  },
  {
    chainId: 1,
    address: '0x84679bc467dc6c2c40ab04538813aff3796351f1',
    name: 'Chonk',
    symbol: 'CHONK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12899/small/a2LHjXZ.jpeg?1603418225',
  },
  {
    chainId: 1,
    address: '0xd291e7a03283640fdc51b121ac401383a46cc623',
    name: 'Rari Governance Tok',
    symbol: 'RGT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12900/small/rgt_logo.png?1603340632',
  },
  {
    chainId: 1,
    address: '0xe52d53c8c9aa7255f8c2fa9f7093fea7192d2933',
    name: 'YieldX',
    symbol: 'YIELDX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12904/small/logo-200x200.png?1603353354',
  },
  {
    chainId: 1,
    address: '0xb9871cb10738eada636432e86fc0cb920dc3de24',
    name: 'PRIA',
    symbol: 'PRIA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12905/small/pria-200x.png?1603357286',
  },
  {
    chainId: 1,
    address: '0x793786e2dd4cc492ed366a94b88a3ff9ba5e7546',
    name: 'Axia',
    symbol: 'AXIAV3',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12906/small/axia_protocol.png?1603379184',
  },
  {
    chainId: 1,
    address: '0x1706c33b9a5b12aeb85b862215378dee9480eb95',
    name: 'BananoDOS',
    symbol: 'YBAN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12907/small/H3ddt7A.png?1603418786',
  },
  {
    chainId: 1,
    address: '0x80bb277f4355a43cdbb86a82f9876c946476d9eb',
    name: 'DogDeFiCoin',
    symbol: 'DOGDEFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12912/small/dogdefi_logo.jpg?1603425386',
  },
  {
    chainId: 1,
    address: '0x18aaa7115705e8be94bffebde57af9bfc265b998',
    name: 'Audius',
    symbol: 'AUDIO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12913/small/AudiusCoinLogo_2x.png?1603425727',
  },
  {
    chainId: 1,
    address: '0x6e0dade58d2d89ebbe7afc384e3e4f15b70b14d8',
    name: 'QuiverX',
    symbol: 'QRX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12916/small/qrx_logo.png?1603550478',
  },
  {
    chainId: 1,
    address: '0x3c9d6c1c73b31c837832c72e04d3152f051fc1a9',
    name: 'BoringDAO',
    symbol: 'BOR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12917/small/bor_logo.png?1603607502',
  },
  {
    chainId: 1,
    address: '0x4691937a7508860f876c9c0a2a617e7d9e945d4b',
    name: 'Wootrade Network',
    symbol: 'WOO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12921/small/w2UiemF__400x400.jpg?1603670367',
  },
  {
    chainId: 1,
    address: '0x4c11249814f11b9346808179cf06e71ac328c1b5',
    name: 'Oraichain Token',
    symbol: 'ORAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12931/small/2000x2000_azfsy0.png?1603696770',
  },
  {
    chainId: 1,
    address: '0x50eb346fc29a80d97563a50146c3fcf9423b5538',
    name: 'Skull Candy Shards',
    symbol: 'CANDY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12934/small/Skull_Candy.png?1603719579',
  },
  {
    chainId: 1,
    address: '0xbc3ec4e491b835dce394a53e9a9a10ac19564839',
    name: 'Starbugs Shards',
    symbol: 'BUGS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12935/small/Starbugs.png?1603720230',
  },
  {
    chainId: 1,
    address: '0xa3a3f076413a362bb0d69eea1dc5b0e79c831edc',
    name: 'Cocaine Cowboy Shar',
    symbol: 'COKE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12937/small/Cocaine_Cowboy.png?1603720411',
  },
  {
    chainId: 1,
    address: '0x034455c8a9882bf44c9704c780a55198e05ba559',
    name: 'Lumos',
    symbol: 'LMS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12938/small/6tZdBWW.png?1603723170',
  },
  {
    chainId: 1,
    address: '0xeeaa34af95b034bada4baf565063132c765b1fa5',
    name: 'OLCF',
    symbol: 'OLCF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12939/small/2_5237799779538307093.png?1603838173',
  },
  {
    chainId: 1,
    address: '0x7a82c573b378ceea29772afb93891f0d0afa93b7',
    name: 'Wizard',
    symbol: 'WIZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12942/small/T9L0NJT.png?1607391342',
  },
  {
    chainId: 1,
    address: '0x6c4522f0035bed2180b40f4c5d9dbaab64b41325',
    name: 'Passport Finance',
    symbol: 'PASS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12946/small/android-chrome-512x512.png?1604277448',
  },
  {
    chainId: 1,
    address: '0xbe685c5e06866cfb94a4242e3df8f2fa3e7c2b73',
    name: 'Yearn Finance Red M',
    symbol: 'YFRM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12947/small/200X200.png?1603778631',
  },
  {
    chainId: 1,
    address: '0x20945ca1df56d237fd40036d47e866c7dccd2114',
    name: 'Nsure Network',
    symbol: 'NSURE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12948/small/Nsure_token.png?1603778876',
  },
  {
    chainId: 1,
    address: '0x3516415161c478df10adbb8bb884cc83fbd5f11a',
    name: 'AlphaDex',
    symbol: 'DEX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12949/small/AlphaDex.png?1603779030',
  },
  {
    chainId: 1,
    address: '0xbbff34e47e559ef680067a6b1c980639eeb64d24',
    name: 'Leverj Gluon',
    symbol: 'L2',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12950/small/Gluon256x256.png?1604048379',
  },
  {
    chainId: 1,
    address: '0xe6710e0cda178f3d921f456902707b0d4c4a332b',
    name: 'JULIEN',
    symbol: 'JULIEN',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12954/small/julien_logo.jpg?1603792446',
  },
  {
    chainId: 1,
    address: '0xa1d6df714f91debf4e0802a542e13067f31b8262',
    name: 'RedFOX Labs',
    symbol: 'RFOX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12956/small/logo-200.png?1607620623',
  },
  {
    chainId: 1,
    address: '0x6a8c66cab4f766e5e30b4e9445582094303cc322',
    name: 'Farm Defi',
    symbol: 'PFARM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12957/small/PFARM_logo.png?1603837555',
  },
  {
    chainId: 1,
    address: '0x20c36f062a31865bed8a5b1e512d9a1a20aa333a',
    name: 'DefiDollar DAO',
    symbol: 'DFD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12959/small/DFD.jpg?1604415975',
  },
  {
    chainId: 1,
    address: '0xaf20b44c1c651d1d29cfb916ee2a0630b828eb7a',
    name: 'YYFI Protocol',
    symbol: 'YYFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12960/small/20201027_093510.png?1603850588',
  },
  {
    chainId: 1,
    address: '0xa6312567e419e73951c451feaba07b6d74a0e8ce',
    name: 'SocketFinance',
    symbol: 'SFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12962/small/SocketFinance_logo_256_256.png?1603854169',
  },
  {
    chainId: 1,
    address: '0xb7bc7b0a32455f7e7a924f832ca4f0a0ac3b6b88',
    name: 'Warlord Token',
    symbol: 'WLT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12963/small/200px.png?1603854513',
  },
  {
    chainId: 1,
    address: '0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44',
    name: 'Keep3rV1',
    symbol: 'KP3R',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12966/small/kp3r_logo.jpg?1607057458',
  },
  {
    chainId: 1,
    address: '0x892f5a0b08bb7b1eecccc63ef3916ff201c93664',
    name: 'Bloody Token',
    symbol: 'BLOODY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12969/small/bloody-200px.png?1603940552',
  },
  {
    chainId: 1,
    address: '0x3218a02f8f8b5c3894ce30eb255f10bcba13e654',
    name: 'MegaCryptoPolis',
    symbol: 'MEGA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12971/small/mcp_icon_200.png?1603943441',
  },
  {
    chainId: 1,
    address: '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
    name: 'LP 3pool Curve',
    symbol: '3CRV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12972/small/3pool_128.png?1603948039',
  },
  {
    chainId: 1,
    address: '0x776ca7ded9474829ea20ad4a5ab7a6ffdb64c796',
    name: 'TenSpeed Finance',
    symbol: 'TENS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12973/small/72911917.jpg?1603955940',
  },
  {
    chainId: 1,
    address: '0xc761d1ccb38a94703675d2cdb15f7f1b3dcff7b7',
    name: 'Hiz Finance',
    symbol: 'HIZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12974/small/73051179.png?1603959145',
  },
  {
    chainId: 1,
    address: '0x5218e472cfcfe0b64a064f055b43b4cdc9efd3a6',
    name: 'UnFederalReserve',
    symbol: 'ERSDL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12975/small/unFederalReserve_LogoArtboard_1_copy_20-64.png?1610087806',
  },
  {
    chainId: 1,
    address: '0xa4bad5d040d4464ec5ce130987731f2f428c9307',
    name: 'Spore Finance',
    symbol: 'SPORE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12976/small/SF3IR94C_400x400.jpg?1603983477',
  },
  {
    chainId: 1,
    address: '0x39ad22c916f42af5f67371d6f2fb0dab42321a89',
    name: 'OSINA',
    symbol: 'OSINA',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/12977/small/OSINA_Logo.png?1604019955',
  },
  {
    chainId: 1,
    address: '0x6be7e93e45740c314c89a3be52473a0ddf2450fe',
    name: 'XCredit',
    symbol: 'XFYI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12979/small/xcredit_finance_logo.jpg?1604040780',
  },
  {
    chainId: 1,
    address: '0xea319e87cf06203dae107dd8e5672175e3ee976c',
    name: 'Surf Finance',
    symbol: 'SURF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12982/small/surf_200x200.png?1604050261',
  },
  {
    chainId: 1,
    address: '0xaa9d866666c2a3748d6b23ff69e63e52f08d9ab4',
    name: 'Fundamenta',
    symbol: 'FMTA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12983/small/fundamenta.png?1604065939',
  },
  {
    chainId: 1,
    address: '0xc89b4a8a121dd3e726fe7515e703936cf83e3350',
    name: 'Kper Network',
    symbol: 'KPER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12984/small/kper.png?1604066205',
  },
  {
    chainId: 1,
    address: '0x160b1e5aabfd70b2fc40af815014925d71ceed7e',
    name: 'StakedFIRO',
    symbol: 'STFIRO',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/12985/small/stFIRO_high_res.png?1606234476',
  },
  {
    chainId: 1,
    address: '0xf12ec0d3dab64ddefbdc96474bde25af3fe1b327',
    name: 'Stacy',
    symbol: 'STACY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12986/small/Stacy.png?1604384468',
  },
  {
    chainId: 1,
    address: '0xa866f0198208eb07c83081d5136be7f775c2399e',
    name: 'Kore',
    symbol: 'KORE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12987/small/kore_logo.png?1604082065',
  },
  {
    chainId: 1,
    address: '0x02eca910cb3a7d43ebc7e8028652ed5c6b70259b',
    name: 'Pteria',
    symbol: 'PTERIA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12989/small/Pteria.png?1604105704',
  },
  {
    chainId: 1,
    address: '0x355376d6471e09a4ffca8790f50da625630c5270',
    name: 'Libartysharetoken',
    symbol: 'LST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12990/small/lst_logo.png?1604148361',
  },
  {
    chainId: 1,
    address: '0x8bf92cad232f72a7c61eb42e9185e8d0ea470f6b',
    name: 'SMPL Foundation',
    symbol: 'SMPL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12991/small/smpl.jpg?1604208000',
  },
  {
    chainId: 1,
    address: '0xdacd69347de42babfaecd09dc88958378780fb62',
    name: 'Atari',
    symbol: 'ATRI',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/12992/small/atari.png?1604212345',
  },
  {
    chainId: 1,
    address: '0xeea9ae787f3a620072d13b2cdc8cabffb9c0ab96',
    name: 'Yearn Secure',
    symbol: 'YSEC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12993/small/ysec.png?1604212852',
  },
  {
    chainId: 1,
    address: '0x0829d2d5cc09d3d341e813c821b0cfae272d9fb2',
    name: 'Social Rocket',
    symbol: 'ROCKS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12994/small/logo-256x256-1.png?1604759401',
  },
  {
    chainId: 1,
    address: '0xbea98c05eeae2f3bc8c3565db7551eb738c8ccab',
    name: 'Geyser',
    symbol: 'GYSR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12995/small/gey.png?1604235725',
  },
  {
    chainId: 1,
    address: '0x075190c6130ea0a3a7e40802f1d77f4ea8f38fe2',
    name: 'nYFI',
    symbol: 'N0031',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/12997/small/nest_protocol_logo.png?1604246163',
  },
  {
    chainId: 1,
    address: '0xfa5047c9c78b8877af97bdcb85db743fd7313d4a',
    name: 'KeeperDAO',
    symbol: 'ROOK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13005/small/keeper_dao_logo.jpg?1604316506',
  },
  {
    chainId: 1,
    address: '0xa89ac6e529acf391cfbbd377f3ac9d93eae9664e',
    name: 'Keep4r',
    symbol: 'KP4R',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13006/small/kp4r.png?1604368813',
  },
  {
    chainId: 1,
    address: '0xf151980e7a781481709e8195744bf2399fb3cba4',
    name: 'Freeway Token',
    symbol: 'FWT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13012/small/A-200px.png?1604381296',
  },
  {
    chainId: 1,
    address: '0x1c7bbadc81e18f7177a95eb1593e5f5f35861b10',
    name: 'Auric Network',
    symbol: 'AUSCM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13015/small/auric-1-high-res_icon_300_PNG.png?1604384136',
  },
  {
    chainId: 1,
    address: '0x10633216e7e8281e33c86f02bf8e565a635d9770',
    name: 'Dvision Network',
    symbol: 'DVI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13020/small/WGAhHOLv_400x400.png?1604396086',
  },
  {
    chainId: 1,
    address: '0xf1f508c7c9f0d1b15a76fba564eef2d956220cf7',
    name: 'Pepedex',
    symbol: 'PPDEX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13022/small/output-onlinepngtools-1.png?1604720841',
  },
  {
    chainId: 1,
    address: '0xaac41ec512808d64625576eddd580e7ea40ef8b2',
    name: 'Gameswap',
    symbol: 'GSWAP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13026/small/gameswap.jpg?1604456704',
  },
  {
    chainId: 1,
    address: '0x538a151dd910c1d1227719bd400d6c4f99ea06d0',
    name: 'Cryptochrome',
    symbol: 'CHM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13028/small/cryptochrome_logo.png?1604461218',
  },
  {
    chainId: 1,
    address: '0xf5d669627376ebd411e34b98f19c868c8aba5ada',
    name: 'Axie Infinity',
    symbol: 'AXS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png?1604471082',
  },
  {
    chainId: 1,
    address: '0x79ba92dda26fce15e1e9af47d5cfdfd2a093e000',
    name: 'SERGS',
    symbol: 'SERGS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13031/small/sergs_logo.png?1604476848',
  },
  {
    chainId: 1,
    address: '0x74603e780545d02c4257e7d2be19c74de7be1952',
    name: 'ETG Finance',
    symbol: 'ETGF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13032/small/etgf_logo.png?1604482450',
  },
  {
    chainId: 1,
    address: '0xa93d5cfaa41193b13321c035b4bdd2b534172762',
    name: 'Dream Swap',
    symbol: 'DREAM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13033/small/dream_32.png?1604503082',
  },
  {
    chainId: 1,
    address: '0xd811e485cb4ab1fad56233de4464fb5d1c9f3e99',
    name: 'Yearn Global',
    symbol: 'YG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13034/small/tyrQieZZ_400x400.png?1604539997',
  },
  {
    chainId: 1,
    address: '0x72e9d9038ce484ee986fea183f8d8df93f9ada13',
    name: 'SmartCredit Token',
    symbol: 'SMARTCREDIT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13036/small/smartcredit_logo_02_white_a-1.png?1604545479',
  },
  {
    chainId: 1,
    address: '0x16be21c08eb27953273608629e4397556c561d26',
    name: 'Yearn20Moon Finance',
    symbol: 'YMF20',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13037/small/Brand_Identity.png?1605773986',
  },
  {
    chainId: 1,
    address: '0x21686f8ce003a95c99acd297e302faacf742f7d4',
    name: 'Wrapped Conceal',
    symbol: 'WCCX',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/13039/small/wccx_logo.png?1604566677',
  },
  {
    chainId: 1,
    address: '0x95a4492f028aa1fd432ea71146b433e7b4446611',
    name: 'APY Finance',
    symbol: 'APY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13041/small/1*AvkD-OLocausbxqUzezZ0A.png?1604577922',
  },
  {
    chainId: 1,
    address: '0x21cf09bc065082478dcc9ccb5fd215a978dc8d86',
    name: 'Jem',
    symbol: 'JEM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13044/small/itchiro-defi.png?1605892179',
  },
  {
    chainId: 1,
    address: '0xa393473d64d2f9f026b60b6df7859a689715d092',
    name: 'Lattice Token',
    symbol: 'LTX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13050/small/lattice-logo.png?1604641504',
  },
  {
    chainId: 1,
    address: '0x058349297672b6cc7ccb6e59a679c5add74a6898',
    name: 'Ethereum Vault',
    symbol: 'ETHV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13051/small/Tok425m.jpeg?1604654743',
  },
  {
    chainId: 1,
    address: '0xca3fe04c7ee111f0bbb02c328c699226acf9fd33',
    name: 'SEEN',
    symbol: 'SEEN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13052/small/seen_logo.png?1604678509',
  },
  {
    chainId: 1,
    address: '0x7c81542ed859a2061538fee22b6544a235b9557d',
    name: 'Combo',
    symbol: 'COMB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13053/small/7zYe50X.png?1604703767',
  },
  {
    chainId: 1,
    address: '0x15334dcb171e8b65d6650321581dca83be870115',
    name: 'Wrapped BIND',
    symbol: 'WBIND',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13055/small/o1w2cBW.png?1604720921',
  },
  {
    chainId: 1,
    address: '0x86d3f38edaf7e7959e5d8e6aea5ad3187b78c346',
    name: 'MTI Finance',
    symbol: 'MTI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13061/small/mti.png?1605153678',
  },
  {
    chainId: 1,
    address: '0x38d58b82cb24a3e0410a7991f255174c9fd8093b',
    name: 'TEAL',
    symbol: 'TEAT',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/13062/small/teat_logo.png?1604845769',
  },
  {
    chainId: 1,
    address: '0x2e2f3246b6c65ccc4239c9ee556ec143a7e5de2c',
    name: 'Yfi mobi',
    symbol: 'YFIM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13063/small/yfim.jpg?1604848218',
  },
  {
    chainId: 1,
    address: '0x59e7b5db9be0bdd26fa048d39e01fee456ab674e',
    name: 'Yearn Finance Bit2',
    symbol: 'YFB2',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13064/small/yfb2_logo.png?1604884273',
  },
  {
    chainId: 1,
    address: '0xfdb615d6a15f929ddabc6b83a4f1cf9d361b064e',
    name: 'Divert Finance',
    symbol: 'DEVE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13067/small/DVMZDhP.png?1606785893',
  },
  {
    chainId: 1,
    address: '0xcbe7142f5c16755d8683ba329efa1abf7b54482d',
    name: 'MedicalVeda',
    symbol: 'MVEDA',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13069/small/medicalveda_new_logo_final_%281%29.png?1604894690',
  },
  {
    chainId: 1,
    address: '0x7ca4408137eb639570f8e647d9bd7b7e8717514a',
    name: 'Alpaca',
    symbol: 'ALPA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13070/small/alpaca_logo.png?1604895862',
  },
  {
    chainId: 1,
    address: '0xd794dd1cada4cf79c9eebaab8327a1b0507ef7d4',
    name: 'Hyve',
    symbol: 'HYVE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13072/small/MKHXNbf.png?1604899269',
  },
  {
    chainId: 1,
    address: '0xa8e7ad77c60ee6f30bac54e2e7c0617bd7b5a03e',
    name: 'zLOT',
    symbol: 'ZLOT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13073/small/z-LOT-logo-transparent.png?1604900416',
  },
  {
    chainId: 1,
    address: '0x837010619aeb2ae24141605afc8f66577f6fb2e7',
    name: 'zHEGIC',
    symbol: 'ZHEGIC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13074/small/zhegic_logo.png?1604903561',
  },
  {
    chainId: 1,
    address: '0x921c87490ccbef90a3b0fc1951bd9064f7220af6',
    name: 'Ectoplasma',
    symbol: 'ECTO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13077/small/ECTO-LOGO.png?1604915817',
  },
  {
    chainId: 1,
    address: '0xa8b0f154a688c22142e361707df64277e0a0be66',
    name: 'Rake Finance',
    symbol: 'RAK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13078/small/rake-logo-200x200.png?1604931839',
  },
  {
    chainId: 1,
    address: '0xf6832ea221ebfdc2363729721a146e6745354b14',
    name: 'FRMx Token',
    symbol: 'FRMX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13082/small/New_Project_%2862%29.png?1609811248',
  },
  {
    chainId: 1,
    address: '0xe6179bb571d2d69837be731da88c76e377ec4738',
    name: 'wormhole finance',
    symbol: 'WHOLE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13084/small/wormhole.finance.png?1604984651',
  },
  {
    chainId: 1,
    address: '0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f',
    name: 'Strain',
    symbol: 'STRN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13087/small/strain_logo.jpg?1604990516',
  },
  {
    chainId: 1,
    address: '0x1fc05d480b1ef1175a31123bfdbd36bfee256889',
    name: 'noob finance',
    symbol: 'NOOB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13088/small/noob_finance_logo.jpg?1604998432',
  },
  {
    chainId: 1,
    address: '0x910524678c0b1b23ffb9285a81f99c29c11cbaed',
    name: 'Azuki',
    symbol: 'AZUKI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13091/small/bdUBSCo.png?1605169403',
  },
  {
    chainId: 1,
    address: '0x1fa21b20222076d7465fb901e5f459289c95f66a',
    name: 'XFII',
    symbol: 'XFII',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13092/small/xfii_logo.png?1605065018',
  },
  {
    chainId: 1,
    address: '0xbf4a9a37ecfc21825011285222c36ab35de51f14',
    name: 'Nyan V2',
    symbol: 'NYAN-2',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13093/small/v2-logo.png?1605067493',
  },
  {
    chainId: 1,
    address: '0x2369686fc9fb6e1fdc46541891568c2f341906ef',
    name: 'Drakoin',
    symbol: 'DRK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13094/small/drakoinlogo200.png?1605076487',
  },
  {
    chainId: 1,
    address: '0x51bb9c623226ce781f4a54fc8f4a530a47142b6b',
    name: 'Peet DeFi',
    symbol: 'PTE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13100/small/peetdefi_logo.png?1605148557',
  },
  {
    chainId: 1,
    address: '0x6bffa07a1b0cebc474ce6833eaf2be6326252449',
    name: 'BAEPAY',
    symbol: 'BAEPAY',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/13101/small/baepay_logo.png?1605150696',
  },
  {
    chainId: 1,
    address: '0x2f4eb47a1b1f4488c71fc10e39a4aa56af33dd49',
    name: 'UNCL',
    symbol: 'UNCL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13102/small/uncl_logo.png?1605230945',
  },
  {
    chainId: 1,
    address: '0x59ad6061a0be82155e7acce9f0c37bf59f9c1e3c',
    name: 'Liquid Lottery RTC',
    symbol: 'LIQLO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13104/small/liqlo_logo.png?1605234382',
  },
  {
    chainId: 1,
    address: '0x72ca0501427bb8f089c1c4f767cb17d017e803a9',
    name: 'Liquid DeFi',
    symbol: 'LIQ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13107/small/liquid_defi_logo.jpg?1605247848',
  },
  {
    chainId: 1,
    address: '0x3d1be3fef769399cce7e504e85324d622f23cf85',
    name: 'Tulip Seed',
    symbol: 'STLP',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13108/small/tulip_logo.jpg?1605258713',
  },
  {
    chainId: 1,
    address: '0x71f85b2e46976bd21302b64329868fd15eb0d127',
    name: 'Axion',
    symbol: 'AXN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13110/small/AXION_Logo.png?1609309261',
  },
  {
    chainId: 1,
    address: '0x60ca261e14f26e8daae8b1a7f8e783d64859126c',
    name: 'STONKS',
    symbol: 'STONK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13111/small/stonk_logo.png?1605278755',
  },
  {
    chainId: 1,
    address: '0x63b4f3e3fa4e438698ce330e365e831f7ccd1ef4',
    name: 'CyberFi',
    symbol: 'CFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13112/small/cyberfi_logo.jpeg?1605283367',
  },
  {
    chainId: 1,
    address: '0xc3eb2622190c57429aac3901808994443b64b466',
    name: 'ORO',
    symbol: 'ORO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13114/small/oro_logo.png?1605338447',
  },
  {
    chainId: 1,
    address: '0x14d1c83df4decee9deb14ee851f109f0101a6631',
    name: 'Volts Finance',
    symbol: 'VOLTS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13115/small/volts_logo.png?1605367400',
  },
  {
    chainId: 1,
    address: '0x66d28cb58487a7609877550e1a34691810a6b9fc',
    name: 'Koinos',
    symbol: 'KOIN',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13116/small/koinos_logo.jpg?1605406276',
  },
  {
    chainId: 1,
    address: '0xb753428af26e81097e7fd17f40c88aaa3e04902c',
    name: 'saffron finance',
    symbol: 'SFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13117/small/sfi_red_250px.png?1606020144',
  },
  {
    chainId: 1,
    address: '0x903bef1736cddf2a537176cf3c64579c3867a881',
    name: 'ichi farm',
    symbol: 'ICHI',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13119/small/ichifarm.jpg?1605664946',
  },
  {
    chainId: 1,
    address: '0x22b6c31c2beb8f2d0d5373146eed41ab9ede3caf',
    name: 'cocktailbar finance',
    symbol: 'COC',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13121/small/cocktail_bar_logo.png?1605488103',
  },
  {
    chainId: 1,
    address: '0xd2be3722b17b616c51ed9b8944a227d1ce579c24',
    name: 'Dtube Coin',
    symbol: 'DTUBE',
    decimals: 2,
    logoURI:
      'https://assets.coingecko.com/coins/images/13126/small/dtube_logo.png?1605500467',
  },
  {
    chainId: 1,
    address: '0x26a604dffe3ddab3bee816097f81d3c4a2a4cf97',
    name: 'CorionX',
    symbol: 'CORX',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13129/small/x_log.png?1605515405',
  },
  {
    chainId: 1,
    address: '0x48cf0e2eca22eae0ad33fee16a5cb6e62207a8ab',
    name: 'YTHO Online',
    symbol: 'YTHO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13130/small/photo_2020-10-06_11-28-28_%282%29.jpg?1609205097',
  },
  {
    chainId: 1,
    address: '0x67b66c99d3eb37fa76aa3ed1ff33e8e39f0b9c7a',
    name: 'Interest Bearing ET',
    symbol: 'IBETH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13131/small/7675.png?1605535879',
  },
  {
    chainId: 1,
    address: '0x6e10aacb89a28d6fa0fe68790777fec7e7f01890',
    name: 'SAV3',
    symbol: 'SAV3',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13132/small/sav3_logo.png?1605536471',
  },
  {
    chainId: 1,
    address: '0xdecade1c6bf2cd9fb89afad73e4a519c867adcf5',
    name: 'Experty Wisdom Toke',
    symbol: 'WIS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13133/small/n0MTVBrm_400x400.jpg?1605543934',
  },
  {
    chainId: 1,
    address: '0x9f7229af0c4b9740e207ea283b9094983f78ba04',
    name: 'Tadpole',
    symbol: 'TAD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13134/small/9DmF_cs3_400x400.jpg?1605574755',
  },
  {
    chainId: 1,
    address: '0x15f5f5f29a819bf7b4b80bf55352e1e42707c94e',
    name: 'Die',
    symbol: 'DIE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13136/small/gR-removebg-preview.png?1605580337',
  },
  {
    chainId: 1,
    address: '0x8888801af4d980682e47f1a9036e589479e835c5',
    name: '88mph',
    symbol: 'MPH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13137/small/yfU-_Tcj_400x400.png?1605581509',
  },
  {
    chainId: 1,
    address: '0x5935ffc231e93ac04daa089c0f1b94d0fb2449de',
    name: 'Kanva',
    symbol: 'KNV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13138/small/5uoWII9M_400x400.png?1605592792',
  },
  {
    chainId: 1,
    address: '0x515d7e9d75e2b76db60f8a051cd890eba23286bc',
    name: 'Governor DAO',
    symbol: 'GDAO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13140/small/GDAOlogo2-bird.png?1605591842',
  },
  {
    chainId: 1,
    address: '0x09843b9137fc5935b7f3832152f9074db5d2d1ee',
    name: 'YFI3 money',
    symbol: 'YFI3',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13142/small/yfi3.png?1605596278',
  },
  {
    chainId: 1,
    address: '0xa211f450ce88deb31d3f12ae3c1ebf6b0e55a5d9',
    name: 'Parsiq Boost',
    symbol: 'PRQBOOST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13144/small/boost_logo.png?1605600652',
  },
  {
    chainId: 1,
    address: '0x6468e79a80c0eab0f9a2b574c8d5bc374af59414',
    name: 'e Radix',
    symbol: 'EXRD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13145/small/exrd_logo.png?1605662677',
  },
  {
    chainId: 1,
    address: '0x65fc94d99cb301c5630c485d312e6ff5edde13d0',
    name: 'MVP',
    symbol: 'MVP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13150/small/mvp_token_logo.png?1605688252',
  },
  {
    chainId: 1,
    address: '0xcb5f72d37685c3d5ad0bb5f982443bc8fcdf570e',
    name: 'Rootkit',
    symbol: 'ROOT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13151/small/rootkit_logo.png?1605712875',
  },
  {
    chainId: 1,
    address: '0x4c10bd19688b906665fbd53415f279f34b44ece7',
    name: 'YUI Finance',
    symbol: 'YUI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13153/small/YUI.png?1605751023',
  },
  {
    chainId: 1,
    address: '0x595643d83b35df38e29058976c04000acfa31570',
    name: 'OBR',
    symbol: 'OBR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13154/small/nftobr.png?1605756268',
  },
  {
    chainId: 1,
    address: '0x1443e7c1cce72662545d94779120c59251447e91',
    name: 'Molten',
    symbol: 'MOL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13156/small/256.png?1605931524',
  },
  {
    chainId: 1,
    address: '0xa6fb1df483b24eeab569e19447e0e107003b9e15',
    name: 'Earnbase',
    symbol: 'ENB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13164/small/YhCEGdB.png?1605775799',
  },
  {
    chainId: 1,
    address: '0xe59064a8185ed1fca1d17999621efedfab4425c9',
    name: 'PrimeDAO',
    symbol: 'PRIME',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13165/small/PrimeDAO_200x200.png?1605800174',
  },
  {
    chainId: 1,
    address: '0xdbdd6f355a37b94e6c7d32fef548e98a280b8df5',
    name: 'UniWhales',
    symbol: 'UWL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13166/small/uniwhales.png?1605825507',
  },
  {
    chainId: 1,
    address: '0x5d8d9f5b96f4438195be9b99eee6118ed4304286',
    name: 'Cover Protocol  old',
    symbol: 'COVER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13167/small/cover.png?1605839290',
  },
  {
    chainId: 1,
    address: '0xe481f2311c774564d517d015e678c2736a25ddd3',
    name: 'DefHold',
    symbol: 'DEFO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13168/small/defhold_logo.png?1605849148',
  },
  {
    chainId: 1,
    address: '0xa69f7a10df90c4d6710588bc18ad9bf08081f545',
    name: 'Cexlt',
    symbol: 'CLT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13171/small/clt_logo.png?1605855281',
  },
  {
    chainId: 1,
    address: '0x47935edfb3cdd358c50f6c0add1cc24662e30f5f',
    name: 'SUP8EME',
    symbol: 'SUP8EME',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/13174/small/sup8eme_logo.png?1605864500',
  },
  {
    chainId: 1,
    address: '0x59d4ccc94a9c4c3d3b4ba2aa343a9bdf95145dd1',
    name: 'QUSD Stablecoin',
    symbol: 'QUSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13176/small/qusd_logo.png?1605922605',
  },
  {
    chainId: 1,
    address: '0x65d9bc970aa9b2413027fa339f7f179b3f3f2604',
    name: 'QIAN Governance Tok',
    symbol: 'KUN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13177/small/kun_logo.png?1605923919',
  },
  {
    chainId: 1,
    address: '0x95b3497bbcccc46a8f45f5cf54b0878b39f8d96c',
    name: 'UniDex',
    symbol: 'UNIDX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13178/small/unidex_logo.png?1605925219',
  },
  {
    chainId: 1,
    address: '0x88d39566dae88dc838652d9898f0aa6a8ff2819a',
    name: 'HypeBurn',
    symbol: 'HBURN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13179/small/hypeburn_logo_coingecko_200px.png?1605968369',
  },
  {
    chainId: 1,
    address: '0x4c19596f5aaff459fa38b0f7ed92f11ae6543784',
    name: 'TrueFi',
    symbol: 'TRU',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13180/small/trust-token.png?1606009370',
  },
  {
    chainId: 1,
    address: '0x45080a6531d671ddff20db42f93792a489685e32',
    name: 'Finance Vote',
    symbol: 'FVT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13181/small/finance.png?1606015010',
  },
  {
    chainId: 1,
    address: '0x7ef1081ecc8b5b5b130656a41d4ce4f89dbbcc8c',
    name: 'Compounder',
    symbol: 'CP3R',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13182/small/compounder_logo.png?1606018434',
  },
  {
    chainId: 1,
    address: '0xa0bed124a09ac2bd941b10349d8d224fe3c955eb',
    name: 'DePay',
    symbol: 'DEPAY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13183/small/favicon.png?1608102012',
  },
  {
    chainId: 1,
    address: '0xd61b60ccbdaf09c2e036c72734adb3270ed27192',
    name: 'WaterDrop',
    symbol: 'WDP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13185/small/QhKzNey.png?1606084418',
  },
  {
    chainId: 1,
    address: '0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4',
    name: 'DexKit',
    symbol: 'KIT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13187/small/dexkit_logo.png?1606093850',
  },
  {
    chainId: 1,
    address: '0x1f3f9d3068568f8040775be2e8c03c103c61f3af',
    name: 'Archer DAO Governan',
    symbol: 'ARCH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13188/small/archer_logo.png?1606097487',
  },
  {
    chainId: 1,
    address: '0xa1afffe3f4d611d252010e3eaf6f4d77088b0cd7',
    name: 'reflect finance',
    symbol: 'RFI',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13189/small/reflect_finance_logo.png?1606098213',
  },
  {
    chainId: 1,
    address: '0xd1afbccc9a2c2187ea544363b986ea0ab6ef08b5',
    name: 'Ethereum Yield',
    symbol: 'ETHY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13191/small/rOIuPZM.png?1606101103',
  },
  {
    chainId: 1,
    address: '0x72630b1e3b42874bf335020ba0249e3e9e47bafc',
    name: 'Paypolitan Token',
    symbol: 'EPAN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13192/small/ava3.png?1606102032',
  },
  {
    chainId: 1,
    address: '0x610c67be018a5c5bdc70acd8dc19688a11421073',
    name: 'Hype Finance',
    symbol: 'HYPE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13193/small/hype_finance_logo.png?1606109896',
  },
  {
    chainId: 1,
    address: '0xd18a8abed9274edbeace4b12d86a8633283435da',
    name: 'UnoSwap',
    symbol: 'UNOS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13194/small/slazzer-edit-image.png?1606115031',
  },
  {
    chainId: 1,
    address: '0x6cfb6df56bbdb00226aeffcdb2cd1fe8da1abda7',
    name: 'Komet',
    symbol: 'KOMET',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13196/small/komet_finance_logo.png?1606120745',
  },
  {
    chainId: 1,
    address: '0xe8ed08a581777f112654e28de507e11613da0379',
    name: 'Yearn Finance Cente',
    symbol: 'YFC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13199/small/yfc_logo.png?1606186020',
  },
  {
    chainId: 1,
    address: '0x9248c485b0b80f76da451f167a8db30f33c70907',
    name: 'Debase',
    symbol: 'DEBASE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13201/small/debase_logo.png?1606190818',
  },
  {
    chainId: 1,
    address: '0x537a9095b78517597b5f2058edcd6e1978095909',
    name: 'Design',
    symbol: 'DSGN',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/13204/small/design_logo.jpg?1606196569',
  },
  {
    chainId: 1,
    address: '0x8d5db0c1f0681071cb38a382ae6704588d9da587',
    name: 'Prophet',
    symbol: 'PROPHET',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13209/small/prophet_finance.png?1606202225',
  },
  {
    chainId: 1,
    address: '0x67c597624b17b16fb77959217360b7cd18284253',
    name: 'Benchmark Protocol',
    symbol: 'MARK',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13212/small/benchmark_protocol.jpg?1606267583',
  },
  {
    chainId: 1,
    address: '0xed36482c7f8e5850e91ac0cf6bf2130a1aa2df92',
    name: 'Holdtowin',
    symbol: '7ADD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13213/small/logo256_%281%29.png?1606276280',
  },
  {
    chainId: 1,
    address: '0x63d0eea1d7c0d1e89d7e665708d7e8997c0a9ed6',
    name: 'Ethanol',
    symbol: 'ENOL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13214/small/hV_w1e5G_400x400.png?1606292732',
  },
  {
    chainId: 1,
    address: '0x469e66e06fec34839e5eb1273ba85a119b8d702f',
    name: 'Degov',
    symbol: 'DEGOV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13215/small/degov.png?1606277121',
  },
  {
    chainId: 1,
    address: '0xce593a29905951e8fc579bc092eca72577da575c',
    name: 'GROM',
    symbol: 'GR',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/13216/small/gr.png?1606278269',
  },
  {
    chainId: 1,
    address: '0x8d3e855f3f55109d473735ab76f753218400fe96',
    name: 'Bundles',
    symbol: 'BUND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13219/small/bundles_finance_logo.jpg?1606294826',
  },
  {
    chainId: 1,
    address: '0x74fb9da15d4f9a34d8c825798da0fa5c400dade1',
    name: 'Cord DeFi',
    symbol: 'CORD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13221/small/cord_defi.png?1606299655',
  },
  {
    chainId: 1,
    address: '0x5dc02ea99285e17656b8350722694c35154db1e8',
    name: 'Bonded Finance',
    symbol: 'BOND',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13222/small/bonded_finance_logo.png?1606318433',
  },
  {
    chainId: 1,
    address: '0xb97faf860045483e0c7f08c56acb31333084a988',
    name: 'Vanilla Network',
    symbol: 'VNLA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13223/small/vanilla_network_logo.jpeg?1606352291',
  },
  {
    chainId: 1,
    address: '0x4f4f0ef7978737ce928bff395529161b44e27ad9',
    name: 'YfDFI Finance',
    symbol: 'YFD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13225/small/YFD.png?1606370364',
  },
  {
    chainId: 1,
    address: '0x6e742e29395cf5736c358538f0f1372ab3dfe731',
    name: 'TAMA EGG NiftyGotch',
    symbol: 'TME',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13229/small/photo_2020-11-13_02-42-40.jpg?1606446282',
  },
  {
    chainId: 1,
    address: '0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81',
    name: 'Muse',
    symbol: 'MUSE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13230/small/muse_logo.png?1606460453',
  },
  {
    chainId: 1,
    address: '0xb6ff96b8a8d214544ca0dbc9b33f7ad6503efd32',
    name: 'Sync Network',
    symbol: 'SYNC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13231/small/sync_network.png?1606468585',
  },
  {
    chainId: 1,
    address: '0x16980b3b4a3f9d89e33311b5aa8f80303e5ca4f8',
    name: 'KIRA Network',
    symbol: 'KEX',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/13232/small/kira_logo.jpg?1606570162',
  },
  {
    chainId: 1,
    address: '0x69e8b9528cabda89fe846c67675b5d73d463a916',
    name: 'OPEN Governance Tok',
    symbol: 'OPEN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13233/small/opendao_logo.png?1606575207',
  },
  {
    chainId: 1,
    address: '0x1456688345527be1f37e9e627da0837d6f08c925',
    name: 'USDP Stablecoin',
    symbol: 'USDP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13234/small/USDP.png?1606579598',
  },
  {
    chainId: 1,
    address: '0xa456b515303b2ce344e9d2601f91270f8c2fea5e',
    name: 'Cornichon',
    symbol: 'CORN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13235/small/cornichon.png?1606629943',
  },
  {
    chainId: 1,
    address: '0x6e1a19f235be7ed8e3369ef73b196c07257494de',
    name: 'Wrapped Filecoin',
    symbol: 'WFIL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13238/small/WFIL-Icon.png?1606630561',
  },
  {
    chainId: 1,
    address: '0x4a64515e5e1d1073e83f30cb97bed20400b66e10',
    name: 'Wrapped Zcash',
    symbol: 'WZEC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13239/small/WZEC-icon.png?1606630700',
  },
  {
    chainId: 1,
    address: '0x0def8d8adde14c9ef7c2a986df3ea4bd65826767',
    name: 'DefiCliq',
    symbol: 'CLIQ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13242/small/deficliq_logo.png?1606660146',
  },
  {
    chainId: 1,
    address: '0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7',
    name: 'SKALE',
    symbol: 'SKL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13245/small/SKALE_token_300x300.png?1606789574',
  },
  {
    chainId: 1,
    address: '0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a',
    name: 'Basis Cash',
    symbol: 'BAC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13246/small/BAC.jpg?1606708629',
  },
  {
    chainId: 1,
    address: '0xbd2f0cd039e0bfcf88901c98c0bfac5ab27566e3',
    name: 'Dynamic Set Dollar',
    symbol: 'DSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13249/small/DSD.jpg?1606713628',
  },
  {
    chainId: 1,
    address: '0x033e223870f766644f7f7a4b7dc2e91573707d06',
    name: 'Zin',
    symbol: 'ZIN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13250/small/coingecko_logo.png?1606716375',
  },
  {
    chainId: 1,
    address: '0xa7ed29b253d8b4e3109ce07c80fc570f81b63696',
    name: 'Basis Share',
    symbol: 'BAS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13251/small/BAS.png?1606718334',
  },
  {
    chainId: 1,
    address: '0x692eb773e0b5b7a79efac5a015c8b36a2577f65c',
    name: 'swiss finance',
    symbol: 'SWISS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13253/small/SWISS.png?1606724844',
  },
  {
    chainId: 1,
    address: '0xa0afaa285ce85974c3c881256cb7f225e3a1178a',
    name: 'Wrapped CrescoFin',
    symbol: 'WCRES',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13254/small/cres_logo.png?1606728821',
  },
  {
    chainId: 1,
    address: '0xd8e3fb3b08eba982f2754988d70d57edc0055ae6',
    name: 'Zoracles',
    symbol: 'ZORA',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13255/small/zora.png?1606747018',
  },
  {
    chainId: 1,
    address: '0x0b38210ea11411557c13457d4da7dc6ea731b88a',
    name: 'API3',
    symbol: 'API3',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13256/small/api3.jpg?1606751424',
  },
  {
    chainId: 1,
    address: '0x70401dfd142a16dc7031c56e862fc88cb9537ce0',
    name: 'Bird Money',
    symbol: 'BIRD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13260/small/bird.jpg?1606794789',
  },
  {
    chainId: 1,
    address: '0x3d995510f8d82c2ea341845932b5ddde0bead9a3',
    name: 'uLABS synthetic Gas',
    symbol: 'UGAS-JAN21',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13261/small/uma_logo.jpg?1606799190',
  },
  {
    chainId: 1,
    address: '0xcdeee767bed58c5325f68500115d4b722b3724ee',
    name: 'Carbon',
    symbol: 'CRBN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13262/small/CRBN_Icon_200.png?1606803750',
  },
  {
    chainId: 1,
    address: '0x226e390751a2e22449d611bac83bd267f2a2caff',
    name: 'STVKE',
    symbol: 'STV',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13264/small/stvke_network.png?1606813287',
  },
  {
    chainId: 1,
    address: '0x07150e919b4de5fd6a63de1f9384828396f25fdc',
    name: 'Base Protocol',
    symbol: 'BASE',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13265/small/200x200green.png?1607650121',
  },
  {
    chainId: 1,
    address: '0x8c18d6a985ef69744b9d57248a45c0861874f244',
    name: 'ClinTex CTi',
    symbol: 'CTI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13266/small/CTI.png?1606817542',
  },
  {
    chainId: 1,
    address: '0xee06a81a695750e71a662b51066f2c74cf4478a0',
    name: 'Decentral Games',
    symbol: 'DG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13267/small/Copy_of_DG_Coin_logo.png?1606834850',
  },
  {
    chainId: 1,
    address: '0xa883e72c12473ded50a5fbffa60e4000fa5fe3c8',
    name: 'LOAD Network',
    symbol: 'LOAD',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13270/small/load_network_logo.png?1606880512',
  },
  {
    chainId: 1,
    address: '0x558a069a3a1a1e72398607b9e3577fce1c67ea63',
    name: 'JPYQ Stablecoin by ',
    symbol: 'JPYQ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13271/small/1MMbEc4a.png?1606884873',
  },
  {
    chainId: 1,
    address: '0xb0bfb1e2f72511cf8b4d004852e2054d7b9a76e1',
    name: 'Streamix',
    symbol: 'MIXS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13275/small/stream.png?1606893790',
  },
  {
    chainId: 1,
    address: '0x70460c3bb9abcc0aa51f922c00d37816d6ede4d7',
    name: 'BooBanker Research ',
    symbol: 'BBRA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13280/small/bbra_logo.png?1606906062',
  },
  {
    chainId: 1,
    address: '0xa2ef2757d2ed560c9e3758d1946d7bcccbd5a7fe',
    name: 'Adventure Token',
    symbol: 'TWA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13284/small/twa_logo.jpg?1606979012',
  },
  {
    chainId: 1,
    address: '0x3f84c4184b35c488f7fe4a12469610c9b1cb03c9',
    name: 'PoolStake',
    symbol: 'PSK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13285/small/psk_logo.png?1606984935',
  },
  {
    chainId: 1,
    address: '0x875773784af8135ea0ef43b5a374aad105c5d39e',
    name: 'IDLE',
    symbol: 'IDLE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13286/small/token-logo.png?1607004948',
  },
  {
    chainId: 1,
    address: '0x3472a5a71965499acd81997a54bba8d852c6e53d',
    name: 'Badger DAO',
    symbol: 'BADGER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13287/small/badger_dao_logo.jpg?1607054976',
  },
  {
    chainId: 1,
    address: '0xf406f7a9046793267bc276908778b29563323996',
    name: 'APY vision',
    symbol: 'VISION',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13288/small/apyvisionlogo200circle.png?1607059042',
  },
  {
    chainId: 1,
    address: '0x09a3ecafa817268f77be1283176b946c4ff2e608',
    name: 'Mirror Protocol',
    symbol: 'MIR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13295/small/mirror_logo_transparent.png?1608535989',
  },
  {
    chainId: 1,
    address: '0xc9dfcd0a1dd2d7bb6fd2ef91a16a6a1c4e9846dd',
    name: 'Hype Bet',
    symbol: 'HYPEBET',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13296/small/Hype-Bet-Token-Logo.png?1607074281',
  },
  {
    chainId: 1,
    address: '0xc32cc5b70bee4bd54aa62b9aefb91346d18821c4',
    name: 'Iteration Syndicate',
    symbol: 'ITS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13297/small/1_LOssD4ENHv72I5e9PAsndA_%281%29.png?1607223580',
  },
  {
    chainId: 1,
    address: '0x275f5ad03be0fa221b4c6649b8aee09a42d9412a',
    name: 'Monavale',
    symbol: 'MONA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13298/small/monavale_logo.jpg?1607232721',
  },
  {
    chainId: 1,
    address: '0xe88f8313e61a97cec1871ee37fbbe2a8bf3ed1e4',
    name: 'Sora Validator Toke',
    symbol: 'VAL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13299/small/val-gold-256.png?1607242927',
  },
  {
    chainId: 1,
    address: '0xbaa70614c7aafb568a93e62a98d55696bcc85dfe',
    name: 'Unicap Finance',
    symbol: 'UCAP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13300/small/unicap256.png?1607308439',
  },
  {
    chainId: 1,
    address: '0x123151402076fc819b7564510989e475c9cd93ca',
    name: 'Wrapped DGLD',
    symbol: 'WDGLD',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13301/small/wrappeddgld_32.png?1607310693',
  },
  {
    chainId: 1,
    address: '0xa283aa7cfbb27ef0cfbcb2493dd9f4330e0fd304',
    name: 'MM Token',
    symbol: 'MM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13302/small/MM.jpg?1607315862',
  },
  {
    chainId: 1,
    address: '0x5b3f693efd5710106eb2eac839368364acb5a70f',
    name: 'Relayer Network  OL',
    symbol: 'RLR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13306/small/relayer_logo.jpg?1607327132',
  },
  {
    chainId: 1,
    address: '0x61266424b904d65ceb2945a1413ac322185187d5',
    name: 'YFIDapp',
    symbol: 'YFID',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13309/small/Untitled-design-9-removebg-preview.png?1607328419',
  },
  {
    chainId: 1,
    address: '0x34950ff2b487d9e5282c5ab342d08a2f712eb79f',
    name: 'Efforce',
    symbol: 'WOZX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13310/small/rZ6Oe3dm_400x400.jpg?1607331889',
  },
  {
    chainId: 1,
    address: '0x0222be1f1b8413b2d7d76ebfc9e0285c1300692f',
    name: 'Glox Finance',
    symbol: 'GLOX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13312/small/glox_finance.png?1607395418',
  },
  {
    chainId: 1,
    address: '0x1287c0509df9a475ef178471ab2132b9dfd312b3',
    name: 'LADZ',
    symbol: 'LADZ',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/13315/small/ladz_logo.jpg?1607408640',
  },
  {
    chainId: 1,
    address: '0x31be30217989766215672e88ed449913e05bf0f5',
    name: 'Groovy Finance',
    symbol: 'GVY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13320/small/Groovy-finance-Logo-A.png?1607415508',
  },
  {
    chainId: 1,
    address: '0x14c38e90a593b0bd5b7e9896a8ef4ae0a119d6ae',
    name: 'WAV3',
    symbol: 'WAV3',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13321/small/wav3_logo.jpeg?1607426650',
  },
  {
    chainId: 1,
    address: '0xd2dda223b2617cb616c1580db421e4cfae6a8a85',
    name: 'Bondly',
    symbol: 'BONDLY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13322/small/logomark.png?1607474416',
  },
  {
    chainId: 1,
    address: '0x881a7e25d44591c467a37da96adf3c3705e7251b',
    name: 'Elynet Token',
    symbol: 'ELYX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13326/small/KakaoTalk_20201208_102026847.png?1607483005',
  },
  {
    chainId: 1,
    address: '0xe1c7e30c42c24582888c758984f6e382096786bd',
    name: 'Curate',
    symbol: 'XCUR',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13327/small/xcur_logo.jpg?1607920655',
  },
  {
    chainId: 1,
    address: '0xd0d3ebcad6a20ce69bc3bc0e1ec964075425e533',
    name: 'Ethereum Stake',
    symbol: 'ETHYS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13328/small/eths_logo.png?1607494708',
  },
  {
    chainId: 1,
    address: '0xd084b83c305dafd76ae3e1b4e1f1fe2ecccb3988',
    name: 'Terra Virtua Kolect',
    symbol: 'TVK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13330/small/CoinGLogo.png?1607507042',
  },
  {
    chainId: 1,
    address: '0x6589fe1271a0f29346796c6baf0cdf619e25e58e',
    name: 'Grain',
    symbol: 'GRAIN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13331/small/784594063499853904.png?1607531032',
  },
  {
    chainId: 1,
    address: '0xb4bebd34f6daafd808f73de0d10235a92fbb6c3d',
    name: 'Yearn Ecosystem Tok',
    symbol: 'YETI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13332/small/yeti.png?1607563342',
  },
  {
    chainId: 1,
    address: '0xdcb01cc464238396e213a6fdd933e36796eaff9f',
    name: 'Yield',
    symbol: 'YLD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13336/small/yieldcredit-logo-1024.png?1607653444',
  },
  {
    chainId: 1,
    address: '0x244c5276ea5bb927575417156038d7381b44ab2c',
    name: 'Bridge Finance',
    symbol: 'BFR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13337/small/bridge_finance_logo.png?1607574570',
  },
  {
    chainId: 1,
    address: '0xa9a8377287ea9c6b8b4249dd502e75d34148fc5b',
    name: 'Stargaze Protocol',
    symbol: 'STGZ',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13339/small/stgz_protocol_logo.jpg?1607580880',
  },
  {
    chainId: 1,
    address: '0x054d64b73d3d8a21af3d764efd76bcaa774f3bb2',
    name: 'Plasma Finance',
    symbol: 'PPAY',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13340/small/Hi9sEGAD.png?1607586849',
  },
  {
    chainId: 1,
    address: '0xcbd380c2d84deafed09f79863705353505764f26',
    name: 'Emojis Farm',
    symbol: 'EMOJI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13341/small/emojis_farm.png?1607588447',
  },
  {
    chainId: 1,
    address: '0xc626e0619ac79afea9281c8eb9b1a9f9d3fab532',
    name: 'Freedom Reserve',
    symbol: 'FR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13342/small/J6uNL2FS_400x400.jpg?1607589046',
  },
  {
    chainId: 1,
    address: '0xe8b251822d003a2b2466ee0e38391c2db2048739',
    name: 'rbase finance',
    symbol: 'RBASE',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13343/small/rbase_logo.jpg?1607619337',
  },
  {
    chainId: 1,
    address: '0xa4e7414fcba1af15203030c6daac630df8f16aea',
    name: 'Meme Cash',
    symbol: 'MCH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13344/small/memecash_logo.png?1607654879',
  },
  {
    chainId: 1,
    address: '0xba358b6f5b4c0215650444b8c30d870b55050d2d',
    name: 'Hub Token',
    symbol: 'HUB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13345/small/Hub-Logo-Transparent-BG-200x200_%281%29.png?1607661813',
  },
  {
    chainId: 1,
    address: '0x24e3794605c84e580eea4972738d633e8a7127c8',
    name: 'Katalyo',
    symbol: 'KTLYO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13347/small/katalyo_logo_aqua_256.png?1607762430',
  },
  {
    chainId: 1,
    address: '0x35872fea6a4843facbcdbce99e3b69596a3680b8',
    name: '1337',
    symbol: '1337',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/13348/small/logo.png?1607791847',
  },
  {
    chainId: 1,
    address: '0xeda6efe5556e134ef52f2f858aa1e81c84cda84b',
    name: 'Capital finance',
    symbol: 'CAP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13351/small/Untitled-design-4-removebg-preview-2.png?1607811346',
  },
  {
    chainId: 1,
    address: '0xc0a25a24cce412e2fb407c08e3785437fee9ad1d',
    name: 'Orient',
    symbol: 'OFT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13354/small/40FJ03N.png?1607812101',
  },
  {
    chainId: 1,
    address: '0x40e7705254494a7e61d5b7c86da50225ddc3daae',
    name: 'yplutus',
    symbol: 'YPLT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13358/small/ypltblack-01.png?1607826916',
  },
  {
    chainId: 1,
    address: '0x92e187a03b6cd19cb6af293ba17f2745fd2357d5',
    name: 'Unit Protocol New',
    symbol: 'DUCK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13359/small/unit_telegram.png?1607878022',
  },
  {
    chainId: 1,
    address: '0x4bae380b5d762d543d426331b8437926443ae9ec',
    name: 'XVIX',
    symbol: 'XVIX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13364/small/xvix_logo.png?1607914655',
  },
  {
    chainId: 1,
    address: '0xf94b5c5651c888d928439ab6514b93944eee6f48',
    name: 'YIELD App',
    symbol: 'YLD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13365/small/Icon_Blue.png?1607917500',
  },
  {
    chainId: 1,
    address: '0x98ad9b32dd10f8d8486927d846d4df8baf39abe2',
    name: 'VELO Token',
    symbol: 'VLO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13366/small/velo_token_logo.png?1607918558',
  },
  {
    chainId: 1,
    address: '0xa30189d8255322a2f8b2a77906b000aeb005570c',
    name: 'Buy Sell',
    symbol: 'BSE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13368/small/buy_sell_logo.png?1607927143',
  },
  {
    chainId: 1,
    address: '0x3aa5f749d4a6bcf67dac1091ceb69d1f5d86fa53',
    name: 'Deflect',
    symbol: 'DEFLCT',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13369/small/deflect_logo.jpg?1609223085',
  },
  {
    chainId: 1,
    address: '0x940bdcb99a0ee5fb008a606778ae87ed9789f257',
    name: 'JFIN Coin',
    symbol: 'JFIN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13370/small/JFin-Coin-Logo.png?1607984823',
  },
  {
    chainId: 1,
    address: '0x167e2a574669b0eeb552aaf3da47c728cb348a41',
    name: 'Spartan',
    symbol: '300',
    decimals: 7,
    logoURI:
      'https://assets.coingecko.com/coins/images/13371/small/spartan300-200x200.png?1607986424',
  },
  {
    chainId: 1,
    address: '0xd8c82fbc4d8ed0644a7ec04cf973e84c6153c1d7',
    name: 'Rizen Coin',
    symbol: 'RZN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13373/small/rizen_coin.jpg?1608003096',
  },
  {
    chainId: 1,
    address: '0x47c0ad2ae6c0ed4bcf7bc5b380d7205e89436e84',
    name: 'rHegic',
    symbol: 'RHEGIC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13374/small/hegic_logo.jpg?1608006964',
  },
  {
    chainId: 1,
    address: '0xd5147bc8e386d91cc5dbe72099dac6c9b99276f5',
    name: 'renFIL',
    symbol: 'RENFIL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13375/small/renFIL.png?1608014942',
  },
  {
    chainId: 1,
    address: '0x4e085036a1b732cbe4ffb1c12ddfdd87e7c3664d',
    name: 'Predictz',
    symbol: 'PRDZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13376/small/Predictz_Transperant.png?1608021631',
  },
  {
    chainId: 1,
    address: '0x622f2962ae78e8686ecc1e30cf2f9a6e5ac35626',
    name: 'Wrapped Polis',
    symbol: 'POLIS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13377/small/polispay_logo.jpg?1608027141',
  },
  {
    chainId: 1,
    address: '0xbcd4b7de6fde81025f74426d43165a5b0d790fdd',
    name: 'SpiderDAO',
    symbol: 'SPDR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13378/small/spiderdao_logo.png?1608029180',
  },
  {
    chainId: 1,
    address: '0xc299004a310303d1c0005cb14c70ccc02863924d',
    name: 'Trinity Protocol',
    symbol: 'TRI',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13379/small/trinity_logo.png?1608030983',
  },
  {
    chainId: 1,
    address: '0x755be920943ea95e39ee2dc437b268917b580d6e',
    name: 'VersoView',
    symbol: 'VVT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13380/small/HkfxEtWh_400x400.jpg?1608031723',
  },
  {
    chainId: 1,
    address: '0x04ab43d32d0172c76f5287b6619f0aa50af89303',
    name: 'Unilock Network',
    symbol: 'UNL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13381/small/unilock_logo.png?1608074688',
  },
  {
    chainId: 1,
    address: '0xba7b2c094c1a4757f9534a37d296a3bed7f544dc',
    name: 'HLand Token',
    symbol: 'HLAND',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13385/small/HLAND_LOGO.png?1608085636',
  },
  {
    chainId: 1,
    address: '0x32c868f6318d6334b2250f323d914bc2239e4eee',
    name: 'N3RD Finance',
    symbol: 'N3RDZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13389/small/logo.png?1608195840',
  },
  {
    chainId: 1,
    address: '0x68e0a48d3bff6633a31d1d100b70f93c3859218b',
    name: 'Blaze DeFi',
    symbol: 'BNFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13390/small/photo_2020-12-16_15-23-59.jpg?1608108829',
  },
  {
    chainId: 1,
    address: '0xcaeaf8381d4b20b43afa42061d6f80319a8881f6',
    name: 'R34P',
    symbol: 'R34P',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13393/small/r34p_logo.png?1608100330',
  },
  {
    chainId: 1,
    address: '0xe0bdaafd0aab238c55d68ad54e616305d4a21772',
    name: 'Refract',
    symbol: 'RFR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13394/small/refract_logo.png?1608108926',
  },
  {
    chainId: 1,
    address: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
    name: 'The Graph',
    symbol: 'GRT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png?1608145566',
  },
  {
    chainId: 1,
    address: '0x1fdab294eda5112b7d066ed8f2e4e562d5bcc664',
    name: 'SPICE',
    symbol: 'SPICE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13398/small/scifi_logo.png?1608160393',
  },
  {
    chainId: 1,
    address: '0x739763a258640919981f9ba610ae65492455be53',
    name: 'Node Runners',
    symbol: 'NDR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13400/small/ndr.jpg?1608172954',
  },
  {
    chainId: 1,
    address: '0x16b1eb8b8e9058800bf0ba3684f805a6711a1d2c',
    name: 'Reflector Finance',
    symbol: 'RFCTR',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13402/small/reflector-logo-coingecko.png?1608175370',
  },
  {
    chainId: 1,
    address: '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb',
    name: 'ankrETH',
    symbol: 'AETH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13403/small/ankr.png?1608764406',
  },
  {
    chainId: 1,
    address: '0xb4d930279552397bba2ee473229f89ec245bc365',
    name: 'MahaDAO',
    symbol: 'MAHA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13404/small/mahadao.jpg?1608373356',
  },
  {
    chainId: 1,
    address: '0xf4c05296c449edcee3e3f1524fac919510b168a2',
    name: 'Absorber',
    symbol: 'ABS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13405/small/absorber_protocol_logo.png?1608192726',
  },
  {
    chainId: 1,
    address: '0x3863ea7577fc91bfbaeae6a6a3e403524afcf787',
    name: 'xETH G',
    symbol: 'XETH-G',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13406/small/xETH-logo-mobile-e1608208725285.png?1608251162',
  },
  {
    chainId: 1,
    address: '0x226f7b842e0f0120b7e194d05432b3fd14773a9d',
    name: 'UNION Protocol Gove',
    symbol: 'UNN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13408/small/unn_finance.png?1608262290',
  },
  {
    chainId: 1,
    address: '0x7a3d5d49d64e57dbd6fbb21df7202bd3ee7a2253',
    name: 'Tornado Core',
    symbol: 'TCORE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13412/small/tcore.jpeg?1609238107',
  },
  {
    chainId: 1,
    address: '0x7b3d36eb606f873a75a6ab68f8c999848b04f935',
    name: 'NFTLootBox',
    symbol: 'LOOT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13414/small/nftlootbox.png?1608280539',
  },
  {
    chainId: 1,
    address: '0xcae72a7a0fd9046cf6b165ca54c9e3a3872109e0',
    name: 'AnRKey X',
    symbol: 'ANRX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13415/small/anrkey.jpg?1608311301',
  },
  {
    chainId: 1,
    address: '0x70a6d0d1561ba98711e935a76b1c167c612978a2',
    name: 'Dragonfly Protocol',
    symbol: 'DFLY',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13416/small/dfly_logo.png?1608341835',
  },
  {
    chainId: 1,
    address: '0x0c63cae5fcc2ca3dde60a35e50362220651ebec8',
    name: 'stakedXEM',
    symbol: 'STXEM',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13417/small/stakedXEM_high_res.png?1608389932',
  },
  {
    chainId: 1,
    address: '0x08e411220e47e3fc43bfb832186aba95108f2861',
    name: 'Eclipseum',
    symbol: 'ECL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13418/small/eclipseum_logo.png?1608429994',
  },
  {
    chainId: 1,
    address: '0x21f54372c07b930b79c5c2d9bb0eaaca86c3b298',
    name: 'Banana Finance',
    symbol: 'BANANA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13419/small/bananacoin.png?1608446599',
  },
  {
    chainId: 1,
    address: '0xaf162491c0b21900c01f4cc0f7110238aacdebe7',
    name: 'arcane bear',
    symbol: 'BEAR',
    decimals: 4,
    logoURI:
      'https://assets.coingecko.com/coins/images/13421/small/arcane_bear_logo.png?1608476062',
  },
  {
    chainId: 1,
    address: '0x853d955acef822db058eb8505911ed77f175b99e',
    name: 'Frax',
    symbol: 'FRAX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13422/small/frax_logo.png?1608476506',
  },
  {
    chainId: 1,
    address: '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0',
    name: 'Frax Share',
    symbol: 'FXS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13423/small/frax_share.png?1608478989',
  },
  {
    chainId: 1,
    address: '0x7d25d9f10cd224ecce0bc824a2ec800db81c01d7',
    name: 'ETHOPT',
    symbol: 'OPT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13424/small/KHP6ebV.jpeg?1608514202',
  },
  {
    chainId: 1,
    address: '0x06a01a4d579479dd5d884ebf61a31727a3d8d442',
    name: 'SmartKey',
    symbol: 'SKEY',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13425/small/smart-key_sign-256.png?1608531133',
  },
  {
    chainId: 1,
    address: '0x4efe8665e564bf454ccf5c90ee16817f7485d5cf',
    name: 'BlackDragon Token',
    symbol: 'BDT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13426/small/Black-Dragon-Black.png?1608515220',
  },
  {
    chainId: 1,
    address: '0xe4ae84448db5cfe1daf1e6fb172b469c161cb85f',
    name: 'Utopia Genesis Foun',
    symbol: 'UOP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13428/small/logo_%2830%29.png?1608518506',
  },
  {
    chainId: 1,
    address: '0x21bfbda47a0b4b5b1248c767ee49f7caa9b23697',
    name: 'Ovr',
    symbol: 'OVR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13429/small/ovr_logo.png?1608518911',
  },
  {
    chainId: 1,
    address: '0x1cc0744c5106bb47a61c4e41f517cb6f1c49b547',
    name: 'Chalice Finance',
    symbol: 'CHAL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13432/small/chalice_logo.png?1608526094',
  },
  {
    chainId: 1,
    address: '0x68e8a20128e1902c02f533a02ed0cfd8396e3fbc',
    name: 'Aries Financial',
    symbol: 'AFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13433/small/aries.png?1608528510',
  },
  {
    chainId: 1,
    address: '0x7f0c8b125040f707441cad9e5ed8a8408673b455',
    name: 'CSP DAO Network',
    symbol: 'NEBO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13436/small/csp_dao.png?1608535699',
  },
  {
    chainId: 1,
    address: '0x168e39f96a653ce0a456560687241b0b2936e5ff',
    name: '2Based Finance',
    symbol: '2BASED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13439/small/2based.jpg?1608564864',
  },
  {
    chainId: 1,
    address: '0xc0ba369c8db6eb3924965e5c4fd0b4c1b91e305f',
    name: 'DLP Duck Token',
    symbol: 'DUCK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13440/small/DLP_DUCK.png?1608566269',
  },
  {
    chainId: 1,
    address: '0xc567bca531992352166252ea5121e535432e81ed',
    name: 'Tartarus',
    symbol: 'TAR',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13441/small/tartarus_logo.png?1608603011',
  },
  {
    chainId: 1,
    address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    name: 'Staked Ether',
    symbol: 'STETH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13442/small/steth_logo.png?1608607546',
  },
  {
    chainId: 1,
    address: '0xac00797df10e825589d8b53e715393be4e617459',
    name: 'Bubble Network',
    symbol: 'BBL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13443/small/bubble_network_logo.png?1608612666',
  },
  {
    chainId: 1,
    address: '0x4185cf99745b2a20727b37ee798193dd4a56cdfa',
    name: 'DEUS Synthetic Coin',
    symbol: 'WCOINBASE-IOU',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13444/small/coinbase-black.png?1608629833',
  },
  {
    chainId: 1,
    address: '0xe0ad1806fd3e7edf6ff52fdb822432e847411033',
    name: 'OnX Finance',
    symbol: 'ONX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13445/small/onxlogo-1.png?1608629659',
  },
  {
    chainId: 1,
    address: '0xe8d17542dfe79ff4fbd4b850f2d39dc69c4489a2',
    name: 'KiloAmple',
    symbol: 'KMPL',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13449/small/kappa_logo.png?1608681544',
  },
  {
    chainId: 1,
    address: '0x3a880652f47bfaa771908c07dd8673a787daed3a',
    name: 'DerivaDAO',
    symbol: 'DDX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13453/small/ddx_logo.png?1608741641',
  },
  {
    chainId: 1,
    address: '0x0000000000095413afc295d19edeb1ad7b71c952',
    name: 'Tokenlon',
    symbol: 'LON',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13454/small/lon_logo.png?1608701720',
  },
  {
    chainId: 1,
    address: '0x7e32c8727cc19dd59a7a4d01b95ae1cbfc8f4c77',
    name: 'Aqua',
    symbol: 'AQUA',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13455/small/aqua10-white-round.png?1608712198',
  },
  {
    chainId: 1,
    address: '0x93dfaf57d986b9ca77df9376c50878e013d9c7c8',
    name: 'Unique One',
    symbol: 'RARE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13458/small/logo_cmc.png?1608823808',
  },
  {
    chainId: 1,
    address: '0xfebc25f4c5fc3e90a7efae0b4d436a77c9e131b3',
    name: 'Cezo',
    symbol: 'CEZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13461/small/2_hj7B4Z_400x400.jpg?1608764687',
  },
  {
    chainId: 1,
    address: '0x4a7adcb083fe5e3d6b58edc3d260e2e61668e7a2',
    name: 'Trade Butler Bot',
    symbol: 'TBB',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13462/small/L9km5LC5ZKpTey0UKcTMt9xbXw_Q0Nq8F119_QjJlqLHvuxLK6vb_VjxHtXYczia0DHXHSxhtCFUCVyMBBxJNw_-tkS3FTpoeEFs7EHuxrxs7b2hV_se2JzisurH7YQmRjXIq3wG6Va6zv90ug_uRGeuk-VoAfck7rBdnoUCGL-Xfmz7AySAn6SUVToUCtwObez36TEADBc7AR9.jpg?1608766426',
  },
  {
    chainId: 1,
    address: '0x92ece48522e1acbcda4aaa8c2fbf2aa9fb15d624',
    name: 'Rocki',
    symbol: 'ROCKS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13465/small/rocki_logo.png?1608786767',
  },
  {
    chainId: 1,
    address: '0x239119c43e3cac84c8a2d45bcba0e46f528e5f77',
    name: 'Dripper',
    symbol: 'DRIP',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13468/small/drip-stretch-200.png?1608796810',
  },
  {
    chainId: 1,
    address: '0x111111111117dc0aa78b770fa6a738034120c302',
    name: '1inch',
    symbol: '1INCH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13469/small/1inch-token.png?1608803028',
  },
  {
    chainId: 1,
    address: '0xec681f28f4561c2a9534799aa38e0d36a83cf478',
    name: 'YVS Finance',
    symbol: 'YVS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13471/small/cu0LSzE.png?1608852718',
  },
  {
    chainId: 1,
    address: '0xcd1cb16a67937ff8af5d726e2681010ce1e9891a',
    name: 'Themis',
    symbol: 'MIS',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13478/small/3uZAPv2CbXF5txM.png?1608947522',
  },
  {
    chainId: 1,
    address: '0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17',
    name: 'DeFi Yield Protocol',
    symbol: 'DYP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13480/small/dyp_logo.png?1608971751',
  },
  {
    chainId: 1,
    address: '0xb5fe099475d3030dde498c3bb6f3854f762a48ad',
    name: 'Finiko',
    symbol: 'FNK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13483/small/fnk.png?1609039834',
  },
  {
    chainId: 1,
    address: '0x5f0e628b693018f639d10e4a4f59bd4d8b2b6b44',
    name: 'Whiteheart',
    symbol: 'WHITE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13484/small/whiteheart.png?1609076548',
  },
  {
    chainId: 1,
    address: '0x861b2456ac1a6ab5fb5c72aa456091f23ddec1cc',
    name: 'Vaultz',
    symbol: 'VAULTZ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13488/small/vaultz_logo.jpg?1609112163',
  },
  {
    chainId: 1,
    address: '0x6417e8673dedd7a0471a87804bf85a559fd8bcc2',
    name: 'Aura Protocol',
    symbol: 'AURA',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13491/small/aura_protocol_logo.png?1609124742',
  },
  {
    chainId: 1,
    address: '0x52d904eff2605463c2f0b338d34abc9b7c3e3b08',
    name: 'Bitpower',
    symbol: 'BPP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13492/small/Bitpower_%28200x200%29.png?1609134732',
  },
  {
    chainId: 1,
    address: '0xf921ae2dac5fa128dc0f6168bf153ea0943d2d43',
    name: 'Fire Protocol',
    symbol: 'FIRE',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13495/small/fire.jpg?1609165121',
  },
  {
    chainId: 1,
    address: '0xb15ae165000c8d7b69d2a82e425e110668c73ad5',
    name: 'LinkBased',
    symbol: 'LBD',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13506/small/linkbased_logo.jpg?1609224548',
  },
  {
    chainId: 1,
    address: '0x96cf107e446a6e528ffd045f4eb6dff3cdb6a666',
    name: '3XT',
    symbol: '3XT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13507/small/3XT.jpg?1609225380',
  },
  {
    chainId: 1,
    address: '0x7a2bc711e19ba6aff6ce8246c546e8c4b4944dfd',
    name: 'WAXE',
    symbol: 'WAXE',
    decimals: 8,
    logoURI:
      'https://assets.coingecko.com/coins/images/13508/small/waxe_logo.png?1609232755',
  },
  {
    chainId: 1,
    address: '0xad808e7a446f14a109dafce7dd2fe7ae7ff86b20',
    name: 'Bafi Finance Token',
    symbol: 'BAFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13512/small/logo_-_2020-12-30T063720.124.png?1609281475',
  },
  {
    chainId: 1,
    address: '0x3fa400483487a489ec9b1db29c4129063eec4654',
    name: 'CryptoKek',
    symbol: 'KEK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13513/small/Cryptokek-Logo-256px.png?1609292074',
  },
  {
    chainId: 1,
    address: '0xee573a945b01b788b9287ce062a0cfc15be9fd86',
    name: 'Exeedme',
    symbol: 'XED',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13518/small/xed.jpg?1609337806',
  },
  {
    chainId: 1,
    address: '0x63b8b7d4a3efd0735c4bffbd95b332a55e4eb851',
    name: 'DigiCol Token',
    symbol: 'DGCL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13519/small/DigiCol_Logo-01.png?1609372199',
  },
  {
    chainId: 1,
    address: '0x0e3ef895c59e7db27214ab5bbf56347ce115a3f4',
    name: 'Relayer Network',
    symbol: 'RLR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13523/small/rlr_logo.jpg?1609385448',
  },
  {
    chainId: 1,
    address: '0x544288176bb6d7d198302a2d18fad38442e69b25',
    name: 'Gains Farm',
    symbol: 'GFARM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13528/small/gains_farm_logo.png?1609401001',
  },
  {
    chainId: 1,
    address: '0xd90e69f67203ebe02c917b5128629e77b4cd92dc',
    name: 'One Cash',
    symbol: 'ONC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13529/small/onc_logo.png?1609406029',
  },
  {
    chainId: 1,
    address: '0x03066da434e5264ef0b32f787923f974a5726fdc',
    name: 'Basis Coin Share',
    symbol: 'BCS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13530/small/Basiscoin_Share.png?1609406623',
  },
  {
    chainId: 1,
    address: '0x5bb29c33c4a3c29f56f8aca40b4db91d8a5fe2c5',
    name: 'One Share',
    symbol: 'ONS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13531/small/bss.a1671c75.png?1609452258',
  },
  {
    chainId: 1,
    address: '0xb4467e8d621105312a914f1d42f10770c0ffe3c8',
    name: 'Flashstake',
    symbol: 'FLASH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13533/small/Flashstake.png?1609730156',
  },
  {
    chainId: 1,
    address: '0xae17f4f5ca32f77ea8e3786db7c0b2fe877ac176',
    name: 'Basis Coin Cash',
    symbol: 'BCC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13535/small/yiu47vtN_400x400.jpg?1609541472',
  },
  {
    chainId: 1,
    address: '0x9b02dd390a603add5c07f9fd9175b7dabe8d63b7',
    name: 'Shopping io',
    symbol: 'SPI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13537/small/vd4KuYIE_400x400.png?1609578616',
  },
  {
    chainId: 1,
    address: '0x54ee01beb60e745329e6a8711ad2d6cb213e38d7',
    name: 'DefiSocial',
    symbol: 'DFSOCIAL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13538/small/o91UuwtD_400x400.jpg?1609578301',
  },
  {
    chainId: 1,
    address: '0x350a6a30c79df3600c4e0e67deab0a64b645e2c2',
    name: 'StrongHold',
    symbol: 'STRNG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13540/small/strng.png?1609599778',
  },
  {
    chainId: 1,
    address: '0x790baf0c914898c62163a61f150637d4bd180697',
    name: 'Nirvana',
    symbol: 'VANA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13541/small/vana.jpg?1609602820',
  },
  {
    chainId: 1,
    address: '0xacd8f2523a4613eee78904354187c81bb05ae2b8',
    name: 'Stand Cash',
    symbol: 'SAC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13542/small/sac.jpg?1609648101',
  },
  {
    chainId: 1,
    address: '0x4c38d0e726b6c86f64c1b281348e725973542043',
    name: 'Stand Share',
    symbol: 'SAS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13543/small/sac.jpg?1609648278',
  },
  {
    chainId: 1,
    address: '0x834ce7ad163ab3be0c5fd4e0a81e67ac8f51e00c',
    name: 'Polkainsure Finance',
    symbol: 'PIS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13544/small/Logo_Polkainsure___Final-200x200-01.png?1609686092',
  },
  {
    chainId: 1,
    address: '0x74159651a992952e2bf340d7628459aa4593fc05',
    name: 'Tenet',
    symbol: 'TEN',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13545/small/iMqC3F_p_400x400.png?1609711856',
  },
  {
    chainId: 1,
    address: '0x374cb8c27130e2c9e04f44303f3c8351b9de61c1',
    name: 'Bao Finance',
    symbol: 'BAO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13547/small/bao.PNG?1609713518',
  },
  {
    chainId: 1,
    address: '0x56b4f8c39e07d4d5d91692acf9d0f6d4d3493763',
    name: 'Trism',
    symbol: 'TRISM',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13549/small/76106366.png?1609715454',
  },
  {
    chainId: 1,
    address: '0x66a0f676479cee1d7373f3dc2e2952778bff5bd6',
    name: 'Wise',
    symbol: 'WISE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13552/small/WISE-logo-1600x1280.png?1609727947',
  },
  {
    chainId: 1,
    address: '0x4846239fdf4d4c1aeb26729fa064b0205aca90e1',
    name: 'True Seigniorage Do',
    symbol: 'TSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13555/small/2dc3a1b1-41fd-4d9c-ba1d-8114635efd09.jpg?1609754836',
  },
  {
    chainId: 1,
    address: '0xfce94fde7ac091c2f1db00d62f15eeb82b624389',
    name: 'Noah s Ark',
    symbol: 'NOAHARK',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13557/small/Gc6kz-5a.png?1609769750',
  },
  {
    chainId: 1,
    address: '0xe452e6ea2ddeb012e20db73bf5d3863a3ac8d77a',
    name: 'Wrapped CELO',
    symbol: 'WCELO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13561/small/WCELO-Icon.jpg?1609819515',
  },
  {
    chainId: 1,
    address: '0x4688a8b1f292fdab17e9a90c8bc379dc1dbd8713',
    name: 'Cover Protocol',
    symbol: 'COVER',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13563/small/1_eWBbDaqpxXqt7WYPSP4qSw.jpeg?1609822578',
  },
  {
    chainId: 1,
    address: '0xc888a0ab4831a29e6ca432babf52e353d23db3c2',
    name: 'FastSwap',
    symbol: 'FAST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13567/small/logo.png?1609834317',
  },
  {
    chainId: 1,
    address: '0x9d1233cc46795e94029fda81aaadc1455d510f15',
    name: 'Zero Collateral Dai',
    symbol: 'ZAI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13569/small/zai_logo.png?1609844802',
  },
  {
    chainId: 1,
    address: '0x2186ecb39f1b765ba7d78f1c43c2e9d7fc0c1eca',
    name: 'My Crypto Play',
    symbol: 'MCP',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13570/small/Ysv6EyvR_400x400.jpg?1609845061',
  },
  {
    chainId: 1,
    address: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
    name: 'Lido DAO',
    symbol: 'LDO',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13573/small/Lido_DAO.png?1609873644',
  },
  {
    chainId: 1,
    address: '0x87d73e916d7057945c9bcd8cdd94e42a6f47f776',
    name: 'NFTX',
    symbol: 'NFTX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13574/small/nftx.png?1609880030',
  },
  {
    chainId: 1,
    address: '0xc005204856ee7035a13d8d7cdbbdc13027afff90',
    name: 'MoneySwap',
    symbol: 'MSWAP',
    decimals: 0,
    logoURI:
      'https://assets.coingecko.com/coins/images/13576/small/logo_%281%29.png?1609888424',
  },
  {
    chainId: 1,
    address: '0xcb4e8cafeda995da5cedfda5205bd5664a12b848',
    name: 'Shabu Shabu',
    symbol: 'KOBE',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13577/small/shabu_shabu_logo.jpg?1609901993',
  },
  {
    chainId: 1,
    address: '0x93ed140172ff226dad1f7f3650489b8daa07ae7f',
    name: 'zzz finance v2',
    symbol: 'ZZZV2',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13584/small/zzz_finance.jpg?1609919864',
  },
  {
    chainId: 1,
    address: '0xe4815ae53b124e7263f08dcdbbb757d41ed658c6',
    name: 'ZKSwap',
    symbol: 'ZKS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13585/small/hfmvDpha_400x400.jpg?1609922062',
  },
  {
    chainId: 1,
    address: '0x15e4132dcd932e8990e794d1300011a472819cbd',
    name: 'GRPL Finance',
    symbol: 'GRPL',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13586/small/GRPL.png?1609927724',
  },
  {
    chainId: 1,
    address: '0x17c090f9a17e4e5a8ceb23bbe7e7e28e3c4ca196',
    name: 'BitDNS',
    symbol: 'DNS',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13590/small/T_t9CFf6_400x400.png?1609981076',
  },
  {
    chainId: 1,
    address: '0x3f5be50e4651ee184109a0b1b71d344d12e8b603',
    name: 'RFYield Finance',
    symbol: 'RFY',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13591/small/3QVx5Fp.png?1609983766',
  },
  {
    chainId: 1,
    address: '0xeabb8996ea1662cad2f7fb715127852cd3262ae9',
    name: 'Connect Financial',
    symbol: 'CNFI',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13592/small/Connect_Financial.png?1609993203',
  },
  {
    chainId: 1,
    address: '0x3f344c88d823f180fb8b44a3c7cfc4edc92dfa35',
    name: 'Definex',
    symbol: 'DSWAP',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/13593/small/cjZjhY3w_400x400.png?1609998112',
  },
  {
    chainId: 1,
    address: '0xa5a2af22eac6f050227d844b108c2b2a011fd329',
    name: 'Tunnel Protocol',
    symbol: 'TNI',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13598/small/tni_logo.png?1610006256',
  },
  {
    chainId: 1,
    address: '0xedeec5691f23e4914cf0183a4196bbeb30d027a0',
    name: 'Wrapped Statera',
    symbol: 'WSTA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13599/small/wsta_logo.png?1610011862',
  },
  {
    chainId: 1,
    address: '0xf0196985601598a35a48606b643fd2c34fb861e1',
    name: 'Eternal Cash',
    symbol: 'EC',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13601/small/eternal_cash_logo.png?1610095491',
  },
  {
    chainId: 1,
    address: '0x7eaf9c89037e4814dc0d9952ac7f888c784548db',
    name: 'Royale',
    symbol: 'ROYA',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13602/small/royale_logo.jpg?1610176118',
  },
  {
    chainId: 1,
    address: '0xd27af03cb73a29ee2f37194c70c4ee13b68fe8cb',
    name: 'Freq Set Dollar',
    symbol: 'FSD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13603/small/fsd.jpg?1610251925',
  },
  {
    chainId: 1,
    address: '0x5cf9242493be1411b93d064ca2e468961bbb5924',
    name: 'Empty Set Gold',
    symbol: 'ESG',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13604/small/esg.jpg?1610252594',
  },
  {
    chainId: 1,
    address: '0xf0e3543744afced8042131582f2a19b6aeb82794',
    name: 'Variable Time Dolla',
    symbol: 'VTD',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13608/small/vtd.jpg?1610273963',
  },
  {
    chainId: 1,
    address: '0xfa9c3dc54baa9eefbe9453b1f3b3b93ad2af0a77',
    name: 'Dynamic Supply',
    symbol: 'DST',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13609/small/dst.jpg?1610274254',
  },
  {
    chainId: 1,
    address: '0x55696efc7c9779d868ac34ac6b4a4c5fed61ac12',
    name: 'Dynamic Supply Trac',
    symbol: 'DSTR',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13610/small/DSTR.png?1610341247',
  },
  {
    chainId: 1,
    address: '0x9c664f20c0a00a4949dffca76748c02754c875aa',
    name: 'Yearn Shark Finance',
    symbol: 'YSKF',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13614/small/IMG-20201203-122807-053.png?1610287099',
  },
  {
    chainId: 1,
    address: '0x10be9a8dae441d276a5027936c3aaded2d82bc15',
    name: 'UniMex Network',
    symbol: 'UMX',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13615/small/Z2eXJv5.png?1610324894',
  },
  {
    chainId: 1,
    address: '0x6d0f5149c502faf215c89ab306ec3e50b15e2892',
    name: 'Portion',
    symbol: 'PRT',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13617/small/OKeO2FI.png?1610327038',
  },
  {
    chainId: 1,
    address: '0x5166d4ce79b9bf7df477da110c560ce3045aa889',
    name: 'Xdef Finance',
    symbol: 'XDEF2',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13619/small/xdef.png?1610330383',
  },
  {
    chainId: 1,
    address: '0x0b66015bc42601d5986b540373b4e02d7383c7c1',
    name: 'Fission Cash',
    symbol: 'FCX',
    decimals: 9,
    logoURI:
      'https://assets.coingecko.com/coins/images/13620/small/FCX-Logo-W-e1609294744561.png?1610333962',
  },
  {
    chainId: 1,
    address: '0x73d9e335669462cbdd6aa3adafe9efee86a37fe9',
    name: 'Daiquilibrium',
    symbol: 'DAIQ',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/13626/small/BicSg26r_400x400.png?1610418623',
  },
  {
    chainId: 1,
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    name: 'WETH',
    symbol: 'WETH',
    decimals: 18,
    logoURI:
      'https://assets.coingecko.com/coins/images/2518/small/weth.png?1547036627',
  },
];
