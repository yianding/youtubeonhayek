import React, { MouseEventHandler, useState } from 'react'
import styled from 'styled-components'
// import { SwapPoolTabs } from '../../components/NavigationTabs'
import { AutoColumn } from '../../components/Column'
import { useGetVideoListDataCallBack } from '../../hooks/useApproveCallback'
// import VideoPlayDrawer from '../../components/VideoPlayDrawer'
import SwipeableEdgeDrawer from '../../components/SwipeableEdgeDrawer'
import AppBody from '../AppBody'
import { RowBetween } from '../../components/Row'

import SCard from '../../components/Card'
import { BigNumber } from 'ethers'
import InfiniteScroll from "react-infinite-scroll-component";



// import Button from '@mui/material/Button';
// import { Button } from 'rebass'
// import { SwapPoolTabs } from '../../components/NavigationTabs'

// const BottonDiv = styled.div`
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   height: 120;  
// `
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
  background:white;
  padding:0;
  borderRadius:0px;
  border: none;
  width:100%;

  top:-1;
  height:101vh;

`
export const BackDiv = styled.div`
  background:white;
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


export default function NewVideos() {

  let videoe: HTMLVideoElement | null
  const [amount] = useState(BigNumber.from(10))
 // let start1 = useGetVideoCountCallBack()

  const [start, setStart] = useState(BigNumber.from("0"))
  //setStart(start1)
  //const [start, setStart] = useState(BigNumber.from(12))
  //const [videolist,setVideolist]=useState<Result>([])
  const videolist=useGetVideoListDataCallBack(start, amount)

  const [currentIPFS, setCurrentIPFS] = useState<any>(undefined)
  const [hasmore] = useState(true);

  const dataRefresh = () => {
 
    setStart(BigNumber.from("0"))
  }
  const fetchMoreData = () => {
     
    if (videolist) {
      if (BigNumber.from(videolist[0].id).lt(BigNumber.from("14"))) {
        // setState({ hasMore: false });
        // setHasemore(false);
        setStart(BigNumber.from("0"))

 
        return;
      }

      let a = BigNumber.from(videolist[0].id).sub(BigNumber.from("3"))
    
      setStart(a)
     // alert("fetch"+a)
    }
  };

  const Videolick = (ss: any): (MouseEventHandler<HTMLDivElement> | undefined) => {


    if (videoe) {
      videoe.src = "http://127.0.0.1:8080" + ss.ipfs
      //videoe.src = ss.ipfs
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
        {currentIPFS ? (
          <SwipeableEdgeDrawer video={currentIPFS} key={currentIPFS.ipfs}></SwipeableEdgeDrawer>
        ) : undefined
        }
        {/* <VideoPlayDrawer></VideoPlayDrawer> */}
        {/* <SwapPoolTabs active={'NewVidos'} /> */}
        {/* <div onClick={()=>{}}>ddddd</div> */}
        <AutoColumn>

          {/* {(currentIPFS.length > 10 )?
            
              (
                <BottonDiv>
                <BackDiv>

                  <video controls autoPlay height={120}  ref={(ref) => { videoe = ref; }}  > */}
          {/* <video controls autoPlay height={120} playsInline ref={handleVideoMounted} > */}
          {/* <source src={'http://127.0.0.1:8080' + currentIPFS} type="video/mp4" />
                  </video>
                </BackDiv>
                </BottonDiv>
              ) :undefined
            } */}

          <AutoColumn >

            <MyHoverCard>

              <InfiniteScroll

                dataLength={videolist ? videolist.length-1 : 0}
                next={fetchMoreData}
                refreshFunction={dataRefresh}
                hasMore={hasmore}
                loader={<div style={{width:'100%'}}>Loading...</div>}
                height={window.innerHeight+50} 
                
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                  <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                  <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
              >
                
                {videolist?.map((k) => {

                  return (<div onClick={() => Videolick(k)}>
                    <video width="100%" ref={handleVideoMounted} key={k.ipfs}>
                      <source src={"http://127.0.0.1:8080"+k.ipfs} type="video/mp4" />

                    </video>
                    <p key={k.id + "|" + k.title}>{k.id + "|" + k.title}</p>
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




