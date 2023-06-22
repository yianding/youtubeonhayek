import React, { Suspense } from 'react'
import { HashRouter,  Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
//import Header from '../components/Header'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AllOrders from './AllOrder'
import PutOrder from './PutOrder'
import MyBuyOrders from './MyOrder'
import MySaleOrders from './MyOrder/index2'
import { RedirectPathToSwapOnly } from './MyOrder/redirects'

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
import PublishVideo from './publishVideo'
type Anchor = 'top' | 'left' | 'bottom' | 'right';
// const activeClassName = 'ACTIVE'


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
 
`

// const HeaderWrapper = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap}
//   width: 100%;
//   justify-content: space-between;
//   padding:0;
// `

const BodyWrapper = styled.div`
  
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 160px;
  padding:0;
  align-items: center;
  flex: 1;
  overflow:hidden
  overflow-y: hidden;
 
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 1px;
  `};

  z-index: 1;
`


export default function App() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
          <ListItem key={'2'} disablePadding>
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
       
          <ListItem key={"33"} disablePadding>
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
console.log(           

)

  return (

    <Suspense fallback={null}>
  <div >
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
</div>
      <HashRouter>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper>

          <BodyWrapper>

            <Popups />
            <Web3ReactManager>
       
              <Switch>
                <Route exact strict path="/myBuyOrders" component={MyBuyOrders} />
                <Route exact strict path="/mySaleOrders" component={MySaleOrders} />
                <Route exact strict path="/putOrder" component={PutOrder} />
                <Route exact strict path="/allOrders" component={AllOrders} />
                <Route exact strict path="/PublishVideo" component={PublishVideo}/>
                <Route component={RedirectPathToSwapOnly} />

              </Switch>
            </Web3ReactManager>

          </BodyWrapper>
        </AppWrapper>
      </HashRouter>
    </Suspense>

  )
}
