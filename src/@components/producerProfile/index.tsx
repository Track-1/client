import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";
import { ProfileEditBtnIc, UploadButtonIc } from "../../assets";
import useGetProducerProfile from "../../hooks/producerProfile/useGetProducerProfile";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import BackButton from "../@common/backButton";
import Profile from "../profile";
import ProducerProfileShadow from "./producerProfileShadow";

export default function ProducerProfile() {
  const { producerId } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(producerId));
  const navigate = useNavigate();
  const resetClickedId = useResetRecoilState(clickedProfileId);
  const resetHoveredId = useResetRecoilState(hoveredProfileId);
  // const { vocalPortfolios } = useGetVocalPortfolio({
  //   limit: PAGE_LIMIT,
  //   userId: Number(vocalId),
  // });

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
          {/* {producerPortfolios && producerPortfolios?.length > 0 ? (
            <>
              <ProducerPortfolioList />
              <ProducerPortfolioInform isMe={producerProfile?.userSelf} />
            </>
          ) : (
            <ProducerEmptyProfileImage src={ProducerEmptyProfileImg} />
          )} */}

          <ProducerProfileShadow />
        </PortfolioSection>
      </Container>
    </>
  );
}

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
