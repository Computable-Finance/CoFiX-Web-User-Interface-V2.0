import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, Contract, ethers } from 'ethers';
import { PCacheable } from 'ngx-cacheable';
import { environment } from 'src/environments/environment';

import {
  BLOCKNUMS_IN_A_DAY,
  ETHER_DECIMALS,
  getContractAddressListByNetwork,
} from '../common/constants';
import { ShareStateService } from '../common/state/share.service';
import { ethersOf, unitsOf } from '../common/uitils/bignumber-utils';
import { EventBusService } from './eventbus.service';

declare let window: any;

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function allowance(address, address) view returns (uint256)',
  'function decimals() external pure returns (uint8)',
  'function approve(address _spender, uint256 _value) returns (bool success)',
];

const COFIXCONTROLLER_ABI = [
  'function getKInfo(address token) external view returns (uint32 k, uint32 updatedAt, uint32 theta)',
];

const ORACLE_ABI = [
  'function checkPriceNow(address token) public view returns (uint256 ethAmount, uint256 erc20Amount, uint256 blockNum)',
];

const COFIXFACTORY_ABI = [
  'function getPair(address token) external view returns (address pair)',
];

const COFIXPAIR_ABI = [
  'function getNAVPerShareForMint(tuple(uint256, uint256, uint256, uint256, uint256)) public view returns (uint256)',
  'function getNAVPerShareForBurn(tuple(uint256, uint256, uint256, uint256, uint256)) external view returns (uint256)',
];

const COFIXVAULTFORTRADER_ABI = [
  'function actualMiningAmountAndDensity(address pair, uint256 thetaFee, uint256 x, uint256 y, uint256 np) external view returns (uint256 amount, uint256 density, uint256 cofiRate)',
];

const COFISTAKINGREWARDS_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function earned(address) external view returns (uint256)',
  'function getReward() external',
  'function withdraw(uint256 amount) external',
  'function stake(uint256 amount) external',
];

const COFIXVAULTFORLP_ABI = [
  'function stakingPoolForPair(address) external view returns (address)',
];

const COFIXSTAKINGREWARDS_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function earned(address) external view returns (uint256)',
  'function rewardRate() external view returns (uint256)',
  'function getReward() external',
  'function withdraw(uint256 amount) external',
  'function stake(uint256 amount) external',
];

const COFIXROUTER_ABI = [
  'function swapExactETHForTokens(address,uint,uint,address,address,uint) external payable returns (uint, uint)',
  'function swapExactTokensForETH(address,uint,uint,address,address,uint) external payable returns (uint, uint)',
  'function swapExactTokensForTokens(address,address,uint,uint,address,address,uint) external payable returns (uint, uint)',
  'function addLiquidityAndStake(address,uint,uint,uint,address ,uint deadline) external payable returns (uint)',
  'function addLiquidity(address,uint,uint,uint,address,uint) external payable returns (uint)',
  'function removeLiquidityGetToken(address,uint,uint,address,uint) external payable returns (uint)',
  'function removeLiquidityGetETH(address,uint,uint,address,uint) external payable returns (uint)',
];

const CACHE_ONE_HOUR = 60 * 60 * 1000;
const CACHE_ONE_MINUTE = 60 * 1000;
const CACHE_TEN_SECONDS = 10 * 1000;
const CACHE_FIVE_SECONDS = 5 * 1000;

const deadline = () => Math.ceil(Date.now() / 1000) + 60 * 10;

const BNJS = require('bignumber.js');

@Injectable({
  providedIn: 'root',
})
export class CofiXService {
  private provider;
  private currentAccount: string;
  private currentNetwork;
  private contractAddressList: any;

  constructor(
    private shareStateService: ShareStateService,
    private eventbusService: EventBusService,
    private http: HttpClient
  ) {
    BNJS.config({ EXPONENTIAL_AT: 100, ROUNDING_MODE: BNJS.ROUND_DOWN });
    this.reset();
  }

  async isEnabled() {
    if (window.ethereum === undefined) {
      return false;
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      return (await provider.listAccounts()).length !== 0;
    }
  }

  async connectSilently() {
    if (await this.isEnabled()) {
      await this.setup(true);
    } else {
      throw new Error('No Account connected to MetaMask.');
    }
  }

  async connectWallet() {
    await this.setup(false);
  }

  private async setup(isEnabled: boolean) {
    if (window.ethereum === undefined) {
      throw new Error('Non-Ethereum browser detected. Install MetaMask.');
    }

    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    if (!isEnabled) {
      this.setCurrentAccount(
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
      );
    } else {
      this.currentAccount = (await this.provider.listAccounts())[0];
    }
    this.currentNetwork = (await this.provider.getNetwork()).chainId;
    this.contractAddressList = getContractAddressListByNetwork(
      this.currentNetwork
    );

    window.ethereum
      .on('disconnect', (error) => {
        this.reset();
        this.eventbusService.emit({ name: 'disconnected_from_blockchain' });
      })
      .on('accountsChanged', (accounts) => {
        this.setCurrentAccount(accounts);
        const currentAccount = this.currentAccount;
        this.eventbusService.emit({
          name: 'accountsChanged',
          value: currentAccount,
        });
      })
      .on('chainChanged', (chainId) => {
        this.currentNetwork = chainId;
        this.contractAddressList = getContractAddressListByNetwork(chainId);
        this.eventbusService.emit({
          name: 'chainChanged',
          value: chainId,
        });
      });
  }

  getCurrentProvider() {
    return this.provider;
  }

  // 未链接钱包时，可以用 infura 去查公开信息，比如：兑换率等
  private defaultProvider() {
    return new ethers.providers.InfuraProvider(
      environment.infura.network,
      environment.infura.apiAccessToken
    );
  }

  getCurrentNetwork() {
    return this.currentNetwork;
  }

  getCurrentAccount() {
    return this.currentAccount;
  }

  getCurrentContractAddressList() {
    return this.contractAddressList;
  }

  @PCacheable({ maxAge: CACHE_FIVE_SECONDS })
  async getETHBalance() {
    if (!this.provider) {
      return;
    }
    const balance = await this.provider.getBalance(this.currentAccount);
    return balance;
  }

  // 普通 ERC20 Token
  // 可存入 Cofi：CoFiToken
  // 已存入 Cofi：CoFiStakingRewards
  // 未参与挖矿 XT：当前资金池的 pair 地址，this.getCoFixPairAddressByToken(token)
  // 参与挖矿的 XT：当前资金池对应的 stakingPool 地址，this.getStakingPoolAddress(pair)
  @PCacheable({ maxAge: CACHE_FIVE_SECONDS })
  async getERC20Balance(address: string) {
    if (!this.provider) {
      return;
    }
    const contract = this.getERC20Contract(address);
    const balance = await contract.balanceOf(this.currentAccount);
    return balance;
  }

  @PCacheable({ maxAge: CACHE_ONE_HOUR })
  async getERC20Decimals(address: string) {
    if (!this.provider) {
      return;
    }
    const contract = this.getERC20Contract(address);
    const decimals = await contract.decimals();
    return decimals;
  }

  @PCacheable({ maxAge: CACHE_TEN_SECONDS })
  async getERC20Allowance(address: string, spender: string) {
    if (!this.provider) {
      return;
    }

    const contract = this.getERC20Contract(address);
    const allowance = await contract.allowance(this.currentAccount, spender);
    return allowance;
  }

  // 获得兑换单价，不考虑冲击成本，k 暂时用常数 0.0025 代替
  // undefined 代表 ETH
  // 1 eth -> n erc20 ：changePrice(undefined, toToken)
  // 1 erc20 -> n eth ：changePrice(fromToken, undefined)
  // 1 erc20 -> n erc20 ：changePrice(fromToken, toToken)
  async changePrice(fromToken: string, toToken: string) {
    if (!this.provider) {
      return;
    }

    let result1 = new BNJS(1);
    let result2 = new BNJS(1);
    if (toToken !== undefined) {
      // ETH > ERC20
      // p * (1-k) * (1-theta)
      const kinfo = await this.getKInfo(toToken);
      const price = await this.checkPriceNow(toToken);
      result1 = price.changePrice
        .times(new BNJS(1).minus(0.0025))
        .times(new BNJS(1).minus(kinfo.theta));
    }

    if (fromToken !== undefined) {
      // ERC20 > ETH
      // (1-theta) / (p * (1+k))
      const kinfo = await this.getKInfo(fromToken);
      const price = await this.checkPriceNow(fromToken);
      result2 = new BNJS(1)
        .minus(kinfo.theta)
        .div(price.changePrice.times(new BNJS(1).plus(0.0025)));
    }

    const result = result1.times(result2);
    return result.toString();
  }

  // 获得兑换的执行价格，考虑冲击成本，amount 为 fromToken 的个数
  async executionPriceAndExpectedCofi(
    fromToken: string,
    toToken: string,
    amount: number
  ) {
    if (!this.provider) {
      return;
    }

    let excutionPrice1 = new BNJS(1);
    let expectedCofi1 = new BNJS(0);
    let excutionPrice2 = new BNJS(1);
    let expectedCofi2 = new BNJS(0);

    let valx;

    if (fromToken !== undefined) {
      const kinfo = await this.getKInfo(fromToken);
      const price = await this.checkPriceNow(fromToken);

      if (toToken === undefined) {
        valx = new BNJS(amount).div(
          price.changePrice.times(new BNJS(1).minus(kinfo.k))
        );
      } else {
        valx = new BNJS(amount).div(
          price.changePrice.times(new BNJS(1).plus(kinfo.k))
        );
      }
      const fee = this.parseEthers(valx.times(kinfo.theta).toString());
      expectedCofi2 = await this.expectedCoFi(fromToken, price, kinfo, fee);

      let c;
      if (valx.lt(500)) {
        c = 0;
      } else if (valx.gte(500) && valx.lte(999000)) {
        c = new BNJS(2.57e-5).plus(new BNJS(8.542e-7).times(valx));
      } else {
        c = new BNJS(2.57e-5).plus(new BNJS(8.542e-7).times(999000));
      }

      excutionPrice2 = new BNJS(1)
        .minus(kinfo.theta)
        .div(price.changePrice.times(new BNJS(1).plus(kinfo.k.plus(c))));
    }

    if (toToken !== undefined) {
      const kinfo = await this.getKInfo(toToken);
      const price = await this.checkPriceNow(toToken);

      if (fromToken === undefined) {
        valx = new BNJS(amount);
      }

      const fee = this.parseEthers(valx * kinfo.theta);
      let c;
      if (valx.lt(500)) {
        c = 0;
      } else if (valx.gte(500) && valx.lte(999000)) {
        c = new BNJS(-1.171e-4).plus(new BNJS(8.386e-7).times(amount));
      } else {
        c = new BNJS(-1.171e-4).plus(new BNJS(8.386e-7).times(999000));
      }
      excutionPrice1 = price.changePrice
        .times(new BNJS(1).minus(kinfo.k.plus(c)))
        .times(new BNJS(1).minus(kinfo.theta));
      expectedCofi1 = await this.expectedCoFi(toToken, price, kinfo, fee);
    }

    const excutionPriceForOne = excutionPrice1.times(excutionPrice2);
    const excutionPrice = excutionPriceForOne.times(amount).toString();
    const expectedCofi = expectedCofi1.plus(expectedCofi2).toString();

    return {
      excutionPriceForOne: excutionPriceForOne.toString(),
      excutionPrice,
      expectedCofi,
    };
  }

  // 预计出矿量
  private async expectedCoFi(
    token: string,
    checkedPriceNow: any,
    kinfo: any,
    fee: BigNumber
  ) {
    const pairAddress = await this.getCoFixPairAddressByToken(token);
    const erc20 = this.getERC20Contract(token);
    const balanceOfPair = await erc20.balanceOf(pairAddress);
    const decimals = await this.getERC20Decimals(token);
    const tokens = this.parseEthers(
      new BNJS(unitsOf(balanceOfPair, decimals))
        .div(checkedPriceNow.changePrice)
        .toFixed(8)
    );

    const weth9 = this.getERC20Contract(this.contractAddressList.WETH9);
    const weth9Balance = await weth9.balanceOf(pairAddress);
    const oraclePrice = [
      checkedPriceNow.ethAmount,
      checkedPriceNow.erc20Amount,
      '0',
      kinfo.kOriginal.toString(),
      '0',
    ];
    const pair = this.getCoFixPair(pairAddress);
    const navPerShareForMint = await pair.getNAVPerShareForMint(oraclePrice);
    const trader = this.getCoFiXVaultForTrader();
    const actualMiningAmountAndDensity = await trader.actualMiningAmountAndDensity(
      pairAddress,
      fee,
      weth9Balance,
      tokens,
      navPerShareForMint
    );

    const value = new BNJS(ethersOf(actualMiningAmountAndDensity.amount)).times(
      0.8
    );
    return value;
  }

  // 增加流动性预计得到的 XToken，交易池为：ETH/ERC20。
  async expectedXToken(
    address: string,
    ethAmount: number,
    erc20Amount: number
  ) {
    const kinfo = await this.getKInfo(address);
    const checkedPriceNow = await this.checkPriceNow(address);
    const oraclePrice = [
      checkedPriceNow.ethAmount,
      checkedPriceNow.erc20Amount,
      '0',
      kinfo.kOriginal.toString(),
      '0',
    ];
    const factory = this.getCoFixFacory();
    const pairAddress = await factory.getPair(address);
    const pair = this.getCoFixPair(pairAddress);
    const navPerShareForMint = new BNJS(
      ethersOf(await pair.getNAVPerShareForMint(oraclePrice))
    );
    const recentCheckedPrice = await this.checkPriceNow(address);
    const expectedShareByEthAmount = new BNJS(ethAmount).div(
      navPerShareForMint
    );
    const expectedShareByErc20Amount = new BNJS(erc20Amount)
      .div(recentCheckedPrice.changePrice.div(new BNJS(1).plus(kinfo.k)))
      .div(navPerShareForMint);
    const expectedShare = expectedShareByEthAmount.plus(
      expectedShareByErc20Amount
    );

    return expectedShare.toString();
  }

  @PCacheable({ maxAge: CACHE_ONE_MINUTE })
  async earnedCofiAndRewardRate(stakingPoolAddress: string) {
    const coFiXStakingRewards = new ethers.Contract(
      stakingPoolAddress,
      COFIXSTAKINGREWARDS_ABI,
      this.provider
    );

    const earned = this.currentAccount
      ? await coFiXStakingRewards.earned(this.currentAccount)
      : '0';
    const rewardRate = new BNJS(
      ethersOf(await coFiXStakingRewards.rewardRate())
    )
      .times(BLOCKNUMS_IN_A_DAY)
      .toString();

    return { earned, rewardRate };
  }

  @PCacheable({ maxAge: CACHE_ONE_MINUTE })
  async earnedETH() {
    const coFiStakingRewards = this.getCoFiStakingRewards();
    const earned = await coFiStakingRewards.earned(this.currentAccount);
    return earned;
  }

  // XT 净值
  @PCacheable({ maxAge: CACHE_FIVE_SECONDS })
  async getNAVPerShare(token: string, pair: string) {
    const checkedPriceNow = await this.checkPriceNow(token);
    const coFiXPair = this.getCoFixPair(pair);
    const oraclePrice = [
      checkedPriceNow.ethAmount,
      checkedPriceNow.erc20Amount,
      '0',
      '250000',
      '0',
    ];
    const navPerShare = await coFiXPair.getNAVPerShareForBurn(oraclePrice);
    return navPerShare;
  }

  async getETHAmountForRemoveLiquidity(
    token: string,
    pair: string,
    amount: number
  ) {
    const kinfo = await this.getKInfo(token);
    const navPerShare = await this.getNAVPerShare(token, pair);
    const result = amount * this.ethersOf(navPerShare) * (1 - kinfo.theta);
    return result;
  }

  async getTokenAmountForRemoveLiquidity(
    token: string,
    pair: string,
    amount: number
  ) {
    const kinfo = await this.getKInfo(token);
    const navPerShare = await this.getNAVPerShare(token, pair);
    const recentPrice = await this.checkPriceNow(token);
    const result =
      amount *
      this.ethersOf(navPerShare) *
      recentPrice.changePrice *
      (1 - kinfo.k) *
      (1 - kinfo.theta);
    return result;
  }

  unitsOf(amount: BigNumber, decimals: BigNumber) {
    return Number.parseFloat(ethers.utils.formatUnits(amount, decimals));
  }

  ethersOf(amount: BigNumber) {
    return Number.parseFloat(ethers.utils.formatEther(amount));
  }

  private reset() {
    this.provider = this.defaultProvider();
    this.currentAccount = undefined;
    this.currentNetwork = environment.network;
    this.contractAddressList = getContractAddressListByNetwork(
      this.currentNetwork
    );
  }

  private getERC20Contract(address: string) {
    return new ethers.Contract(address, ERC20_ABI, this.provider);
  }

  private getCoFiXControllerContract() {
    return new ethers.Contract(
      this.contractAddressList.CofiXController,
      COFIXCONTROLLER_ABI,
      this.provider
    );
  }

  private async getKInfo(address: string) {
    const cofixController = this.getCoFiXControllerContract();
    const kinfo = await cofixController.getKInfo(address);

    return {
      kOriginal: kinfo[0],
      k: new BNJS(kinfo[0]).div(1e8),
      theta: new BNJS(kinfo[2]).div(1e8),
    };
  }

  private getOracleContract() {
    return new ethers.Contract(
      this.contractAddressList.OracleMock,
      ORACLE_ABI,
      this.provider
    );
  }

  private async checkPriceNow(token: string) {
    const decimals = await this.getERC20Decimals(token);
    const oracle = this.getOracleContract();
    const price = await oracle.checkPriceNow(token);
    const ethAmount = price[0];
    const erc20Amount = price[1];
    const changePrice = new BNJS(unitsOf(erc20Amount, decimals)).div(
      new BNJS(ethersOf(ethAmount))
    );

    return { ethAmount, erc20Amount, changePrice };
  }

  private getCoFixFacory() {
    return new ethers.Contract(
      this.contractAddressList.CofixFactory,
      COFIXFACTORY_ABI,
      this.provider
    );
  }

  private getCoFixPair(address: string) {
    return new ethers.Contract(address, COFIXPAIR_ABI, this.provider);
  }

  @PCacheable({ maxAge: CACHE_ONE_HOUR })
  async getCoFixPairAddressByToken(token: string) {
    const factory = this.getCoFixFacory();
    return await factory.getPair(token);
  }

  @PCacheable({ maxAge: CACHE_ONE_HOUR })
  async getStakingPoolAddress(pairAddress: string) {
    const coFiXVaultForLP = this.getCoFiXVaultForLP();
    const stakingPoolAddress = await coFiXVaultForLP.stakingPoolForPair(
      pairAddress
    );
    return stakingPoolAddress;
  }

  private getCoFiXVaultForTrader() {
    return new ethers.Contract(
      this.contractAddressList.CoFiXVaultForTrader,
      COFIXVAULTFORTRADER_ABI,
      this.provider
    );
  }

  private getCoFiStakingRewards() {
    return new ethers.Contract(
      this.contractAddressList.CoFiStakingRewards,
      COFISTAKINGREWARDS_ABI,
      this.provider
    );
  }

  private getCoFiXVaultForLP() {
    return new ethers.Contract(
      this.contractAddressList.CoFiXVaultForLP,
      COFIXVAULTFORLP_ABI,
      this.provider
    );
  }

  // 判断是否提供过流动性
  @PCacheable({ maxAge: CACHE_ONE_MINUTE })
  async pairAttended(token: string) {
    const pair = await this.getCoFixPairAddressByToken(token);
    const xtBalance = await this.getERC20Balance(pair);
    if (!xtBalance.isZero()) {
      return true;
    }

    const stakingPool = await this.getStakingPoolAddress(pair);
    const stakingBalance = await this.getERC20Balance(stakingPool);
    return !stakingBalance.isZero();
  }

  // token、spender 对应
  // 交易、资金池页面（增加）：普通token，CofixRouter
  // 资金池（移除）：this.getCoFixPairAddressByToken(token), CofixRouter
  // CoFi：pair，stakingPool
  // 收益：CoFiToken，CoFiStakingRewards
  @PCacheable({ maxAge: CACHE_TEN_SECONDS })
  async approved(token: string, spender: string) {
    if (token === undefined) {
      return true;
    }
    const allowance = await this.getERC20Allowance(token, spender);
    return !allowance.isZero();
  }

  // 目前设计为先授权一个极大值，未来再改进
  // token，spender 见上
  async approve(token: string, spender: string) {
    const contract = this.getERC20Contract(token);
    return await contract
      .connect(this.provider.getSigner())
      .approve(spender, BigNumber.from('999999999999999999999999999999999999'));
  }

  private setCurrentAccount(accounts) {
    if (accounts.length === 0) {
      this.shareStateService.reset();
      this.reset();
      this.eventbusService.emit({ name: 'disconnected_from_metamask' });
    } else if (accounts[0] !== this.currentAccount) {
      this.currentAccount = accounts[0];
    }
  }

  // 领取 ETH 收益
  async withdrawEarnedETH() {
    const contract = this.getCoFiStakingRewards();
    return await contract.connect(this.provider.getSigner()).getReward();
  }

  // 领取 CoFi 收益
  async withdrawEarnedCoFi(stakingPoolAddress: string) {
    const contract = new ethers.Contract(
      stakingPoolAddress,
      COFIXSTAKINGREWARDS_ABI,
      this.provider
    );
    return await contract.connect(this.provider.getSigner()).getReward();
  }

  async withdrawDepositedCoFi(amount: string) {
    const contract = this.getCoFiStakingRewards();
    return await this.withdraw(contract, amount);
  }

  async depositCoFi(amount: string) {
    const contract = this.getCoFiStakingRewards();
    return this.deposit(contract, this.contractAddressList.CoFiToken, amount);
  }

  async withdrawDepositedXToken(stakingPoolAddress: string, amount: string) {
    const contract = new ethers.Contract(
      stakingPoolAddress,
      COFIXSTAKINGREWARDS_ABI,
      this.provider
    );
    return await this.withdraw(contract, amount);
  }

  async depositXToken(
    stakingPoolAddress: string,
    pairAddress: string,
    amount: string
  ) {
    const contract = new ethers.Contract(
      stakingPoolAddress,
      COFIXSTAKINGREWARDS_ABI,
      this.provider
    );
    return this.deposit(contract, pairAddress, amount);
  }

  private async withdraw(contract: Contract, amount: string) {
    const balance = await contract.balanceOf(this.currentAccount);
    const value = this.parseEthers(Number(amount));
    if (balance.lt(value)) {
      throw new Error('Insufficient Balance.');
    } else {
      return await contract.connect(this.provider.getSigner()).withdraw(value);
    }
  }

  private async deposit(contract: Contract, token: string, amount: string) {
    const allowance = await this.getERC20Allowance(token, contract.address);
    const balance = await this.getERC20Balance(token);
    const value = this.parseEthers(Number(amount));
    if (allowance.lt(value)) {
      throw new Error('Insufficient Allowance.');
    } else if (balance.lt(value)) {
      throw new Error('Insufficient Balance.');
    } else {
      return await contract.connect(this.provider.getSigner()).stake(value);
    }
  }

  private getCofixRouter() {
    return new ethers.Contract(
      this.contractAddressList.CofixRouter,
      COFIXROUTER_ABI,
      this.provider
    );
  }

  private parseUnits(amount: number, unit: number) {
    try {
      return ethers.utils.parseUnits(amount.toString(), unit);
    } catch (e) {
      return BigNumber.from((amount * Math.pow(10, unit)).toFixed(0));
    }
  }

  parseEthers(amount: number) {
    return this.parseUnits(amount, ETHER_DECIMALS);
  }

  // 注意：
  // 传入 eth 是因为 value = eth + fee，从合约中无法直接得出 eth 值
  // amountOutMin ，仅用于判断是可以继续，但实际传入合约的为基于 changePrice 计算出的值，
  // 由于从 ui 传入的 amountOutMin 也是基于 changePrice 算出来的，故差别不大
  async swapExactETHForTokens(
    pair: string,
    token: string,
    amountIn: number,
    amountOutMin: number,
    swapPrice: number,
    fee: number
  ) {
    const ethBalanceOfAccount = this.ethersOf(await this.getETHBalance());
    if (amountIn + fee > ethBalanceOfAccount) {
      throw new Error('Insufficient ETH balance.');
    }

    const erc20Contract = this.getERC20Contract(token);
    const erc20Decimals = await this.getERC20Decimals(token);
    const erc20BalanceOfPair = this.unitsOf(
      await erc20Contract.balanceOf(pair),
      erc20Decimals
    );
    if (amountOutMin > erc20BalanceOfPair) {
      throw new Error('Insufficient tokens for swapping.');
    }

    const cofixRouter = this.getCofixRouter();

    return await this.executeContractMethodWithEstimatedGas(
      cofixRouter,
      'swapExactETHForTokens',
      [
        token,
        this.parseEthers(amountIn),
        this.parseUnits(amountIn * swapPrice * 0.99, erc20Decimals),
        this.currentAccount,
        this.currentAccount,
        deadline(),
        {
          value: this.parseEthers(amountIn + fee),
        },
      ]
    );
  }

  // 传入 token 数量
  async swapExactTokensForETH(
    pair: string,
    token: string,
    amountIn: number,
    amountOutMin: number,
    swapPrice: number,
    fee: number
  ) {
    const erc20Decimals = await this.getERC20Decimals(token);
    const erc20BalanceOfAccount = this.unitsOf(
      await this.getERC20Balance(token),
      erc20Decimals
    );

    if (amountIn > erc20BalanceOfAccount) {
      throw new Error('Insufficient token balance.');
    }

    const wethContract = this.getERC20Contract(this.contractAddressList.WETH9);
    const wethBalanceOfPair = this.ethersOf(await wethContract.balanceOf(pair));
    if (amountOutMin > wethBalanceOfPair) {
      throw new Error('Insufficient eth for swapping.');
    }

    const cofixRouter = this.getCofixRouter();
    return await this.executeContractMethodWithEstimatedGas(
      cofixRouter,
      'swapExactTokensForETH',
      [
        token,
        this.parseUnits(amountIn, erc20Decimals),
        this.parseEthers(amountIn * swapPrice * 0.99),
        this.currentAccount,
        this.currentAccount,
        deadline(),
        {
          value: this.parseEthers(fee),
        },
      ]
    );
  }

  // ERC20 -> ERC20 = ERC20 -> ETH -> ERC20
  // 故需先用 tokenIn 算出需要的 weth，并进行判断
  async swapExactTokensForTokens(
    pairIn: string,
    tokenIn: string,
    pairOut: string,
    tokenOut: string,
    amountIn: number,
    amountOutMin: number,
    swapPrice: number,
    fee: number
  ) {
    if (
      !(await this.hasEnoughTokenBalance(
        this.currentAccount,
        tokenIn,
        amountIn
      ))
    ) {
      throw new Error('Insufficient token balance.');
    }

    if (!(await this.hasEnoughTokenBalance(pairOut, tokenOut, amountOutMin))) {
      throw new Error('Insufficient token for swapping.');
    }

    const kinfo = await this.getKInfo(tokenIn);
    const price = await this.checkPriceNow(tokenIn);
    const wethAmount =
      (amountIn * 1) / (price.changePrice * (1 + kinfo.k) * (1 - kinfo.theta));

    if (
      !(await this.hasEnoughTokenBalance(
        pairIn,
        this.contractAddressList.WETH9,
        wethAmount
      ))
    ) {
      throw new Error('Insufficient weth for swapping.');
    }

    const cofixRouter = this.getCofixRouter();
    return await this.executeContractMethodWithEstimatedGas(
      cofixRouter,
      'swapExactTokensForTokens',
      [
        tokenIn,
        tokenOut,
        this.parseUnits(amountIn, await this.getERC20Decimals(tokenIn)),
        this.parseUnits(
          amountIn * swapPrice * 0.99 * 0.99,
          await this.getERC20Decimals(tokenOut)
        ),
        this.currentAccount,
        this.currentAccount,
        deadline(),
        {
          value: this.parseEthers(fee),
        },
      ]
    );
  }

  async hasEnoughTokenBalance(address: string, token: string, amount: number) {
    const contract = this.getERC20Contract(token);
    const decimals = await this.getERC20Decimals(token);
    const balance = this.unitsOf(await contract.balanceOf(address), decimals);
    return balance >= amount;
  }

  async hasEnoughETHBalance(amount: number) {
    const balance = this.ethersOf(await this.getETHBalance());
    return balance > amount;
  }

  async hasEnoughAllowance(spender: string, token: string, amount: number) {
    const contract = this.getERC20Contract(token);
    const decimals = await this.getERC20Decimals(token);
    const allowance = this.unitsOf(
      await contract.allowance(this.currentAccount, spender),
      decimals
    );
    return allowance > amount;
  }

  async addLiquidity(
    token: string,
    amountETH: number,
    amountToken: number,
    liquidityMin: number,
    fee: number,
    stake: boolean = false
  ) {
    if (amountETH === 0 && amountToken === 0) {
      return;
    }

    if (amountETH > 0 && !(await this.hasEnoughETHBalance(amountETH))) {
      throw new Error('Insufficient ETH balance.');
    }

    if (
      amountToken > 0 &&
      !(await this.hasEnoughTokenBalance(
        this.currentAccount,
        token,
        amountToken
      ))
    ) {
      throw new Error('Insufficient token balance.');
    }

    if (
      amountToken > 0 &&
      !(await this.hasEnoughAllowance(
        this.contractAddressList.CofixRouter,
        token,
        amountToken
      ))
    ) {
      throw new Error('Insufficient allowance for this token.');
    }

    const decimals = await this.getERC20Decimals(token);
    const cofixRouter = this.getCofixRouter();
    if (stake) {
      return await this.executeContractMethodWithEstimatedGas(
        cofixRouter,
        'addLiquidityAndStake',
        [
          token,
          this.parseEthers(amountETH),
          this.parseUnits(amountToken, decimals),
          this.parseEthers(liquidityMin * 0.99),
          this.currentAccount,
          deadline(),
          {
            value: this.parseEthers(amountETH + fee),
          },
        ]
      );
    } else {
      return await this.executeContractMethodWithEstimatedGas(
        cofixRouter,
        'addLiquidity',
        [
          token,
          this.parseEthers(amountETH),
          this.parseUnits(amountToken, decimals),
          this.parseEthers(liquidityMin * 0.99),
          this.currentAccount,
          deadline(),
          {
            value: this.parseEthers(amountETH + fee),
          },
        ]
      );
    }
  }

  async removeLiquidityGetETH(
    pair: string,
    token: string,
    liquidityMin: number,
    amountETHMin: number,
    fee: number
  ) {
    if (
      !(await this.hasEnoughTokenBalance(
        this.currentAccount,
        pair,
        liquidityMin
      ))
    ) {
      throw new Error('Insufficient liquidity tokens.');
    }

    if (
      !(await this.hasEnoughTokenBalance(
        pair,
        this.contractAddressList.WETH9,
        amountETHMin
      ))
    ) {
      throw new Error('Insufficient WETH9 tokens.');
    }

    const cofixRouter = this.getCofixRouter();
    return await this.executeContractMethodWithEstimatedGas(
      cofixRouter,
      'removeLiquidityGetETH',
      [
        token,
        this.parseEthers(liquidityMin),
        this.parseEthers(amountETHMin * 0.99),
        this.currentAccount,
        deadline(),
        {
          value: this.parseEthers(fee),
        },
      ]
    );
  }

  async removeLiquidityGetToken(
    pair: string,
    token: string,
    liquidityMin: number,
    amountTokenMin: number,
    fee: number
  ) {
    if (
      !(await this.hasEnoughTokenBalance(
        this.currentAccount,
        pair,
        liquidityMin
      ))
    ) {
      throw new Error('Insufficient liquidity tokens.');
    }

    if (!(await this.hasEnoughTokenBalance(pair, token, amountTokenMin))) {
      throw new Error('Insufficient token balance.');
    }

    const decimals = await this.getERC20Decimals(token);
    const cofixRouter = this.getCofixRouter();

    return await this.executeContractMethodWithEstimatedGas(
      cofixRouter,
      'removeLiquidityGetToken',
      [
        token,
        this.parseEthers(liquidityMin),
        this.parseUnits(amountTokenMin * 0.99, decimals),
        this.currentAccount,
        deadline(),
        {
          value: this.parseEthers(fee),
        },
      ]
    );
  }

  // for written contract methods only
  private async executeContractMethodWithEstimatedGas(
    contract: Contract,
    functionName: string,
    args: any
  ) {
    const estimatedGas = this.ethersOf(
      await contract.estimateGas[functionName](...args).catch((err) => {
        return BigNumber.from('700000');
      })
    );
    const argsForOverridden = args.pop();
    argsForOverridden.gasLimit = this.parseEthers(estimatedGas * 1.2);
    args.push(argsForOverridden);
    return contract.connect(this.provider.getSigner())[functionName](...args);
  }

  // pair 由 token 决定，targetToken 用来看 pair 对于这个 token 的余额。
  // 对于 ETH，targetToken 用 WETH9 替代
  @PCacheable({ maxAge: CACHE_FIVE_SECONDS })
  async getERC20BalanceOfPair(token: string, targetToken: string) {
    const pair = await this.getCoFixPairAddressByToken(token);
    const erc20Contract = this.getERC20Contract(targetToken);
    const amount = this.unitsOf(
      await erc20Contract.balanceOf(pair),
      await this.getERC20Decimals(targetToken)
    );

    return amount;
  }

  @PCacheable({ maxAge: CACHE_FIVE_SECONDS })
  async currentGasFee() {
    const price = await this.http
      .get('https://ethgasstation.info/json/ethgasAPI.json')
      .toPromise<any>();

    return (700000 * (price.fastest / 10)) / 1000000000;
  }
}
