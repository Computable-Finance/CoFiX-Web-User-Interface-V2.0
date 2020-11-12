# CoFiX-Web-User-Interface

[English](https://github.com/Computable-Finance/CoFiX-Web-User-Interface/blob/main/README.en.md)

整个应用基于 Ionic 5 和 Angular 10 完成，用到的关键 npm package ：

- ethers.js 5，连 eth 和合约交互
- akita，状态管理

## 常量

### 合约地址常量

CoFix 相关合约地址常量：src/app/common/constants.ts 。

### 运行环境常量

分为两个环境：

- 开发环境：src/environments/environment.ts
- 产品环境：src/environments/environment.prod.ts

内部参数含义：

- production，是否为产品环境
- lang，缺省语言
- infura，当未连接钱包时，用于显示公开信息（如兑换率）的 infura 配置。
- network，infura 用的网络 id

## 开发

基本步骤

1. `git clone`
1. `npm i`，安装依赖
1. `ionic serve`，执行。在浏览器中访问 http://localhost:8100

部署打包：

`ng build --prod --aot`

复制工程目录下的 `www` 文件夹，然后上传到远端服务器（推荐 AWS S3 或类似云厂商的服务）即可。

## Git Log 规范

采用 Angular 的 git log 规范，请配合 [git-cz](https://www.npmjs.com/package/git-cz) 一起使用。

## CI / CD

目前准备投入的 CI/CD 主要服务于两个环境：

- 测试环境，stage.cofix.io
- 产品环境，cofix.io

整个机制结合 github action 完成。

总的设计思路是基于分支的 push 动作进行自动触发，但同时应该避免每次 push 都去发布（因为并非每次 push 都值得发布），即发布行为可控。遗憾的是，github 目前并不像 gitlab 那样支持手动触发，因此我们采用了一种变通的办法来实现，以下是设计思路和主要的操作步骤。

### 分支模型

以下规定了未来的开发分支模型，方便配合 CI/CD 。

1. `main` 分支，不再允许直接 push。所有 push 都通过其他分支的 PR 完成。每次 PR merge 之后，将自动触发产品环境发布。
1. `stage` 分支，同上，只是部署环境变为测试环境。
1. 开发分支，分支名以版本号命名（如现在的 `v1.1.0`），此分支作为开发的主要分支接受开发的日常提交。每次版本发布之后，即删除，因为此时已经 merge 到 `main` 分支。
1. `hotfix` 分支，每次发布之后，由 `main` 分支拉出，用于发布后的紧急发布

### 流程和步骤

1. 发布测试环境：
   - 开发分支 -> `stage` 分支 PR
   - merge 后即触发，`stage.cofix.io`
1. 发布产品环境:
   - 开发分支 -> `main` 分支 PR
   - merge 后触发，`www.cofix.io`。
1. 紧急发布
   - `hotfix` -> `stage` 测试 -> `main` 发布。

同时，在 hotfix 发生后的合并问题：

- 若差异不大，`hotfix` -> 开发分支；
- 若差异已经很大，建议手动同步。

### 功能目标

由于目前自动化测试尚不完善，此 CI/CD 主要两个目的：

- 验证编译
- 发布部署

未来，随着自动化测试的完善，以及对于 git log 规范的确立，会逐步加上以下内容（以下内容会每次提交时都执行）：

- commitlint：不符合 angular commit log 规范的提交将失败
- [gts](https://github.com/google/gts)，不符合规范即失败
- 自动化测试：单元测试 + 集成测试 + e2e testing
- [语义发布](https://semantic-release.gitbook.io/semantic-release/)：自动生成 tag 和 change log 。
