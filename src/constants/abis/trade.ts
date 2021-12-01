import { Interface } from '@ethersproject/abi'
import TRADE_ABI from './trade.json'

const TRADE_INTERFACE = new Interface(TRADE_ABI)


const TRADE_ADDRESS = '0x4840800Be4Ba0227D300C08bdd6A9e774e35dB7e'

export default TRADE_INTERFACE
export { TRADE_ABI, TRADE_ADDRESS }
