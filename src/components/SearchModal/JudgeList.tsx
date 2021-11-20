import React, { CSSProperties, MutableRefObject, useCallback } from 'react'
import { FixedSizeList } from 'react-window'
import Column from '../Column'
import { MenuItem } from './styleds'
import { RowBetween, RowFixed } from '../Row'
import { AllJudge, JUDGE } from '../../hooks/judge'
import ListLogo from '../ListLogo'
import styled from 'styled-components'
import { Text } from 'rebass'


const StyledDepositText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

function FaitRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style
}: {
  currency: JUDGE
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: CSSProperties
}) {



  // only show add or remove buttons if not on selected list
  return (
    <MenuItem
      style={style}
      className={`token-item-${currency?.address}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
    >
      <ListLogo logoURI={currency.logoURI} size={'24px'} />
      <Column>
        <RowBetween>
          <text key={currency?.name} fontWeight={1000}>
            {currency.name + " "}
            <a href={currency.URL} target="_blank">法院网址</a>
          </text>
        </RowBetween>
      </Column>
      <RowFixed  style={{ justifySelf: 'flex-end' }} >
      <StyledDepositText >  {currency?.deposit}</StyledDepositText>HYK
      </RowFixed>  
    </MenuItem>

  )
}
function fiatEquals(A: JUDGE, B: JUDGE): boolean {
  return (A.address === B.address)
}
export default function FaitList({
  height,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  fixedListRef
}: {
  height: number
  selectedCurrency?: JUDGE | null
  onCurrencySelect: (currency: JUDGE) => void
  otherCurrency?: JUDGE | null
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>

}) {

  const itemDate = AllJudge()

  const Row = useCallback(
    ({ data, index, style }) => {

      const currency: JUDGE = data[index]
      const isSelected = Boolean(selectedCurrency && fiatEquals(selectedCurrency, currency))
      const otherSelected = Boolean(otherCurrency && fiatEquals(otherCurrency, currency))
      const handleSelect = () => onCurrencySelect(currency)
      return (
        <FaitRow
          style={style}
          currency={currency}
          isSelected={isSelected}
          onSelect={handleSelect}
          otherSelected={otherSelected}
        />
      )
    },
    [onCurrencySelect, otherCurrency, selectedCurrency]
  )

  const itemKey = useCallback((index: number, data: any) => data[index].toString(), [])

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemDate}
      itemCount={itemDate.length}
      itemSize={50}
      itemKey={itemKey}
    >

      {Row}
    </FixedSizeList>
  )
}


