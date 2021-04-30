import { Injectable } from '@angular/core';
import BNJS from 'bignumber.js/bignumber';
import { BigNumber, Contract, ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import { ETHER_DECIMALS } from '../common/constants';
import { tokenList } from '../common/TokenList';
import { ethersOf, unitsOf } from '../common/uitils/bignumber-utils';
import { CofiXService } from './cofix.service';

declare let window: any;

const CACHE_HALF_AN_HOUR = 60 * 1000 * 30;
const CACHE_ONE_MINUTE = 60 * 1000;
const CACHE_TEN_SECONDS = 10 * 1000;
const CACHE_FIVE_SECONDS = 5 * 1000;

const deadline = () => Math.ceil(Date.now() / 1000) + 60 * 10;

let tokenScriptContent = {};

@Injectable({
  providedIn: 'root',
})
export class CofiXLegacyService {
  private provider;
  private currentAccount: string;
  private currentNetwork;
  private contractAddressList: any;

  // private integrationSubscription: Subscription;

  // private connectType: string;
  COFISTAKINGREWARDS_ABI = [
    'function balanceOf(address) view returns (uint256)',
    'function earned(address) external view returns (uint256)',
    'function getReward() external',
    'function withdraw(uint256 amount) external',
    'function stake(uint256 amount) external',
    'function pendingSavingAmount() view returns (uint256)',
    'function totalSupply() external view returns (uint256)',
  ];

  ERC20_ABI = [
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address, address) view returns (uint256)',
    'function decimals() external pure returns (uint8)',
    'function approve(address _spender, uint256 _value) returns (bool success)',
    'function symbol() public view returns (string)',
  ];

  COFIXPAIR_ABI = [
    'function getNAVPerShareForMint(tuple(uint256, uint256, uint256, uint256, uint256)) public view returns (uint256)',
    'function getNAVPerShareForBurn(tuple(uint256, uint256, uint256, uint256, uint256)) external view returns (uint256)',
    'function getNAVPerShare(uint256, uint256) external view returns (uint256)',
  ];

  COFIXSTAKINGREWARDS_ABI = [
    'function balanceOf(address) view returns (uint256)',
    'function earned(address) external view returns (uint256)',
    'function rewardRate() external view returns (uint256)',
    'function getReward() external',
    'function withdraw(uint256 amount) external',
    'function stake(uint256 amount) external',
    'function getRewardAndStake() external',
  ];

  COFIXFACTORY_ABI = [
    'function getPair(address token) external view returns (address pair)',
  ];

  COFIXROUTER_ABI = [
    'function swapExactETHForTokens(address,uint,uint,address,address,uint) external payable returns (uint, uint)',
    'function swapExactTokensForETH(address,uint,uint,address,address,uint) external payable returns (uint, uint)',
    'function swapExactTokensForTokens(address,address,uint,uint,address,address,uint) external payable returns (uint, uint)',
    'function addLiquidityAndStake(address,uint,uint,uint,address ,uint deadline) external payable returns (uint)',
    'function addLiquidity(address,uint,uint,uint,address,uint) external payable returns (uint)',
    'function removeLiquidityGetToken(address,uint,uint,address,uint) external payable returns (uint)',
    'function removeLiquidityGetETH(address,uint,uint,address,uint) external payable returns (uint)',
    'function hybridSwapExactETHForTokens(uint, uint, address[], uint8[], address, address, uint) external payable returns (uint[])',
    'function hybridSwapExactTokensForETH(uint, uint, address[], uint8[], address, address, uint) external payable returns (uint[])',
    'function hybridSwapExactTokensForTokens(uint, uint, address[], uint8[], address, address, uint) external payable returns (uint[])',
  ];

  COFIXVAULTFORLP_ABI = [
    'function stakingPoolForPair(address) external view returns (address)',
  ];

  COFIXCONTROLLER_ABI = [
    'function getKInfo(address token) external view returns (uint32 k, uint32 updatedAt, uint32 theta)',
    'function calcK(int128 vola, uint256 bn) external view returns (uint32 k)',
  ];

  ORACLE_ABI = [
    'function checkPriceNow(address token) public view returns (uint256 ethAmount, uint256 erc20Amount, uint256 blockNum)',
    'function latestPrice(address token) external view returns (uint256 ethAmount, uint256 tokenAmount, uint128 avgPrice, int128 vola, uint256 bn)',
  ];

  constructor(private cofixService: CofiXService) {
    BNJS.config({ EXPONENTIAL_AT: 100, ROUNDING_MODE: BNJS.ROUND_DOWN });
  }

  getCoFiStakingRewards(address: string, provider) {
    return new ethers.Contract(address, this.COFISTAKINGREWARDS_ABI, provider);
  }

  getERC20Contract(address: string, provider) {
    return new ethers.Contract(address, this.ERC20_ABI, provider);
  }

  getCoFixPair(address: string, provider) {
    return new ethers.Contract(address, this.COFIXPAIR_ABI, provider);
  }

  getCoFiXStakingRewards(address: string, provider) {
    return new ethers.Contract(address, this.COFIXSTAKINGREWARDS_ABI, provider);
  }

  getCoFixFacory(address: string, provider) {
    return new ethers.Contract(address, this.COFIXFACTORY_ABI, provider);
  }

  getCofixRouter(address: string, provider) {
    return new ethers.Contract(address, this.COFIXROUTER_ABI, provider);
  }

  getCoFiXVaultForLP(address: string, provider) {
    return new ethers.Contract(address, this.COFIXVAULTFORLP_ABI, provider);
  }

  getCoFiXControllerContract(address: string, provider) {
    return new ethers.Contract(address, this.COFIXCONTROLLER_ABI, provider);
  }

  getOracleContract(address: string, provider) {
    return new ethers.Contract(address, this.ORACLE_ABI, provider);
  }

  private getContractAddressListByNetwork(network: number): any {
    if (network === 1) {
      return {
        USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        HBTC: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
        NEST: '0x04abEdA201850aC0124161F037Efd70c74ddC74C',
        WETH9: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        CoFiToken: '0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1',
        //  NestQuery
        OracleMock: '0x3bf046c114385357838D9cAE9509C6fBBfE306d2',
        CofiXController: '0xc6f45eB40609c9CD30c8750A95042De1b8B1DBFf',
        CofixFactory: '0x66C64ecC3A6014733325a8f2EBEE46B4CA3ED550',
        CofixRouter: '0x5C35BaDebD40308e409df891aC56d17C8625c2bC',
        CoFiXVaultForLP: '0x6903b1C17A5A0A9484c7346E5c0956027A713fCF',
        CoFiStakingRewards: '0x0061c52768378b84306b2665f098c3e0b2C03308',
        CoFiXVaultForTrader: '0xE6183d3094a9e360B123Ec1330afAE76A74d1cbF',
      };
    } else if (network === 3) {
      return {
        USDT: '0x200506568C2980B4943B5EaA8713A5740eb2c98A',
        HBTC: '0xA674f71ce49CE7F298aea2F23D918d114965eb40',
        WETH9: '0x59b8881812Ac484Ab78b8fc7c10b2543e079a6C3',
        CoFiToken: '0x72Fd35b1dB364db812A8E726891685A25a9135D3',
        // 对应 NestPriceOracle，接手时规范，未改
        OracleMock: '0x3bF1d76A2fb912481022fdC31bD5016cC5A6c671',
        CofiXController: '0x8a814Da4d9Dfdebf6080BbE2d8C7bb238272507B',
        CofixFactory: '0x8E636BDB79752BFa2C41285535852bbBDd50b2ca',
        CofixRouter: '0xAdD27c75b7B003cc791E4062e20f9Eb872FafC65',
        CoFiXVaultForLP: '0x2494853258c33A99581Abddc7b85b11D1D1885DF',
        CoFiStakingRewards: '0x2a603D9e8b3152B6e235c7eFA41dFc073764d96a',
        CoFiXVaultForTrader: '0xe901e7f88a377D01028aE947cFA3192b3c5f7587',
        USDTPair: '0xffe14368FC46EB507e5221459a480646F22558b6',
        USDTStaking: '0x58FEf07559C7b19926BF4104463F80360A677144',
        HBTCPair: '0xe0297aBDCCf60Ab85365694E53AF92A433c2852e',
        HBTCStaking: '0xfdFc41f8b9D8b667b7DE8a976F446C557c697981',
      };
    } else {
      throw new Error('Unknown Network!');
    }
  }

  getCurrentContractAddressList() {
    this.provider = this.cofixService.getCurrentProvider();
    this.currentNetwork = this.cofixService.getCurrentNetwork();
    this.currentAccount = this.cofixService.getCurrentAccount();
    this.contractAddressList = this.getContractAddressListByNetwork(
      this.currentNetwork
    );
    console.log(this.contractAddressList);

    return this.contractAddressList;
  }

  async getERC20Allowance(address: string, spender: string) {
    const contract = this.getERC20Contract(address, this.provider);
    const allowance = await contract.allowance(this.currentAccount, spender);
    return allowance;
  }

  // 计算 getETHAmountForRemoveLiquidity 和 getTokenAmountForRemoveLiquidity 所需参数。
  // removeERC20 = false，对应 getETHAmountForRemoveLiquidity
  // removeERC20 = true，对应 getTokenAmountForRemoveLiquidity
  // 返回：kinfo、checkedPriceNow、nAVPerShareForBurn、两个冲击成本
  async calculateArgumentsUsedByGetAmountRemoveLiquidity(
    token: string,
    pair: string,
    amount: string,
    removeERC20: boolean = false
  ) {
    const kinfo = await this.getKInfo(token);
    const checkedPriceNow = await this.checkPriceNow(token);
    const coFiXPair = this.getCoFixPair(pair, this.provider);
    const navPerShare = await this.getNavPerShare(token);

    const tradingVolumeInETH = new BNJS(amount).times(navPerShare);

    const k = new BNJS(kinfo.k);
    let cB: BNJS.Value;
    let cS: BNJS.Value = 0;
    if (tradingVolumeInETH.lt(500)) {
      cB = cS = 0;
    } else {
      cB = new BNJS(0.0000257).plus(
        new BNJS(0.0000008542).times(tradingVolumeInETH)
      );
      if (removeERC20) {
        cS = new BNJS(-0.0001171).plus(
          new BNJS(0.0000008386).times(tradingVolumeInETH)
        );
      }
    }

    const oraclePrice = [
      this.parseEthers(checkedPriceNow.ethAmount),
      this.parseUnits(
        checkedPriceNow.erc20Amount,
        await this.getERC20Decimals(token)
      ),
      '0',
      this.parseUnits(k.plus(cB).toString(), 8),
      '0',
    ];
    const nAVPerShareForBurn = ethersOf(
      await coFiXPair.getNAVPerShareForBurn(oraclePrice)
    );

    return { kinfo, checkedPriceNow, nAVPerShareForBurn, cB, cS };
  }

  async getETHAmountForRemoveLiquidity(
    token: string,
    pair: string,
    amount: string
  ) {
    const args = await this.calculateArgumentsUsedByGetAmountRemoveLiquidity(
      token,
      pair,
      amount,
      false
    );

    const result = new BNJS(amount)
      .times(args.nAVPerShareForBurn)
      .times(new BNJS(1).minus(args.kinfo.theta))
      .toString();

    return { nAVPerShareForBurn: args.nAVPerShareForBurn, result };
  }

  async getTokenAmountForRemoveLiquidity(
    token: string,
    pair: string,
    amount: string
  ) {
    const args = await this.calculateArgumentsUsedByGetAmountRemoveLiquidity(
      token,
      pair,
      amount,
      true
    );

    const result = new BNJS(amount)
      .times(args.nAVPerShareForBurn)
      .times(args.checkedPriceNow.changePrice)
      .times(new BNJS(1).minus(new BNJS(args.kinfo.k).plus(args.cS)))
      .times(new BNJS(1).minus(args.kinfo.theta))
      .toString();

    return { nAVPerShareForBurn: args.nAVPerShareForBurn, result };
  }

  // 领取 ETH 收益
  async withdrawEarnedETH() {
    const contract = this.getCoFiStakingRewards(
      this.contractAddressList.CoFiStakingRewards,
      this.provider
    );
    return await this.executeContractMethodWithEstimatedGas(
      contract,
      'getReward',
      [{}]
    );
  }

  async withdrawDepositedCoFi(amount: string) {
    const contract = this.getCoFiStakingRewards(
      this.contractAddressList.CoFiStakingRewards,
      this.provider
    );
    return await this.withdraw(contract, amount);
  }

  async withdrawDepositedXToken(stakingPoolAddress: string, amount: string) {
    const contract = this.getCoFiXStakingRewards(
      stakingPoolAddress,
      this.provider
    );
    return await this.withdraw(contract, amount);
  }

  // async depositXToken(
  //   stakingPoolAddress: string,
  //   pairAddress: string,
  //   amount: string
  // ) {
  //   const contract = getCoFiXStakingRewards(stakingPoolAddress, this.provider);
  //   return this.deposit(contract, pairAddress, amount);
  // }

  private async withdraw(contract: Contract, amount: string) {
    const balance = await contract.balanceOf(this.currentAccount);
    const value = this.parseEthers(amount);
    if (balance.lt(value)) {
      throw new Error('Insufficient Balance.');
    } else {
      return await this.executeContractMethodWithEstimatedGas(
        contract,
        'withdraw',
        [value, {}]
      );
    }
  }

  private parseUnits(amount: string, unit: number) {
    const bnAmount = new BNJS(amount);
    try {
      return ethers.utils.parseUnits(bnAmount.toFixed(unit), unit);
    } catch (e) {
      return BigNumber.from(bnAmount.times(Math.pow(10, unit)).toFixed(0));
    }
  }

  parseEthers(amount: string) {
    return this.parseUnits(amount, ETHER_DECIMALS);
  }

  async hasEnoughTokenBalance(address: string, token: string, amount: string) {
    const contract = this.getERC20Contract(token, this.provider);
    const decimals = await this.getERC20Decimals(token);
    const balance = new BNJS(
      unitsOf(await contract.balanceOf(address), decimals)
    );
    return balance.gte(amount);
  }

  async removeLiquidityGetETH(
    pair: string,
    token: string,
    liquidityMin: string,
    amountETHMin: string,
    fee: string
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

    const cofixRouter = this.getCofixRouter(
      this.contractAddressList.CofixRouter,
      this.provider
    );
    return await this.executeContractMethodWithEstimatedGas(
      cofixRouter,
      'removeLiquidityGetETH',
      [
        token,
        this.parseEthers(liquidityMin),
        this.parseEthers(new BNJS(amountETHMin).times(0.99).toString()),
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
    liquidityMin: string,
    amountTokenMin: string,
    fee: string
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
    const cofixRouter = this.getCofixRouter(
      this.contractAddressList.CofixRouter,
      this.provider
    );

    return await this.executeContractMethodWithEstimatedGas(
      cofixRouter,
      'removeLiquidityGetToken',
      [
        token,
        this.parseEthers(liquidityMin),
        this.parseUnits(
          new BNJS(amountTokenMin).times(0.99).toString(),
          decimals
        ),
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
    const estimatedGas = new BNJS(
      ethersOf(
        await contract.estimateGas[functionName](...args)
          .then((value) => {
            const minimumGas = BigNumber.from('300000');
            if (value.lt(minimumGas)) {
              return minimumGas;
            }
            return value;
          })
          .catch((err) => {
            return BigNumber.from('700000');
          })
      )
    );
    const argsForOverridden = args.pop();
    argsForOverridden.gasLimit = this.parseEthers(
      estimatedGas.times(1.2).toString()
    );
    args.push(argsForOverridden);
    return contract.connect(this.getSigner())[functionName](...args);
  }

  private getSigner() {
    if (environment.e2e.on) {
      const pk = environment.e2e.wallet;
      return new ethers.Wallet(pk, this.provider);
    }

    return this.provider.getSigner();
  }

  // pair 由 token 决定，targetToken 用来看 pair 对于这个 token 的余额。
  // 对于 ETH，targetToken 用 WETH9 替代
  async getERC20BalanceOfPair(token: string, targetToken: string) {
    const pair = await this.getPairAddressByToken(token);
    const erc20Contract = this.getERC20Contract(targetToken, this.provider);
    const amount = new BNJS(
      unitsOf(
        await erc20Contract.balanceOf(pair),
        await this.getERC20Decimals(targetToken)
      )
    ).toString();

    return amount;
  }

  // // --------- TokenInfo Methods ------------ //

  async getERC20Decimals(tokenAddress: string) {
    const targetToken = tokenList(this.currentNetwork).find(
      (token) => token.address === tokenAddress
    );

    if (targetToken) {
      return targetToken.decimals.toString();
    }

    const contract = this.getERC20Contract(tokenAddress, this.provider);
    let decimals;
    try {
      decimals = await contract.decimals();
    } catch (e) {
      // 某些合约有 balanceOf 但没有 decimals 方法，这些合约实际不属于 erc20
      // 但目前采用此权宜之计，未来改进
      decimals = '18';
    }
    return decimals;
  }

  async getPairAddressByToken(tokenAddress: string) {
    const factory = this.getCoFixFacory(
      this.contractAddressList.CofixFactory,
      this.provider
    );
    const pairAddress = await factory.getPair(tokenAddress);
    return pairAddress;
  }

  async getStakingPoolAddressByToken(tokenAddress: string) {
    const coFiXVaultForLP = this.getCoFiXVaultForLP(
      this.contractAddressList.CoFiXVaultForLP,
      this.provider
    );

    const pairAddress = await this.getPairAddressByToken(tokenAddress);
    if (pairAddress === '0x0000000000000000000000000000000000000000') {
      throw new Error('invalid invocation!!!!!');
    }
    const stakingPoolAddress = await coFiXVaultForLP.stakingPoolForPair(
      await this.getPairAddressByToken(tokenAddress)
    );

    return stakingPoolAddress;
  }

  // // --------- Permissions Methods ------------ //

  // token、spender 对应
  // 交易、资金池页面（增加）：普通token，CofixRouter
  // 资金池（移除）：pair, CofixRouter
  // CoFi：pair，stakingPool
  // 收益：CoFiToken，CoFiStakingRewards
  async approved(token: string, spender: string) {
    const allowance = await this.getERC20Allowance(token, spender);
    if (!allowance.isZero()) {
      return true;
    } else {
      return false;
    }
  }

  // 普通 ERC20 Token
  // 可存入 Cofi：CoFiToken
  // 已存入 Cofi：CoFiStakingRewards
  // 未参与挖矿 XT：当前资金池的 pair 地址，this.getPairAddressByToken(token)
  // 参与挖矿的 XT：当前资金池对应的 stakingPool 地址，this.getStakingPoolAddressByToken(pair)
  async getERC20Balance(address: string) {
    const contract = this.getERC20Contract(address, this.provider);
    const balance = await contract.balanceOf(this.currentAccount);
    let decimals = await this.getERC20Decimals(address);
    if (!decimals) {
      try {
        decimals = await contract.decimals();
      } catch (e) {
        // 某些合约有 balanceOf 但没有 decimals 方法，这些合约实际不属于 erc20
        // 但目前采用此权宜之计，未来改进
        decimals = '18';
      }
    }
    return unitsOf(balance, decimals);
  }

  async earnedETH() {
    console.log('##');
    console.log(this.contractAddressList.CoFiStakingRewards);
    console.log(this.provider);
    console.log(this.currentAccount);
    const dividend = ethersOf(
      await this.getCoFiStakingRewards(
        this.contractAddressList.CoFiStakingRewards,
        this.provider
      ).earned(this.currentAccount)
    );
    console.log(dividend);
    return dividend;
  }

  private async getKInfo(address: string) {
    let kinfo;
    let latestK = '';

    if (tokenScriptContent[address]?.LiquidityPoolShare?.kInfoK) {
      kinfo = [0, 0, 0];
      kinfo[0] = tokenScriptContent[address].LiquidityPoolShare.kInfoK;
      kinfo[2] = tokenScriptContent[address].LiquidityPoolShare.kInfoTheta;
    } else {
      kinfo = await this.getCoFiXControllerContract(
        this.contractAddressList.CofiXController,
        this.provider
      ).getKInfo(address);

      const latestPrice = await this.checkPriceNow(address);
      latestK = await this.getCoFiXControllerContract(
        this.contractAddressList.CofiXController,
        this.provider
      ).calcK(latestPrice.vola, latestPrice.bn);

      console.log(
        `vola: ${latestPrice.vola}`,
        `bn: ${latestPrice.bn}`,
        `latestK: ${latestK}`
      );
    }

    kinfo = {
      kOriginal: latestK,
      k: new BNJS(latestK).div(1e8).toString(),
      theta: new BNJS(kinfo[2]).div(1e8).toString(),
      thetaOriginal: kinfo[2],
    };

    return kinfo;
  }

  private async checkPriceNow(tokenAddress: string) {
    let price;

    if (
      tokenScriptContent[tokenAddress]?.LiquidityPoolShare
        ?.referenceExchangeRateEthAmount
    ) {
      price = [0, 0];
      price[0] =
        tokenScriptContent[
          tokenAddress
        ].LiquidityPoolShare.referenceExchangeRateEthAmount;
      price[1] =
        tokenScriptContent[
          tokenAddress
        ].LiquidityPoolShare.referenceExchangeRateErc20Amount;
    } else {
      const oracle = this.getOracleContract(
        this.contractAddressList.OracleMock,
        this.provider
      );

      price = await oracle.latestPrice(tokenAddress);
    }

    const decimals = await this.getERC20Decimals(tokenAddress);
    const ethAmount = ethersOf(price[0]);
    const erc20Amount = unitsOf(price[1], decimals);
    const changePrice = new BNJS(erc20Amount)
      .div(new BNJS(ethAmount))
      .toString();
    const vola = price[3];
    const bn = price[4];

    price = {
      ethAmount,
      erc20Amount,
      changePrice,
      vola,
      bn,
    };

    return price;
  }

  private async getNavPerShare(address: string) {
    let navPerShare;
    if (tokenScriptContent[address]?.LiquidityPoolShare?.navPerShare) {
      navPerShare = ethersOf(
        tokenScriptContent[address]?.LiquidityPoolShare?.navPerShare
      );
    } else {
      const checkedPriceNow = await this.checkPriceNow(address);
      const pairAddress = await this.getPairAddressByToken(address);

      if (pairAddress === '0x0000000000000000000000000000000000000000') {
        throw new Error('invalid invocation!!!!!');
      }
      const coFiXPair = this.getCoFixPair(pairAddress, this.provider);
      navPerShare = ethersOf(
        await coFiXPair.getNAVPerShare(
          this.parseEthers(checkedPriceNow.ethAmount),
          this.parseUnits(
            checkedPriceNow.erc20Amount,
            await this.getERC20Decimals(address)
          )
        )
      );
    }
    return navPerShare;
  }

  async earnedCofiAndRewardRate(address: string) {
    let earned = '0';
    if (this.currentAccount) {
      const coFiXStakingRewards = this.getCoFiXStakingRewards(
        await this.getStakingPoolAddressByToken(address),
        this.provider
      );
      earned = ethersOf(await coFiXStakingRewards.earned(this.currentAccount));
    }

    return { earned };
  }

  // 领取 CoFi 收益
  async withdrawEarnedCoFi(
    stakingPoolAddress: string,
    staking: boolean = false
  ) {
    const contract = this.getCoFiXStakingRewards(
      stakingPoolAddress,
      this.provider
    );
    if (staking) {
      return await this.executeContractMethodWithEstimatedGas(
        contract,
        'getRewardAndStake',
        [{}]
      );
    } else {
      return await this.executeContractMethodWithEstimatedGas(
        contract,
        'getReward',
        [{}]
      );
    }
  }
}
