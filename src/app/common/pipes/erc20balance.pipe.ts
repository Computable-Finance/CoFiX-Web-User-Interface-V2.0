import { Pipe, PipeTransform } from '@angular/core';
import { BigNumberish, ethers } from 'ethers';
import { BalancePipe } from './balance.pipe';

@Pipe({ name: 'erc20balance' })
export class ERC20BalancePipe extends BalancePipe implements PipeTransform {
  constructor() {
    super();
  }

  transform(value: BigNumberish, nullvalue: string = ''): string {
    if (value !== undefined && value !== null) {
      const val = ethers.utils.formatEther(value);
      return super.transform(val, nullvalue);
    }
    return nullvalue;
  }
}
