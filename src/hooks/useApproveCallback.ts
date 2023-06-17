import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { Trade, TokenAmount, CurrencyAmount, ETHER, ChainId } from 'uniswap-hayek-sdk'
import { useCallback, useMemo } from 'react'
import { ROUTER_ADDRESS } from '../constants'
import { useTokenAllowance } from '../data/Allowances'
import { getTradeVersion, useV1TradeExchangeAddress } from '../data/V1'
import { Field } from '../state/swap/actions'
import { useTransactionAdder, useHasPendingApproval } from '../state/transactions/hooks'
import { computeSlippageAdjustedAmounts } from '../utils/prices'
import { calculateGasMargin } from '../utils'
import { useTokenContract } from './useContract'
import { useActiveWeb3React } from './index'
import { Version } from './useToggledVersion'
import { useBuyerDisputeBlockNumberData, useDisputeFeeData, useDisputeResultData, useMyBuyTradeOrderData, useMySaleTradeOrderData, useOrderByIdData, useSellerDisputeBlockNumberData, useTradeOrderData } from '../data/tradeOrderData'
import { TRADE_ADDRESS } from '../constants/abis/trade'
import {useGetVideoCount, useVideoLIstData} from '../data/videoList'
import { BigNumber, ethers } from 'ethers'
export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED
}

export function useGetOrderDataCallBack():any[]|undefined{
  const order=useTradeOrderData()

  let r:any|undefined
  if(order){
    if(order[0].result)
       r=order[0].result[0]
  }
  return r
}
export function useGetVideoListDataCallBack(start:BigNumber,amount:BigNumber):any[]|undefined{
  const order=useVideoLIstData(start,amount)

  let r:any|undefined
  if(order){
    if(order[0].result)
       r=order[0].result[0]
  }
  return r
}
export function useGetVideoCountCallBack():ethers.BigNumber{
  const order=useGetVideoCount()

  let r:ethers.BigNumber
  r=ethers.BigNumber.from(0)
  if(order){
    if(order.result)
       r=ethers.BigNumber.from(order.result)
  }
  return r
}

export function useGetOrderByIdCallBack(id:string):any[]|undefined{
  
  const order=useOrderByIdData(id)

  let r:any|undefined=undefined
  if(order){
    if(order[0].result)
       r=order[0].result[0]
  }
  return r
}


export function useGetMyBuyOrderDataCallBack():any[]|undefined{
  const order=useMyBuyTradeOrderData()
 
  let r:any|undefined=undefined
  if(order){
    if(order[0].result)
       r=order[0].result[0]
  }
  return r
}
export function useGetMySaleOrderDataCallBack():any[]|undefined{
  const order=useMySaleTradeOrderData()
 
  let r:any|undefined=undefined
  if(order){
    if(order[0].result)
       r=order[0].result[0]
  }
  return r
}
export function useGetSellerDisputeBlockNumberCallBack():any|undefined{
  const blockNumber=useSellerDisputeBlockNumberData()

  let r:any|undefined=undefined
  if(blockNumber){
    if(blockNumber[0].result)
       r=blockNumber[0].result[0]
  }
  
  return r
}
export function useGetBuyerDisputeBlockNumberCallBack():any|undefined{
  const blockNumber=useBuyerDisputeBlockNumberData()

  let r:any|undefined=undefined
  if(blockNumber){
    if(blockNumber[0].result)
       r=blockNumber[0].result[0]
  }
  
  return r
}
export function useGetDisputeFeeCallBack(judge_address:string,id:any):any|undefined{
  const disputeFee=useDisputeFeeData(judge_address,id)

  let r:any|undefined=undefined
  if(disputeFee){
    if(disputeFee[0].result)
       r=disputeFee[0].result[0]
  }
  
  return r
}

export function useGetDisputeResultCallBack(judge_address:string,id:any):any|undefined{
  const disputeResult=useDisputeResultData(judge_address,id)

  let r:any|undefined=undefined

  if(disputeResult){
    if(disputeResult[0].result)
       r=disputeResult[0]
  }

  return r
}




// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount ,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const { account } = useActiveWeb3React()
  const token = amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined
  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address, spender)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    if (amountToApprove.currency === ETHER) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, pendingApproval, spender])

  const tokenContract = useTokenContract(token?.address)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amountToApprove) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, amountToApprove.raw.toString())
    })

    return tokenContract
      .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + amountToApprove.currency.symbol,
          approval: { tokenAddress: token.address, spender: spender }
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction])

  return [approvalState, approve]
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(trade?: Trade, allowedSlippage = 0) {
  const amountToApprove = useMemo(
    () => (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field.INPUT] : undefined),
    [trade, allowedSlippage]
  )
  const tradeIsV1 = getTradeVersion(trade) === Version.v1
  const v1ExchangeAddress = useV1TradeExchangeAddress(trade)
  return useApproveCallback(amountToApprove, tradeIsV1 ? v1ExchangeAddress : ROUTER_ADDRESS)
}
export function useMyApproveCallbackFromTrade(a:CurrencyAmount|undefined) {
   const {chainId} = useActiveWeb3React()
  return useApproveCallback(a, TRADE_ADDRESS[chainId?chainId:ChainId.HAYEK])
}
