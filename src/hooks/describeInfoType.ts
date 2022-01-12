
export declare class INFOTYPE {
    readonly  InfoText:string;
    readonly  logoURI:string;
    readonly  Describe:string;
    protected constructor( InfoText: string,logoURI:string,Describe:string);
}
 const ALLINFOTYPE:INFOTYPE[]=[
{  InfoText:"Telegram",
    logoURI:"https://telegram.org/favicon.ico?4",
    Describe:""
 },
{  InfoText:"WeChat",
   logoURI:"https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico",
   Describe:"WeChat account"
},         
{  InfoText:"Secret WeChat",
   logoURI:"https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico",
   Describe:"Secret WeChat account"
},
{  InfoText:"Alipay",
   logoURI:"https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico",
   Describe:"Alipay"
},
{  InfoText:"QQ",
   logoURI:"https://qzonestyle.gtimg.cn/qzone/qzact/act/external/tiqq/logo.png",
   Describe:"QQ account"
},
{  InfoText:"Wallet Address",
   logoURI:"images/wallet.png",
   Describe:"Wallet Address"
},
{  InfoText:"Bank Card Cash Deposit",
   logoURI:"./images/seccontract.jpg",
   Describe:"Bank Card Cash Deposit"
},
{  InfoText:"CryptoContract",
   logoURI:"./images/seccontract.jpg",
   Describe:"Crypto Contract"
},
{  InfoText:"Bank Card Number",
   logoURI:"./images/bankcard.png",
   Describe:"Bank Card Number"
},
// {  InfoText:"Bank Account",
//    logoURI:"./images/bankcard.png",
//    Describe:"Bank Account"
// },
{  InfoText:"Bank Name",
   logoURI:"./images/bank.png",
   Describe:""
},
// {  InfoText:"__",
//    logoURI:"./images/blankline.jpg",
//    Describe:""
// },
{  InfoText:"Line",
   logoURI:"https://line.me/apple-touch-icon-57x57.png",
   Describe:""
},
{  InfoText:"Whatsapp",
   logoURI:"https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png",
   Describe:""
},
{  InfoText:"Facebook",
   logoURI:"https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico",
   Describe:""
},
{  InfoText:"Twitter",
logoURI:"https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc7275.png",
Describe:""
},
{  InfoText:"Messenger",
logoURI:"https://static.xx.fbcdn.net/rsrc.php/ym/r/YQbyhl59TWY.ico",
Describe:""
},
{  InfoText:"Email",
logoURI:"https://d29fhpw069ctt2.cloudfront.net/icon/image/84650/preview.svg",
Describe:""
},
{  InfoText:"Full Name",
logoURI:"./images/fullname.png",
Describe:""
},
{  InfoText:"Phone",
logoURI:"https://media.istockphoto.com/vectors/phone-icon-call-application-symbol-green-round-button-flat-interface-vector-id1250911025?k=20&m=1250911025&s=170667a&w=0&h=1aZJUHR8KVcvWKyVaufUdR8yN_r5VqTCfyGNx8pdOAY=",
Describe:""
}
,
{  InfoText:"Require Buyer KYC",
logoURI:"images/KYC.png",
Describe:""
}
,
{  InfoText:"Wait hours Confirm",
logoURI:"images/hours.png",
Describe:""
},



{  InfoText:"Others",
logoURI:"images/others.png",
Describe:""
}





]
export function AllInfoType():INFOTYPE[]  {
 return ALLINFOTYPE;
}
export function getInfoType(symbol:string):(INFOTYPE|undefined){
    let re:INFOTYPE|undefined;
    ALLINFOTYPE.forEach(element => {
     if(element.InfoText===symbol) re=element;
    });
   return re

}

