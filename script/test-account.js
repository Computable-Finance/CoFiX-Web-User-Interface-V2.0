#!/usr/bin/env node

const ethers = require('ethers');
const randomWallet = ethers.Wallet.createRandom();

console.log('*****************************************************')
console.log('Test Wallet generated:');
console.log('- address, ', randomWallet.address);
console.log('- pk, ', randomWallet.privateKey);
console.log('\nBefore run e2e testing, please do:')
console.log('- Export test wallet to env, command is below:')
console.log(`  export E2E_PK=${randomWallet.privateKey}`)
console.log('- Export infura key to env, command is below:')
console.log(`  export API_KEY= Your-Key`)
console.log('- Provide 1 ETH to test wallet created.')
console.log('\nStart application with the following command:')
console.log('  npm start --configuration=e2e')
console.log('*****************************************************')