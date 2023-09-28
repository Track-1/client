import styled from "styled-components";
import { ProducerProfileShadowIc } from "../../assets";

export default function ProducerProfileShadow() {
  return (
    <ProducerProfileShadowWrapper>
      <Title>Portfolio</Title>
      <ProducerProfileShadowIcon />
    </ProducerProfileShadowWrapper>
  );
}

const ProducerProfileShadowWrapper = styled.section`
  position: fixed;
  z-index: -1;
`;
const ProducerProfileShadowIcon = styled(ProducerProfileShadowIc)`
  position: relative;
`;

const Title = styled.p`
  position: absolute;

  margin: 6rem 0 0 5.6rem;

  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.white};
`;
