import React, { useCallback, useContext, useState } from 'react'
import { ButtonLight } from '../../components/Button'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import AppBody from '../AppBody'
import styled, { ThemeContext } from 'styled-components'
import { ethers } from 'ethers'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import DepositInputPanel from '../../components/DepositInputPanel'
import { useWrapPutCallback } from '../../hooks/useWrapCallback1'
import { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import { mytryParseAmount, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from '../../state/swap/hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { ChainId, CurrencyAmount, TokenAmount } from 'uniswap-hayek-sdk'
import { AllFait, getFait } from '../../hooks/fait'
import FIATInputPanel from '../../components/FaitInputPanel'
import { ApprovalState, useMyApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import { useActiveWeb3React } from '../../hooks'
import { useWalletModalToggle } from '../../state/application/hooks'
import Loader from '../../components/Loader'
import DescribeInputPanel from '../../components/DescribeInputPanel'
import { TYPE } from '../../theme'
import { useTranslation } from 'react-i18next'
import JudgeInputPanel from '../../components/JudgeInputPanel'
import { getJudge } from '../../hooks/judge'
import { ConfirmationPendingContent, TransactionErrorContent, TransactionSubmittedContent } from '../../components/TransactionConfirmationModal'
import Modal from '../../components/Modal'
import { NETH } from '../../constants'

export const Input = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: 100%;
  heigth:30%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: pink;
  border-radius: 1px;
  text-align: right
  -webkit-appearance: none;
  font-size: 14px;
`

export default function PutOrder() {
    const { account } = useActiveWeb3React()
    const toggleWalletModal = useWalletModalToggle()
    const { currencies, currencyBalances, parsedAmount } = useDerivedSwapInfo()
    const theme = useContext(ThemeContext);
    const [totalprice, settotalprice] = useState("");
    const [price, setPrice] = useState("");
    const [saleNumber, setSaleNumber] = useState("");

    const ss: TokenAmount | undefined = mytryParseAmount("0.0", currencies[Field.INPUT])

    const [ERC20, setERC20] = useState(ss ? ss.token.address : "");
    const [ERC20Decimal, setERC20Decimal] = useState(ss ? (ss.token.decimals ? ss.token.decimals : 8) : 8)
    const [Currency, setcurrency] = useState("");
    const [SellerDeposit, setSellerDeposit] = useState("0.1");
    const [BuyerDeposit, setBuyerDeposit] = useState("0.1");
    const [descInfo, setdescInfo] = useState<string[]>([]);
    const [JudgeAddress, setJudgeAddress] = useState("");

    const saleNumberToWrap = useCallback(() => {
        try {
            return ethers.utils.parseUnits(saleNumber ? saleNumber : "0", currencies[Field.INPUT]?.decimals).toString()
        } catch (error) {
            setSaleNumber("")
            return "0"
        }
    }, [saleNumber,currencies[Field.INPUT]?.decimals])
 
    const { wrapType, execute: onWrap } = useWrapPutCallback(saleNumberToWrap(),
                                                             ethers.utils.parseUnits(price?price:"0", 6).toString(),
                                                             totalprice,
                                                             JSON.stringify(descInfo), 
                                                             Currency,
                                                             JudgeAddress,
                                                             ERC20,
                                                             ethers.utils.parseEther(BuyerDeposit?BuyerDeposit:"0").toString(),
                                                             ethers.utils.parseEther(SellerDeposit?SellerDeposit:"0").toString()
                                                             )

    const { onUserInput, onCurrencySelection } = useSwapActionHandlers()
    const [approval, approveCallback] = useMyApproveCallbackFromTrade(currencyBalances[Field.INPUT])
    const { independentField } = useSwapState()

    const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE

    const parsedAmounts = showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount
        }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : parsedAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : parsedAmount
        }
    const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
    const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))
 

    const handleMaxInput = useCallback(() => {
        setSaleNumber(maxAmountInput ? maxAmountInput.toExact() : saleNumber)
        if (price != "") {
            settotalprice(ethers.utils.formatUnits(ethers.utils.parseUnits(maxAmountInput ? maxAmountInput.toExact() : saleNumber, 80).mul(ethers.utils.parseUnits(price, 6)), 86))

        }
        maxAmountInput && onUserInput(Field.INPUT, maxAmountInput.toExact())
    }, [maxAmountInput, onUserInput])

    const handleTypeInput = useCallback(
        (value: string) => {
            if (value ===  ".") {
                setSaleNumber("0.")
                if (saleNumber != "") {
                    settotalprice(ethers.utils.formatUnits("0"))
                }
            } else {
                if (value.indexOf('.') != -1) {
                    if (value.length - value.indexOf('.') - 1 <= ERC20Decimal) {
                        setSaleNumber(value)
                        if (price != "") {
                            settotalprice(ethers.utils.formatUnits(value ===  "" ? "0" : ethers.utils.parseUnits(value, 80).mul(ethers.utils.parseUnits(price, 6)), 86))
                        }
                    }
                } else {
                    if (value.length <= 78) {
                        setSaleNumber(value)
                        if (price != "") {
                            settotalprice(ethers.utils.formatUnits(value ===  "" ? "0" : ethers.utils.parseUnits(value, 80).mul(ethers.utils.parseUnits(price, 6)), 86))
                        }
                    }
                }
            }
        },
        [price, ERC20Decimal]
    )
    const handleInputSelect = useCallback(
        inputCurrency => {
            setERC20(inputCurrency.address)
            setERC20Decimal(inputCurrency.decimals)
            onCurrencySelection(Field.INPUT, inputCurrency)
        },
        [onCurrencySelection]
    )
    const handleFaitInput = useCallback(
        (value: string) => {
            if (value ===  ".") {
                setPrice("0.")
                if (saleNumber != "") {
                    settotalprice(ethers.utils.formatUnits("0"))
                }
            } else {
                if (value.indexOf('.') != -1) {
                    if (value.length - value.indexOf('.') - 1 <= 6) {
                        setPrice(value)
                        if (saleNumber != "") {
                            settotalprice(ethers.utils.formatUnits(value ===  "" ? "0" : ethers.utils.parseUnits(value, 6).mul(ethers.utils.parseUnits(saleNumber, 80)), 86))
                        }
                    }
                } else {
                    if (value.length <= 60) {
                        setPrice(value)
                        if (saleNumber != "") {
                            settotalprice(ethers.utils.formatUnits(value ===  "" ? "0" : ethers.utils.parseUnits(value, 6).mul(ethers.utils.parseUnits(saleNumber, 80)), 86))
                        }
                    }
                }
            }
            onUserInput(Field.OUTPUT, value)
        },
        [onUserInput, saleNumber]
    )
    const handleFaitInputSelect = useCallback(
        inputCurrency => {
            setcurrency(inputCurrency.symbol)
            onCurrencySelection(Field.OUTPUT, inputCurrency)
        },
        [onCurrencySelection]
    )
    const handleSellerDepositInput = useCallback(
        (value: string) => {
            if (value ===  ".") {
                setSellerDeposit("0.")
            } else {
                if (value.indexOf('.') != -1) {
                    if (value.length - value.indexOf('.') - 1 <= 18) {
                        setSellerDeposit(value)
                    }
                } else {
                    if (value.length <= 78) {
                        setSellerDeposit(value)
                    }
                }
            }
        }, []
    )
    const handleBuyerDepositInput = useCallback(
        (value: string) => {
            if (value ===  ".") {
                setBuyerDeposit("0.")
            } else {
                if (value.indexOf('.') != -1) {
                    if (value.length - value.indexOf('.') - 1 <= 18) {
                        setBuyerDeposit(value)
                    }
                } else {
                    if (value.length <= 78) {
                        setBuyerDeposit(value)
                    }
                }
            }
        },
        []
    )
    const handleJudgeInput = useCallback(
        value => {
            setJudgeAddress(value.address)
        },
        []
    )

    const handlesetdescInfo = useCallback(
        (value: string[]) => {
            setdescInfo(value)
        },
        []
    )

    const { t } = useTranslation()

    const [{ showConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
        showConfirm: boolean
        attemptingTxn: boolean
        swapErrorMessage: string | undefined
        txHash: string | undefined
    }>({
        showConfirm: false,
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined
    })
    const [pendingText,setPendingText] = useState<string>('')
    
    function putOrder() {
        if (onWrap) {
            setPendingText(`${t("Putting order") + ": " + t("sell")} ${saleNumber} ${currencies[Field.INPUT]?.name} ${t("for totally")} ${totalprice} ${Currency}  `)
            setSwapState({ attemptingTxn: true, showConfirm: true, swapErrorMessage: undefined, txHash: undefined })
            onWrap().then(hash => {
                setSwapState({ attemptingTxn: false, showConfirm: true, swapErrorMessage: undefined, txHash: hash })
            }).catch(error => {
                setSwapState({
                    attemptingTxn: false,
                    showConfirm: true,
                    swapErrorMessage: error.message,
                    txHash: undefined
                })

            })
        }
    }

    const { chainId } = useActiveWeb3React()
    const onDismiss = () => {
        setSwapState({ showConfirm: false, attemptingTxn, swapErrorMessage, txHash })
    }

    const confirmationContent = useCallback(
        () =>
            swapErrorMessage ? (
                <TransactionErrorContent onDismiss={onDismiss} message={swapErrorMessage} />
            ) : null
        , [onDismiss, swapErrorMessage]
    )

    return (
        <>
        {showConfirm ? <Modal isOpen={showConfirm} onDismiss={onDismiss} maxHeight={90}>
        {attemptingTxn ? (
            <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
        ) : txHash ? (
            <TransactionSubmittedContent chainId={chainId} hash={txHash} onDismiss={onDismiss} />
        ) : (
            confirmationContent()
        )}
    </Modal> : null
    }
        <AppBody>
            <AddRemoveTabs adding={true} />
            <CurrencyInputPanel
                label={t('Amount')}
                value={saleNumber}
                showMaxButton={!atMaxAmountInput}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                id="swap-currency-input"
            />

            <div style={{ height: "24px" }} />

            <FIATInputPanel
                price={price}
                onUserInput={handleFaitInput}
                label={t('Unit Price')}
                showMaxButton={false}
                currency={getFait(Currency)}
                onCurrencySelect={handleFaitInputSelect}
                otherCurrency={AllFait()[1]}
                id="swap-currency-output"
            />


            {price != "" && Currency != "" && saleNumber != "" ?
                <><div style={{ height: "24px", width: "100%" }} >
                    <TYPE.body
                        color={theme.text2}
                        fontWeight={500}
                        fontSize={14}
                        style={{ float: "left", marginTop: '5px', marginLeft: '16px' }}
                    >{t('Total Amount')}
                    </TYPE.body>
                    <TYPE.body
                        color={theme.text2}
                        fontWeight={500}
                        fontSize={14}
                        style={{ float: "right", marginTop: '5px', marginRight: '16px' }}
                    >{totalprice}   {Currency}
                    </TYPE.body>  </div>
                </>

                : <></>
            }
            <div style={{ height: "24px", width: "100%" }} />


            <DepositInputPanel
                value={SellerDeposit}
                value2={BuyerDeposit}
                onUserInput={handleSellerDepositInput}
                onUserInput2={handleBuyerDepositInput}
                label={t("Seller's Deposit") + NETH[chainId?chainId:ChainId.HAYEK] }
                id="swap-currency-output"
            />
            <div style={{ height: "24px", width: "100%" }} />
         
            <JudgeInputPanel
                showMaxButton={false}
                currency={getJudge(chainId?chainId:ChainId.HAYEK,JudgeAddress)}
                otherCurrency={getJudge(chainId?chainId:ChainId.HAYEK,JudgeAddress)}
                id="judgeInput"
                onCurrencySelect={handleJudgeInput}
                label={t('Court')}
            />
            <div style={{ height: "24px" }} />

            <DescribeInputPanel
                descInfo={descInfo}
                handlesetdescInfo={handlesetdescInfo}
                label={t('Describe')}
                id="swap-currency-output"
            />

            <div style={{ height: "24px" }} />

            {!account ? (
                <ButtonLight onClick={toggleWalletModal}>{t('Connect Wallet')}</ButtonLight>)
                : approval ===  ApprovalState.UNKNOWN ?
                    <ButtonLight width="100%" disabled={true}>
                        {t('Select Token')}
                    </ButtonLight>
                    : approval ===  ApprovalState.NOT_APPROVED ?
                        (<ButtonLight onClick={approveCallback} width="100%">
                            {t('Approve')}
                        </ButtonLight>) :
                        approval ===  ApprovalState.PENDING ?
                            <ButtonLight width="100%" disabled={true}>
                                {t('Approve Pending')} <Loader></Loader>
                            </ButtonLight>
                            : price != "" && Currency != "" && saleNumber != ""  &&  JudgeAddress != ""  ?
                                <ButtonLight onClick={putOrder} width="100%">
                                    {t('Post My Order')}
                                </ButtonLight> :
                                <ButtonLight disabled={true} width="100%">
                                    {t('Complete Order Infos')}
                                </ButtonLight>
            }

        </AppBody>
        </>
    )
}



