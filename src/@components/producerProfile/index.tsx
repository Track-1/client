import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { ProfileEditBtnIc, UploadButtonIc } from "../../assets";
import ProducerEmptyProfileImg from "../../assets/image/producerEmptyProfileImg.png";
import { PlayerContext } from "../../context/playerContext";
import useModal from "../../hooks/common/useModal";
import {
  useGetProducerPortfolio,
  useGetProducerProfile,
  useGetProducerVocalSearching,
} from "../../hooks/queries/mypage";
import { clickedProfileId, hoveredProfileId, producerState } from "../../recoil/common/profile";
import BackButton from "../@common/backButton";
import Profile from "../profile";
import ProducerPortfolioInform from "./producerPortfolioInform";
import ProducerPortfolioList from "./producerPortfolioList";
import ProducerProfileShadow from "./producerProfileShadow";
import ProducerVocalSearching from "./producerVocalSearching";
import ProducerVocalSearchingInform from "./producerVocalSearchingInform";
import TracksProfileUploadModal from "./tracksProfileUploadModal";

const PAGE_LIMIT = 5;

export default function ProducerProfile() {
  const { producerId } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(producerId));
  const navigate = useNavigate();
  const resetClickedId = useResetRecoilState(clickedProfileId);
  const resetHoveredId = useResetRecoilState(hoveredProfileId);
  const { producerPortfolios } = useGetProducerPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });
  const { producerVocalSearchings } = useGetProducerVocalSearching({
    limit: PAGE_LIMIT,
    userId: Number(producerId),
  });

  const { quitAudioForMovePage } = useContext(PlayerContext);

  const dataState = useRecoilValue(producerState);
  const { openModal, showModal } = useModal();

  useEffect(() => {
    resetClickedId();
    resetHoveredId();
  }, []);

  function handleMoveProfileEditPage() {
    quitAudioForMovePage();
    navigate(`/profile-edit`);
  }

  return (
    <>
      {openModal && <TracksProfileUploadModal />}
      <Container>
        <ProfileSection>
          <BackButtonWrapper>
            <BackButton prevURL="/track-search" />
            {producerProfile?.userSelf && <ProfileEditBtnIcon onClick={handleMoveProfileEditPage} />}
          </BackButtonWrapper>
          <Profile
            userType="producer"
            userSelf={producerProfile?.userSelf}
            userProfile={producerProfile?.userProfile}
          />
        </ProfileSection>
        {producerProfile?.userSelf && <UploadButtonIcon onClick={showModal} />}

        <ProducerProfileShadow />
        <PortfolioSection>
          {dataState === "Portfolio" ? (
            <>
              {producerPortfolios && producerPortfolios.length > 0 ? (
                <>
                  <DataWrapper>
                    <ProducerPortfolioList />
                  </DataWrapper>
                  <ProducerPortfolioInform isMe={producerProfile?.userSelf} />
                </>
              ) : (
                <ProducerEmptyProfileImage src={ProducerEmptyProfileImg} />
              )}
            </>
          ) : (
            <>
              {producerVocalSearchings && producerVocalSearchings.length > 0 ? (
                <>
                  <DataWrapper>
                    <ProducerVocalSearching />
                  </DataWrapper>
                  <ProducerVocalSearchingInform isMe={producerProfile?.userSelf} />
                </>
              ) : (
                <ProducerEmptyProfileImage src={ProducerEmptyProfileImg} />
              )}
            </>
          )}
        </PortfolioSection>
      </Container>
    </>
  );
}

const DataWrapper = styled.div`
  width: 47.8rem;
  border: 0.3rem solid transparent;
  border-top-left-radius: 47.8rem;
  border-top-right-radius: 47.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-left: 29.4rem; */
  margin-left: 86.1rem;
  margin-top: 23.3rem;
  margin-bottom: 3rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to bottom, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const ProducerEmptyProfileImage = styled.img`
  position: absolute;
  top: 26.2rem;
  left: 69.6rem;
  width: 124.2rem;
`;

const UploadButtonIcon = styled(UploadButtonIc)`
  position: fixed;
  z-index: 7;
  right: 0;
  margin-top: 5.9rem;
  margin-right: 6.9rem;

  width: 24.5rem;

  cursor: pointer;
`;

const ProfileEditBtnIcon = styled(ProfileEditBtnIc)`
  width: 16.6rem;
  margin-left: 16.9rem;

  cursor: pointer;
`;

const PortfolioSection = styled.section`
  width: 186rem;
  display: flex;

  /* margin-left: 60rem; */

  position: absolute;
`;

const Container = styled.div`
  display: flex;
`;

const BackButtonWrapper = styled.div`
  margin: 6rem 0 6rem 0;
  display: flex;
  padding: 0 8rem;
  width: 60rem;
  justify-content: space-between;
`;

const ProfileSection = styled.section`
  width: 60rem;
  position: fixed;
`;
