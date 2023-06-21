import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import styled from 'styled-components';
// const FullScreen= styled.div`
// height:100vh;
// with:100%
// `

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function VideoPlayDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: true,
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
            <video controls width="100%"  >
                <source src={'http://127.0.0.1:8080' + "/ipfs/QmaqQc3Mdhv9hS3qoNSmDyErvmQkXETfFjKEE113QhMDAa"} type="video/mp4" />
            </video>
            <Divider />      <Divider />      <Divider />      <Divider />      <Divider />
            <Divider />      <Divider />      <Divider />      <Divider />      <Divider />
            <Divider />      <Divider />      <Divider />      <Divider />      <Divider />
            <Divider />      <Divider />      <Divider />      <Divider />      <Divider />
            <Divider />      <Divider />      <Divider />      <Divider />      <Divider />
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>        <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <p>.</p>
            <Divider />

        </Box>
    );

    return (
        <div>
            {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}

                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}