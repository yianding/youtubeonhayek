
import React, {  useCallback, useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga'
import { useTranslation } from 'react-i18next'
import { FixedSizeList } from 'react-window'
import { Text } from 'rebass'
import { CloseIcon } from '../../theme'
import { isAddress } from '../../utils'
import Column from '../Column'
import  { RowBetween } from '../Row'
import { PaddedColumn, Separator } from './styleds'
import AutoSizer from 'react-virtualized-auto-sizer'
import { INFOTYPE } from '../../hooks/describeInfoType'
import InfoTypeList from './InfoTypeList'

interface FIATSearchProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: INFOTYPE | null
  onCurrencySelect: (currency: INFOTYPE) => void
  otherSelectedCurrency?: INFOTYPE | null
  showCommonBases?: boolean
  onChangeList: () => void
}
export function InfoTypeSearch({
  selectedCurrency,
  onCurrencySelect,
  onDismiss,
  isOpen}: FIATSearchProps) {
  const { t } = useTranslation()

  const fixedList = useRef<FixedSizeList>()
  const [searchQuery, setSearchQuery] = useState<string>('')
  //const [, setInvertSearchOrder] = useState<boolean>(false)
 

  // if they input an address, use it
  const isAddressSearch = isAddress(searchQuery)


  useEffect(() => {
    if (isAddressSearch) {
      ReactGA.event({
        category: 'Currency Select',
        action: 'Search by address',
        label: isAddressSearch
      })
    }
  }, [isAddressSearch])



  const handleCurrencySelect = useCallback(
    (currency: INFOTYPE) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )

  // clear the input on open
  useEffect(() => {
    if (isOpen) setSearchQuery('')
  }, [isOpen])

  // manage focus on modal show



  return (
    <Column style={{ width: '100%', flex: '1 1' }}>
      <PaddedColumn gap="14px">
        <RowBetween>
          <Text fontWeight={500} fontSize={16}>
            {t("Select item")}
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
 
    
     
      </PaddedColumn>

      <Separator />

      <div style={{ flex: '1' }}>
        <AutoSizer disableWidth>
          {({ height }) => (
            <InfoTypeList
              height={height}
              onCurrencySelect={handleCurrencySelect}
              selectedCurrency={selectedCurrency}
              fixedListRef={fixedList}
            />
          )}
        </AutoSizer>
      </div>
      
    </Column>
  )
}
