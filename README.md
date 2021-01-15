# CoFiX-Web-User-Interface

[中文](./README.cn.md)

The application is developed with Ionic 5 and Angular 10. Key npm packages:

- ethers.js 5, smart contract interaction
- akita, state management
- testcafe, e2e testing

## WHITEBOX CODE AUDIT REPORT

The whitebox code audit report can be downloaded from [here](./tpyrced_peckshield-audit-report-CoFiX-pentest_v1.0.pdf).

## Constants

### Contract Addresses

Address about CoFix contracts: src/app/common/constants.ts.

### Environment

**IMPORTANT**: all angular environments files are added in .gitignore and will not be committed to this repository. To run this app, please run commands described in "Development" section.

All environments file are created automatically and it will use two env variables:

- API_KEY, your infura api key
- E2E_PK, private key for E2E testing

Here is an example:

```shell
export API_KEY=Your-API-KEY
export E2E_PK=Your-PrivateKey
```

The template used to create environment file can be found in `script/preprocessing.js`. Parameters meaning:

- production, boolean for product environment
- lang, the default language
- infura, infura configuration for displaying public information (such as exchange prices) when no wallet is connected.
- network, infura network id
- e2e, e2e flag and wallet used in e2e testing.

### Running HyBird Swap Against Ropsten

\***\* The following is only for Ropsten , not mainnet \*\***

On Ropsten, WETH currently used in CoFiX is an internally deployed contract, which may result in a lack of sufficient liquidity when any external Token (other than USDT / HBTC) is present in the current pair, including ETH + external Token pairs. This is due to the lack of liquidity on Uniswap (the basis of Hybrid Swap) between WETH and that Token. Therefore, when the network is selected as Ropsten, not just any address added can be traded directly through CoFiX.

For testing purposes, two external Tokens are pre-built in the current code: COMP and NEST, which can be freely exchanged with other pre-built Tokens.

If you want to add new Token to complete the exchange under Ropsten, you need to do some preparation:

1. Token Address, the following link provides the addresses of the tokens exchanged on the Uniswap contract under Ropsten, which can be used as a reference.
   - https://ropsten.etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D#tokentxns
1. Get the WETH used in CoFiX: calling `deposit` method.
   - https://ropsten.etherscan.io/address/0x59b8881812Ac484Ab78b8fc7c10b2543e079a6C3#writeContract
1. Create a Token + WETH Pair on Ropsten using Uniswap, see `WETH9` in `constants.ts` for address.
   - Note: Using the value in the branch of `network === 3`.

## Development

### Basic Steps

1. `git clone`
1. `npm i`, install dependencies
1. `npm start`, run it locally. Visit http://localhost:4200 in your browser.
   - dev mode, `npm start`
   - prod mode, `npm start --configuration=production`
   - e2e testing, `npm start --configuration=e2e`

### Run Unit Test

`npm run test`

### Run E2E Test

e2e tests are based on TestCafe, and test codes can be found in `testcafe` subdirectory.

1. enter `testcafe`
1. `npm i`
1. `npm start --configuration=e2e`, kick off a local app instance
1. `npm test`, running this command in another terminal

More details please check [How to run CoFiX e2e testing](./testcafe/README.md).

### Build for deployment

`npm run build`

Copy the `www` folder in your project directory and upload it to your remote web server（AWS S3 or something like that）.

### git workflow

At work branch:

1. git pull origin \[dev branch\] --rebase
1. git commit locally
1. run unit tests && e2e tests
1. git push orgin \[dev branch\]

Also, please do not use `git push -f` .

## Git Log Specification

Follow Angular git log specification. Recommend [git-cz](https://www.npmjs.com/package/git-cz) which will make it easier.

## CI / CD

Currently, the CI/CD will serves three environments.

- Test environment: stage.cofix.io
- Production environment: cofix.io / www.cofix.io
- Hotfix environment: hotfix.cofix.io

The whole mechanism is done with github actions.

The general idea is to trigger the whole pipeline based on `git push` on branch. At the same time, in order to avoid releasing at every push, because not every push is worth being released, we need some control. Unfortunately, github doesn't currently support manual triggering like gitlab does, so we take a workaround, here's the design and the main steps.

### Branch Model

The following defines the branch model for future development, making it easier to work with CI/CD.

1. `main` branch, which no longer allows direct pushes, update will be done by PRs from other branches. After each PR being merged, the deployment to the production environment is automatically triggered.
1. `stage` branch, as above, the only change is it will use test environment.
1. Dev branch, which will receive the daily commits from developers and be named after sementic version (such as branch `v1.1.0`) . Also, it will be deleted when all of its updates are merged into `main` branch.
1. `hotfix` branch, it is for emergency fix after production is released and will be created from `main` branch.

At the same time, `stage` branch will be the default branch.

### Processes and Steps

1. Delopyment to testing environment.
   - Development Branch -> `stage` branch PR
   - Triggered after merging, `stage.cofix.io`
1. Delopyment to the production environment:
   - Development Branch -> `main` Branch PR
   - Triggered after merging, `www.cofix.io`.
1. Emergency release
   - `hotfix` -> `hotfix` test -> `main` release.

Also, for merging after a hotfix occurs:

- If the difference is not significant, `hotfix` -> development branch.
- If the difference is large, manual synchronization is recommended.

### Functional Goal

This CI/CD will serve 3 steps:

- compilation
- testing
- deployment

WIP:

- Test automation: Unit Tests and E2E Tests

In the future, the following will be added:

- commitlint: pipeline will fail if commit logs do follow angular commit log specification.
- [gts](https://github.com/google/gts), pipeline will fail when code style does notcomply with specifications.
- [Semantic Publishing](https://semantic-release.gitbook.io/semantic-release/): Generate tag and change logs automatically.
