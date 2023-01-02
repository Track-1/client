import styled from "styled-components"
import { VocalProfileShadowIc } from "../../assets"

export default function VocalProfileShadow() {
  return (
    <>        
        <Title>profile</Title>
        <VocalProfileShadowIcon/>
    </>
  )
}

const VocalProfileShadowIcon=styled(VocalProfileShadowIc)`
    position: relative;
`

const Title=styled.p`
    position: absolute;
    z-index: 2;

    margin: 6rem 0 0 5.6rem;

    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.white};
`
