import { ChainId } from "uniswap-hayek-sdk";


export declare class JUDGE {
    readonly address: string;
    readonly deposit: string;
    readonly name: string;
    readonly logoURI: string;
    readonly URL: string;
    readonly describe: string;
    protected constructor(address: string, deposit: string, name: string, logoURI: string, URL: string, describe: string);
}

//0x6c97AFcd30F0AC3ea11258ff67e5E89F4B18b651
// const ALLJUDGE: JUDGE:{chainId in ChainId} = 
// [
    
//     { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    
// ]

const ALLJUDGE: { [chainId in ChainId]: [JUDGE] } = {
    [ChainId.MAINNET]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.ROPSTEN]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.KOVAN]: [
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.RINKEBY]: [
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.GÖRLI]: [
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.HAYEK]: [
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.BSC]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"币安链DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.ThaiChain]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"0.1BNB",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Ubiq ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Optimistic ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.ThaiChain20 ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Metadium ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Flare ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Diode_Prenet ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.ETC ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.EOS ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.OKExChain]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.POA_Network]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.POA_Network_Core]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.xDAI_Chain]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Huobi_ECO ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Bittex_Mainnet ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Fusion_Mainnet ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Arbitrum_One ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Polygon_Mainnet]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Fantom_Opera]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    [ChainId.Moonrock ]:[
        { address:"0x0a44ac0dCfe71De756876c7E6d93DF4a7440ae42",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "./images/court.png", URL: "https://dotc.trade/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    ],
    
  }
export function AllJudge(chainId:ChainId):   [JUDGE] {
    return ALLJUDGE[chainId];
}
export function getJudge(chainId:ChainId,address: string): (JUDGE | undefined) {
    let re: JUDGE | undefined;
 
    ALLJUDGE[chainId?chainId:ChainId.HAYEK].forEach(element => {
        if (element.address === address) re = element;
    });
    
    return re

}
