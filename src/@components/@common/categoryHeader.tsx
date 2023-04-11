import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import styled from "styled-components";
import { Category } from "../../core/constants/categoryHeader";

import {
  ToggleIc,
  Track1Ic,
  TracksSelectTextIc,
  VocalsSelectTextIc,
  TracksHeaderTextIc,
  VocalsHeaderTextIc,
  TrackOneMainLogoIc,
} from "../../assets";
import profileImg from "../../assets/image/profileImg.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import { LoginUserId, LoginUserImg, LoginUserType } from "../../recoil/loginUserData";
import { isProducer } from "../../utils/common/userType";
import { categorySelect, clickCategoryHeader } from "../../recoil/categorySelect";
import { showPlayerBar } from "../../recoil/player";
import { getCookie } from "../../utils/cookie";
import { isLogin } from "../../utils/common/isLogined";

export default function CategoryHeader(props: any) {
  const { excuteGetData, pausesPlayerAudio } = props;
  const isSameClicked = useRef(false);

  const navigate = useNavigate();
  const [tracksOrVocals, setTracksOrVocals] = useRecoilState<any>(tracksOrVocalsCheck);
  const loginUserType = useRecoilValue(LoginUserType);
  const loginUserId = useRecoilValue(LoginUserId);
  const loginUserImg = useRecoilValue(LoginUserImg);
  const [isClickedCategory, setIsClickedCategory] = useRecoilState(clickCategoryHeader);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const isSameCategoryCliked = () => {
    if (!isSameClicked.current) {
      isSameClicked.current = true;
    }
  };

  function clickSameCategory() {
    isSameCategoryCliked();
    if (isSameClicked.current === false) {
      excuteGetData();
    } else {
      window.scrollTo(0, 0);
    }
  }

  function moveTrackSearchPage() {
    setShowPlayer(false);
    pausesPlayerAudio();
    setTracksOrVocals(Category.TRACKS);
    navigate("/track-search");
    setIsClickedCategory(true);
    clickSameCategory();
  }

  function moveVocalSearchPage() {
    setShowPlayer(false);
    pausesPlayerAudio();
    setTracksOrVocals(Category.VOCALS);
    navigate("/vocal-search");
    setIsClickedCategory(true);
    clickSameCategory();
  }

  function moveMainPage() {
    setShowPlayer(false);
    pausesPlayerAudio();
    navigate("/");
  }

  function moveMypage() {
    setShowPlayer(false);
    pausesPlayerAudio();
    loginUserType === "vocal"
      ? navigate(`/vocal-profile/${loginUserId}`, { state: loginUserId })
      : navigate(`/producer-profile/${loginUserId}`, { state: loginUserId });
  }

  return (
    <CategoryHeaderContainer>
      <CategoryContainer>
        <CategoryWrapper>
          {tracksOrVocals === Category.TRACKS && (
            <>
              <TracksSelectTextIcon onClick={moveTrackSearchPage} />
              <VocalsHeaderTextIcon onClick={moveVocalSearchPage} />
            </>
          )}
          {tracksOrVocals === Category.VOCALS && (
            <>
              <TracksHeaderTextIcon onClick={moveTrackSearchPage} />
              <VocalsSelectTextIcon onClick={moveVocalSearchPage} />
            </>
          )}
        </CategoryWrapper>
      </CategoryContainer>

      <HeaderContainer>
        <HeaderWrapper>
          <TrackOneMainLogoIcon onClick={moveMainPage} />
          {isLogin() && (
            <ProfileWrapper onClick={moveMypage}>
              {isProducer(loginUserType) ? (
                <ProducerProfileImg src={loginUserImg} alt="프로필이미지" />
              ) : (
                <VocalProfileImageWrapper>
                  <VocalProfileImage src={loginUserImg} alt="프로필이미지" />
                </VocalProfileImageWrapper>
              )}
              <ToggleIc />
            </ProfileWrapper>
          )}
        </HeaderWrapper>
      </HeaderContainer>
    </CategoryHeaderContainer>
  );
}

const CategoryHeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;

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
  width: 100%;
  display: flex;
  justify-content: center;

  height: 14.3rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 5.9rem 7.5rem;

  height: 100%;
`;

const TrackOneMainLogoIcon = styled(TrackOneMainLogoIc)`
  width: 26.3rem;

  cursor: pointer;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CategoryWrapper = styled.div`
  display: flex;

  position: absolute;
  z-index: 2;

  margin-top: 6.65rem;

  ${({ theme }) => theme.fonts.body1};
`;

const TracksSelectTextIcon = styled(TracksSelectTextIc)`
  width: 8.9rem;
  cursor: pointer;
`;

const TracksHeaderTextIcon = styled(TracksHeaderTextIc)`
  width: 8.9rem;
  cursor: pointer;
`;

const VocalsSelectTextIcon = styled(VocalsSelectTextIc)`
  margin-left: 7.368rem;
  width: 8.9rem;

  cursor: pointer;
`;

const VocalsHeaderTextIcon = styled(VocalsHeaderTextIc)`
  margin-left: 7.368rem;
  width: 8.9rem;

  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 4.6rem;
  height: 4.6rem;

  margin-right: 1.29rem;

  border: 0.15rem solid white;
  border-radius: 2.4rem;
`;

const ProducerProfileImg = styled.img`
  width: 4.6rem;
  height: 4.6rem;

  margin-right: 1.29rem;

  border: 0.15rem solid white;
  border-radius: 2.4rem;
  border: 0.15rem solid ${({ theme }) => theme.colors.white};
`;

const VocalProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 2.7rem;

  width: 4rem;
  height: 4rem;

  transform: rotate(45deg);
  overflow: hidden;
  border-radius: 0.5rem;
  border: 0.15rem solid ${({ theme }) => theme.colors.white};
`;

const VocalProfileImage = styled.img`
  height: 6rem;
  width: 6rem;

  /* border: 0.1rem solid ${({ theme }) => theme.colors.black}; */
  border-radius: 50%;

  transform: rotate(-45deg);
`;
