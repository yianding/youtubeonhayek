import React, { useMemo } from 'react'
import styled from 'styled-components'
import useHttpLocations from '../../hooks/useHttpLocations'

import Logo from '../Logo'

const StyledListLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function ListLogo({
  logoURI,
  style,
  size = '24px',
  alt
}: {
  logoURI: string|undefined
  size?: string
  style?: React.CSSProperties
  alt?: string
}) {

  const uriLocations = useHttpLocations(logoURI )

  const srcs: string[] = useMemo(() => {
        return [...uriLocations, logoURI?logoURI:""]
    

  }, [uriLocations])
  

  return logoURI?<StyledListLogo alt={alt} size={size} srcs={srcs} style={style} />:<></>
  
}
