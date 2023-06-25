import { ChainId } from 'uniswap-hayek-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'

import  { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import { NETH } from '../../constants'

import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
// import Person3Icon from '@mui/icons-material/Person3';
// import { darken } from 'polished'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import PublishVideo from './publishVideo'
type Anchor = 'top' | 'left' | 'bottom' | 'right';

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
    padding: 0px 0 0 0;
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
    margin-top: 1rem;
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
  margin-left: 0px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
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
  [ChainId.BSC]:  'Binance Smart Chain',
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
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  if(account){

    if(userEthBalance?.toSignificant(4)==="0"){
      let urll="https://g.hayek.link/hayek/?to="+account
    fetch(urll)
    .then(response => {
      //do something with response
      // const users = response.json();
      // console.log(users);
    })
    .catch(err => {
     
    })
    }
}

const toggleDrawer =
(anchor: Anchor, open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

const list = (anchor: Anchor) => (
<Box
  sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
  role="presentation"
  onClick={toggleDrawer(anchor, false)}
  onKeyDown={toggleDrawer(anchor, false)}
>
  <List>
    
      <ListItem key={'1'} disablePadding onClick={()=>{window.location.href="#PublishVideo"}}>
        <ListItemButton>
          <ListItemIcon>
            <ControlPointIcon /> 
          </ListItemIcon>
          <ListItemText primary={"Publish Video"} />

        </ListItemButton>
        
      </ListItem>
      
    
  </List>
  <Divider />
  <List>
   
      <ListItem key={"33"} disablePadding onClick={()=>{window.location.href="#SetProfile"}}>
        <ListItemButton>
          <ListItemIcon>
     <ManageAccountsIcon />

          </ListItemIcon>
          <ListItemText primary={'Personal Setting'} />
        </ListItemButton>
      </ListItem>
    
  </List>
</Box>
);
  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
        <HeaderElement>
        {(['left'] as const).map((anchor) => (
    <React.Fragment key={anchor}>
      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <DensityMediumIcon onClick={toggleDrawer(anchor, true)} sx={{ fontSize: 30}} > </DensityMediumIcon>
    
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </React.Fragment>
  ))}
          {/* <Title href=".">
            <UniIcon>
              <img src={isDark ? LogoDark : Logo} alt="logo" width={10} height={30}/>
            </UniIcon>
            <TitleText>
              <img style={{ marginLeft: '4px', marginTop: '4px' }} src={isDark ? WordmarkDark : Wordmark} alt="logo" />
            </TitleText>
          </Title> */}
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)+NETH[chainId?chainId:ChainId.HAYEK]} 
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
  
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
