import styled from "styled-components";
import { BackButtonIc } from "../../assets";

export default function BackButton() {
  return (
    <BackButtonWrapper>
      <BackButtonIc />
      <BackText>Back</BackText>;
    </BackButtonWrapper>
  );
}

const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  height: 17rem;

  padding: 0 7.5rem;
`;

const BackText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.id};

  padding-left: 1.8rem;
`;
