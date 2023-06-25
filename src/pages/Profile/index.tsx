import React, { useCallback, useState } from 'react'
import { ButtonLight } from '../../components/Button'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import AppBody from '../AppBody'
import styled from 'styled-components'
import { useProfileCallback } from '../../hooks/useWrapCallback1'

import { useActiveWeb3React } from '../../hooks'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next'
import { ConfirmationPendingContent, TransactionErrorContent, TransactionSubmittedContent } from '../../components/TransactionConfirmationModal'
import Modal from '../../components/Modal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { pink } from '@mui/material/colors'
import { Avatar } from '@mui/material'
// import { useGetProfileCallBack } from '../../hooks/useApproveCallback'
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

export default function SetProfile() {
    const {library } = useActiveWeb3React()
    //const profile =useGetProfileCallBack(account)
   // console.log(profile)
    const [avatar, setAvatar] = useState("")
    const [name, setName] = useState("")
    const [e_mail,setEmail] = useState("")

    const [gender,setGender] = useState("")

    const { execute: onSetProfile } = useProfileCallback(avatar, name,e_mail,gender)
  

  
  
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

    function setProfile() {
        if (onSetProfile) {
            setPendingText(`${t("set profile")} ${name}  `)
            setSwapState({ attemptingTxn: true, showConfirm: true, swapErrorMessage: undefined, txHash: undefined })
            onSetProfile().then(hash => {
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
                setAvatar(ss.replace("http://127.0.0.1:8080", ""))
                //document.getElementById("videos")!.currentTime=0.01
            }, (error: string) => {

                alert("出错了:" + error)
            })
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


                <AddRemoveTabs adding={true} />
                <ButtonLight disabled={false} width="100%" onClick={openipfs}>
                    {t('选择头像')}
                </ButtonLight>
                <div style={{width:'100%'}}>
                    {avatar?(
                               <Avatar alt="Remy Sharp" src={"http://127.0.0.1:8080"+avatar} sx={{ color: pink[50] ,width:'160px',height:'160px'}} />
                               ):(<AccountCircleIcon  sx={{ width:'100%',fontSize: 160}}></AccountCircleIcon>)}
                           
                        </div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="姓名" variant="outlined" value={name} onChange={(v)=>{setName(v.target.value)}}/>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="邮件" variant="outlined" value={e_mail} onChange={(v)=>{setEmail(v.target.value)}}/>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="性别" variant="outlined" value={gender} onChange={(v)=>{setGender(v.target.value)}}/>
                </Box>
                <ButtonLight disabled={false} width="100%" onClick={setProfile}>
                    {t('更新')}
                </ButtonLight>





            </AppBody>
        </div>
    )
}



