import { ethers } from 'ethers';

export const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function allowance(address, address) view returns (uint256)',
  'function decimals() external pure returns (uint8)',
  'function approve(address _spender, uint256 _value) returns (bool success)',
  'function symbol() public view returns (string)',
];

export function getERC20Contract(address: string, provider) {
  return new ethers.Contract(address, ERC20_ABI, provider);
}

export const COFIXCONTROLLER_ABI = [
  'function getKInfo(address token) external view returns (uint32 k, uint32 updatedAt, uint32 theta)',
  'function calcK(uint256 vola, uint256 bn) external view returns (uint32 k)',
];

export function getCoFiXControllerContract(address: string, provider) {
  return new ethers.Contract(address, COFIXCONTROLLER_ABI, provider);
}

export const ORACLE_ABI = [
  'function checkPriceNow(address token) public view returns (uint256 ethAmount, uint256 erc20Amount, uint256 blockNum)',
  'function triggeredPriceInfo(address tokenAddress) external view returns (uint blockNumber, uint price, uint avgPrice, uint sigmaSQ)',
  'function latestPriceAndTriggeredPriceInfo(address tokenAddress) external view returns (uint latestPriceBlockNumber, uint latestPriceValue, uint triggeredPriceBlockNumber, uint triggeredPriceValue, uint triggeredAvgPrice, uint triggeredSigmaSQ)',
];

export function getOracleContract(address: string, provider) {
  return new ethers.Contract(address, ORACLE_ABI, provider);
}

export const COFIXFACTORY_ABI = [
  'function getPair(address token) external view returns (address pair)',
];

export function getCoFixFacory(address: string, provider) {
  return new ethers.Contract(address, COFIXFACTORY_ABI, provider);
}

export const COFIXPAIR_ABI = [
  'function getNAVPerShareForMint(tuple(uint256, uint256, uint256, uint256, uint256)) public view returns (uint256)',
  'function getNAVPerShareForBurn(tuple(uint256, uint256, uint256, uint256, uint256)) external view returns (uint256)',
  'function getNAVPerShare(uint256, uint256) external view returns (uint256)',
  'function getInitialAssetRatio() external view returns (uint256, uint256)',
  'function calcOutTokenAndETHForBurn(uint256, tuple(uint256, uint256, uint256, uint256, uint256)) public view returns (uint256, uint256)',
  'function getLiquidity(uint256, tuple(uint256, uint256, uint256, uint256, uint256)) external view returns (uint256)',
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1)',
];

export function getCoFixPair(address: string, provider) {
  return new ethers.Contract(address, COFIXPAIR_ABI, provider);
}

export const COFIXVAULTFORTRADER_ABI = [
  'function actualMiningAmountAndDensity(address pair, uint256 thetaFee, uint256 x, uint256 y, uint256 np) external view returns (uint256 amount, uint256 density, uint256 cofiRate)',
  'function actualMiningAmount(address, uint256, uint256, uint256, uint256) public override view returns (uint256, uint256, uint256)',
];

export function getCoFiXVaultForTrader(address: string, provider) {
  return new ethers.Contract(address, COFIXVAULTFORTRADER_ABI, provider);
}

export const COFIXVAULTFORLP_ABI = [
  'function stakingPoolForPair(address) external view returns (address)',
];

export function getCoFiXVaultForLP(address: string, provider) {
  return new ethers.Contract(address, COFIXVAULTFORLP_ABI, provider);
}

export const COFISTAKINGREWARDS_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function earned(address) external view returns (uint256)',
  'function getReward() external',
  'function withdraw(uint256 amount) external',
  'function stake(uint256 amount) external',
  'function pendingSavingAmount() view returns (uint256)',
  'function totalSupply() external view returns (uint256)',
];

export function getCoFiStakingRewards(address: string, provider) {
  return new ethers.Contract(address, COFISTAKINGREWARDS_ABI, provider);
}

export const COFIXSTAKINGREWARDS_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function earned(address) external view returns (uint256)',
  'function rewardRate() external view returns (uint256)',
  'function getReward() external',
  'function withdraw(uint256 amount) external',
  'function stake(uint256 amount) external',
  'function getRewardAndStake() external',
];

export function getCoFiXStakingRewards(address: string, provider) {
  return new ethers.Contract(address, COFIXSTAKINGREWARDS_ABI, provider);
}

export const COFIXROUTER_ABI = [
  'function swapExactETHForTokens(address,uint,uint,address,address,uint) external payable returns (uint, uint)',
  'function swapExactTokensForETH(address,uint,uint,address,address,uint) external payable returns (uint, uint)',
  'function swapExactTokensForTokens(address,address,uint,uint,address,address,uint) external payable returns (uint, uint)',
  'function addLiquidityAndStake(address,uint,uint,uint,address ,uint deadline) external payable returns (uint)',
  'function addLiquidity(address,uint,uint,uint,address,uint) external payable returns (uint)',
  'function removeLiquidityGetToken(address,uint,uint,address,uint) external payable returns (uint)',
  'function removeLiquidityGetETH(address,uint,uint,address,uint) external payable returns (uint)',
  'function hybridSwapExactETHForTokens(uint, uint, address[], uint8[], address, address, uint) external payable returns (uint[])',
  'function hybridSwapExactTokensForETH(uint, uint, address[], uint8[], address, address, uint) external payable returns (uint[])',
  'function hybridSwapExactTokensForTokens(uint, uint, address[], uint8[], address, address, uint) external payable returns (uint[])',
  'function removeLiquidityGetTokenAndETH(address, uint, uint, address, uint) external payable returns (uint, uint)',
];

export function getCofixRouter(address: string, provider) {
  return new ethers.Contract(address, COFIXROUTER_ABI, provider);
}
