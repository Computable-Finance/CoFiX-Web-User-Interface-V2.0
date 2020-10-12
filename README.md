# CoFiX-Web-User-Interface

[English](https://github.com/Computable-Finance/CoFiX-Web-User-Interface/blob/main/README.en.md)

## 合约地址常量

CoFix 相关合约地址常量：src/app/common/constants.ts 。目前发现存在一些合约在主网没有地址的情况，尤其是有些跟前端有关的，比如：

- CoFiStakingRewards
- CoFiXVaultForLP
- CoFiXVaultForTrader

## 运行环境常量

分为两个环境：开发环境和产品环境，分别为：

- 开发环境下的参数定义：src/environments/environment.ts
- 产品环境下的参数定义：src/environments/environment.prod.ts

内部参数含义：

- production，是否为产品环境
- lang，打包设定的语言
- infura，当未连接钱包时，用于显示公开信息（如兑换率）的 infura 配置。
- network，infura 用的网络 id

## 程序说明

整个应用基于 Ionic 5 和 Angular 10 完成，因此，理论上该程序可以打包成以下三种形式：

- 普通 Web，目前的形式。
- 移动 App ：android 和 ios，实际打包时存在一定的工作量，并且可能会有些地方要调整。
- PWA，俗称 Google 版小程序，需要添加一些依赖，可能也有微调。

用到的关键 npm package ：

- ethers.js 5，连 eth 和合约交互
- akita，状态管理

## 开发

在工程目录下，执行如下命令安装依赖包：

`npm i`

在工程目录下执行，启动应用：

`ionic serve`

在浏览器中访问 http://localhost:8100

## 构建命令

整个打包构建的过程如下：

`ng build --prod --aot`

会在工程文件下创建 www 文件夹，编译好的静态文件均在此目录下。

## Git Log 规范

采用 Angular 的 git log 规范，请配合 [git-cz](https://www.npmjs.com/package/git-cz) 一起使用。
