import { darken } from 'polished'
import React, { ReactNode, useCallback, useContext, useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import styled, { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'
import Card from '../../components/Card'
import { AutoColumn } from '../../components/Column'
import Row, { RowBetween, RowFixed } from '../../components/Row'
import QuestionHelper from '../../components/QuestionHelper'
import Copy from '../../components/AccountDetails/Copy'
import ListLogo from '../../components/ListLogo'
import { getFait } from '../../hooks/fait'
import useWrapCallback1 from '../../hooks/useWrapCallback1'
import { ethers } from "ethers";
import { useTranslation } from 'react-i18next'
import { getInfoType, INFOTYPE } from '../../hooks/describeInfoType'
import InfoTypeLOGO from '../../components/InfoTypeLogo'
import { getJudge } from '../../hooks/judge'
import Modal from '../../components/Modal'
import { ConfirmationPendingContent, TransactionErrorContent, TransactionSubmittedContent } from '../../components/TransactionConfirmationModal'
import { useActiveWeb3React } from '../../hooks'
import { useWalletModalToggle } from '../../state/application/hooks'
import { ButtonSecondary } from '../../components/Button'
import { MyTokenlist } from '../../hooks/coinlist'
import { CryptoInput } from '../../components/DescribeInputPanel'
import { ChainId } from 'uniswap-hayek-sdk'
import { ETHERSCAN_PREFIXES } from '../../utils'
import { NETH } from '../../constants'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  
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


function Crypto(props: {infotype:string, info: React.Key | undefined, handleHashComfirm: any }) {
  const theme = useContext(ThemeContext)
  const [cryptoInfo, setcryptoInfo] = useState("")
  const handleInputCryproInfo = (event: any) => {
    setcryptoInfo(event.target.value)
    if (props.info ===  ethers.utils.id(event.target.value)) {
      props.handleHashComfirm(3)
    } else {
      props.handleHashComfirm(2)
    }
  }
  const { t } = useTranslation()
  return (
    <div>
      <FixedHeightRow key={props.info}>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              {props.infotype==="CryptoContract"?t("Please input Crypto Contract Item")
              :props.infotype==="Bank Card Cash Deposit"?
              t("Please input Bank Card Cash Deposit infomation"):
              t("Please input the WeChat account of seller")+":"
              }
            </TYPE.black>
            <QuestionHelper text={props.infotype==="CryptoContract"?t("This order include a crypto contract item. please contact this seller to get this crypto contract item.")
             :props.infotype==="Bank Card Cash Deposit"?
             t("The mode of payment of this order is Bank Card Cash Deposit. please contact this seller to get this Bank Card Cash Deposit infomation."):
             t("This order include a Secret WeChat. please contact this seller to get this WeChat account.")} />
          </RowFixed>
        </RowBetween>
      </FixedHeightRow>
      <CryptoInput value={cryptoInfo} onClick={async () => {
        navigator?.clipboard?.readText()?.then(text => {
          setcryptoInfo(text);
          if (props.info ===  ethers.utils.id(text)) {
            props.handleHashComfirm(3)
          } else {
            props.handleHashComfirm(2)
          }
        })
      }}
        onChange={handleInputCryproInfo}
      />
    </div>
  )
}

export default function FullPositionCard(props: any, border: any) {
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const theme = useContext(ThemeContext)
  const [showMore, setShowMore] = useState(false)
  const mtoken = MyTokenlist(props.pair.erc20address);
  const generateTotalAmount = (() => {
    return (<TYPE.black fontSize={14} color={theme.text1}>{ethers.utils.formatUnits(props.pair.price.mul(props.pair.salenumber).toString(), (mtoken ? mtoken.decimals : 0) + 6) + " " + props.pair.Currency}</TYPE.black >)

  })
  function infoDescribe(infotype: string, info: string, i: number, infodescribe: string, tempINFOTYPE?: INFOTYPE): ReactNode | undefined {
    return (

      <FixedHeightRow key={i}>
    
        <RowBetween>
          
          <RowFixed>
         
            <InfoTypeLOGO currency={tempINFOTYPE} size={'12px'} />
            
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              {t(infotype) + " "}:
            </TYPE.black>
            {infodescribe ? <QuestionHelper text={t(infodescribe)} /> : null}
          </RowFixed>
          {/* {infotype === "Telegram" ? ( */}
            {true ? (
            <TYPE.black fontSize={14} color={theme.text1}>
              {info && (
                <a href={"https://t.me/" + info} style={{ color: theme.text1 }} target="_blank">{info}</a>
              )} </TYPE.black>) : infotype === "QQ" ? (
                <TYPE.black fontSize={14} color={theme.text1}>
                  {info && (
                    <a href={"https://wpa.qq.com/msgrd?v=3&uin=" + info + "&site=qq&menu=yes"} style={{ color: theme.text1 }} target="_blank">{info}</a>
                  )} </TYPE.black>)
            : (<TYPE.black fontSize={14} color={theme.text1}>
              {info && (
                <span style={{ marginLeft: '3px' }}> {t('Show after locked')}</span>
              )} </TYPE.black>)}
              
        </RowBetween>
      </FixedHeightRow>
    )
  }

  const [hashComfirm, sethashComfirm] = useState(0)
  const [hashBankDepositComfirm, sethashBankDepositComfirm] = useState(0)
  const [hashWechatComfirm, sethashWechatComfirm] = useState(0)
  function handleHashComfirm(a: number) {
    sethashComfirm(a);
  }

  function HandleDescribe() {
    let aa;
    aa = Object.values(JSON.parse(props.pair.describe));
    let CypContractnum = 0
    let CypBankDepositnum = 0
    let CypWechatnum = 0
    return (
      aa?.map((item, i) => {
        let item1: string = typeof (item) ===  "string" ? item : ""
        let infotype: string = item1?.split(':')[0];
        const tempINFOTYPE = getInfoType(infotype);
        let infodescribe: string | undefined = getInfoType(infotype)?.Describe;
        let info: string = item1?.split(':')[1];
        if (CypContractnum < 1 && (infotype ===  "CryptoContract")) {
          CypContractnum = CypContractnum + 1
          if (hashComfirm ===  0) {
            sethashComfirm(1)
          }
          return <Crypto infotype="CryptoContract" info={info} key={info} handleHashComfirm={handleHashComfirm}></Crypto>
        }
        if (CypBankDepositnum < 1 && (infotype ===  "Bank Card Cash Deposit")) {
          CypBankDepositnum = CypBankDepositnum + 1
          if (hashBankDepositComfirm ===  0) {
            sethashBankDepositComfirm(1)
          }
          return <Crypto infotype="Bank Card Cash Deposit" info={info} key={info} handleHashComfirm={sethashBankDepositComfirm}></Crypto>
        }
        if (CypWechatnum < 1 && (infotype ===  "Secret WeChat")) {
          CypWechatnum = CypWechatnum + 1
          if (hashWechatComfirm ===  0) {
            sethashWechatComfirm(1)
          }
          return <Crypto infotype="Secret WeChat" info={info} key={info} handleHashComfirm={sethashWechatComfirm}></Crypto>
        }
        
        return (
          infoDescribe(infotype?infotype:"", info?info:"", i, infodescribe ? infodescribe : "", tempINFOTYPE)
        )
      })
    )
  }
  function handleLockButton() {
    
    if (hashBankDepositComfirm ===  1) {
      return (
        <ButtonSecondary width="100%" disabled={true}>
          {t('Please input Bank Card Cash Deposit infomation')}
        </ButtonSecondary>)
    } if (hashBankDepositComfirm ===  2) {
      return (
        <ButtonSecondary width="100%" disabled={true}>
          {t('Please input correct Bank Card Cash Deposit infomation')}
        </ButtonSecondary>)
    }
    if (hashWechatComfirm ===  1) {
      return (
        <ButtonSecondary width="100%" disabled={true}>
          {t('Please input the WeChat account of seller')}
        </ButtonSecondary>)
    } if (hashWechatComfirm ===  2) {
      return (
        <ButtonSecondary width="100%" disabled={true}>
          {t('Please input the correct WeChat account of seller')}
        </ButtonSecondary>)
    }
    if (hashComfirm ===  1) {
      return (
        <ButtonSecondary width="100%" disabled={true}>
          {t('Please input Crypto contract')}
        </ButtonSecondary>)
    } if (hashComfirm ===  2) {
      return (
        <ButtonSecondary width="100%" disabled={true}>
          {t('Please input correct crypto contract')}
        </ButtonSecondary>)
    } else {
      return (
        <ButtonSecondary width="100%" onClick={lock}>
          {t('Lock')}
        </ButtonSecondary>)
    }
  }
  const { t } = useTranslation()
  const ellipsisPriceAndNumber = (a: string) => {
    if (a.length > 10) {
      return a.substring(0, 10) + "..."
    }
    return a
  }
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

  const { execute: onWrap } = useWrapCallback1(props.id?props.id:props.pair.id,props.pair.buyerLiquidataedDamages)
  function lock() {
    if (hashComfirm ===  0 || hashComfirm ===  3) {

      if (onWrap) {
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
  }

  const { chainId } = useActiveWeb3React()
  const onDismiss = () => {
    setSwapState({ showConfirm: false, attemptingTxn, swapErrorMessage, txHash })
  }

  let pendingText: string = `${t('Locking Order')} ${props.id?props.id.toString():props.pair.id.toString()}`

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
                <TYPE.main id="num">{ellipsisPriceAndNumber(ethers.utils.formatUnits(props.pair.salenumber, mtoken?.decimals))}</TYPE.main>
              </Row>
            </RowFixed>
            <RowFixed>
              <Row>
                <TYPE.main id="price">{ellipsisPriceAndNumber(ethers.utils.formatUnits(props.pair.price, 6))}{getFait(props.pair.Currency)?.sign}</TYPE.main>
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
                    {props.id?props.id.toString():props.pair.id.toString()}
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
                
                  <a href={"element://user/@"+props.pair.seller.toString()+":hayek.link"}> <img src="images/chat.ico" width={20} height={20} /> </a> 
                  <TYPE.black fontSize={14} color={theme.text1}>
                    {props.pair.seller.toString() && (
                      <Copy toCopy={props.pair.seller.toString()}>
                        <span style={{ marginLeft: '4px' }}> {props.pair.seller.toString().substring(0, 6) + "..." + props.pair.seller.toString().substring(38)}</span>
                      </Copy>
                    )} 
                    </TYPE.black>
                
                </RowBetween>
              </FixedHeightRow>

              <FixedHeightRow>
                <RowBetween>
                  <RowFixed>
                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                      {t("Seller's Deposit")}
                    </TYPE.black>
                    <QuestionHelper text= {t("In the event of a dispute, the margin will be used as the compensation of the negligent party in the transaction to the non-negligence party.")} />
                  </RowFixed>
                  <TYPE.black fontSize={14} color={theme.text1}>
                    {ethers.utils.formatEther(props.pair.sellerLiquidataedDamages)} {NETH[chainId?chainId:ChainId.HAYEK]}
                  </TYPE.black>
                </RowBetween>
              </FixedHeightRow>

              <FixedHeightRow>
                <RowBetween>
                  <RowFixed>
                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                      {t("Buyer's Deposit")}
                    </TYPE.black>
                    <QuestionHelper text= {t("In the event of a dispute, the margin will be used as the compensation of the negligent party in the transaction to the non-negligence party.")} />
                  </RowFixed>
                  <TYPE.black fontSize={14} color={theme.text1}>
                    {ethers.utils.formatEther(props.pair.buyerLiquidataedDamages)} {NETH[chainId?chainId:ChainId.HAYEK]}
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
                      {t('Describe')}:
                    </TYPE.black>
                  </RowFixed>
                </RowBetween>
              </FixedHeightRow>
              <HoverCard border={border}>
                {HandleDescribe() ? HandleDescribe() : <></>}
              </HoverCard>

              {account?
              handleLockButton()
              :<ButtonSecondary width="100%" onClick={toggleWalletModal}>
              {t('Connect Wallet to Lock')}
            </ButtonSecondary>
              }

            </AutoColumn>
          )}
        </AutoColumn>
      </HoverCard>
    </>
  )
}
