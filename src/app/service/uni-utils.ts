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

import { parseUnits } from '../common/uitils/bignumber-utils';

export type TokenInfo = {
  network: number;
  address: string;
  decimals: number;
};

function token(tokenInfo: TokenInfo) {
  return new Token(tokenInfo.network, tokenInfo.address, tokenInfo.decimals);
}

async function executionPriceAndMinimumAmountOut(
  fromToken: TokenInfo,
  toToken: TokenInfo,
  amountIn: string,
  provider
) {
  const tokenIn = fromToken ? token(fromToken) : WETH[toToken.network];
  const tokenOut = toToken ? token(toToken) : WETH[fromToken.network];
  const pair = await Fetcher.fetchPairData(tokenIn, tokenOut, provider);
  const route = new Route([pair], tokenIn);
  const trade = new Trade(
    route,
    new TokenAmount(
      tokenIn,
      parseUnits(amountIn, fromToken.decimals).toString()
    ),
    TradeType.EXACT_INPUT
  );
  const slippageTolerance = new Percent('50', '10000');
  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw.toString();
  return {
    excutionPrice: trade.executionPrice.toSignificant(8),
    amountOutMin,
  };
}

export async function executionPriceAndMinimumAmountOutByERC202ETHThroughUniswap(
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

export async function executionPriceAndMinimumAmountOutByETH2ERC20ThroughUniswap(
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
