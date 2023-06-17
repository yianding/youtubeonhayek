import React, { MouseEventHandler, useState } from 'react'
import styled from 'styled-components'
// import { SwapPoolTabs } from '../../components/NavigationTabs'
import { AutoColumn } from '../../components/Column'
import { useGetVideoCountCallBack, useGetVideoListDataCallBack } from '../../hooks/useApproveCallback'

import AppBody from '../AppBody'
import { RowBetween } from '../../components/Row'

import SCard from '../../components/Card'
import {BigNumber } from 'ethers'
import InfiniteScroll from "react-infinite-scroll-component";

// import { Button } from 'rebass'
// import { SwapPoolTabs } from '../../components/NavigationTabs'

const BottonDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120;  
`
export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`
export const Input = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: 100%;
  heigth:1px;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 1px;
  text-align: right
  -webkit-appearance: none;

  font-size: 18px;
`
export const MyHoverCard = styled(SCard)`
  background:pink;
  padding:0;
  borderRadius:0px;
  border: none;
  width:100%;
`
export const BackDiv = styled.div`
  background:red;
  padding:0;
  borderRadius:0px;
  border: none;
  width: 100%;;
`
// const VideoPlay = React.memo((props: { ipfs: string }) => {
//   let video:HTMLVideoElement|null;
//   console.log("000000----"+props.ipfs)
//   function mplay(){
//     video?.play()
//   }
//   // const handleVideoMounted = (element:  {currentTime:number}| null) => {
//   //   if (element !== null) {
//   //     element.currentTime=0.1
//   //   }
//   // };
//   return ( 
//     <BackDiv>

//     <video controls autoPlay height={120} ref={(ref) => { video = ref; }}  >
//     {/* <video controls autoPlay height={120} playsInline ref={handleVideoMounted} > */}
//       <source src={'http://127.0.0.1:8080' + props.ipfs} type="video/mp4" />
//     </video>
//     <Button onClick={()=>mplay()}> Play </Button>

//     </BackDiv>
//   )
// })
// const VideoPlay =(props: { ipfs: string }) => {
//   let video:HTMLVideoElement|null;
//   console.log("000000----"+props.ipfs)
//   function mplay(){
//     video?.play()
//   }
//   // const handleVideoMounted = (element:  {currentTime:number}| null) => {
//   //   if (element !== null) {
//   //     element.currentTime=0.1
//   //   }
//   // };
//   return ( 
//     <BackDiv>

//     <video controls autoPlay height={120} ref={(ref) => { video = ref; }}  >
//     {/* <video controls autoPlay height={120} playsInline ref={handleVideoMounted} > */}
//       <source src={'http://127.0.0.1:8080' + props.ipfs} type="video/mp4" />
//     </video>
//     <Button onClick={()=>mplay()}> Play </Button>

//     </BackDiv>
//   )
// }


export default function AllOrders() {
  let video:HTMLVideoElement|null
  const [amount] = useState(BigNumber.from(6))
  let start1 = useGetVideoCountCallBack()
  console.log("-------start1:"+start1)
  const [start,setStart] = useState(start1)
  //setStart(start1)
  console.log("-------start:" + start+" start1 "+start1+" amount "+amount)
  //const [start, setStart] = useState(BigNumber.from(12))
  const vidoelist = useGetVideoListDataCallBack(start, amount)
  const [currentIPFS, setCurrentIPFS] = useState<string>("")
  const [hasmore,setHasemore] = useState(true);

  const fetchMoreData = () => {
    console.log("--------fetchMoreData----------"+start.toHexString())
    if(vidoelist){
     if (BigNumber.from(vidoelist[0].id).lt(BigNumber.from("10"))) {
       // setState({ hasMore: false });
       setHasemore(false);
       console.log("--setHasemore----------------")
       return;
     }
    
    let a=BigNumber.from(vidoelist[0].id).sub(BigNumber.from("4"))
    console.log("sub:"+a)
    setStart(a)
  }
  };

  const Videolick = (ss: string): (MouseEventHandler<HTMLDivElement> | undefined) => {
    console.log("DDDDDDDDDDDDDDDDDD" + ss)

   // setCurrentIPFS(ss)
    if(video){
      video.src="http://127.0.0.1:8080"+ss
     // video.src="http://127.0.0.1:8080"+ss
    }
    setCurrentIPFS(ss)
    return undefined
  }
  const handleVideoMounted = (element: { currentTime: number } | null) => {
    if (element !== null) {
      element.currentTime = 0.1
    }
  };
  return (
    <>

      <AppBody>

        {/* <SwapPoolTabs active={'allOrders'} /> */}
        <AutoColumn>
      
            {(currentIPFS.length > 10 )?
            
              (
                <BottonDiv>
                <BackDiv>

                  <video controls autoPlay height={120}  ref={(ref) => { video = ref; }}  >
                    {/* <video controls autoPlay height={120} playsInline ref={handleVideoMounted} > */}
                    <source src={'http://127.0.0.1:8080' + currentIPFS} type="video/mp4" />
                  </video>
                </BackDiv>
                </BottonDiv>
              ) :undefined
            }
          
          <AutoColumn >


            <MyHoverCard>

              <InfiniteScroll

                dataLength={vidoelist ? vidoelist.length : 0}
                next={fetchMoreData}
                hasMore={hasmore}
                loader={<h4>Loading...</h4>}
                height={(currentIPFS.length < 10 )?window.innerHeight:window.innerHeight-120 }

                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {vidoelist?.map((k, index) => {

                  return (<div onClick={() => Videolick(k.ipfs)}>
                    <video width="100%"  ref={handleVideoMounted}>
                      <source src={'http://127.0.0.1:8080' + k.ipfs} type="video/mp4" />

                    </video>
                    <p>{k.id + "|" + k.title}</p>
                  </div>
                  )
                })}
              </InfiniteScroll>

            </MyHoverCard>

          </AutoColumn>
        </AutoColumn>

      </AppBody>

    </>
  )
}




