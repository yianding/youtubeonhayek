import { TokenInfo, TokenList } from '@uniswap/token-lists'

export const ALLTOKENTokenList: TokenList = 
{
  "name": "HAYEK",
  "logoURI": "./128.png",
  "keywords": [
    "HAYEK",
    "defi"
  ],
  "timestamp": "2021-11-19T20:37:00.000+00:00",
  "tokens": [
    {
      "chainId": 56,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "name": "Wrapped BNB",
      "symbol": "WBNB",
      "decimals": 18,
      "logoURI": "https://bscscan.com/token/images/binance_32.png"
    },
    {
      "chainId": 66,
      "address": "0x8f8526dbfd6e38e3d8307702ca8469bae6c56c15",
      "name": "Wrapped OKT",
      "symbol": "WOKT",
      "decimals": 18,
      "logoURI": "https://static.oklink.com/cdn/explorer/icon/pool/okt.png"
    },
    
    {
      "chainId": 66,
      "address": "0x382bb369d343125bfb2117af9c149795c6c65c50",
      "name": "USDT",
      "symbol": "USDT",
      "decimals": 18,
      "logoURI": "images/USDT.png"
    }, 
    
    {
      "chainId": 56,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "name": "USDT",
      "symbol": "USDT",
      "decimals": 18,
      "logoURI": "images/USDT.png"
    }, 
    {
      "chainId": 1000,
      "address": "0xf3DD11F7d8fA791c2Da46a5D26634592E417Af6C",
      "name": "WHYK",
      "symbol": "WHYK",
      "decimals": 18,
      "logoURI": "images/WHYK.png"
    },
    {
      "chainId": 1000,
      "address": "0xa5E265Bf313b24476dA9681D61bDbdC03c66F271",
      "name": "USDT",
      "symbol": "USDT",
      "decimals": 8,
      "logoURI": "images/USDT.png"
    }
 
  ],
  "version": {
    "major": 5,
    "minor": 1,
    "patch": 0
  }
}

export const ALLTOKEN: TokenInfo[] = [
  
  {
    "chainId": 1000,
    "address": "0xf3DD11F7d8fA791c2Da46a5D26634592E417Af6C",
    "name": "WHYK",
    "symbol": "WHYK",
    "decimals": 18,
    "logoURI": "images/WHYK.png"
  },
  {
    "chainId": 1000,
    "address": "0xa5E265Bf313b24476dA9681D61bDbdC03c66F271",
    "name": "USDT",
    "symbol": "USDT",
    "decimals": 8,
    "logoURI": "images/USDT.png"
  },
  {
    "chainId": 66,
    "address": "0x8f8526dbfd6e38e3d8307702ca8469bae6c56c15",
    "name": "Wrapped OKT",
    "symbol": "WOKT",
    "decimals": 18,
    "logoURI": "https://static.oklink.com/cdn/explorer/icon/pool/okt.png"
  },
  
  {
    "chainId": 66,
    "address": "0x382bb369d343125bfb2117af9c149795c6c65c50",
    "name": "USDT",
    "symbol": "USDT",
    "decimals": 18,
    "logoURI": "images/USDT.png"
  }, 
  {
    "chainId": 56,
    "address": "0x55d398326f99059fF775485246999027B3197955",
    "name": "USDT",
    "symbol": "USDT",
    "decimals": 18,
    "logoURI": "images/USDT.png"
  },
  {
    "chainId": 56,
    "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    "name": "WBNB",
    "symbol": "WBNB",
    "decimals": 18,
    "logoURI": "https://bscscan.com/images/gen/binance_20.png"
  }
      
]
export function MyTokenlist(address:String):TokenInfo|undefined {
    let re:TokenInfo|undefined
    // const tokenlist = useSelector<AppState, AppState['lists']>(state => {
    // return state.lists
    // })
    // var url = "./locales/coinlist.json"
    //           var request = new XMLHttpRequest();
    //           request.open("get", url);/*设置请求方法与路径*/
    //           request.send(null);
    //           request.onload = function () {/*XHR对象获取到返回信息后执行*/
    //             if (request.status ===  200) {/*返回状态为200，即为数据获取成功*/
    //                 var json = JSON.parse(request.responseText);
    //                 // for(var i=0;i<json.length;i++){
    //                 //   console.log(json[i].name);
    //                 // }      
    //                 json.tokens.map((token:TokenInfo)=>{
    //               //    console.log("ddd",token.address);
    //                   if(token.address.toString()===address){
    //                     console.log("ddds")       
    //                     re =token              
    //                   }
    //                  } )
    //             }
    //         }
    ALLTOKEN.map((token)=>{
  
      if(token.address.toString().toLowerCase()===address.toLowerCase()){
        re= token
      }
     }
     )
    //   tokenlist?.byUrl["https://dotc.trade/coinlist.json"]?.current?.tokens.map((token)=>{
  
    //     if(token.address.toString()===address){
    //       re= token
    //     }
    //    } )
  
    // if(re==undefined){
    // let r=window.location.host
    // tokenlist?.byUrl[r+"/coinlist.json"]?.current?.tokens.map((token)=>{
  
    //     if(token.address.toString()===address){
    //       re= token
    //     }
    //    } )
    // }
    return re
  }