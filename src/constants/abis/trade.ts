import { Interface } from '@ethersproject/abi'
import TRADE_ABI from './trade.json'

const TRADE_INTERFACE = new Interface(TRADE_ABI)

//const TRADE_ADDRESS = '0x4840800Be4Ba0227D300C08bdd6A9e774e35dB7e' //正在使用中的
//const TRADE_ADDRESS = '0x6d70d90832BF369915D5904133BbB23a2928d963'//hayek
const TRADE_ADDRESS = '0x5De2994114e740A3BD049c74D6aE06529F6C99c6'

export default TRADE_INTERFACE
export { TRADE_ABI, TRADE_ADDRESS }
