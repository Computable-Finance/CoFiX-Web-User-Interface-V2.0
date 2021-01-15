# CoFiX-Web-User-Interface

[English](./README.md)

整个应用基于 Ionic 5 和 Angular 10 完成，用到的关键 npm package ：

- ethers.js 5，连 eth 和合约交互
- akita，状态管理
- testcafe，E2E 测试

## 白盒代码审计报告

白盒代码审计报告可从[此处下载](./tpyrced_peckshield-audit-report-CoFiX-pentest_v1.0.pdf)。

## 常量

### 合约地址常量

CoFiX 相关合约地址常量：src/app/common/constants.ts 。

### 运行环境

**请注意**：所有 angular environments 文件均被加入 .gitignore 且不会被提交到版本库。要正常运行程序，请按照【开发】一节中的命令执行。

所有 environments 文件都是自动创建的，将用到两个环境变量：

- API_KEY，infura api key
- E2E_PK，E2E 测试中用的私钥

例子如下：

```shell
export API_KEY=Your-API-KEY
export E2E_PK=Your-PrivateKey
```

生成 environment 文件的模板位于： `script/preprocessing.js`。各参数含义：

- production，是否为产品环境
- lang，缺省语言
- infura，当未连接钱包时，用于显示公开信息（如兑换率）的 infura 配置。
- network，infura 用的网络 id
- e2e，是否为 e2e 以及测试用的 wallet

### 在测试网下运行 HyBird Swap 交易对

\***\*以下内容仅针对 Ropsten 网络而言，主网不存在这样的问题\*\***

目前 CoFiX 中在 Ropsten 测试网上使用的 WETH 是内部自行部署的合约，这导致当前交易对中存在任意一个外部 Token 时（非 USDT / HBTC），包括 ETH + 外部 Token 交易对，，系统可能会提示：缺乏足够的流动性。这是因为 WETH 与该 Token 之间缺乏 Uniswap （Hybrid Swap 的基础）上的流动性导致的。因此，当网络选择为 Ropsten 时，并不是随便添加的地址都能直接通过 CoFiX 完成交易。

为了方便测试，目前的代码中预置了两个外部 Token：COMP 和 NEST，它们可以自由地与预置的其他 Token 进行兑换。

如果想添加自己的 Token 在 Ropsten 下完成兑换，需要提前做一些准备：

1. 得到 Token 地址，以下链接提供了 Ropsten 下 Uniswap 合约上交换过的 token 地址，可作为参考。
   - https://ropsten.etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D#tokentxns
1. 获得 CoFiX 测试自行部署的 WETH ，调用其中的 `deposit。`
   - https://ropsten.etherscan.io/address/0x59b8881812Ac484Ab78b8fc7c10b2543e079a6C3#writeContract
1. 用 Uniswap 在测试网上建立 Token + WETH 的 Pair，WETH 的地址参见 `constants.ts` 中 `WETH9` 对应地址。
   - 请注意：使用 `network === 3` 的分支中的值。

## 开发

### 基本步骤

1. `git clone`
1. `npm i`，安装依赖
1. `npm start`，执行。在浏览器中访问 http://localhost:4200
   - dev 模式，`npm start`
   - prod 模式，`npm start --configuration=production`
   - e2e 测试，`npm start --configuration=e2e`

### 单元测试

`npm test`

### E2E 测试

E2E 测试基于 TestCafe 实现，所有的测试代码放于 `testcafe` 子目录。

1. 进入 `testcafe` 子目录
1. `npm i`
1. `npm start --configuration=e2e`，运行本地实例
1. `npm test`，在另一个终端运行此命令

更多细节请参见[ CoFiX 端到端测试运行指南](./testcafe/README.cn.md)。

### 部署打包

`npm run build`

复制工程目录下的 `www` 文件夹，然后上传到远端服务器（推荐 AWS S3 或类似云厂商的服务）即可。

### git 工作流

在工作分支：

1. git pull origin \[dev branch\] --rebase
1. git commit locally
1. 运行单元测试和 E2E 测试
1. git push orgin \[dev branch\]

另外，请避免 `git push -f`。

## Git Log 规范

采用 Angular 的 git log 规范，请配合 [git-cz](https://www.npmjs.com/package/git-cz) 一起使用。

## CI / CD

目前准备投入的 CI/CD 主要服务于三个环境：

- 测试环境，stage.cofix.io
- 产品环境，cofix.io / www.cofix.io
- Hotfix 环境, hotfix.cofix.io

整个机制结合 github action 完成。

总的设计思路是基于分支的 push 动作进行自动触发，但同时应该避免每次 push 都去发布（因为并非每次 push 都值得发布），即发布行为可控。遗憾的是，github 目前并不像 gitlab 那样支持手动触发，因此我们采用了一种变通的办法来实现，以下是设计思路和主要的操作步骤。

### 分支模型

以下规定了未来的开发分支模型，方便配合 CI/CD 。

1. `main` 分支，不再允许直接 push。所有 push 都通过其他分支的 PR 完成。每次 PR merge 之后，将自动触发产品环境发布。
1. `stage` 分支，同上，只是部署环境变为测试环境。
1. 开发分支，分支名以版本号命名（如现在的 `v1.1.0`），此分支作为开发的主要分支接受开发的日常提交。每次版本发布之后，即删除，因为此时已经 merge 到 `main` 分支。
1. `hotfix` 分支，每次发布之后，由 `main` 分支拉出，用于发布后的紧急发布

同时，将 `stage` 分支为默认分支。

### 流程和步骤

1. 发布测试环境：
   - 开发分支 -> `stage` 分支 PR
   - merge 后即触发，`stage.cofix.io`
1. 发布产品环境:
   - 开发分支 -> `main` 分支 PR
   - merge 后触发，`www.cofix.io`。
1. 紧急发布
   - `hotfix` -> `hotfix` 测试 -> `main` 发布。

同时，在 hotfix 发生后的合并问题：

- 若差异不大，`hotfix` -> 开发分支；
- 若差异已经很大，建议手动同步。

### 功能目标

此 CI/CD 主要服务于三个目的：

- 验证编译
- 运行测试
- 发布部署

当前进行中：

- 自动化测试，包括：单元测试和 E2E 测试。

未来计划中：

- commitlint：不符合 angular commit log 规范的提交将失败
- [gts](https://github.com/google/gts)，不符合规范即失败
- [语义发布](https://semantic-release.gitbook.io/semantic-release/)：自动生成 tag 和 change log 。
