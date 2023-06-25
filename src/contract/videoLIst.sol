// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;
//200 default
contract NewVideo {
     struct postcontent{
       address poster;
       string content;
   }
   struct Video{
       uint id;
       uint publicdatetime;
       address publicAddr;
       string  ipfs;
       string title;
       uint income;
    }
    Video[] public allVideo;
    mapping(address=>uint) public balance;
    mapping(uint=>postcontent[]) public bbs;
    mapping(address => uint[]) public myVideo;
    function getVideoCount() public view returns(uint){
        return allVideo.length;
    }
    function like(uint id,string memory likeText) public payable returns(bool){
      //  require(bytes[likeText].length>0 && bytes[likeText].length<500,"Please input Text");
            postcontent memory t=postcontent(msg.sender,likeText);
           // post.push(t);
               bbs[id].push(t);
           
           allVideo[id].income=allVideo[id].income+msg.value;
           balance[allVideo[id].publicAddr]= balance[allVideo[id].publicAddr]+msg.value;
           return true;
    }
    function publicVideo(string memory ipfs,string memory title) public  returns (bool){
       Video memory tempVideo = Video(allVideo.length,block.timestamp,msg.sender,ipfs,title,0);
       allVideo.push(tempVideo);
       myVideo[msg.sender].push(allVideo.length -1);
       return true;
    }

    function queryNewVideo(uint endLineNumber,uint MaxLines) view public returns(Video[] memory r){
     
      Video[] memory s=new Video[](MaxLines);
    
      uint endline;
      if(endLineNumber>0){
            if(endLineNumber>=allVideo.length){
                endline=allVideo.length-1;
            }else{
                endline=endLineNumber;
            }
      }else{
          endline=allVideo.length-1;
      }
      uint x=0;
          for (uint i=endline; i>0 && x<MaxLines; i--) {
          s[x] = allVideo[i];
             
           
              x = x+1;
       
     }
        return (s);
    }
}