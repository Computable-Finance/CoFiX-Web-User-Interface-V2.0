import {
  Fetcher,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType,
  WETH,
} from '@uniswap/sdk';
import { getContractAddressListByNetwork } from '../common/constants';

import { ethersOf, parseUnits } from '../common/uitils/bignumber-utils';

export type TokenInfo = {
  network: number;
  address: string;
  decimals: number;
};

function token(tokenInfo: TokenInfo) {
  return new Token(tokenInfo.network, tokenInfo.address, tokenInfo.decimals);
}

function wethToken(network: number) {
  if (network === 1) {
    return WETH[network];
  } else {
    return new Token(
      network,
      getContractAddressListByNetwork(network).WETH9,
      18
    );
  }
}

async function executionPriceAndMinimumAmountOut(
  fromToken: TokenInfo,
  toToken: TokenInfo,
  amountIn: string,
  provider
) {
  const tokenIn = fromToken ? token(fromToken) : wethToken(toToken.network);
  const tokenOut = toToken ? token(toToken) : wethToken(fromToken.network);
  const pair = await Fetcher.fetchPairData(tokenIn, tokenOut, provider);
  const route = new Route([pair], tokenIn);
  const trade = new Trade(
    route,
    new TokenAmount(tokenIn, parseUnits(amountIn, tokenIn.decimals).toString()),
    TradeType.EXACT_INPUT
  );
  // const slippageTolerance = new Percent('50', '10000');
  // const amountOutMin = ethersOf(
  //   trade.minimumAmountOut(slippageTolerance).raw.toString()
  // );
  return {
    excutionPrice: trade.executionPrice.toSignificant(8),
    amountOut: ethersOf(trade.outputAmount.raw.toString()),
  };
}

export async function executionPriceAndAmountOutByERC202ETHThroughUniswap(
  fromToken: TokenInfo,
  amountIn: string,
  provider
) {
  return await executionPriceAndMinimumAmountOut(
    fromToken,
    undefined,
    amountIn,
    provider
  );
}

export async function executionPriceAndAmountOutByETH2ERC20ThroughUniswap(
  toToken: TokenInfo,
  amountIn: string,
  provider
) {
  return await executionPriceAndMinimumAmountOut(
    undefined,
    toToken,
    amountIn,
    provider
  );
}
