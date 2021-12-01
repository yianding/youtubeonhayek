//0.8.10 default optimizer 100
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
interface judgeStandard{
    function dispute(uint id,uint8 requirePrecentSubjectToseller,uint8 requirePrecentDepositToseller) external payable returns(bool r);
    function getResult(uint id) external returns (uint8 precentSubjectToseller,uint8 precentDepositToseller,bool resultState);
    function getArbitrationFee(uint id) external returns(uint arbitrationFee);
    
    function getUrl() external returns(string memory);
    function getName() external returns(string memory);
}
contract judge{
    struct Case{
        uint8 precentSubjectToseller;
        uint8 precentDepositToseller;
        bool resultState;
        bool isDispute;
    }
     mapping(uint=>Case) public allCase;
     uint[] public judgingCase;
     address payable private owner;
     mapping(address => bool) public judger;
     string public constant url = "https://hayek.link/cn/court.html#%E5%93%88%E8%80%B6%E5%85%8B%E9%93%BE%E5%AE%98%E6%96%B9%E6%B3%95%E9%99%A2";
     string public constant name =  "D-OTC Official Court";
     uint public Fee;
     
     constructor() public{
        owner=payable(msg.sender);
        Fee=1000 ether;
    }
    
     function getUrl() public returns(string memory){
         return url;
     }
    
     function getName() public returns(string memory){
         return name;
     }

     function setFee(uint fee) public returns(bool){
         require(owner==msg.sender);
         Fee=fee;
         return true;
     }

     function toJudge(uint id,uint8 precentSubjectToseller,uint8 precentDepositToseller) public returns(bool){
         require(msg.sender==owner||judger[msg.sender],"you can not judge");
         allCase[id].precentDepositToseller=precentDepositToseller;
         allCase[id].precentSubjectToseller=precentSubjectToseller;
         allCase[id].resultState=true;
         return true;
     }
     
     function dispute(uint id,uint8 requirePrecentSubjectToseller,uint8 requirePrecentDepositToseller) public  payable returns(bool r){
         require(msg.value==Fee,"wrong msgvalue");
         require(msg.sender==0x4840800Be4Ba0227D300C08bdd6A9e774e35dB7e,"wrong smart contract address");//==contract address
         require(allCase[id].isDispute==false,"this case is accepted,you can not dispute it again.");
         judgingCase.push(id);
         allCase[id].isDispute=true;
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
     
     function getWaitingForJudgingCase(uint linenumber) public view returns(uint[] memory r){
         r=new uint[](linenumber);
         uint x=0;
         uint length=judgingCase.length;
         for(uint i=0;i<length&&x<linenumber;i++){
             if(allCase[judgingCase[length-i-1]].resultState==false){
                 r[x]=judgingCase[i];
                 x=x+1;
             }
         }
     }
     
     function withdraw(uint num) public returns(bool){
         require(msg.sender==owner,"you are not owner");
         owner.transfer(num);
     }
         
    
    function manageJudger(address judgerAddr,bool state) public returns(bool){
        require(msg.sender==owner,"you can not manage judger");
        judger[judgerAddr]=state;
        return true;
    }
}