import React, { Suspense } from 'react'
import { HashRouter,  Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
//import Header from '../components/Header'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'

import PutOrder from './PutOrder'
import MyBuyOrders from './MyOrder'
import MySaleOrders from './MyOrder/index2'
import { RedirectPathToSwapOnly } from './MyOrder/redirects'
import Header from '../components/Header'
import PublishVideo from './publishVideo'
import SetProfile from './Profile'
import NewVideos from './NewVideos'

// const activeClassName = 'ACTIVE'


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  width:100%;
 
`
const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
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
  padding-top: 16px;
  padding:0px;
  align-items: center;
  flex: 1;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 1px;
  `};

  z-index: 1;

`


export default function App() {


  return (

    <Suspense fallback={null}>
  <div >

</div>
      <HashRouter>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper>
       
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          
          <BodyWrapper>
     
            <Popups />
            <Web3ReactManager>
            <div  style={{width:'100%'}}>
              <Switch>
               
                <Route exact strict path="/myBuyOrders" component={MyBuyOrders} />
                <Route exact strict path="/mySaleOrders" component={MySaleOrders} />
                <Route exact strict path="/putOrder" component={PutOrder} />
                <Route exact strict path="/NewVideos" component={NewVideos} />
                <Route exact strict path="/PublishVideo" component={PublishVideo}/>
                <Route exact strict path="/SetProfile" component={SetProfile}/>
                <Route component={RedirectPathToSwapOnly} />
              
              </Switch>
              </div>
            </Web3ReactManager>
           
          </BodyWrapper>
         
        </AppWrapper>
      
      </HashRouter>
    </Suspense>

  )
}
