import styled from 'styled-components';
import VocalEmptyProfileImg from '../../assets/image/vocalEmptyProfileImg.png';
import useUpdateModal from '../../hooks/common/useUpdateModal';
import BackButton from '../@common/button/backButton';
import Profile from '../profile';
import VocalPortfolioInform from './vocalPortfolioInform';
import VocalPortfolioList from './vocalPortfolioList';
import VocalProfileShadow from './vocalProfileShadow';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { ProfileEditBtnIc, UploadButtonIc } from '../../assets';
import { useGetVocalPortfolio, useGetVocalProfile } from '../../hooks/queries/mypage';
import { clickedProfileId, hoveredProfileId } from '../../recoil/common/profile';
import { PlayUseContext } from '../../context/playerContext';

const PAGE_LIMIT = 5;

export default function VocalProfile() {
  const { vocalId } = useParams();
  const { vocalProfile } = useGetVocalProfile(Number(vocalId));
  const navigate = useNavigate();
  const resetClickedId = useResetRecoilState(clickedProfileId);
  const resetHoveredId = useResetRecoilState(hoveredProfileId);
  const { vocalPortfolios } = useGetVocalPortfolio({
    limit: PAGE_LIMIT,
    userId: Number(vocalId),
  });
  const { unShowModal } = useUpdateModal();
  const { quitAudioForMovePage } = PlayUseContext({});
  const prevURL = useLocation().state?.prevURL;

  function handleMoveProfileEditPage() {
    quitAudioForMovePage();
    navigate(`/profile-edit/${vocalId}`, {
      state: {
        prevURL: prevURL,
      },
    });
  }

  function hadnleMoveToUpload() {
    navigate('/upload/vocal/portfolio', {
      state: { producerUploadType: 'Portfolio', prevPage: `/vocal-profile/${vocalId}` },
    });
  }

  useEffect(() => {
    resetClickedId();
    resetHoveredId();
    unShowModal();
  }, []);

  return (
    <>
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
          {vocalPortfolios && vocalPortfolios?.userPortfolio.length > 0 ? (
            <>
              <VocalPortfolioList />
              <VocalPortfolioInform isMe={vocalProfile?.userSelf} />
            </>
          ) : (
            <VocalEmptyProfileImage src={VocalEmptyProfileImg} />
          )}
          <VocalProfileShadow />
        </PortfolioSection>
      </Container>
    </>
  );
}

const VocalEmptyProfileImage = styled.img`
  position: absolute;
  top: 26.2rem;
  left: 69.6rem;
  width: 123rem;
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
