import React, {  useRef, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import QuestionHelper from '../QuestionHelper'
import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { RowBetween, RowFixed } from '../Row'

import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { useConditionOfOrders } from '../../state/conditionOfOrders/hooks'



const FancyButton = styled.button`
  color: ${({ theme }) => theme.text1};
  align-items: center;
  height: 2rem;
  border-radius: 36px;
  font-size: 12px;
  width: auto;
  min-width: 3rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  outline: none;
  background: ${({ theme }) => theme.bg1};
  :hover {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
`

const Option = styled(FancyButton)<{ active: boolean }>`
  margin-right: 8px;
  :hover {
    cursor: pointer;
  }
  background-color: ${({ active, theme }) => active && theme.primary1};
  color: ${({ active, theme }) => (active ? theme.white : theme.text1)};
`

const Input = styled.input`
  background: ${({ theme }) => theme.bg1};
  font-size: 16px;
  width: auto;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  text-align: right;
`

const OptionCustom = styled(FancyButton)<{ active?: boolean; warning?: boolean }>`
  height: 2rem;
  position: relative;
  padding: 0 0.75rem;
  flex: 1;
  border: ${({ theme, active, warning }) => active && `1px solid ${warning ? theme.red1 : theme.primary1}`};
  :hover {
    border: ${({ theme, active, warning }) =>
      active && `1px solid ${warning ? darken(0.1, theme.red1) : darken(0.1, theme.primary1)}`};
  }

  input {
    width: 100%;
    height: 100%;
    border: 0px;
    border-radius: 2rem;
  }
`





export default function SlippageTabs() {
  const theme = useContext(ThemeContext)

  const inputRef = useRef<HTMLInputElement>()
  const [conditionOfOrders, setconditionOfOrders] = useConditionOfOrders()


  const {t} = useTranslation()
  return (
    <AutoColumn gap="md">
      <AutoColumn gap="sm">
        <RowFixed>
          <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
            {t("Line number of Sale Orders")}
          </TYPE.black>
          <QuestionHelper text={t("Too high number will affect the performance of the website")} />
        </RowFixed>
        <RowBetween>
          <Option
            onClick={() => {
              let a = {
                quantity_min: conditionOfOrders.quantity_min,
                quanity_max: conditionOfOrders.quanity_max,
                price_min: conditionOfOrders.price_min,
                price_max: conditionOfOrders.price_max,
                currency: conditionOfOrders.currency,
                erc20: conditionOfOrders.erc20,
                sellerDeposit: conditionOfOrders.sellerDeposit,
                buyerDeposit: conditionOfOrders.buyerDeposit,
                linenumber: 50,
                mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
              }
              setconditionOfOrders(a);
            }}
            active={conditionOfOrders.linenumber === 50}
          >
            50
          </Option>
          <Option
            onClick={() => {
              let a = {
                quantity_min: conditionOfOrders.quantity_min,
                quanity_max: conditionOfOrders.quanity_max,
                price_min: conditionOfOrders.price_min,
                price_max: conditionOfOrders.price_max,
                currency: conditionOfOrders.currency,
                erc20: conditionOfOrders.erc20,
                sellerDeposit: conditionOfOrders.sellerDeposit,
                buyerDeposit: conditionOfOrders.buyerDeposit,
                linenumber: 100,
                mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
              }
              setconditionOfOrders(a);
            }}
            active={conditionOfOrders.linenumber === 100}
          >
            100
          </Option>
          <Option
            onClick={() => {
              let a = {
                quantity_min: conditionOfOrders.quantity_min,
                quanity_max: conditionOfOrders.quanity_max,
                price_min: conditionOfOrders.price_min,
                price_max: conditionOfOrders.price_max,
                currency: conditionOfOrders.currency,
                erc20: conditionOfOrders.erc20,
                sellerDeposit: conditionOfOrders.sellerDeposit,
                buyerDeposit: conditionOfOrders.buyerDeposit,
                linenumber: 200,
                mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
              }
              setconditionOfOrders(a);
            }}
            active={conditionOfOrders.linenumber === 200}
          >
            200
          </Option>
          <OptionCustom active={conditionOfOrders.linenumber!==50&&conditionOfOrders.linenumber!==100&&conditionOfOrders.linenumber!==200} warning={false} tabIndex={-1}>
            <RowBetween >
              {/* https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451 */}
            <text>  {t("Customize")}</text>
              <Input
                type="number"
                ref={inputRef as any}
                placeholder={t("Customize")}
                value={conditionOfOrders.linenumber}
                onChange={e => {
                  if(e.target.value==""){
                    let a = {
                      quantity_min: conditionOfOrders.quantity_min,
                      quanity_max: conditionOfOrders.quanity_max,
                      price_min: conditionOfOrders.price_min,
                      price_max: conditionOfOrders.price_max,
                      currency: conditionOfOrders.currency,
                      erc20: conditionOfOrders.erc20,
                      sellerDeposit: conditionOfOrders.sellerDeposit,
                      buyerDeposit: conditionOfOrders.buyerDeposit,
                      linenumber: 0,
                      mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                      myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
                    }
                    setconditionOfOrders(a);
                  }
                  if (e.target.value.indexOf('.') ===  (-1)){
                  let a = {
                  quantity_min: conditionOfOrders.quantity_min,
                  quanity_max: conditionOfOrders.quanity_max,
                  price_min: conditionOfOrders.price_min,
                  price_max: conditionOfOrders.price_max,
                  currency: conditionOfOrders.currency,
                  erc20: conditionOfOrders.erc20,
                  sellerDeposit: conditionOfOrders.sellerDeposit,
                  buyerDeposit: conditionOfOrders.buyerDeposit,
                  linenumber: e.target.value,
                  mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                  myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
                }
                setconditionOfOrders(a);}
                }}
                color={conditionOfOrders.linenumber>300 ? 'red' : ''}
              />
              
            </RowBetween>
          </OptionCustom>
        </RowBetween>
        {conditionOfOrders.linenumber>300 && (
          <RowBetween
            style={{
              fontSize: '14px',
              paddingTop: '7px',
              color:'#F3841E'
            }}
          >
           {t("Too high number will affect the performance of the website")}
          </RowBetween>
        )}
      </AutoColumn>
      <AutoColumn gap="sm">
        <RowFixed>
          <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
            {t("Line number of My Sale Orders")}
          </TYPE.black>
          <QuestionHelper text={t("Too high number will affect the performance of the website")} />
        </RowFixed>
        <RowBetween>
          <Option
            onClick={() => {
              let a = {
                quantity_min: conditionOfOrders.quantity_min,
                quanity_max: conditionOfOrders.quanity_max,
                price_min: conditionOfOrders.price_min,
                price_max: conditionOfOrders.price_max,
                currency: conditionOfOrders.currency,
                erc20: conditionOfOrders.erc20,
                sellerDeposit: conditionOfOrders.sellerDeposit,
                buyerDeposit: conditionOfOrders.buyerDeposit,
                linenumber: conditionOfOrders.linenumber,
                mySellOrderLineNumber: 25,
                myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
              }
              setconditionOfOrders(a);
            }}
            active={conditionOfOrders.mySellOrderLineNumber === 25}
          >
            25
          </Option>
          <Option
            onClick={() => {
              let a = {
                quantity_min: conditionOfOrders.quantity_min,
                quanity_max: conditionOfOrders.quanity_max,
                price_min: conditionOfOrders.price_min,
                price_max: conditionOfOrders.price_max,
                currency: conditionOfOrders.currency,
                erc20: conditionOfOrders.erc20,
                sellerDeposit: conditionOfOrders.sellerDeposit,
                buyerDeposit: conditionOfOrders.buyerDeposit,
                linenumber: conditionOfOrders.linenumber,
                mySellOrderLineNumber: 50,
                myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
              }
              setconditionOfOrders(a);
            }}
            active={conditionOfOrders.mySellOrderLineNumber === 50}
          >
            50
          </Option>
          <Option
            onClick={() => {
              let a = {
                quantity_min: conditionOfOrders.quantity_min,
                quanity_max: conditionOfOrders.quanity_max,
                price_min: conditionOfOrders.price_min,
                price_max: conditionOfOrders.price_max,
                currency: conditionOfOrders.currency,
                erc20: conditionOfOrders.erc20,
                sellerDeposit: conditionOfOrders.sellerDeposit,
                buyerDeposit: conditionOfOrders.buyerDeposit,
                linenumber: conditionOfOrders.linenumber,
                mySellOrderLineNumber: 100,
                myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
              }
              setconditionOfOrders(a);
            }}
            active={conditionOfOrders.mySellOrderLineNumber === 100}
          >
            100
          </Option>
          <OptionCustom active={conditionOfOrders.mySellOrderLineNumber!==25&&conditionOfOrders.mySellOrderLineNumber!==50&&conditionOfOrders.mySellOrderLineNumber!==100} warning={true} tabIndex={-1}>
            <RowBetween>
              {/* https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451 */}
              {t("Customize")}
              <Input
                type="number"
                ref={inputRef as any}
                placeholder={t("Customize")}
                value={conditionOfOrders.mySellOrderLineNumber}
                onChange={e => {
                  if(e.target.value==""){
                    let a = {
                      quantity_min: conditionOfOrders.quantity_min,
                      quanity_max: conditionOfOrders.quanity_max,
                      price_min: conditionOfOrders.price_min,
                      price_max: conditionOfOrders.price_max,
                      currency: conditionOfOrders.currency,
                      erc20: conditionOfOrders.erc20,
                      sellerDeposit: conditionOfOrders.sellerDeposit,
                      buyerDeposit: conditionOfOrders.buyerDeposit,
                      linenumber: conditionOfOrders.linenumber,
                      mySellOrderLineNumber: 0,
                      myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
                    }
                    setconditionOfOrders(a);
                  }
                  if (e.target.value.indexOf('.') ===  (-1)){
                  let a = {
                  quantity_min: conditionOfOrders.quantity_min,
                  quanity_max: conditionOfOrders.quanity_max,
                  price_min: conditionOfOrders.price_min,
                  price_max: conditionOfOrders.price_max,
                  currency: conditionOfOrders.currency,
                  erc20: conditionOfOrders.erc20,
                  sellerDeposit: conditionOfOrders.sellerDeposit,
                  buyerDeposit: conditionOfOrders.buyerDeposit,
                  linenumber: conditionOfOrders.linenumber,
                  mySellOrderLineNumber: e.target.value,
                  myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
                }
                setconditionOfOrders(a);}
                }}
                color={conditionOfOrders.mySellOrderLineNumber>150 ? 'red' : ''}
              />
              
            </RowBetween>
          </OptionCustom>
        </RowBetween>
        {conditionOfOrders.mySellOrderLineNumber>150 && (
          <RowBetween
            style={{
              fontSize: '14px',
              paddingTop: '7px',
              color:'#F3841E'
            }}
          >
           {t("Too high number will affect the performance of the website")}
          </RowBetween>
        )}
      </AutoColumn>


      <AutoColumn gap="sm">
        <RowFixed>
          <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
            {t("Line number of My Buy Orders")}
          </TYPE.black>
          <QuestionHelper text={t("Too high number will affect the performance of the website")} />
        </RowFixed>
        <RowBetween>
          <Option
            onClick={() => {
              let a = {
                quantity_min: conditionOfOrders.quantity_min,
                quanity_max: conditionOfOrders.quanity_max,
                price_min: conditionOfOrders.price_min,
                price_max: conditionOfOrders.price_max,
                currency: conditionOfOrders.currency,
                erc20: conditionOfOrders.erc20,
                sellerDeposit: conditionOfOrders.sellerDeposit,
                buyerDeposit: conditionOfOrders.buyerDeposit,
                linenumber: conditionOfOrders.linenumber,
                mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                myBuyOrderLineNumber: 25
              }
              setconditionOfOrders(a);
            }}
            active={conditionOfOrders.myBuyOrderLineNumber === 25}
          >
            25
          </Option>
          <Option
            onClick={() => {
              let a = {
                quantity_min: conditionOfOrders.quantity_min,
                quanity_max: conditionOfOrders.quanity_max,
                price_min: conditionOfOrders.price_min,
                price_max: conditionOfOrders.price_max,
                currency: conditionOfOrders.currency,
                erc20: conditionOfOrders.erc20,
                sellerDeposit: conditionOfOrders.sellerDeposit,
                buyerDeposit: conditionOfOrders.buyerDeposit,
                linenumber: conditionOfOrders.linenumber,
                mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                myBuyOrderLineNumber: 50
              }
              setconditionOfOrders(a);
            }}
            active={conditionOfOrders.myBuyOrderLineNumber === 50}
          >
            50
          </Option>
          <Option
            onClick={() => {
              let a = {
                quantity_min: conditionOfOrders.quantity_min,
                quanity_max: conditionOfOrders.quanity_max,
                price_min: conditionOfOrders.price_min,
                price_max: conditionOfOrders.price_max,
                currency: conditionOfOrders.currency,
                erc20: conditionOfOrders.erc20,
                sellerDeposit: conditionOfOrders.sellerDeposit,
                buyerDeposit: conditionOfOrders.buyerDeposit,
                linenumber: conditionOfOrders.linenumber,
                mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                myBuyOrderLineNumber: 100
              }
              setconditionOfOrders(a);
            }}
            active={conditionOfOrders.myBuyOrderLineNumber === 100}
          >
            100
          </Option>
          <OptionCustom active={conditionOfOrders.myBuyOrderLineNumber!==25&&conditionOfOrders.myBuyOrderLineNumber!==50&&conditionOfOrders.myBuyOrderLineNumber!==100} warning={true} tabIndex={-1}>
          
            <RowBetween >
            {t("Customize")}
              <Input
                type="number"
                ref={inputRef as any}
                placeholder={t("Customize")}
                value={conditionOfOrders.myBuyOrderLineNumber}
                onChange={e => {
                  if(e.target.value==""){
                    let a = {
                      quantity_min: conditionOfOrders.quantity_min,
                      quanity_max: conditionOfOrders.quanity_max,
                      price_min: conditionOfOrders.price_min,
                      price_max: conditionOfOrders.price_max,
                      currency: conditionOfOrders.currency,
                      erc20: conditionOfOrders.erc20,
                      sellerDeposit: conditionOfOrders.sellerDeposit,
                      buyerDeposit: conditionOfOrders.buyerDeposit,
                      linenumber: conditionOfOrders.linenumber,
                      mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                      myBuyOrderLineNumber: 0
                    }
                    setconditionOfOrders(a);
                  }
                  if (e.target.value.indexOf('.') ===  (-1)){
                  let a = {
                  quantity_min: conditionOfOrders.quantity_min,
                  quanity_max: conditionOfOrders.quanity_max,
                  price_min: conditionOfOrders.price_min,
                  price_max: conditionOfOrders.price_max,
                  currency: conditionOfOrders.currency,
                  erc20: conditionOfOrders.erc20,
                  sellerDeposit: conditionOfOrders.sellerDeposit,
                  buyerDeposit: conditionOfOrders.buyerDeposit,
                  linenumber: conditionOfOrders.linenumber,
                  mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
                  myBuyOrderLineNumber: e.target.value
                }
                setconditionOfOrders(a);}
                }}
                color={conditionOfOrders.myBuyOrderLineNumber>150 ? 'red' : ''}
              />
              
            </RowBetween>
          </OptionCustom>
        </RowBetween>
        {conditionOfOrders.myBuyOrderLineNumber>150 && (
          <RowBetween
            style={{
              fontSize: '14px',
              paddingTop: '7px',
              color:'#F3841E'
            }}
          >
           {t("Too high number will affect the performance of the website")}
          </RowBetween>
        )}
      </AutoColumn>

    </AutoColumn>
  )
}
