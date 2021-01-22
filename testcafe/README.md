# How To Run CoFiX E2E Testing

The CoFiX e2e tests are based on [TestCafe](https://devexpress.github.io/testcafe/) and written in TypeScript.

However, for eth dapp e2e testing, there are some special requirements compared to normal frontend testing:

1. a test wallet
1. eth for testing
1. a provider used for accessing eth testnet

In this readme, you will find the steps to kick off cofix e2e testing.

## Preparation

CoFiX Web UI project provdes a simple way to create a wallet for testing and show the steps. In project directory, please run:

```shell
npm run test-account
```

It will use `./script/test-account.js` to create this wallet and print how-to. Here is an example:

```
$npm run test-account

> cofix-interface@1.1.1 test-account /Users/foxgem/projects/cofix/CoFiX-Web-User-Interface
> node ./script/test-account.js

*****************************************************
Test Wallet generated:
- address,  0xE7F414730ddF84c2Ef0Af837dE30dD572031DE1b
- pk,  0xd379b44711a1af888af48bd16f350180f7648e11d9f2f8fe2ec7fdc85c1c07e2

Before run e2e testing, please do:
- Export test wallet to env, command is below:
  export E2E_PK=0xd379b44711a1af888af48bd16f350180f7648e11d9f2f8fe2ec7fdc85c1c07e2
- Export infura key to env, command is below:
  export API_KEY= Your-Key
- Provide 1 ETH to test wallet created.

Start application with the following command:
  npm start --configuration=e2e
*****************************************************
```

ETH used for testing can be acquired from here: https://faucet.ropsten.be/

### Run E2E Testing

After running a CoFiX Web UI for testing, go to `testcafe` subdirectory and run:

```shell
npm test
```

And here is an example of testing result:

```
 Running tests in:
 - Chrome 88.0.4324.96 / macOS 10.14.6

 Wallet Not Connected: Swap Page
 ✓ oracle cost checking
 ✓ approve button checking
 ✓ swap button checking
 ✓ change price checking: ETH -> ERC20
 ✓ change price checking: ERC20 -> ETH
 ✓ change price checking: ERC20 -> ERC20
 ✓ change price checking: ETH -> Non-CoFiX Token, Hybrid SWap
 ✓ change price checking: Non-CoFiX Token -> CoFiX Token, Hybrid SWap
 ✓ change price checking: Non-CoFiX Token -> Non-CoFiX Token, Hybrid SWap
 ✓ insufficient liquidity checking, Hybrid SWap

 Wallet Not Connected: Pool Page
 ✓ connect modal and button checking

 Wallet Not Connected: CoFi Page
 ✓ connect modal and button checking

 Wallet Not Connected: Dividend Page
 ✓ connect modal and button checking

 Wallet Connected: Swap Page (preflight check)
 ✓ appove not needed before swapping eth -> erc20
 ✓ appove needed before swapping erc20 -> eth / erc20
 ✓ do appove
 ✓ do appove for hybrid swap

 Wallet Connected: Add Liquid Page (preflight check)
 ✓ approve needed before adding liquid
 ✓ do appove

 Wallet Connected: Redeem Liquid Page (preflight check)
 ✓ approve needed before redeeming liquid
 ✓ do appove

 Wallet Connected: CoFi Page (preflight check)
 ✓ approve needed before claiming cofi with depositing
 ✓ approve not needed before claiming cofi without depositing

 Wallet Connected: Dividend Page (preflight check)
 ✓ approve needed before depositing cofi
 ✓ do appove
 ✓ approve not needed before withdrawing cofi

 Wallet Connected: Swap Page
 ✓ swap eth -> erc20
 ✓ swap erc20 -> eth
 ✓ swap erc20 -> erc20
 ✓ swap eth -> non-cofix token, hybrid swap
 ✓ swap non-cofix token -> eth, hybrid swap
 ✓ swap cofix token -> non-cofix token, hybrid swap
 ✓ swap non-cofix token -> cofix token, hybrid swap
 ✓ swap non-cofix token -> non-cofix token, hybrid swap

 Wallet Connected: Add Liquid Page
 ✓ add eth and usdt with no staking
 ✓ add eth only with no staking
 ✓ add usdt only with staking

 Wallet Connected: Redeem Liquid Page
 ✓ redeem eth
 ✓ redeem erc20

 Wallet Connected: Ming Page
 ✓ approve needed before depositing
 ✓ do approve for depositing
 ✓ deposit
 ✓ approve not needed before withdrawing
 ✓ withdraw

 Wallet Connected: CoFi Page
 ✓ claim with depositing
 ✓ claim without depositing

 Wallet Connected: Dividend Page
 ✓ deposit cofi
 ✓ withdraw cofi
*** not earned, check disable **
 ✓ claim eth

 Wallet Connected: Swap Page (postflight check)
 ✓ eth balance - max eth amoutIn > 0.02
 ✓ erc20 balance === max erc20 amoutIn
 ✓ insufficeint balance of pool check

 Wallet Connected: Add Liquid Page (postflight check)
 ✓ eth balance - max eth amoutIn > 0.02
 ✓ erc20 balance === max erc20 amoutIn

 Wallet Connected: Redeem Liquid Page (postflight check)
 ✓ erc20 balance === max erc20 amoutIn
 ✓ insufficeint balance of pool check: eth
 ✓ insufficeint balance of pool check: erc20

 Wallet Connected: Ming Page (postflight check)
 ✓ max xtoken can be deposited === xtoken-balance
 ✓ max xtoken can be withdrawed === xtoken-deposited

 Wallet Connected: Dividend Page (postflight check)
 ✓ max cofi can be deposited === cofi-balance
 ✓ max cofi can be withdrawed === cofi-deposited


 61 passed (17m 19s)
```

### About Test Code

TestCafe configuration can be found in `.testcaferc.json`.

In which, `src` includes all test cases and **the order of theses tests is matters** since the tokens used in current test case will be acquired by the execution of previous test case.
