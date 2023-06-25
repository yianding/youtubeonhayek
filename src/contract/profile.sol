// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;
//200 default
contract ProfileContract {

    struct Profile{
        string avatar;
        string name;
        string gender;
        string e_mail;

    }
    mapping(address=>Profile) public profiles;

    function setProfile(string calldata avatar,string calldata name,string calldata gender,string calldata e_mail) public {
        profiles[msg.sender]=Profile(avatar,name,gender,e_mail);
    }
}