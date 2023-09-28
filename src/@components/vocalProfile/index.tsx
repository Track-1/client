import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";
import { ProfileEditBtnIc, UploadButtonIc } from "../../assets";
import useGetVocalProfile from "../../hooks/vocalProfile/useGetVocalProfile";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import BackButton from "../@common/backButton";
import VocalPortfolioInform from "../portfolio/vocalPortfolioInform";
import VocalPortfolioList from "../portfolio/vocalPortfolioList";
import Profile from "../profile";
import VocalProfileShadow from "./vocalProfileShadow";

export default function VocalProfile() {
  const { vocalId } = useParams();
  const { vocalProfile } = useGetVocalProfile(Number(vocalId));
  const navigate = useNavigate();
  const resetClickedId = useResetRecoilState(clickedProfileId);
  const resetHoveredId = useResetRecoilState(hoveredProfileId);

  useEffect(() => {
    resetClickedId();
    resetHoveredId();
  }, []);

  function handleMoveProfileEditPage() {
    navigate(`/profile-edit/vocal/${vocalProfile?.userProfile.userId}`);
  }

  function hadnleMoveToUpload() {
    navigate("/upload/Portfolio", {
      state: { producerUploadType: "Portfolio", prevPage: `/vocal-profile/${vocalId}` },
    });
  }

  return (
    <Container>
      <ProfileSection>
        <BackButtonWrapper>
          <BackButton />
          {vocalProfile?.userSelf && <ProfileEditBtnIcon onClick={handleMoveProfileEditPage} />}
        </BackButtonWrapper>
        <Profile userType="vocal" userSelf={vocalProfile?.userSelf} userProfile={vocalProfile?.userProfile} />
      </ProfileSection>
      {vocalProfile?.userSelf && <UploadButtonIcon onClick={hadnleMoveToUpload} />}
      <PortfolioSection>
        <VocalPortfolioList />
        <VocalPortfolioInform isMe={vocalProfile?.userSelf} />
        <VocalProfileShadow />
      </PortfolioSection>
    </Container>
  );
}

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

const ProfileEditBtnIcon = styled(ProfileEditBtnIc)`
  width: 16.6rem;
  margin-left: 16.9rem;

  cursor: pointer;
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