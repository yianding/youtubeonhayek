import { Currency, ETHER, Token } from 'uniswap-hayek-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import EthereumLogo from '../../assets/images/128.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const getTokenLogoURL = (address: string) =>{
 // `https://dotc.trade/${address}.png`
 if(address=="0xf3DD11F7d8fA791c2Da46a5D26634592E417Af6C"){
   return "./images/WHYK.png"
 }
 if(address=="0x55d398326f99059fF775485246999027B3197955" || address=="0xa5E265Bf313b24476dA9681D61bDbdC03c66F271" || address.toLowerCase()==="0x382bb369d343125bfb2117af9c149795c6c65c50"){
  return "./images/USDT.png"
}else{
  return  "./images/" + address + ".png"
}
}


const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
 
  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
      
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }
  // if (currency === undefined) {
  //   return <></>
  // }
  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
