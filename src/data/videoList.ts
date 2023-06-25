//import { Token, TokenAmount } from 'uniswap-hayek-sdk'
//import { isBytesLike } from '@ethersproject/bytes'
import { useMemo } from 'react'

import {  useProfileContract, useVideoListContract} from '../hooks/useContract'

import { Result, useSingleCallResult, useSingleContractMultipleData } from '../state/multicall/hooks'
import {  ethers } from 'ethers'



export interface CallState {
  readonly valid: boolean
  // the result, or undefined if loading or errored/no data
  readonly result: Result | undefined
  // true if the result has never been fetched
  readonly loading: boolean
  // true if the result is not for the latest block
  readonly syncing: boolean
  // true if the call was made and is synced, but the return data is invalid
  readonly error: boolean
}

export function useVideoListData(start:ethers.BigNumber,amount:ethers.BigNumber): CallState[] | undefined {

  const contract = useVideoListContract(false)

  const inputs = useMemo(() => [start,amount],[start,amount])
  const order = useSingleContractMultipleData(contract, 'queryNewVideo', [inputs])
  return useMemo(() => (order ? order : undefined), order)
}
export function useProfileData(account:string): CallState[] | undefined {

  const contract = useProfileContract(false)

  const inputs = useMemo(() => [account],[account])
  const data = useSingleContractMultipleData(contract, 'profiles', [inputs])
  return useMemo(() => (data ? data : undefined), data)
}


export function useGetVideoCount(): CallState  {

  const contract = useVideoListContract(false)

 
  const count = useSingleCallResult(contract, 'getVideoCount', [])
  return count
}