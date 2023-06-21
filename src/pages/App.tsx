import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
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
  return (
   
    <Suspense fallback={null}>
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
                <Route component={RedirectPathToSwapOnly} />
                
              </Switch>
            </Web3ReactManager>
        
          </BodyWrapper>
        </AppWrapper>
      </HashRouter>
    </Suspense>
   
  )
}
