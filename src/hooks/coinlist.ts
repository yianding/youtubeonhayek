import { TokenInfo, TokenList } from '@uniswap/token-lists'

export const ALLTOKENTokenList: TokenList = 
{
  "name": "HAYEK",
  "logoURI": "https://hayek.link/128.png",
  "keywords": [
    "HAYEK",
    "defi"
  ],
  "timestamp": "2021-11-19T20:37:00.000+00:00",
  "tokens": [
 
   
    {
      "chainId": 56,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "name": "USDT",
      "symbol": "USDT",
      "decimals": 18,
      "logoURI": "https://hayek.link/0xb7C8d76587DbE244d25a76555aEBcB2dd77ae4F0.png"
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
        "chainId": 56,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "name": "USDT",
        "symbol": "USDT",
        "decimals": 18,
        "logoURI": "./images/USDT.png"
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
    //             if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
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
  
      if(token.address.toString()===address){
        re= token
      }
     }
     )
    //   tokenlist?.byUrl["https://hayek.link/coinlist.json"]?.current?.tokens.map((token)=>{
  
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