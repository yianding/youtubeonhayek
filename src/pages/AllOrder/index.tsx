import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ChainId, Token } from 'uniswap-hayek-sdk'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { AutoColumn } from '../../components/Column'
import { ButtonSecondary } from '../../components/Button'
import { useGetOrderByIdCallBack, useGetOrderDataCallBack } from '../../hooks/useApproveCallback'
import { useConditionOfOrders } from '../../state/conditionOfOrders/hooks'
import AppBody from '../AppBody'
import { RowBetween, RowFixed } from '../../components/Row'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Text } from 'rebass'
import Card from '../../components/Card'
import { darken } from 'polished'
import { FIAT } from '../../hooks/fait'
import FilterTokenCurrency from '../../components/FilterTokenCurrency'
import SetConditionPanel from '../../components/SetConditionPanel'
import { ethers } from 'ethers'
import { LinkStyledButton } from '../../components/DescribeInputPanel'
import Loader from '../../components/Loader'
import { useTranslation } from 'react-i18next'
import FullPositionCard from './orderCard'
import { useActiveWeb3React } from '../../hooks'
import { NETH } from '../../constants'


export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`
export const Input = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: 100%;
  heigth:1px;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 1px;
  text-align: right
  -webkit-appearance: none;

  font-size: 18px;
`
export const MyHoverCard = styled(Card)`
  background:pink;
  border: 1px solid ${({ theme }) => theme.bg2};
  :hover,focus {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }

`


export default function AllOrders() {
  const { chainId } = useActiveWeb3React()

  
  const [conditionOfOrders, setconditionOfOrders] = useConditionOfOrders()
 
  // useEffect(() => {
  //   setconditionOfOrders(a)
  // },[a])
  const [showMore, setShowMore] = useState(false)

  const { t } = useTranslation()
  const [queryById] = useState("");
  const orders = useGetOrderDataCallBack()

  const orderGetById = useGetOrderByIdCallBack(queryById ? queryById : "0")
  const ordersMemo = useMemo(() => orders, [orders])
  let OrderNum: number = 0

  const [pricemin, setpriceMin] = useState("");
  const [pricemax, setpriceMax] = useState("");
  const [nummin, setnumMin] = useState("");
  const [nummax, setnumMax] = useState("");
  const [currency, setCurrency] = useState<FIAT>(conditionOfOrders[chainId?chainId:ChainId.HAYEK].currency);
  const [ERC20, setERC20] = useState<Token>(conditionOfOrders[chainId?chainId:ChainId.HAYEK].erc20);
  const [sellerDeposit, setsellerDeposit] = useState("");
  const [buyerDeposit, setbuyerDeposit] = useState("");
  const [lineNumber] = useState(conditionOfOrders[chainId?chainId:ChainId.HAYEK].linenumber);

  const handleInputPriceMin = (value: string) => {
    if (value === ".") {
      setpriceMin("0.")
    } else {
      if (value.indexOf('.') !== -1) {
        if (value.length - value.indexOf('.') - 1 <= 6) {
          setpriceMin(value)
        }
      } else {
        if (value.length <= 60) {
          setpriceMin(value)
        }
      }
    }

  }
  const handleInputPriceMax = (value: string) => {
    if (value === ".") {
      setpriceMax("0.")
    } else {
      if (value.indexOf('.') !== -1) {
        if (value.length - value.indexOf('.') - 1 <= 6) {
          setpriceMax(value)
        }
      } else {
        if (value.length <= 60) {
          setpriceMax(value)
        }
      }
    }
  }
  const handleInputNumMin = (value: string) => {
    if (value ===  ".") {
      setnumMin("0.")
    } else {
      if (value.indexOf('.') != -1) {
        if (value.length - value.indexOf('.') - 1 <= ERC20.decimals) {
          setnumMin(value)
        }
      } else {
        if (value.length <= 60) {
          setnumMin(value)
        }
      }
    }
  }
  const handleInputNumMax = (value: string) => {
    if (value === ".") {
      setnumMax("0.")
    } else {
      if (value.indexOf('.') !== -1) {
        if (value.length - value.indexOf('.') - 1 <= ERC20.decimals) {
          setnumMax(value)
        }
      } else {
        if (value.length <= 60) {
          setnumMax(value)
        }
      }
    }
  }

  const handleInputSellerDeposit = (value: string) => {
    if (value === ".") {
      setsellerDeposit("0.")
    } else {
      if (value.indexOf('.') !== -1) {
        if (value.length - value.indexOf('.') - 1 <= 18) {
          setsellerDeposit(value)
        }
      } else {
        if (value.length <= 60) {
          setsellerDeposit(value)
        }
      }
    }
  }
  const handleInputBuyerDeposit = (value: string) => {
    if (value === ".") {
      setbuyerDeposit("0.")
    } else {
      if (value.indexOf('.') !== -1) {
        if (value.length - value.indexOf('.') - 1 <= 18) {
          setbuyerDeposit(value)
        }
      } else {
        if (value.length <= 60) {
          setbuyerDeposit(value)
        }
      }
    }
  }
  const onTokenSelect = useCallback(
    inputCurrency => {
      setERC20(inputCurrency)
    },
    []
  )
  const onCurrencySelect = useCallback(
    inputCurrency => {
      setCurrency(inputCurrency)
    },
    []
  )
  const handleMore = () => {
    let a = {
      quantity_min: conditionOfOrders[chainId?chainId:ChainId.HAYEK].quantity_min,
      quanity_max: conditionOfOrders[chainId?chainId:ChainId.HAYEK].quanity_max,
      price_min: conditionOfOrders[chainId?chainId:ChainId.HAYEK].price_min,
      price_max: conditionOfOrders[chainId?chainId:ChainId.HAYEK].price_max,
      currency: conditionOfOrders[chainId?chainId:ChainId.HAYEK].currency,
      erc20: conditionOfOrders[chainId?chainId:ChainId.HAYEK].erc20,
      sellerDeposit: conditionOfOrders[chainId?chainId:ChainId.HAYEK].sellerDeposit,
      buyerDeposit: conditionOfOrders[chainId?chainId:ChainId.HAYEK].buyerDeposit,
      linenumber: conditionOfOrders[chainId?chainId:ChainId.HAYEK].linenumber + 100,
      mySellOrderLineNumber: conditionOfOrders[chainId?chainId:ChainId.HAYEK].mySellOrderLineNumber,
      myBuyOrderLineNumber: conditionOfOrders[chainId?chainId:ChainId.HAYEK].myBuyOrderLineNumber
    }
    setconditionOfOrders(a);
  }

  return (
    <>
      <AppBody>

        <SwapPoolTabs active={'allOrders'} />
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="6px" style={{ width: '100%' }}>

            <>
              <MyHoverCard >
                <AutoColumn gap="12px">
                  <FixedHeightRow onClick={() => setShowMore(!showMore)} style={{ cursor: 'pointer' }}>
                    <RowFixed>
                      <Text fontWeight={500} fontSize={20}>{t('Filter')}</Text>
                    </RowFixed>
                    <RowFixed>
                      {showMore ? (
                        <ChevronUp size="20" style={{ marginLeft: '10px' }} />
                      ) : (
                        <ChevronDown size="20" style={{ marginLeft: '10px' }} />
                      )}
                    </RowFixed>
                  </FixedHeightRow>
                </AutoColumn>
              </MyHoverCard>
              {showMore && (
                <div>
                  <FilterTokenCurrency
                    label={t("Selling Token")}
                    currency={ERC20}
                    fiat={currency}
                    onTokenSelect={onTokenSelect}
                    onCurrencySelect={onCurrencySelect}
                    id="Token-Currency" />
                  <div style={{ height: "24px" }} />
                  <SetConditionPanel
                    value={pricemin}
                    value2={pricemax}
                    onUserInput1={handleInputPriceMin}
                    onUserInput2={handleInputPriceMax}
                    label1={t('Price')}
                    label2={t('to')}
                    label3={t("from")}
                    id="price"
                  />
                  <div style={{ height: "24px" }} />
                  <SetConditionPanel
                    value={nummin}
                    value2={nummax}
                    onUserInput1={handleInputNumMin}
                    onUserInput2={handleInputNumMax}
                    label1={t('Number')}
                    label2={t('to')}
                    label3={t('from')}
                    id="number"
                  />
                  <div style={{ height: "24px" }} />
                  <SetConditionPanel
                    value={sellerDeposit}
                    value2={buyerDeposit}
                    onUserInput1={handleInputSellerDeposit}
                    onUserInput2={handleInputBuyerDeposit}
                    label1={''}
                    label2={t('Maximun Buyer Deposit')+NETH[chainId?chainId:ChainId.HAYEK]}
                    label3={t('Minimum Seller Deposit')+NETH[chainId?chainId:ChainId.HAYEK]}
                    id="deposit"
                  />
                  <div style={{ height: "24px" }} />

                  <AutoColumn gap="8px">

                    <ButtonSecondary width="100%"
                      onClick={() => {
                        let a =
                        //  {
                        //   quantity_min: ethers.utils.parseUnits(nummin ===  "" ? "0" : nummin, ERC20.decimals),
                        //   quanity_max: ethers.utils.parseUnits(nummax ===  "" ? "99999999999999999999999999999999999999999999" : nummax, ERC20.decimals),
                        //   price_min: ethers.utils.parseUnits(pricemin ===  "" ? "0" : pricemin, 6),
                        //   price_max: ethers.utils.parseUnits(pricemax ===  "" ? "99999999999999999999999999999999" : pricemax, 6),
                        //   currency: currency,
                        //   linenumber: lineNumber,
                        //   erc20: ERC20,
                        //   sellerDeposit: ethers.utils.parseUnits(sellerDeposit ===  "" ? "0" : sellerDeposit, 18),
                        //   buyerDeposit: ethers.utils.parseUnits(buyerDeposit ===  "" ? "99999999999999999999" : buyerDeposit, 18),
                        //   mySellOrderLineNumber: conditionOfOrders[chainId?chainId:ChainId.HAYEK].mySellOrderLineNumber,
                        //   myBuyOrderLineNumber: conditionOfOrders[chainId?chainId:ChainId.HAYEK].myBuyOrderLineNumber
                        // }
                       {
                        [chainId?chainId:ChainId.HAYEK]:     {
                          quantity_min: ethers.utils.parseUnits(nummin === "" ? "0" : nummin, ERC20.decimals),
                          quanity_max: ethers.utils.parseUnits(nummax === "" ? "99999999999999999999999999999999999999999999" : nummax, ERC20.decimals),
                          price_min: ethers.utils.parseUnits(pricemin === "" ? "0" : pricemin, 6),
                          price_max: ethers.utils.parseUnits(pricemax === "" ? "99999999999999999999999999999999" : pricemax, 6),
                          currency: currency,
                          linenumber: lineNumber,
                          erc20: ERC20,
                          sellerDeposit: ethers.utils.parseUnits(sellerDeposit === "" ? "0" : sellerDeposit, 18),
                          buyerDeposit: ethers.utils.parseUnits(buyerDeposit === "" ? "99999999999999999999" : buyerDeposit, 18),
                          mySellOrderLineNumber: conditionOfOrders[chainId?chainId:ChainId.HAYEK].mySellOrderLineNumber,
                          myBuyOrderLineNumber: conditionOfOrders[chainId?chainId:ChainId.HAYEK].myBuyOrderLineNumber
                        }
                        }
                        setconditionOfOrders(a);
                        setShowMore(!showMore);
                      }}>
                      {t('Set Condition')}
                    </ButtonSecondary>
                  </AutoColumn>
                </div>)}

              <div style={{ height: "2px" }} />
              {queryById ? <>
                {orderGetById ? <FullPositionCard key={-1} pair={orderGetById} id={queryById} /> : <Card >
                    <AutoColumn gap="12px">
                      <div style={{ textAlign: "center" }}>
                        <Loader></Loader>
                      </div>
                    </AutoColumn>
                  </Card >}
              </> : <>
                {ordersMemo ? <>{ordersMemo.map((k) => {

                  if (k.seller !== "0x0000000000000000000000000000000000000000") {
                    OrderNum++
                    return (
                      <FullPositionCard key={k.id} pair={k} />
                    )
                  } else { return }

                }

                )}
                  {OrderNum === 0 ? <>
                    <Card >
                      <AutoColumn gap="12px">
                        <div style={{ textAlign: "center" }}>
                          {t("No qualified order at present")}
                        </div>
                      </AutoColumn>
                    </Card >
                  </>
                    : <div style={{ textAlign: "center" }}>
                      <LinkStyledButton onClick={handleMore} >{t('More')}</LinkStyledButton>
                    </div>}

                </>
                  :
                  <Card >
                    <AutoColumn gap="12px">
                      <div style={{ textAlign: "center" }}>
                        <Loader></Loader>
                      </div>
                    </AutoColumn>
                  </Card >}
              </>}
            </>

          </AutoColumn>
        </AutoColumn>

      </AppBody>
    </>
  )
}
