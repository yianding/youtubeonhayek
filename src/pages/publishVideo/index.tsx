import React, { useCallback, useState } from 'react'
import { ButtonLight } from '../../components/Button'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import AppBody from '../AppBody'
import styled from 'styled-components'
import { usePublishVideoCallback } from '../../hooks/useWrapCallback1'

import { useActiveWeb3React } from '../../hooks'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useTranslation } from 'react-i18next'
import { ConfirmationPendingContent, TransactionErrorContent, TransactionSubmittedContent } from '../../components/TransactionConfirmationModal'
import Modal from '../../components/Modal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Input = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: 100%;
  heigth:30%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: pink;
  border-radius: 1px;
  text-align: right
  -webkit-appearance: none;
  font-size: 14px;
`

export default function PublishVideo() {
    const videoe: any = React.useRef(null);
    const { library } = useActiveWeb3React()

    const [ipfs, setIpfs] = useState<string | undefined>(undefined)
    const [title, setTitle] = useState<string|undefined>(undefined)


    const { execute: onPublishVidoe } = usePublishVideoCallback(ipfs ? ipfs : "", title ? title : "")




    const { t } = useTranslation()

    const [{ showConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
        showConfirm: boolean
        attemptingTxn: boolean
        swapErrorMessage: string | undefined
        txHash: string | undefined
    }>({
        showConfirm: false,
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined
    })
    const [pendingText, setPendingText] = useState<string>('')

    function publishMyVideo() {
        if (onPublishVidoe) {
            setPendingText(`${t("publish video")} ${title}  `)
            setSwapState({ attemptingTxn: true, showConfirm: true, swapErrorMessage: undefined, txHash: undefined })
            onPublishVidoe().then(hash => {
                setSwapState({ attemptingTxn: false, showConfirm: true, swapErrorMessage: undefined, txHash: hash })
            }).catch(error => {
                setSwapState({
                    attemptingTxn: false,
                    showConfirm: true,
                    swapErrorMessage: error.message,
                    txHash: undefined
                })

            })
        }
    }


    const { chainId } = useActiveWeb3React()
    const onDismiss = () => {
        setSwapState({ showConfirm: false, attemptingTxn, swapErrorMessage, txHash })
    }

    const confirmationContent = useCallback(
        () =>
            swapErrorMessage ? (
                <TransactionErrorContent onDismiss={onDismiss} message={swapErrorMessage} />
            ) : null
        , [onDismiss, swapErrorMessage]
    )


    const openipfs = () => {
        if (library) {

            library.send("get_ipfs", ['andy', "ddw"]).then((res: string) => {
                let ss = res.toString()
                setIpfs(ss.replace("http://127.0.0.1:8080", ""))
                //document.getElementById("videos")!.currentTime=0.01
            }, (error: string) => {

                alert("出错了:" + error)
            })
        }
    }
    const handlecanplay = () => {
        if (videoe.current) {
            //  videoe.current.currentTime=0
        }
    }
    return (
        <div>
            {showConfirm ? <Modal isOpen={showConfirm} onDismiss={onDismiss} maxHeight={90}>
                {attemptingTxn ? (
                    <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
                ) : txHash ? (
                    <TransactionSubmittedContent chainId={chainId} hash={txHash} onDismiss={onDismiss} />
                ) : (
                    confirmationContent()
                )}
            </Modal> : null
            }
            <AppBody>

                <div style={{ height: '80px' }}>
                    <AddRemoveTabs adding={true} />
                </div>
                <div>
                    {!ipfs ? (
                        <div style={{ width: '100%' }}>
                            <VideoLibraryIcon sx={{ width: '100%' ,fontSize: 160}} />
                        </div>
                    ) : (<video controls autoPlay width={'100%'} onCanPlay={handlecanplay} ref={videoe} key={ipfs} >
                        {ipfs ? (<source src={"http://127.0.0.1:8080" + ipfs} type="video/mp4" />) : undefined}
                    </video>)}

                </div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <ButtonLight disabled={false} width="100%" onClick={openipfs}>
                        {t('选择视频')}
                    </ButtonLight>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="标题" variant="outlined" value={title} onChange={(v) => { setTitle(v.target.value) }} />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="视频描述" variant="outlined" multiline />
                </Box>

                <ButtonLight disabled={false} width="100%" onClick={publishMyVideo}>
                    {t('发布视频')}
                </ButtonLight>





            </AppBody>
        </div>
    )
}



