
import React, { ReactNode, useCallback, useContext, useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { darken } from 'polished'
import styled, { ThemeContext } from 'styled-components'
import { ButtonSecondary } from '../../components/Button'
import Card from '../../components/Card'
import { TYPE } from '../../theme'
import { AutoColumn } from '../../components/Column'
import Row, { RowBetween, RowFixed } from '../../components/Row'
import QuestionHelper from '../../components/QuestionHelper'
import Copy from '../../components/AccountDetails/Copy'
import ListLogo from '../../components/ListLogo'
import { getFait } from '../../hooks/fait'
import { ethers } from "ethers";
import { useWrapConfirmCallback, useWrapDisputeCallback } from '../../hooks/useWrapCallback1'
import { useBlockNumber } from '../../state/application/hooks'
import { useGetDisputeFeeCallBack } from '../../hooks/useApproveCallback'
import { useTranslation } from 'react-i18next'
import { getInfoType, INFOTYPE } from '../../hooks/describeInfoType'
import InfoTypeLOGO from '../../components/InfoTypeLogo'
import { getJudge } from '../../hooks/judge'
import { useActiveWeb3React } from '../../hooks'
import { ConfirmationPendingContent, TransactionErrorContent, TransactionSubmittedContent } from '../../components/TransactionConfirmationModal'
import Modal from '../../components/Modal'
import { MyTokenlist } from '../../hooks/coinlist'
import { ChainId } from 'uniswap-hayek-sdk'
import { ETHERSCAN_PREFIXES } from '../../utils'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`
export const HoverCard = styled(Card)`
  background:${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg2};
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`
const A = styled.a`
text-Decoration: none;
:hover {
  text-Decoration:underline;
}
`

export default function SaleOrderLockedCard(props: any, border: any) {
    const theme = useContext(ThemeContext)
    const [showMore, setShowMore] = useState(false)
    const mtoken = MyTokenlist(props.pair.erc20address);
    let disputeFee = useGetDisputeFeeCallBack(props.pair.arbitration.toString(), props.pair.id)
    let BlockNumber = useBlockNumber()
    const generateTotalAmount = (() => {
        return (<TYPE.black fontSize={14} color={theme.text1}>{ethers.utils.formatUnits(props.pair.price.mul(props.pair.salenumber).toString(), (mtoken ? mtoken.decimals : 0) + 6) + " " + props.pair.Currency}</TYPE.black >)

    })
    function infoDescribe(infotype: string, info: string, i: number, infodescribe: string, tempINFOTYPE?: INFOTYPE): ReactNode | undefined {
        const ellipsis = (a: string) => {
            if (a.length > 20) {
                return a.substring(0, 20) + "..."
            }
            return a
        }

        return (

            <FixedHeightRow key={i}>
                <RowBetween>
                    <RowFixed>

                        <InfoTypeLOGO currency={tempINFOTYPE} size={'24px'} />
                        <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                            {t(infotype)}:
                        </TYPE.black>
                        <QuestionHelper text={t(infodescribe)} />
                    </RowFixed>
                    {infotype === "Telegram" ? (
                        <TYPE.black fontSize={14} color={theme.text1}>
                            {info && (
                                <a href={"https://t.me/" + info} style={{color:theme.text1}} target="_blank">{info}</a>
                            )} </TYPE.black>) : infotype === "QQ" ? (
                                <TYPE.black fontSize={14} color={theme.text1}>
                                    {info && (
                                        <a href={"http://wpa.qq.com/msgrd?v=3&uin=" + info + "&site=qq&menu=yes"} style={{color:theme.text1}} target="_blank">{info}</a>
                                    )} </TYPE.black>)
                        : (<TYPE.black fontSize={14} color={theme.text1}>
                            {info && (
                                <Copy toCopy={info}>
                                    <span style={{ marginLeft: '4px' }}> {ellipsis(info)}</span>
                                </Copy>
                            )} </TYPE.black>)}

                </RowBetween>
            </FixedHeightRow>
        )
    }
    function HandleDescribe() {
        let aa;
        aa = Object.values(JSON.parse(props.pair.describe));
        return (
            aa?.map((item, i) => {
                let item1: string = typeof (item) ===  "string" ? item : ""
                let infotype: string = item1?.split(':')[0];
                const tempINFOTYPE = getInfoType(infotype);
                let infodescribe: string | undefined = getInfoType(infotype)?.Describe;
                let info: string = item1?.split(':')[1];
                return (
                    infoDescribe(infotype?infotype:"", info?info:"", i, infodescribe ? infodescribe : "", tempINFOTYPE)
                )
            })
        )
    }
    function HandleDisputeButton() {
        if ((props.pair.lockedblocknumber.add(props.SellerDisputableBlockNumber)).gte(BlockNumber)) {
            return (<ButtonSecondary width="100%" onClick={dispute} disabled={true}>{t("Please wait buyer transfer to you")}<QuestionHelper text={t("You can dispute this order after ") + props.pair.lockedblocknumber.add(props.SellerDisputableBlockNumber.add(1)).sub(BlockNumber).toString() + t(" blocks")+t(", only if you still have not receive the transfer of buyer.")} /></ButtonSecondary>)
        } else {
            return (<ButtonSecondary width="100%" onClick={dispute} >{t("Dispute")}</ButtonSecondary>)
        }
    }
    const { execute: onWrap } = useWrapConfirmCallback(props.pair.id)
    const { execute: onWrap1 } = useWrapDisputeCallback(props.pair.id, "0", "0", disputeFee)

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
    
    function confirm() {
        if (onWrap) {
            setPendingText(`${t('Confirmming Order')} ${props.pair.id.toString()}`)
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
    function dispute() {
        if (onWrap1) {
            setPendingText(`${t('Disputing Order')} ${props.pair.id.toString()}`)
            setSwapState({ attemptingTxn: true, showConfirm: true, swapErrorMessage: undefined, txHash: undefined })
            onWrap1().then(hash => {
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
        <HoverCard border={border}>
            <AutoColumn gap="12px">
                <FixedHeightRow onClick={() => setShowMore(!showMore)} style={{ cursor: 'pointer' }}>
                    <RowFixed>
                        <Row>
                            {mtoken ? (
                                <ListLogo
                                    style={{ marginRight: 12 }}
                                    logoURI={mtoken.logoURI ? mtoken.logoURI : ""}
                                    alt={`${mtoken.name} list logo`}
                                />
                            ) : null
                            }
                            <TYPE.main id="ERC20">{mtoken?.name}</TYPE.main>
                        </Row>
                    </RowFixed>
                    <RowFixed>
                        <Row>
                            <TYPE.main id="num">{ethers.utils.formatUnits(props.pair.salenumber.toString(), mtoken?.decimals)}</TYPE.main>
                        </Row>
                    </RowFixed>
                    <RowFixed>
                        <Row>
                            <TYPE.main id="price">{ethers.utils.formatUnits(props.pair.price.toString(), 6)}{getFait(props.pair.Currency)?.sign}</TYPE.main>
                        </Row>
                    </RowFixed>

                    <RowFixed>
                        <Row>
                            <TYPE.main id="Locked" fontSize='10px'>{t("Locked")}</TYPE.main>
                        </Row>
                    </RowFixed>
                    <RowFixed>
                        {showMore ? (
                            <ChevronUp size="20" style={{ marginLeft: '10px' }} />
                        ) : (
                            <ChevronDown size="20" style={{ marginLeft: '10px' }} />
                        )}
                    </RowFixed>
                </FixedHeightRow>
                {showMore && (
                    <AutoColumn gap="8px">

                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t('Order ID')}
                                    </TYPE.black>
                                    <QuestionHelper text={t("Each order has a unique ID.")} />
                                </RowFixed>
                                <TYPE.black fontSize={14} color={theme.text1}>
                                    {props.pair.id.toString()}
                                </TYPE.black>
                            </RowBetween>
                        </FixedHeightRow>
                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t('Price')}
                                    </TYPE.black>
                                </RowFixed>
                                <TYPE.black fontSize={14} color={theme.text1}>
                                    {ethers.utils.formatUnits(props.pair.price, 6) + " " + props.pair.Currency}
                                </TYPE.black>
                            </RowBetween>
                        </FixedHeightRow>

                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t('Sale Number')}
                                    </TYPE.black>
                                </RowFixed>
                                <TYPE.black fontSize={14} color={theme.text1}>
                                    {ethers.utils.formatUnits(props.pair.salenumber, mtoken ? mtoken.decimals : 0) + " " + mtoken?.name}
                                </TYPE.black>
                            </RowBetween>
                        </FixedHeightRow>
                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t('Total Amount')}
                                    </TYPE.black>
                                    <QuestionHelper text={t("Total Amount = Price × saleNumber")} />
                                </RowFixed>
                                {generateTotalAmount()}
                            </RowBetween>
                        </FixedHeightRow>

                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t('Seller Address')}
                                    </TYPE.black>

                                </RowFixed>
                                <TYPE.black fontSize={14} color={theme.text1}>
                                    {props.pair.seller.toString() && (
                                        <Copy toCopy={props.pair.seller.toString()}>
                                            <span style={{ marginLeft: '4px' }}> {props.pair.seller.toString().substring(0, 6) + "..." + props.pair.seller.toString().substring(38)}</span>
                                        </Copy>
                                    )} </TYPE.black>

                            </RowBetween>
                        </FixedHeightRow>

                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t('Buyer Address')}
                                    </TYPE.black>

                                </RowFixed>
                                <TYPE.black fontSize={14} color={theme.text1}>
                                    {props.pair.buyer.toString() && (
                                        <Copy toCopy={props.pair.buyer.toString()}>
                                            <span style={{ marginLeft: '4px' }}> {props.pair.buyer.toString().substring(0, 6) + "..." + props.pair.buyer.toString().substring(38)}</span>
                                        </Copy>
                                    )} </TYPE.black>
                            </RowBetween>
                        </FixedHeightRow>

                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t("Seller's Deposit")}
                                    </TYPE.black>
                                    <QuestionHelper text={t("In the event of a dispute, the margin will be used as the compensation of the negligent party in the transaction to the non-negligence party.")} />
                                </RowFixed>
                                <TYPE.black fontSize={14} color={theme.text1}>
                                    {ethers.utils.formatEther(props.pair.sellerLiquidataedDamages.toString())} HYK
                                </TYPE.black>
                            </RowBetween>
                        </FixedHeightRow>
                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t("Buyer's Deposit")}
                                    </TYPE.black>
                                    <QuestionHelper text={t("In the event of a dispute, the margin will be used as the compensation of the negligent party in the transaction to the non-negligence party.")} />
                                </RowFixed>
                                <TYPE.black fontSize={14} color={theme.text1}>
                                    {ethers.utils.formatEther(props.pair.buyerLiquidataedDamages.toString())} HYK
                                </TYPE.black>
                            </RowBetween>
                        </FixedHeightRow>

                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t("Court")}
                                    </TYPE.black>
                                </RowFixed>
                                <TYPE.black fontSize={14} color={theme.text1}>
                                {<A href={getJudge(chainId?chainId:ChainId.HAYEK,props.pair.arbitration)?getJudge(chainId?chainId:ChainId.HAYEK,props.pair.arbitration)?.URL:"https://"+ETHERSCAN_PREFIXES[chainId?chainId:ChainId.HAYEK]+"/address/"+props.pair.arbitration.toString()} target="_blank">{getJudge(chainId?chainId:ChainId.HAYEK,props.pair.arbitration) ? (getJudge(chainId?chainId:ChainId.HAYEK,props.pair.arbitration)?.name) : t("Unverified Court")}</A>}
                                </TYPE.black>
                            </RowBetween>
                        </FixedHeightRow>

                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t('Locked Block Number')}
                                    </TYPE.black>
                                    <QuestionHelper text={t('The block number of your locking action')} />
                                </RowFixed>
                                <TYPE.black fontSize={14} color={theme.text1}>
                                    {props.pair.lockedblocknumber.toString()}
                                </TYPE.black>
                            </RowBetween>
                        </FixedHeightRow>

                        <FixedHeightRow>
                            <RowBetween>
                                <RowFixed>
                                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                                        {t('Describe')}:
                                    </TYPE.black>
                                </RowFixed>
                            </RowBetween>
                        </FixedHeightRow>
                        <HoverCard border={border}>
                            {HandleDescribe() ? HandleDescribe() : <></>}
                        </HoverCard>

                        <ButtonSecondary width="100%" onClick={confirm}>
                            {t('I have received the buyer payment')}
                        </ButtonSecondary>
                        {HandleDisputeButton()}

                    </AutoColumn>
                )}
            </AutoColumn>
        </HoverCard>
        </>
    )
}