// SPDX-License-Identifier:MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract BaseRelayRecipient{


   address internal trustedForwarder = 0xa4B5eE2906090ce2cDbf5dfff944db26f397037D;  //open-protestnet

   function _msgSender() internal virtual returns (address sender) {
       bytes memory bytesRelayHub;
       (,bytesRelayHub) = trustedForwarder.call(abi.encodeWithSignature("getRelayHub()"));

       if (msg.sender == abi.decode(bytesRelayHub, (address))){ //sender is RelayHub then return origin sender
           bytes memory bytesSender;
           (,bytesSender) = trustedForwarder.call(abi.encodeWithSignature("getMsgSender()"));

           return abi.decode(bytesSender, (address));
       } else { //sender is not RelayHub, so it is another smart contract
           return msg.sender;
       }
   }
}