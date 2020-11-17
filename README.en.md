# CoFiX-Web-User-Interface

[中文](./README.md)

The application is developed with Ionic 5 and Angular 10. Key npm packages:

- ethers.js 5, smart contract interaction
- akita, state management

## Constants

### Contract Addresses

Address about CoFix contracts: src/app/common/constants.ts.

### Environment Constants

There are two settings:

- Development environment: src/environments/environment.ts
- Production environment: src/environments/environment.prod.ts

Parameters meaning:

- production, boolean for product environment
- lang, the default language
- infura, infura configuration for displaying public information (such as exchange prices) when no wallet is connected.
- network, infura network id

## Development

Basic Steps

1. `git clone`
1. `npm i`, install dependencies
1. `ionic serve`, run it locally. Visit http://localhost:8100 in your browser.

Run test:

`ng test`

Build for deployment:

`ng build --prod --aot`

Copy the `www` folder in your project directory and upload it to your remote web server（AWS S3 or something like that）.

git workflow, at work branch:

1. git pull origin \[dev branch\] --rebase
1. git commit locally
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

Since automation testing is not yet ready, this CI/CD has only two main purposes.

- verify compilation
- deployment

In the future, as automated tests are in place and git log specification is established, the following will be added: (all will be happened on every commit on dev branch).

- commitlint: pipeline will fail if commit logs do follow angular commit log specification.
- [gts](https://github.com/google/gts), pipeline will fail when code style does notcomply with specifications.
- Automation testing: unit testing + integration testing + e2e testing
- [Semantic Publishing](https://semantic-release.gitbook.io/semantic-release/): Generate tag and change logs automatically.
