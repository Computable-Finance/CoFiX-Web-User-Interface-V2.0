import { BigNumber } from '@ethersproject/bignumber';

export interface EthersData {
  provider: any;
  signer: any;
  userAddress: string;
  chainID: string;
}

export interface TokenProps {
  nonce?: number;
  blockNumber: number;
  owner?: string;
  spender?: string;
  from?: string;
  to?: string;
  value?: BigNumber;
  amount?: BigNumber;
  decimals: number;
  card?: string;
  ownerAddress: string;
  balance?: BigNumber;
  totalSupply?: BigNumber;
  timeStamp: number;
  poolSize?: BigNumber;
  pairTokenSymbol?: string;
  beneficiaryAddress?: string;
}

export interface EthereumCallParams {
  params: [any];
  ethCallAttributtes: {
    contract?: string;
    function?: string;
    select?: string;
  };
}

export interface ContractAddress {
  contractAddress: string;
  contractInterface?: string;
}

export interface ERC20Props {
  decimals?: number;
  ownerBalance?: number;
  tokenId?: string;
}
