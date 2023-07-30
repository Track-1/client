import styled from "styled-components";
import { BackButtonIc } from "../../assets";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  function clickBackButton() {
    navigate(-1);
  }

  return (
    <BackButtonWrapper>
      <BackButtonDiv onClick={clickBackButton}>
        <BackButtonIc />
        <BackText>Back</BackText>;
      </BackButtonDiv>
    </BackButtonWrapper>
  );
}

const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  height: 17rem;

  padding: 0 7.5rem;
`;

const BackButtonDiv = styled.div`
  display: contents;
  
  cursor: pointer;
`;

const BackText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.id};

  padding-left: 1.8rem;
`;
