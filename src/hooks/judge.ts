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
    { address:"0xDd8146d63Cf65a2f3EA7996A424810630b1CB31a",deposit:"100",name:"A法院", logoURI: "https://img1.baidu.com/it/u=2625606352,3477844287&fm=26&fmt=auto", URL: "https://www.w3.org/",describe: "US Dollar" },
    { address:"0x97dBB41860dE6F93742B4481695C8975B904dFe1",deposit:"120",name:"B法院", logoURI: "https://img2.baidu.com/it/u=3179159640,3955506140&fm=26&fmt=auto", URL: "https://www.baidu.com/",describe: "US Dollar" },
    { address:"0xc6d0104DaB643a59405Cb5A21617583e9A4619a2",deposit:"1030",name:"C法院", logoURI: "https://img2.baidu.com/it/u=2047125127,1982340709&fm=26&fmt=auto", URL: "https://www.w3.org/",describe: "US Dollar" },
    { address:"0x8A69FC6ac357137dcB4Ec1C77ca559F4F38b98aa",deposit:"10012",name:"D法院", logoURI: "https://img1.baidu.com/it/u=1266231047,3990504408&fm=26&fmt=auto", URL: "https://www.baidu.com/",describe: "US Dollar" }
   

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
