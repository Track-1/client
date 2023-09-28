import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { ProfileEditBtnIc, UploadButtonIc } from "../../assets";
import ProducerEmptyProfileImg from "../../assets/image/producerEmptyProfileImg.png";
import { useGetProducerPortfolio, useGetProducerProfile } from "../../hooks/queries/mypage";
import { clickedProfileId, hoveredProfileId, producerState } from "../../recoil/common/profile";
import BackButton from "../@common/backButton";
import Profile from "../profile";
import ProducerPortfolioList from "./producerPortfolioList";
import ProducerProfileShadow from "./producerProfileShadow";

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
  const dataState = useRecoilValue(producerState);

  useEffect(() => {
    resetClickedId();
    resetHoveredId();
  }, []);

  function handleMoveProfileEditPage() {
    navigate(`/profile-edit/producer/${producerProfile?.userProfile.userId}`);
  }

  function hadnleMoveToUpload() {}

  return (
    <>
      <Container>
        <ProfileSection>
          <BackButtonWrapper>
            <BackButton />
            {producerProfile?.userSelf && <ProfileEditBtnIcon onClick={handleMoveProfileEditPage} />}
          </BackButtonWrapper>
          <Profile
            userType="producer"
            userSelf={producerProfile?.userSelf}
            userProfile={producerProfile?.userProfile}
          />
        </ProfileSection>
        {producerProfile?.userSelf && <UploadButtonIcon onClick={hadnleMoveToUpload} />}

        <PortfolioSection>
          {producerPortfolios && producerPortfolios?.length > 0 ? (
            <>
              {dataState === "Portfolio" && <ProducerPortfolioList />}
              {/* <ProducerPortfolioInform isMe={producerProfile?.userSelf} /> */}
            </>
          ) : (
            <ProducerEmptyProfileImage src={ProducerEmptyProfileImg} />
          )}
          <ProducerProfileShadow />
        </PortfolioSection>
      </Container>
    </>
  );
}

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

  margin-left: 60rem;
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
