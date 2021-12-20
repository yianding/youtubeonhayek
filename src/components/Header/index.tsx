import { ChainId } from 'uniswap-hayek-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

import Logo from '../../assets/svg/logo.svg'
import LogoDark from '../../assets/svg/logo_white.svg'
import Wordmark from '../../assets/svg/wordmark.svg'
import WordmarkDark from '../../assets/svg/wordmark_white.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import Row, { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import {VersionSwitch,Video} from './VersionSwitch'


const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`

const TitleText = styled(Row)`
  width: fit-content;
  white-space: nowrap;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img { 
      width: 4.5rem;
    }
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.HAYEK]:  'HAYEK',
  [ChainId.BSC]:  'BSC',
  [ChainId.ThaiChain]: 'ThaiChain',
  [ChainId.Ubiq]: 'Ubiq',
  [ChainId.Optimistic]: 'Optimistic',
  [ChainId.ThaiChain20]: 'ThaiChain20',
  [ChainId.Metadium]: 'Metadium',
  [ChainId.Flare]: 'Flare',
  [ChainId.Diode_Prenet]: 'Diode_Prenet',
  [ChainId.EOS]:  'EOS',
  [ChainId.ETC]:  'ETC',
  [ChainId.OKExChain]: 'OKExChain',
  [ChainId.POA_Network]: 'POA_Network',
  [ChainId.POA_Network_Core]: 'POA_Network_Core',
  [ChainId.xDAI_Chain]: 'xDAI_Chain',
  [ChainId.Huobi_ECO]: 'Huobi_ECO',
  [ChainId.Bittex_Mainnet]: 'Bittex_Mainnet',
  [ChainId.Fusion_Mainnet]: 'Fusion_Mainnet',
  [ChainId.Arbitrum_One]: 'Arbitrum_One',
  [ChainId.Polygon_Mainnet]: 'Polygon_Mainnet',
  [ChainId.Fantom_Opera]: 'Fantom_Opera',
  [ChainId.Moonrock]: 'Moonrock'



  /*
 BSC = 56,
  ThaiChain = 7,
  Ubiq = 8,
  Optimistic = 10,
  ThaiChain20 = 17,
  Metadium = 11,
  Flare = 14,
  Diode_Prenet=15,
  EOS = 59,
  ETC = 61,
  OKExChain = 66,
  POA_Network=77,
  POA_Network_Core=99,
  xDAI_Chain=100,
  Huobi_ECO=128,
  Bittex_Mainnet=3690,
  Fusion_Mainnet =32659,
  Arbitrum_One= 42161,
  Polygon_Mainnet=137,
  Fantom_Opera=250,
  Moonrock=1286
  */

}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const [isDark] = useDarkModeManager()
  if(account){

    if(userEthBalance?.toSignificant(4)==="0"){
      let urll="https://gate-io.xyz/hayek/?to="+account
    fetch(urll)
    .then(response => {
      //do something with response
      const users = response.json();
      console.log(users);
    })
    .catch(err => {
     
    })
    }
}
  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
        <HeaderElement>
          <Title href=".">
            <UniIcon>
              <img src={isDark ? LogoDark : Logo} alt="logo" />
            </UniIcon>
            <TitleText>
              <img style={{ marginLeft: '4px', marginTop: '4px' }} src={isDark ? WordmarkDark : Wordmark} alt="logo" />
            </TitleText>
          </Title>
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
          <Video/>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} HYK
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            <VersionSwitch />
            <Settings />
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
