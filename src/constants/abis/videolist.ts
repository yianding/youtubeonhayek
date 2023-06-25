import { Interface } from '@ethersproject/abi'
import VIDEOLIST_ABI from './vidoelist.json'
import PROFILE_ABI from './profile.json'

const VIDEO_INTERFACE = new Interface(VIDEOLIST_ABI)

//const TRADE_ADDRESS = '0x4840800Be4Ba0227D300C08bdd6A9e774e35dB7e' //正在使用中的
const videolist_address='0x8b70fa860b6E5AE73529A4ba426A47aC3F240690'
const  profile_addres='0x2ce5555AFD22B6cD3cb2495fa2229736f8Cc33d8'
//const TRADE_ADDRESS = '0x5De2994114e740A3BD049c74D6aE06529F6C99c6'

export default VIDEO_INTERFACE
export { VIDEOLIST_ABI, videolist_address,profile_addres,PROFILE_ABI }
