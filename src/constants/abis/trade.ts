import { Interface } from '@ethersproject/abi'
import TRADE_ABI from './trade.json'

const TRADE_INTERFACE = new Interface(TRADE_ABI)


const TRADE_ADDRESS = '0xA12b9d0A8b93a4dA8035e0b5139Be2848f0c0a27'

export default TRADE_INTERFACE
export { TRADE_ABI, TRADE_ADDRESS }
