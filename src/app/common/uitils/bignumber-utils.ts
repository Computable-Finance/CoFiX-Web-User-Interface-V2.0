import { BigNumberish, ethers } from 'ethers';

import { ETHER_DECIMALS } from '../constants';

export function parseUnits(amount: string, unit: number) {
  return ethers.utils.parseUnits(amount, unit);
}

export function parseEthers(amount: string) {
  return this.parseUnits(amount, ETHER_DECIMALS);
}

export function unitsOf(amount: BigNumberish, decimals: BigNumberish) {
  return ethers.utils.formatUnits(amount, decimals);
}

export function ethersOf(amount: BigNumberish) {
  return ethers.utils.formatEther(amount);
}

export function truncate(amount: string, precision: number) {
  if (!/^(-?\d+)(.\d+)?$/.test(amount)) {
    throw new Error('Not a number!');
  }

  const dotIndex = amount.indexOf('.');
  if (dotIndex < 0) {
    return amount;
  } else {
    return amount.slice(0, dotIndex + precision + 1);
  }
}
