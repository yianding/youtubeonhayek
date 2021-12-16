//SPDX-License-Identifier:MIT
//optimizer 30000 0.8.10 default
pragma solidity ^0.8.10;
pragma experimental ABIEncoderV2;
interface judgeStandard{
    function dispute(uint id,uint8 requirePrecentSubjectToseller,uint8 requirePrecentDepositToseller) external payable returns(bool r);
    function getResult(uint id) external returns (uint8 precentSubjectToseller,uint8 precentDepositToseller,bool resultState);
    function getArbitrationFee(uint id) external returns(uint arbitrationFee);
    
    function getUrl() external returns(string memory);
    function getName() external returns(string memory);
}
    struct Order{
       uint salenumber;
       uint price;
       uint lockedblocknumber;
       address payable seller;
       address payable buyer;
       address arbitration;
       address erc20address;
       uint sellerLiquidataedDamages;
       uint buyerLiquidataedDamages;
       string describe;
       string Currency;
       uint8 state;   //0 put 1 lock 2 complete 3 judge
    }
interface trading{
       function getOrderInfo(uint index) external view returns(Order memory);
}
contract judge{
    struct Case{
        string sellerProof;
        string buyerProof;
        uint8 precentSubjectToseller;
        uint8 precentDepositToseller;
        bool resultState;
        uint disputedBlockNum;
    }
    struct CaseProof{
        uint id;
        Case caseInfo;
        Order orderInfo;
    }
     mapping(uint=>Case) public allCase;
     mapping(address=>uint[]) myCase;
     uint[] public judgingCase;
     address payable private owner;
     mapping(address => bool) public judger;
     string public constant url = "https://hayek.link/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2";
     string public constant name =  "D-OTC Official Court";
     uint public Fee;
     address public tradingAddress=0x6d70d90832BF369915D5904133BbB23a2928d963;
     
     constructor(){
        owner=payable(msg.sender);
        Fee=1000 ether;
    }
    
     function getUrl() public pure returns(string memory){
         return url;
     }
    
     function getName() public pure returns(string memory){
         return name;
     }

     function setFee(uint fee) public returns(bool){
         require(owner==msg.sender);
         Fee=fee;
         return true;
     }

     function toJudge(uint id,uint8 precentSubjectToseller,uint8 precentDepositToseller) public returns(bool){
         require(msg.sender==owner||judger[msg.sender],"you can not judge");
         require(allCase[id].disputedBlockNum!=0,"wrong id to judge");
         allCase[id].precentDepositToseller=precentDepositToseller;
         allCase[id].precentSubjectToseller=precentSubjectToseller;
         allCase[id].resultState=true;
         return true;
     }
     
     function dispute(uint id,uint8 requirePrecentSubjectToseller,uint8 requirePrecentDepositToseller) public  payable returns(bool r){
         require(msg.value==Fee,"wrong msgvalue");
         require(msg.sender==tradingAddress,"wrong smart contract address");
         require(allCase[id].disputedBlockNum==0,"this case is accepted,you can not dispute it again.");
         judgingCase.push(id);
         allCase[id].disputedBlockNum=block.number;
         Order memory d = trading(tradingAddress).getOrderInfo(id);
         myCase[d.seller].push(id);
         myCase[d.buyer].push(id);
         return true;
     }
     
     function getResult(uint id) public view returns (uint8 precentSubjectToseller,uint8 precentDepositToseller,bool resultState){
         precentSubjectToseller=allCase[id].precentSubjectToseller;
         precentDepositToseller=allCase[id].precentDepositToseller;
         resultState=allCase[id].resultState;
     }
     
     function getArbitrationFee(uint id) public view returns(uint arbitrationFee){
         arbitrationFee= Fee;
     }
     
     function getWaitingForJudgingCase(uint linenumber) public view returns(CaseProof[] memory r){
         r = new CaseProof[](linenumber);
         uint x=0;
         uint length=judgingCase.length;
         for(uint i=0;i<length&&x<linenumber;i++){
             uint index = judgingCase[length-i-1];
             if(allCase[index].resultState==false){
                 CaseProof memory temp = CaseProof(index,allCase[index],trading(tradingAddress).getOrderInfo(index));
                 r[x]=temp;
                 x++;
             }
         }
     }
     
     function getMyCase(address sender,uint linenumber) public view returns(CaseProof[] memory r){
         r = new CaseProof[](linenumber);
         uint x=0;
         uint length=myCase[sender].length;
         for(uint i=0;i<length&&x<linenumber;i++){
             uint index = myCase[sender][length-i-1];
             CaseProof memory temp = CaseProof(index,allCase[index],trading(tradingAddress).getOrderInfo(index));
             r[x]=temp;
             x++;
         }
     }

     function uploadProof(uint index,string memory proof) public returns(bool){
        Order memory d = trading(tradingAddress).getOrderInfo(index);
        require(msg.sender==d.buyer||msg.sender==d.seller,"You can not Upload proof for this case");
        if(msg.sender==d.seller){
            allCase[index].sellerProof=proof;
        }else{
            allCase[index].buyerProof=proof;
        }
        return true;
     }

     function withdraw(uint num) public returns(bool){
         require(msg.sender==owner,"you are not owner");
         owner.transfer(num);
         return true;
     }
    
    function manageJudger(address judgerAddr,bool state) public returns(bool){
        require(msg.sender==owner,"you can not manage judger");
        judger[judgerAddr]=state;
        return true;
    }
}