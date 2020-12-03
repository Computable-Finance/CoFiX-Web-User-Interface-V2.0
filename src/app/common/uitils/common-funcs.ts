export function txLink(network: number, txHash: string) {
  let url = '';

  if (network === 3) {
    url = 'https://ropsten.etherscan.io';
  } else if (network === 1) {
    url = 'https://etherscan.io';
  } else {
    throw new Error('Unknown Network');
  }

  return `${url}/tx/${txHash}`;
}
