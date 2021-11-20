
import React, { useCallback, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import useLast from '../../hooks/useLast'
import { useSelectedListUrl } from '../../state/lists/hooks'
import Modal from '../Modal'
import ListIntroduction from './ListIntroduction'
import { ListSelect } from './ListSelect'
import { JUDGE } from '../../hooks/judge'
import { JudgeSearch } from './JudgeSearch'

interface FIATSearchModalProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: JUDGE | null
  onCurrencySelect: (currency: JUDGE) => void
  otherSelectedCurrency?: JUDGE | null
  showCommonBases?: boolean
}

export default function JudgeSearchModal({
  isOpen,
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency
}: FIATSearchModalProps) {
  const [listView, setListView] = useState<boolean>(false)
  const lastOpen = useLast(isOpen)

  useEffect(() => {
    if (isOpen && !lastOpen) {
      setListView(false)
    }
  }, [isOpen, lastOpen])

  const handleCurrencySelect = useCallback(
    (currency) => {
      onCurrencySelect(currency)
      
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )

  const handleClickChangeList = useCallback(() => {
    ReactGA.event({
      category: 'Lists',
      action: 'Change Lists'
    })
    setListView(true)
  }, [])
  const handleClickBack = useCallback(() => {
    ReactGA.event({
      category: 'Lists',
      action: 'Back'
    })
    setListView(false)
  }, [])
  const handleSelectListIntroduction = useCallback(() => {
    setListView(true)
  }, [])

  const selectedListUrl = useSelectedListUrl()
  const noListSelected = !selectedListUrl

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} minHeight={listView ? 40 : noListSelected ? 0 : 80}>
      {listView ? (
        <ListSelect onDismiss={onDismiss} onBack={handleClickBack} />
      ) : noListSelected ? (
        <ListIntroduction onSelectList={handleSelectListIntroduction} />
      ) : (
        <JudgeSearch
          isOpen={isOpen}
          onDismiss={onDismiss}
          onCurrencySelect={handleCurrencySelect}
          onChangeList={handleClickChangeList}
          selectedCurrency={selectedCurrency}
          otherSelectedCurrency={otherSelectedCurrency}
        />
      )}
    </Modal>
  )
}
