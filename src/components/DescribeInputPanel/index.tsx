import React, { ReactNode, useCallback, useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { darken } from 'polished'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { RowFixed } from '../../components/Row'
import { ethers } from 'ethers'
import InfoTypeSearchModal from '../SearchModal/InfoTypeSearchModal'
import { getInfoType, INFOTYPE } from '../../hooks/describeInfoType'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'
import { useTranslation } from 'react-i18next'
import InfoTypeLOGO from '../InfoTypeLogo'
import Copy from '../AccountDetails/Copy'
import { ButtonSecondary } from '../Button'
import Card from '../Card'
import { FixedHeightRow } from '../../pages/NewVideos'

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`
export const DescribeInput1 = styled.input`
width:30%
`
export const DescribeInput2 = styled.input`
width:30%
`
export const HoverCard = styled(Card)`
  margin-top:2%
  border: 1px solid ${({ theme }) => theme.bg2};
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`
const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ selected, theme }) => (selected ? theme.bg1 : theme.primary1)};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  border-radius: 12px;
  box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;

  :focus,
  :hover {
    background-color: ${({ selected, theme }) => (selected ? theme.bg2 : darken(0.05, theme.primary1))};
  }
`
const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledDropDown = styled(DropDown) <{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`
const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '16px')};

`
const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
export const CryptoInput = styled.textarea`
position: relative;
display: flex;
padding: 16px;
margin-left:4%;
margin-right:4%;
margin-bottom:4%;
align-items: center;
width: 92%;
white-space: nowrap;
background: none;
border: 1px solid;
outline: none;
border-radius: 12px;
text-align: left
-webkit-appearance: none;
font-size: 14px;
white-space: pre-wrap;

`
const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg1};
  font-size: ${({ fontSize }) => fontSize ?? '18px'};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`
interface CurrencyInputPanelProps {
  descInfo: string[]
  handlesetdescInfo: (value: string[]) => void
  label?: string
  hideInput?: boolean
  id: string
}

export default function DescribeInputPanel({
  descInfo,
  handlesetdescInfo,
  label = 'Input',
  hideInput = false,
  id,
}: CurrencyInputPanelProps) {
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)
  const [describeInfoType, setdescribeInfoType] = useState<INFOTYPE | undefined>(undefined);
  const [describeInfo, setdescribeInfo] = useState("");
  const [modalOpen, setModalOpen] = useState(false)
  const handleInfoTypeSelect = useCallback(
    inputCurrency => {
      setdescribeInfoType(inputCurrency)
    },
    []
  )
  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])
  const handledescribeInfo = (event: any) => {
    setdescribeInfo(event.target.value)
  }
  const handleadd = useCallback(() => {
    let dd = descInfo
    if ((describeInfoType ? true : false)) {
      if ((describeInfoType?.InfoText === "CryptoContract")||(describeInfoType?.InfoText === "Bank Card Cash Deposit")||(describeInfoType?.InfoText ===  "Secret WeChat")) {
        let x = true
        if(describeInfoType?.InfoText === "CryptoContract"){
        dd.map((item) => {
          if (item.split(':')[0] === "CryptoContract") {
            alert(t("You can not input two CryptoContract"));
            x = false
          }
        });}
        if(describeInfoType?.InfoText === "Bank Card Cash Deposit"){
          dd.map((item) => {
            if (item.split(':')[0] === "Bank Card Cash Deposit") {
              alert(t("You can not input two Bank Card Cash Deposit info"));
              x = false
            }
          });}
          if(describeInfoType?.InfoText ===  "Secret WeChat"){
            dd.map((item) => {
              if (item.split(':')[0] ===  "Secret WeChat") {
                alert(t("You can not input two Secret WeChat"));
                x = false
              }
            });}
        if (x) {
          dd.push(describeInfoType.InfoText + ':' + ethers.utils.id(describeInfo))
        }
      }else {
        if (describeInfoType ? true : false) {
          dd.push(describeInfoType?.InfoText + ':' + describeInfo)
        } else { dd.push(describeInfo) }
      }
      let ss = Array.from(dd)
      handlesetdescInfo(ss)
      setdescribeInfoType(undefined)
      setdescribeInfo("")
    }
  }, [describeInfoType, describeInfo, descInfo])
  const handledelete = (index: any) => {
    let dd = descInfo
    dd.splice(index, 1)
    let ss = Array.from(dd)
    handlesetdescInfo(ss)
  }
  function infoDescribe(infotype: string, info: string, index: number, infodescribe: string, tempINFOTYPE?: INFOTYPE): ReactNode | undefined {
    const ellipsis = (a: string) => {
      if (a.length > 20) {
        return a.substring(0, 20) + "..."
      }
      return a
    }

    return (

      <FixedHeightRow key={index}>
        <RowBetween>
          <RowFixed>

            <InfoTypeLOGO currency={tempINFOTYPE} size={'24px'} />
            <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
              {t(infotype)}:
            </TYPE.black>
          </RowFixed>
          {info.length < 20 ? (
                <TYPE.black fontSize={14} color={theme.text1}>
                  {info && (
                  <span style={{ marginLeft: '4px' }}>{info}</span>
                  )} </TYPE.black>)
            : (<TYPE.black fontSize={14} color={theme.text1}>
              {info && (
                <Copy toCopy={info}>
                  <span style={{ marginLeft: '4px' }}> {ellipsis(info)}</span>
                </Copy>
              )} </TYPE.black>)}
          <LinkStyledButton style={{ fontSize: "21px" }} onClick={() => handledelete(index)}>×</LinkStyledButton>
        </RowBetween>
      </FixedHeightRow>
    )
  }
  function HandleDescribe() {
    return (
      descInfo?.map((item, index) => {
        let item1: string = typeof (item) ===  "string" ? item : ""
        let infotype: string = item1?.split(':')[0];
        const tempINFOTYPE = getInfoType(infotype);
        let infodescribe: string | undefined = getInfoType(infotype)?.Describe;
        let info: string = item1?.split(':')[1];
        return (
          infoDescribe(infotype?infotype:"", info?info:"", index, infodescribe ? infodescribe : "", tempINFOTYPE)
        )

      })
    )
  }
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>

        <LabelRow>
          <RowBetween>
            <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
              {label}
            </TYPE.body>
          </RowBetween>
        </LabelRow>

        <div style={{ marginRight: "4%", marginLeft: "4%" }}>
          <HoverCard>
            {HandleDescribe() ? HandleDescribe() : <></>}
          </HoverCard>
        </div>


        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={false}>
          <CurrencySelect
            selected={!!describeInfoType}
            className="open-currency-select-button"
            onClick={() => {
              setModalOpen(true)
            }}
          >
            <Aligner>
              <InfoTypeLOGO currency={describeInfoType} size={'24px'} />
              {
                <StyledTokenName className="token-symbol-container" active={Boolean(describeInfoType && describeInfoType.InfoText)}>
                  {t(describeInfoType?.InfoText) || t('Info Type')}
                </StyledTokenName>
              }
              <StyledDropDown selected={!!describeInfoType} />
            </Aligner>
          </CurrencySelect>
          {describeInfoType?.InfoText ===  "CryptoContract" ? <></>
            : <StyledInput placeholder={(describeInfoType?.InfoText ===  "CryptoContract")||(describeInfoType?.InfoText ===  "Bank Card Cash Deposit") ? "" : t('Input Info')} disabled={(describeInfoType?.InfoText ===  "CryptoContract")||(describeInfoType?.InfoText ===  "Bank Card Cash Deposit")} value={describeInfo} onChange={handledescribeInfo} />
          }

        </InputRow>
        {(describeInfoType?.InfoText ===  "CryptoContract")||(describeInfoType?.InfoText ===  "Bank Card Cash Deposit") ? <CryptoInput value={describeInfo}
          onChange={handledescribeInfo}
          placeholder={describeInfoType?.InfoText ===  "CryptoContract"?t("Please input Crypto contract, and be sure to save it."):t("Please input Bank Card Cash Deposit info, and be sure to save it.")}
        /> : <></>
        }
        {describeInfoType?.InfoText ===  "WeChat" ? <text style={{ float: "right", paddingLeft: '4%', paddingRight: '2%', paddingBottom: '2%', color: '#FF6000', display: "inline-block" }}>{t('Please input WeChat account,not phone number.')}</text> : <></>
        }
        {describeInfoType?.InfoText ===  "Alipay" ? <text style={{ float: "right", paddingLeft: '4%', paddingRight: '2%', paddingBottom: '2%', color: '#FF6000', display: "inline-block" }}>{t('Please input Alipay account,not phone number or e-mail.')}</text> : <></>
        }
        <div style={{ marginRight: "4%", marginLeft: "4%", marginBottom: "4%" }}>
          <ButtonSecondary onClick={handleadd} > {t('Add Info')} </ButtonSecondary>
        </div>
        <InfoTypeSearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={handleInfoTypeSelect}
          selectedCurrency={describeInfoType}
        />

      </Container>
    </InputPanel>
  )
}
