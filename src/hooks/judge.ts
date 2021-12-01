export declare class JUDGE {
    readonly address: string;
    readonly deposit: string;
    readonly name: string;
    readonly logoURI: string;
    readonly URL: string;
    readonly describe: string;
    protected constructor(address: string, deposit: string, name: string, logoURI: string, URL: string, describe: string);
}
const ALLJUDGE: JUDGE[] = [
    { address:"0x6c97AFcd30F0AC3ea11258ff67e5E89F4B18b651",deposit:"10000",name:"DOTC交易所官方法院", logoURI: "https://hayek.link/court.png", URL: "https://hayek.link/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2",describe: "US Dollar" },
    
]
export function AllJudge(): JUDGE[] {
    return ALLJUDGE;
}
export function getJudge(address: string): (JUDGE | undefined) {
    let re: JUDGE | undefined;
    ALLJUDGE.forEach(element => {
        if (element.address === address) re = element;
    });
    
    return re

}
