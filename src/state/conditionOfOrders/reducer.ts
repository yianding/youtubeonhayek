//import { INITIAL_ALLOWED_SLIPPAGE, DEFAULT_DEADLINE_FROM_NOW } from '../../constants'
import { createReducer } from '@reduxjs/toolkit'
import { TokenInfo } from '@uniswap/token-lists'
import { ethers } from 'ethers'

import { ChainId } from 'uniswap-hayek-sdk'
import { TagInfo, WrappedTokenInfo } from '../lists/hooks'
import {
  updateStartPrice
} from './actions'

export const DEFAULT_TOKEN_LIST:{[chainId in ChainId]:TokenInfo} = {
  [ChainId.MAINNET]:{
    chainId:ChainId.MAINNET ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.ROPSTEN]: {
    chainId:ChainId.ROPSTEN ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.RINKEBY]: {
    chainId:ChainId.RINKEBY ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.GÖRLI]:  {
    chainId:ChainId.GÖRLI ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.KOVAN]:  {
    chainId:ChainId.KOVAN ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.HAYEK]: {
    chainId:ChainId.HAYEK ,
    address: "0xa5E265Bf313b24476dA9681D61bDbdC03c66F271",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
 
  
  [ChainId.BSC]: {
    chainId:ChainId.BSC ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.ThaiChain]: {
    chainId:ChainId.ThaiChain ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Ubiq ]: {
    chainId:ChainId.Ubiq ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Optimistic ]: {
    chainId:ChainId.Optimistic ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.ThaiChain20 ]: {
    chainId:ChainId.ThaiChain20 ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Metadium ]: {
    chainId:ChainId.Metadium ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Flare ]: {
    chainId:ChainId.Flare ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Diode_Prenet ]: {
    chainId:ChainId.Diode_Prenet ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.ETC ]: {
    chainId:ChainId.ETC ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.EOS ]: {
    chainId:ChainId.EOS ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.OKExChain]: {
    chainId:ChainId.OKExChain ,
    address: "0x382bb369d343125bfb2117af9c149795c6c65c50",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.POA_Network]: {
    chainId:ChainId.POA_Network ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.POA_Network_Core]: {
    chainId:ChainId.POA_Network_Core ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.xDAI_Chain]: {
    chainId:ChainId.xDAI_Chain ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Huobi_ECO ]: {
    chainId:ChainId.Huobi_ECO ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Bittex_Mainnet ]: {
    chainId:ChainId.Bittex_Mainnet ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Fusion_Mainnet ]: {
    chainId:ChainId.Fusion_Mainnet ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Arbitrum_One ]: {
    chainId:ChainId.Arbitrum_One ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Polygon_Mainnet]: {
    chainId:ChainId.Polygon_Mainnet ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Fantom_Opera]: {
    chainId:ChainId.Fantom_Opera ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
  [ChainId.Moonrock ]: {
    chainId:ChainId.Moonrock ,
    address: "0x55d398326f99059fF775485246999027B3197955",
    name: "USDT",
    decimals: 18,
    symbol: "USDT",
    logoURI: "./images/USDT.png"
  },
}
export interface conditionOfOrdersState {
  // the timestamp of the last updateVersion actionS
  conditionOfOrders: {[chainId in ChainId]:any}
}

export function getDefaultWrapToken(chainId:ChainId): WrappedTokenInfo {

  const taginfo: TagInfo[] = [];
  const tokenInfo: TokenInfo = DEFAULT_TOKEN_LIST[chainId?chainId:ChainId.HAYEK]
  return new WrappedTokenInfo(tokenInfo, taginfo)
}
export const initialState: conditionOfOrdersState = {
  
  conditionOfOrders:{
   
    [ChainId.MAINNET]: {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.ROPSTEN]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.ROPSTEN).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.ROPSTEN).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.ROPSTEN),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.RINKEBY]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.GÖRLI]:   {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.KOVAN]:   {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.HAYEK]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.HAYEK).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.HAYEK).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.HAYEK),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
   
    
    [ChainId.BSC]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.BSC).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.BSC).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.BSC),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.ThaiChain]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Ubiq ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Optimistic ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.ThaiChain20 ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Metadium ]: {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Flare ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Diode_Prenet ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.ETC ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.EOS ]: {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.OKExChain]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.OKExChain).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.OKExChain).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.OKExChain),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.POA_Network]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.POA_Network_Core]: {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.xDAI_Chain]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Huobi_ECO ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Bittex_Mainnet ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Fusion_Mainnet ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Arbitrum_One ]: {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Polygon_Mainnet]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Fantom_Opera]: {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
    [ChainId.Moonrock ]:  {
      quantity_min: ethers.utils.parseUnits("0", getDefaultWrapToken(ChainId.MAINNET).decimals),
      quanity_max: ethers.utils.parseUnits("99999999999999999999999999999999999999999999", getDefaultWrapToken(ChainId.MAINNET).decimals),
      price_min: ethers.utils.parseUnits("0", 6),
      price_max: ethers.utils.parseUnits("99999999999999999999999999999999", 6),
      currency: {
        symbol: "CNY",
        logoURI: "https://www.xe.com/static-images/cny.static.b5710fca4cc33e583970ae4944a552f1.svg",
        describe: "Chinese currency,人民币",
        sign: "￥"
      }, linenumber: 100, erc20: getDefaultWrapToken(ChainId.MAINNET),  sellerDeposit:ethers.utils.parseUnits("0", 18),buyerDeposit:ethers.utils.parseUnits("99999999999999999999", 18),
       myBuyOrderLineNumber: 50, mySellOrderLineNumber: 50
      },
}
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateStartPrice, (state, { payload: ss }) => {

      state.conditionOfOrders = ss
    })

)
