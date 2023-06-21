import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import Skeleton from '@mui/material/Skeleton';
// import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';


const drawerBleeding = 60;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    video: any;
}

// const Mycontainer=styled('div')(({ theme }) => ({
//      height: '100%',
//     display: 'flex',
//     flex-direction: 'column'
// }));


const Root = styled('div')(({ theme }) => ({

    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({

    backgroundColor: 'white',

    //  theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 60,
    height: 3,
    backgroundColor: 'grey',
    //    theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 2,
    left: 'calc(50% - 30px)',
}));

export default function SwipeableEdgeDrawer(props: Props) {
    //   const { window } = props;
    const [open, setOpen] = React.useState(true);
    const [keepMounted, setKeepMounted] = React.useState(true);
    const videoe: any = React.useRef(null);
    const swpdrawer: React.RefObject<HTMLDivElement> = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    useEffect(() => {



    }, [videoe]);

    const handlepause = () => {
        if (videoe.current) {

            videoe.current.pause()
        }
    }
    const mclick = (event: React.MouseEvent<HTMLElement>) => {
        if (!open) {
            //alert("x"+event.clientX+"y="+event.clientY)
            if (swpdrawer.current)
                // alert("x"+swpdrawer.current.clientWidth)
                if (event.clientX > swpdrawer.current.clientWidth - 60) {
                 
                   setKeepMounted(false)
                } else if (event.clientX > swpdrawer.current.clientWidth - 120) {

                    if (isPlaying) {
                        if (videoe.current) {

                            videoe.current.pause()
                        }
                    }else{
                        if (videoe.current) {

                            videoe.current.play()
                        }
                    }
                }
        }
    }
    const handlecanplay = () => {
        if (videoe.current) {
            videoe.current.addEventListener('play', () => {

                setIsPlaying(true)
            })
            videoe.current.addEventListener('pause', () => {

                setIsPlaying(false)
            })
            videoe.current.play()
        }
    }
    //   const handleVideoMounted = (element: { currentTime: number } | null) => {
    //     if (element !== null) {
    //       element.currentTime = 0.1

    //     }
    //   };
    // This is used only for the example
    //   const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>

            {/* <CssBaseline /> */}
            <Global
                styles={{

                    '.MuiDrawer-root > .MuiPaper-root': {

                        height: `calc(100% - ${drawerBleeding}px)`,

                        //   height: `calc(100%)`,
                        overflow: 'visible',
                        background: 'blue',

                    },
                }}
            />

            <SwipeableDrawer
                // container={container}
                ref={swpdrawer}
                anchor="bottom"
                open={open}
                onClick={
                    mclick
                }
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: keepMounted,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,

                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        background: 'white',
                        // pointerEvents: "all"
                    }}
                >

                    {open ? undefined : (<Puller />)}
                    <div style={open ? { display: 'inline' } : { display: 'flex' }}>
                        <div>
                            <video controls width={open ? '100%' : undefined} height={open ? undefined : '60px'} onCanPlay={handlecanplay} ref={videoe} key={props.video.ipfs} >
                                <source src={ props.video.ipfs} type="video/mp4" />
                            </video>
                        </div>
                        <div style={{ overflow: 'auto', height: '75vh' }} onClick={() => {


                        }}>

                            <div style={{ fontSize: '12px', height: '30px', width: '80px', overflow: 'hidden' }}>{props.video.title}</div>;
                            <div style={{ fontSize: '12px', height: '30px', width: '80px' }}>美国之音</div>;
                            <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff11</p>
                            <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffff</p>  <p>ffffend11</p>
                        </div>
                        <div>

                            {videoe ? (
                                <div style={{ zIndex: 10, position: 'absolute', right: '35px', display: 'flex', width: '60px', height: '60px', justifyContent: 'center', alignItems: 'center' }}>
                                    {!isPlaying ? (
                                        <PlayArrowIcon onClick={() => {
                                            handlecanplay();

                                        }}></PlayArrowIcon>
                                    ) : (
                                        <PauseIcon onClick={() => {
                                            handlepause();
                                        }}  ></PauseIcon>

                                    )}
                                </div>

                            ) : undefined}


                        </div>
                        <div style={{ position: 'absolute', right: '0', width: '60px', height: '60px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>

                            <CloseIcon>

                            </CloseIcon>
                        </div>

                    </div>
                    {/* <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography> */}
                </StyledBox>

                <div style={{ position: 'absolute', right: '0', width: '60px', height: '60px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>

                    <CloseIcon>

                    </CloseIcon>
                </div>


            </SwipeableDrawer>


        </Root>
    );
}
