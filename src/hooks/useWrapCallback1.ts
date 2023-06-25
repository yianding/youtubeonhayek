//@ts-nocheck
import { ethers } from 'ethers'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ChainId } from 'uniswap-hayek-sdk'
import { NETH } from '../constants'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { MyTokenlist } from './coinlist'
import { useActiveWeb3React } from './index'
import { useTradeContract, useVideoListContract ,useProfileContract} from './useContract'

interface ErrorConstructor {
  new(message?: string): Error;
  (message?: string): Error;
  readonly prototype: Error;
}

declare var Error: ErrorConstructor;
export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP
}

const NOT_APPLICABLE1 = { wrapType1: WrapType.NOT_APPLICABLE }
const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback1(
  id: string, mvalue: string
): { wrapType: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
  const { chainId } = useActiveWeb3React()

  const wethContract = useTradeContract()
  const balance = useCurrencyBalance()
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()
  return useMemo(() => {
    if (!wethContract || !chainId) return NOT_APPLICABLE

    const sufficientBalance = true

    if (true) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance
            ? async () => {
              try {

                const txReceipt = await wethContract.lockSaleOrder(id, { value: mvalue })

                addTransaction(txReceipt, { summary: `${t("LOCK")} ${t("OREDER")}: ${id} ${t("with")} ${ethers.utils.formatEther(mvalue)} ${NETH[chainId ? chainId : ChainId.HAYEK]}` })
                return txReceipt.hash
              } catch (error) {
                if (error?.code === 4001) {
                  throw new Error(t('Transaction rejected.'))
                } else {
                  throw new Error(`${t("Lock Order")}${id} ${t("failed")}: ${t(error.data.message.split(":")[1])}`)

                }
              }
            }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ETH balance'
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [wethContract, chainId, balance, addTransaction, mvalue, id])
}

export function useWrapConfirmCallback(
  id: string
): { wrapType: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
  const { chainId } = useActiveWeb3React()

  const wethContract = useTradeContract()
  const balance = useCurrencyBalance()
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()
  return useMemo(() => {
    if (!wethContract || !chainId) return NOT_APPLICABLE

    const sufficientBalance = true

    if (true) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance
            ? async () => {
              try {

                const txReceipt = await wethContract.comfirmTransaction(id)
                addTransaction(txReceipt, { summary: `${t("CONFIRM")} ${t("OREDER")}: ${id}` })
                return txReceipt.hash
              } catch (error) {
                if (error?.code === 4001) {
                  throw new Error(t('Transaction rejected.'))
                } else {
                  throw new Error(`${t("Confirm Order")}${id} ${t("failed")}: ${error.data.message.split(":")[1]}`)

                }
              }
            }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ETH balance'
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [wethContract, chainId, balance, addTransaction, id])
}
export function useWrapCancelCallback(
  id: string
): { wrapType: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
  const { chainId } = useActiveWeb3React()
  const wethContract = useTradeContract()
  const balance = useCurrencyBalance()
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()
  return useMemo(() => {
    if (!wethContract || !chainId) return NOT_APPLICABLE

    const sufficientBalance = true

    if (true) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance
            ? async () => {
              try {

                const txReceipt = await wethContract.cancelSaleOrder(id)
                addTransaction(txReceipt, { summary: `${t("CANCEL")} ${t("OREDER")}: ${id}` })
                return txReceipt.hash
              } catch (error) {
                if (error?.code === 4001) {
                  throw new Error(t('Transaction rejected.'))
                } else {
                  throw new Error(`${t("Cancel order")} ${id} ${t("failed")}: ${t(error.data.message.split(":")[1])}`)

                }
              }
            }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ETH balance'
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [wethContract, chainId, balance, addTransaction, id])
}

export function useProfileCallback(
  avatar: string, name: string,gender:string,email:string
): {  execute?: undefined | (() => Promise<string>); inputError?: string } {
  const { chainId } = useActiveWeb3React()

  const profileContract = useProfileContract()
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()
  return useMemo(() => {
    if (!profileContract || !chainId) return NOT_APPLICABLE

    const sufficientBalance = true

    if (true) {
      return {
        execute:
          sufficientBalance
            ? async () => {
              try {

                const txReceipt = await profileContract.setProfile(avatar,name, gender,email)
                addTransaction(txReceipt, { summary: `${t("set profile")} :  ${name} ${avatar}` })
                return txReceipt.hash
              } catch (error) {
                if (error?.code === 4001) {
                  throw new Error(t('Transaction rejected.'))
                } else {
                  throw new Error(`${t("publish video")} ${t("failed")}: ${t(error.data.message.split(":")[1])}`)
                }
              }
            }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient HYK balance'
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [profileContract,avatar,name, gender,email])
}



export function usePublishVideoCallback(
  ipfs: string, title: string
  //  salenumber:string,price:string,totalprice:string,describe:string,currency:string,arbitration:string,erc20address:string,buyerLiquidataedDamages:string,mvalue: string
): { wrapType: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
  const { chainId } = useActiveWeb3React()

  const videoContract = useVideoListContract()
  const balance = useCurrencyBalance()
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()
  return useMemo(() => {
    if (!videoContract || !chainId) return NOT_APPLICABLE

    const sufficientBalance = true

    if (true) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance
            ? async () => {
              try {

                const txReceipt = await videoContract.publicVideo(ipfs, title)
                addTransaction(txReceipt, { summary: `${t("publish video")} :  ${title} ${ipfs}` })
                return txReceipt.hash
              } catch (error) {
                if (error?.code === 4001) {
                  throw new Error(t('Transaction rejected.'))
                } else {
                  throw new Error(`${t("publish video")} ${t("failed")}: ${t(error.data.message.split(":")[1])}`)
                }
              }
            }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient HYK balance'
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [videoContract, chainId, ipfs, title])
}

export function useWrapPutCallback(
  salenumber: string, price: string, totalprice: string, describe: string, currency: string, arbitration: string, erc20address: string, buyerLiquidataedDamages: string, mvalue: string
): { wrapType: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
  const { chainId } = useActiveWeb3React()
  const mtoken = MyTokenlist(erc20address);
  const wethContract = useTradeContract()
  const balance = useCurrencyBalance()
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()
  return useMemo(() => {
    if (!wethContract || !chainId) return NOT_APPLICABLE

    const sufficientBalance = true

    if (true) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance
            ? async () => {
              try {

                const txReceipt = await wethContract.putSaleOrder(salenumber, price, describe, currency, arbitration, erc20address, buyerLiquidataedDamages, { value: mvalue })
                addTransaction(txReceipt, { summary: `${t("PUT")} ${t("OREDER")}: ${t("sell")}${ethers.utils.formatUnits(salenumber.toString(), mtoken?.decimals)} ${mtoken?.name} ${t("for totally")} ${totalprice} ${currency}` })
                return txReceipt.hash
              } catch (error) {
                if (error?.code === 4001) {
                  throw new Error(t('Transaction rejected.'))
                } else {
                  throw new Error(`${t("Put order")} ${t("failed")}: ${t(error.data.message.split(":")[1])}`)
                }
              }
            }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient HYK balance'
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [wethContract, chainId, balance, addTransaction, mvalue, salenumber, price, totalprice, describe, currency, arbitration, erc20address, buyerLiquidataedDamages])
}
export function useWrapDisputeCallback(
  id: string, x: string, y: string, mvalue: string
): { wrapType1: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
  const { chainId } = useActiveWeb3React()
  const wethContract = useTradeContract()
  const balance = useCurrencyBalance()
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()
  return useMemo(() => {
    if (!wethContract || !chainId) return NOT_APPLICABLE1

    const sufficientBalance = true

    if (true) {
      return {
        wrapType1: WrapType.WRAP,
        execute:
          sufficientBalance
            ? async () => {
              try {

                const txReceipt = await wethContract.dispute(id, x, y, { value: mvalue })
                addTransaction(txReceipt, { summary: `${t("DISPUTE")} ${t("OREDER")}: ${id}` })
                return txReceipt.hash
              } catch (error) {
                if (error?.code === 4001) {
                  throw new Error(t('Transaction rejected.'))
                } else {
                  throw new Error(`${t("Dispute order")}${id} ${t("failed")}: ${t(error.data.message.split(":")[1])}`)
                }
              }
            }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ETH balance'
      }
    } else {
    }
  }, [wethContract, chainId, balance, addTransaction, mvalue, id, x, y])
}

export function useWrapSurrenderCallback(
  id: string
): { wrapType1: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
  const { chainId } = useActiveWeb3React()
  const wethContract = useTradeContract()
  const balance = useCurrencyBalance()
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()
  return useMemo(() => {
    if (!wethContract || !chainId) return NOT_APPLICABLE1

    const sufficientBalance = true

    if (true) {
      return {
        wrapType1: WrapType.WRAP,
        execute:
          sufficientBalance
            ? async () => {
              try {

                const txReceipt = await wethContract.surrender(id)
                addTransaction(txReceipt, { summary: `${t("Surrender")} ${t("OREDER")}: ${id}` })
                return txReceipt.hash
              } catch (error) {
                if (error?.code === 4001) {
                  throw new Error(t('Transaction rejected.'))
                } else {
                  throw new Error(`${t("Surrender  order")} ${id} ${t("failed")}: ${t(error.data.message.split(":")[1])}`)
                }
              }
            }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ETH balance'
      }
    } else {
    }
  }, [wethContract, chainId, balance, addTransaction, id])
}

export function useWrapExecuteCallback(
  id: string
): { wrapType: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
  const { chainId } = useActiveWeb3React()

  const wethContract = useTradeContract()
  const balance = useCurrencyBalance()
  const addTransaction = useTransactionAdder()
  const { t } = useTranslation()
  return useMemo(() => {
    if (!wethContract || !chainId) return NOT_APPLICABLE

    const sufficientBalance = true

    if (true) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance
            ? async () => {
              try {

                const txReceipt = await wethContract.execute(id)
                addTransaction(txReceipt, { summary: `${t("Execute judgment")} ${t("OREDER")}: ${id}` })
                return txReceipt.hash
              } catch (error) {
                if (error?.code === 4001) {
                  throw new Error(t('Transaction rejected.'))
                } else {
                  throw new Error(`${t("Execute judgment order")}${id} ${t("failed")} : ${t(error.data.message.split(":")[1])}`)
                }
              }
            }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient ' + NETH[chainId ? chainId : ChainId.HAYEK] + ' balance'
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [wethContract, chainId, balance, addTransaction, id])
}