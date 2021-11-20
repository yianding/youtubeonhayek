
import React, {  RefObject, useCallback, useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga'
import { useTranslation } from 'react-i18next'
import { FixedSizeList } from 'react-window'
import { Text } from 'rebass'
import { CloseIcon } from '../../theme'
import { isAddress } from '../../utils'
import Column from '../Column'
import  { RowBetween } from '../Row'
import SortButton from './SortButton'
import { PaddedColumn, SearchInput, Separator } from './styleds'
import AutoSizer from 'react-virtualized-auto-sizer'
import { JUDGE } from '../../hooks/judge'
import JudgeList from './JudgeList'

interface FIATSearchProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: JUDGE | null
  onCurrencySelect: (currency: JUDGE) => void
  otherSelectedCurrency?: JUDGE | null
  showCommonBases?: boolean
  onChangeList: () => void
}
export function JudgeSearch({
  selectedCurrency,
  onCurrencySelect,
  onDismiss,
  isOpen,
  onChangeList
}: FIATSearchProps) {
  const { t } = useTranslation()

  const fixedList = useRef<FixedSizeList>()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [invertSearchOrder, setInvertSearchOrder] = useState<boolean>(false)
 

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
    (currency: JUDGE) => {
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
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback(event => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    fixedList.current?.scrollTo(0)
  }, [])



  return (
    <Column style={{ width: '100%', flex: '1 1' }}>
      <PaddedColumn gap="14px">
        <RowBetween>
          <Text fontWeight={500} fontSize={16}>
           { t('选择法院')}
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
        <SearchInput
          type="text"
          id="token-search-input"
          placeholder={t('Input address')}
          value={searchQuery}
          ref={inputRef as RefObject<HTMLInputElement>}
          onChange={handleInput}
        />
    
        <RowBetween>
          <Text fontSize={14} fontWeight={500}>
           {t('Currency')}
          </Text>
          <SortButton ascending={invertSearchOrder} toggleSortOrder={() => setInvertSearchOrder(iso => !iso)} />
        </RowBetween>
      </PaddedColumn>

      <Separator />

      <div style={{ flex: '1' }}>
        <AutoSizer disableWidth>
          {({ height }) => (
            <JudgeList
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
