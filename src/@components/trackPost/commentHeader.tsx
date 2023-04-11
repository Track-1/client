import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Track1Ic, TrackOneMainLogoIc } from "../../assets";

export default function CommentHeader(props: any) {
  const { pauseAudio } = props;

  const navigate = useNavigate();

  function moveMainPage() {
    pauseAudio();
    navigate("/");
    window.location.reload();
  }

  return (
    <CategoryHeaderContainer>
      <HeaderContainer>
        <HeaderWrapper>
          <TrackOneIcon onClick={moveMainPage} />
        </HeaderWrapper>
      </HeaderContainer>
    </CategoryHeaderContainer>
  );
}

const CategoryHeaderContainer = styled.header`
  top: 0;

  width: 192rem;
  height: 14.3rem;

  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.sub3} 49.92%,
    rgba(0, 0, 0, 0) 105.16%,
    rgba(13, 14, 17, 0) 105.16%
  );
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 14.3rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 178.7rem;
`;

const TrackOneIcon = styled(TrackOneMainLogoIc)`
  margin-top: 5.85rem;
  margin-left: 7.5rem;
  position: fixed;

  width: 26.3rem;
`;
