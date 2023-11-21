import styled from "styled-components";
import { VocalProfileShadowIc } from "../../assets";

export default function VocalProfileShadow() {
  return (
    <VocalProfileShadowWrapper>
      <Title>Portfolio</Title>
      <VocalProfileShadowIcon />
    </VocalProfileShadowWrapper>
  );
}

const VocalProfileShadowWrapper = styled.section`
  position: fixed;
  z-index: -1;
`;
const VocalProfileShadowIcon = styled(VocalProfileShadowIc)`
  position: relative;
`;

const Title = styled.p`
  position: absolute;

  margin: 6rem 0 0 5.6rem;

  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.white};
`;
